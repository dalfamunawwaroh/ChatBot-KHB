/**
 * Orkestrasi RAG + KMS untuk satu workspace KHB.
 *
 * Pembagian tugas (mengikuti AiOnesCare/omnicare):
 * - **rag.aiones.app** = penjawab chat (`Bearer`, per `knowledge_base_id`).
 * - **ragkms.aiones.app** = repositori unggahan dokumen (`X-API-Key`, per `organizationId`).
 *   Dokumen yang diunggah ke project KMS otomatis diindeks ke `knowledgeBase`
 *   project — karena itu project memakai KB yang sama dengan penjawab chat.
 *
 * Bila KMS belum dikonfigurasi, unggahan langsung ke layanan RAG (masih terbaca
 * chatbot, tetapi tidak muncul di panel knowbase).
 */
import { env } from '../../config/env';
import { prisma } from '../../config/prisma';
import { logger } from '../../common/utils/logger';
import { AppError, notFound } from '../../common/errors/app-error';
import {
  createProject as kmsCreateProject,
  deleteDocument as kmsDeleteDocument,
  isKmsConfigured,
  uploadDocument as kmsUploadDocument,
} from './kms.client';
import {
  deleteDocument as ragDeleteDocument,
  generateDocumentId,
  isRagChatConfigured,
  listDocuments as ragListDocuments,
  queryChat as ragQueryChat,
  uploadDocument as ragUploadDocument,
  type RagChatHistoryTurn,
} from './rag-chat.client';

export interface RagTarget {
  /** Knowledge base yang dibaca chatbot. */
  knowledgeBaseId: string;
  /** Project KMS untuk unggahan (null bila KMS tidak dipakai). */
  organizationId: string | null;
  /** 'kms' = unggah lewat KMS (muncul di panel knowbase), 'rag-chat' = langsung ke RAG. */
  backend: 'kms' | 'rag-chat' | 'none';
}

export function defaultDocumentCategory(): string {
  return env.KMS_DOCUMENT_CATEGORY || 'Panduan Halal';
}

/** Info integrasi untuk ditampilkan di panel admin. */
export function ragIntegrationInfo() {
  return {
    ragChatUrl: env.RAG_CHAT_API_URL || null,
    ragChatConfigured: isRagChatConfigured(),
    kmsUrl: env.RAG_API_URL || null,
    kmsConfigured: isKmsConfigured(),
    defaultKnowledgeBaseId: env.RAG_CHAT_KNOWLEDGE_BASE_ID || null,
  };
}

/**
 * Pastikan workspace punya project KMS dan knowledge base.
 * Project dibuat sekali bila `kmsOrganizationId` kosong (id disimpan ke DB), dan
 * KB default diambil dari env bila workspace belum punya.
 */
export async function ensureRagTarget(workspaceId: string): Promise<RagTarget> {
  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    select: { id: true, slug: true, name: true, ragKnowledgeBaseId: true, kmsOrganizationId: true },
  });
  if (!workspace) throw notFound('Workspace tidak ditemukan');

  let organizationId = workspace.kmsOrganizationId?.trim() || null;
  let knowledgeBaseId =
    workspace.ragKnowledgeBaseId?.trim() || env.RAG_CHAT_KNOWLEDGE_BASE_ID.trim() || '';

  if (isKmsConfigured() && !organizationId) {
    try {
      const project = await kmsCreateProject({
        name: workspace.name,
        code: `KHB_${workspace.slug.replace(/[^a-z0-9]+/gi, '_').toUpperCase()}`,
        type: 'komunitas',
        knowledgeBase: knowledgeBaseId || undefined,
        email: env.KMS_OWNER_EMAIL || undefined,
        adminName: env.KMS_OWNER_NAME || undefined,
      });
      organizationId = project.id;
      if (!knowledgeBaseId && project.knowledgeBase) knowledgeBaseId = project.knowledgeBase;
      await prisma.workspace.update({
        where: { id: workspace.id },
        data: { kmsOrganizationId: organizationId, ragKnowledgeBaseId: knowledgeBaseId || null },
      });
      logger.info({ workspaceId, organizationId, knowledgeBaseId }, 'Project KMS dibuat untuk workspace');
    } catch (error) {
      logger.warn(
        { workspaceId, err: error instanceof Error ? error.message : error },
        'Gagal membuat project KMS — unggahan akan memakai layanan RAG langsung',
      );
    }
  }

  if (!knowledgeBaseId) {
    throw new AppError(
      'Knowledge base belum ditentukan. Isi RAG_CHAT_KNOWLEDGE_BASE_ID di server/.env atau buat KB di panel RAG.',
      503,
      'RAG_KB_NOT_SET',
    );
  }

  if (knowledgeBaseId !== workspace.ragKnowledgeBaseId) {
    await prisma.workspace.update({
      where: { id: workspace.id },
      data: { ragKnowledgeBaseId: knowledgeBaseId },
    });
  }

  const backend: RagTarget['backend'] = isKmsConfigured() && organizationId
    ? 'kms'
    : isRagChatConfigured()
      ? 'rag-chat'
      : 'none';

  return { knowledgeBaseId, organizationId, backend };
}

export interface RagQueryResult {
  answer: string;
  grounded: boolean;
  citations: string[];
  model: string | null;
}

/**
 * Tanya layanan RAG untuk satu workspace.
 * `null` = integrasi tidak dikonfigurasi/gagal → pemanggil memakai retrieval lokal.
 */
export async function queryRag(input: {
  workspaceId: string;
  question: string;
  history: Array<{ role: 'user' | 'assistant'; content: string }>;
}): Promise<RagQueryResult | null> {
  if (!isRagChatConfigured()) return null;

  let target: RagTarget;
  try {
    target = await ensureRagTarget(input.workspaceId);
  } catch (error) {
    logger.warn(
      { err: error instanceof Error ? error.message : error },
      'Target RAG belum siap — memakai retrieval lokal',
    );
    return null;
  }

  const history: RagChatHistoryTurn[] = input.history
    .filter((turn) => turn.content.trim().length > 0)
    .slice(-6)
    .map((turn) => ({ role: turn.role, content: turn.content.slice(0, 500) }));

  try {
    const result = await ragQueryChat({
      knowledgeBaseId: target.knowledgeBaseId,
      query: input.question,
      history,
    });

    const citations = result.sources
      .map((source) =>
        source.document_name
          ? source.page != null
            ? `${source.document_name} hlm. ${source.page}`
            : source.document_name
          : (source.document_id ?? ''),
      )
      .filter((label, index, all) => label.length > 0 && all.indexOf(label) === index)
      .slice(0, 4);

    return { answer: result.answer, grounded: result.grounded, citations, model: result.model };
  } catch (error) {
    logger.warn(
      {
        knowledgeBaseId: target.knowledgeBaseId,
        err: error instanceof Error ? error.message : error,
      },
      'Layanan RAG gagal — memakai retrieval lokal',
    );
    return null;
  }
}

export interface StoredDocument {
  documentId: string;
  status: string;
  chunks: number | null;
  backend: 'kms' | 'rag-chat';
}

/**
 * Unggah dokumen ke knowledge base workspace.
 * Teks dokumen dikirim sebagai berkas `.txt` (KMS/RAG yang mengekstrak & mengindeks).
 */
export async function storeDocument(input: {
  workspaceId: string;
  title: string;
  content: string;
  category?: string;
  fileName?: string;
}): Promise<StoredDocument> {
  const target = await ensureRagTarget(input.workspaceId);
  if (target.backend === 'none') {
    throw new AppError('Integrasi RAG/KMS belum dikonfigurasi di server/.env', 503, 'RAG_NOT_CONFIGURED');
  }

  // Isi yang dikirim selalu teks polos (bukan PDF asli). Nama berkas WAJIB .txt:
  // bila memakai .pdf, KMS mencoba mengekstrak PDF dan indeksnya gagal.
  const baseName = (input.fileName ?? input.title).replace(/\.[a-z0-9]+$/i, '');
  const fileName = `${baseName.replace(/[^\w\-]+/g, '_').slice(0, 60) || 'dokumen'}.txt`;
  const buffer = Buffer.from(input.content, 'utf8');
  const category = input.category || defaultDocumentCategory();

  if (target.backend === 'kms' && target.organizationId) {
    const document = await kmsUploadDocument({
      organizationId: target.organizationId,
      fileName,
      mimeType: 'text/plain',
      content: buffer,
      title: input.title,
      category,
      year: new Date().getFullYear(),
      notes: 'Diunggah dari panel Asisten Halal KHB.',
    });
    return {
      documentId: document.id,
      status: document.ragStatus ?? 'queued',
      chunks: document.chunksCount ?? null,
      backend: 'kms',
    };
  }

  const documentId = generateDocumentId();
  const document = await ragUploadDocument({
    knowledgeBaseId: target.knowledgeBaseId,
    documentId,
    fileName,
    content: buffer,
  });
  return { documentId: document.id, status: document.status, chunks: document.chunks, backend: 'rag-chat' };
}

/** Hapus dokumen dari KMS/layanan RAG — kegagalan dicatat, tidak melempar. */
export async function removeStoredDocument(documentId: string): Promise<void> {
  if (!documentId) return;
  if (isKmsConfigured()) {
    try {
      await kmsDeleteDocument(documentId);
      return;
    } catch (error) {
      logger.warn(
        { documentId, err: error instanceof Error ? error.message : error },
        'Gagal menghapus dokumen di KMS — mencoba layanan RAG',
      );
    }
  }
  if (isRagChatConfigured()) {
    await ragDeleteDocument(documentId).catch((error: unknown) => {
      logger.warn(
        { documentId, err: error instanceof Error ? error.message : error },
        'Gagal menghapus dokumen di layanan RAG',
      );
    });
  }
}

/** Ringkasan integrasi + isi knowledge base (untuk panel admin). */
export async function ragOverview(workspaceId: string) {
  const target = await ensureRagTarget(workspaceId);
  const documents = isRagChatConfigured()
    ? await ragListDocuments(target.knowledgeBaseId).catch(() => [])
    : [];
  return {
    knowledgeBaseId: target.knowledgeBaseId,
    organizationId: target.organizationId,
    backend: target.backend,
    documents,
    integration: ragIntegrationInfo(),
  };
}
