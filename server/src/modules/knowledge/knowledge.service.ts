import { prisma } from '../../config/prisma';
import { chunkText } from '../../common/utils/plain-text';
import { notFound } from '../../common/errors/app-error';
import type { CreateDocumentInput, ListDocumentsQuery, UpdateDocumentInput } from './knowledge.schema';

/** Baris dokumen yang dikirim ke UI (isi teks tidak ikut agar respons ringan). */
export interface DocumentRow {
  id: string;
  title: string;
  fileName: string | null;
  kind: string;
  category: string;
  sizeKb: number;
  pages: number | null;
  chunkCount: number;
  status: string;
  indexedAt: string | null;
  createdAt: string;
}

function toRow(document: {
  id: string;
  title: string;
  fileName: string | null;
  kind: string;
  category: string;
  sizeKb: number;
  pages: number | null;
  chunkCount: number;
  status: string;
  indexedAt: Date | null;
  createdAt: Date;
}): DocumentRow {
  return {
    id: document.id,
    title: document.title,
    fileName: document.fileName,
    kind: document.kind,
    category: document.category,
    sizeKb: document.sizeKb,
    pages: document.pages,
    chunkCount: document.chunkCount,
    status: document.status,
    indexedAt: document.indexedAt?.toISOString() ?? null,
    createdAt: document.createdAt.toISOString(),
  };
}

export async function listDocuments(workspaceId: string, query: ListDocumentsQuery) {
  const where = {
    workspaceId,
    ...(query.category ? { category: query.category } : {}),
    ...(query.status ? { status: query.status } : {}),
    ...(query.q
      ? {
          OR: [
            { title: { contains: query.q } },
            { fileName: { contains: query.q } },
            { content: { contains: query.q } },
          ],
        }
      : {}),
  };

  const [rows, total] = await Promise.all([
    prisma.knowledgeDocument.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (query.page - 1) * query.perPage,
      take: query.perPage,
    }),
    prisma.knowledgeDocument.count({ where }),
  ]);

  return { rows: rows.map(toRow), total };
}

export async function createDocument(workspaceId: string, input: CreateDocumentInput) {
  const chunkCount = chunkText(input.content).length;
  const document = await prisma.knowledgeDocument.create({
    data: {
      workspaceId,
      title: input.title,
      fileName: input.fileName ?? null,
      kind: input.kind,
      category: input.category,
      content: input.content,
      sizeKb: Math.max(1, Math.round(Buffer.byteLength(input.content, 'utf8') / 1024)),
      pages: input.pages ?? null,
      chunkCount,
      status: 'indexed',
      indexedAt: new Date(),
    },
  });
  return toRow(document);
}

export async function updateDocument(workspaceId: string, id: string, input: UpdateDocumentInput) {
  const existing = await prisma.knowledgeDocument.findFirst({ where: { id, workspaceId } });
  if (!existing) throw notFound('Dokumen tidak ditemukan');

  const document = await prisma.knowledgeDocument.update({
    where: { id },
    data: {
      ...input,
      ...(input.content
        ? {
            sizeKb: Math.max(1, Math.round(Buffer.byteLength(input.content, 'utf8') / 1024)),
            chunkCount: chunkText(input.content).length,
            indexedAt: new Date(),
            status: 'indexed' as const,
          }
        : {}),
    },
  });
  return toRow(document);
}

export async function deleteDocument(workspaceId: string, id: string) {
  const existing = await prisma.knowledgeDocument.findFirst({ where: { id, workspaceId } });
  if (!existing) throw notFound('Dokumen tidak ditemukan');
  await prisma.knowledgeDocument.delete({ where: { id } });
  return { id };
}

/** Ambil dokumen aktif untuk konteks retrieval. */
export async function getAnswerDocuments(workspaceId: string) {
  const documents = await prisma.knowledgeDocument.findMany({
    where: { workspaceId, status: 'indexed' },
    select: { id: true, title: true, category: true, content: true },
  });
  return documents;
}

export async function getKnowledgeStats(workspaceId: string) {
  const [total, indexed, categories, chunks] = await Promise.all([
    prisma.knowledgeDocument.count({ where: { workspaceId } }),
    prisma.knowledgeDocument.count({ where: { workspaceId, status: 'indexed' } }),
    prisma.knowledgeDocument.groupBy({ by: ['category'], where: { workspaceId }, _count: { _all: true } }),
    prisma.knowledgeDocument.aggregate({ where: { workspaceId }, _sum: { chunkCount: true } }),
  ]);

  return {
    total,
    indexed,
    chunks: chunks._sum.chunkCount ?? 0,
    categories: categories
      .map((row) => ({ label: row.category, value: row._count._all }))
      .sort((a, b) => b.value - a.value),
  };
}
