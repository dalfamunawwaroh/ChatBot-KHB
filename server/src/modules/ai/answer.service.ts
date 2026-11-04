import { logger } from '../../common/utils/logger';
import { GENERAL_DISCLAIMER, buildGeneralPrompt, buildGroundedPrompt } from './prompt';
import { askLlm, isLlmEnabled } from './llm.client';
import { isRemoteRagEnabled, queryRemoteRag, ragKnowledgeBaseId } from './rag.client';
import { GROUNDED_THRESHOLD, retrieveLocally, toCitations, type RetrievedChunk } from './retrieval';
import { sanitizeAnswer } from './reply-style';

export type AnswerSource = 'rag' | 'general' | 'handoff';

export interface AnswerSettings {
  assistantName: string;
  tone: string;
  fallbackMode: string;
  allowGeneralKnowledge: boolean;
  generalDisclaimer: boolean;
  temperature: number;
  model: string | null;
}

export interface AnswerDocument {
  id: string;
  title: string;
  category: string;
  content: string;
}

export interface AnswerContext {
  settings: AnswerSettings;
  workspaceSlug: string;
  question: string;
  history: Array<{ role: 'user' | 'assistant'; content: string }>;
  documents: AnswerDocument[];
}

export interface AnswerResult {
  answer: string;
  source: AnswerSource;
  grounded: boolean;
  citations: string[];
  confidence: number;
  /** Catatan tambahan untuk UI (mis. penanda "jawaban umum"). */
  note?: string;
  /** Jalur yang dipakai: 'remote-rag' | 'local-rag' | 'general' | 'handoff'. */
  route: 'remote-rag' | 'local-rag' | 'general' | 'handoff';
}

const HANDOFF_MESSAGE =
  'Pertanyaan ini belum bisa saya jawab dari dokumen yang ada. Saya teruskan ke Pendamping PPH KHB supaya dibantu langsung ya.';

/** Rangkai beberapa chunk menjadi jawaban ekstraktif saat LLM tidak tersedia. */
function extractiveAnswer(chunks: RetrievedChunk[]): string {
  const top = chunks[0];
  if (!top) return HANDOFF_MESSAGE;
  const sentences = top.text.split(/(?<=[.!?])\s+/).slice(0, 4).join(' ');
  return sentences.length > 0 ? sentences : top.text.slice(0, 600);
}

/**
 * Inti logika penjawaban asisten halal KHB.
 *
 * Urutan percobaan:
 * 1. Layanan RAG eksternal (bila dikonfigurasi) → jawaban grounded.
 * 2. Retrieval lokal atas dokumen KHB → bila skor di atas ambang, jawab dari
 *    dokumen (LLM merangkai, atau ekstraktif bila LLM mati).
 * 3. Mode UMUM: LLM menjawab dengan pengetahuannya sendiri + penanda jelas
 *    bahwa ini bukan dari dokumen KHB.
 * 4. Handoff: tidak ada dokumen cocok & LLM mati/dimatikan admin.
 */
export async function answerQuestion(context: AnswerContext): Promise<AnswerResult> {
  const { settings, question, history, documents, workspaceSlug } = context;

  // 1) Layanan RAG eksternal.
  if (isRemoteRagEnabled()) {
    try {
      const remote = await queryRemoteRag({
        query: question,
        knowledgeBaseId: ragKnowledgeBaseId(workspaceSlug),
        history,
      });
      if (remote.grounded && remote.answer.length > 0) {
        const citations = remote.sources
          .map((source) =>
            source.document_name
              ? source.page != null
                ? `${source.document_name} hlm. ${source.page}`
                : source.document_name
              : (source.document_id ?? ''),
          )
          .filter((label) => label.length > 0)
          .slice(0, 4);
        return {
          answer: remote.answer,
          source: 'rag',
          grounded: true,
          citations,
          confidence: 0.9,
          route: 'remote-rag',
        };
      }
      logger.info({ question, grounded: remote.grounded }, 'RAG eksternal tidak menemukan jawaban — lanjut retrieval lokal');
    } catch (error) {
      logger.warn(
        { err: error instanceof Error ? error.message : error },
        'Layanan RAG eksternal gagal — memakai retrieval lokal',
      );
    }
  }

  // 2) Retrieval lokal.
  const retrieval = retrieveLocally(question, documents);
  const grounded = retrieval.topScore >= GROUNDED_THRESHOLD;

  if (grounded && isLlmEnabled()) {
    try {
      const prompt = buildGroundedPrompt({
        assistantName: settings.assistantName,
        tone: settings.tone,
        question,
        chunks: retrieval.chunks.slice(0, 3),
        history,
      });
      const result = await askLlm({
        system: prompt.system,
        user: prompt.user,
        temperature: Math.min(settings.temperature, 0.4),
      });
      return {
        answer: sanitizeAnswer(result.text),
        source: 'rag',
        grounded: true,
        citations: toCitations(retrieval.chunks),
        confidence: Math.max(0.6, Number(retrieval.topScore.toFixed(2))),
        route: 'local-rag',
      };
    } catch (error) {
      logger.warn(
        { err: error instanceof Error ? error.message : error },
        'LLM gagal merangkai jawaban dokumen — memakai jawaban ekstraktif',
      );
    }
  }

  if (grounded) {
    return {
      answer: extractiveAnswer(retrieval.chunks),
      source: 'rag',
      grounded: true,
      citations: toCitations(retrieval.chunks),
      confidence: Number(retrieval.topScore.toFixed(2)),
      route: 'local-rag',
    };
  }

  // 3) Mode umum — inilah yang membuat asisten tidak "mati" di luar dokumen.
  if (settings.allowGeneralKnowledge && isLlmEnabled()) {
    try {
      const prompt = buildGeneralPrompt({
        assistantName: settings.assistantName,
        tone: settings.tone,
        question,
        history,
        knownTopics: documents.map((doc) => doc.title),
      });
      const result = await askLlm({
        system: prompt.system,
        user: prompt.user,
        temperature: settings.temperature,
      });
      const clean = sanitizeAnswer(result.text);
      const withDisclaimer = settings.generalDisclaimer
        ? `${clean}\n\n${GENERAL_DISCLAIMER}`
        : clean;
      return {
        answer: withDisclaimer,
        source: 'general',
        grounded: false,
        citations: [],
        confidence: 0.55,
        note: settings.generalDisclaimer ? 'Jawaban umum di luar dokumen KHB' : undefined,
        route: 'general',
      };
    } catch (error) {
      logger.error(
        { err: error instanceof Error ? error.message : error },
        'LLM mode umum gagal — meneruskan ke pendamping',
      );
    }
  }

  // 4) Handoff.
  return {
    answer: HANDOFF_MESSAGE,
    source: 'handoff',
    grounded: false,
    citations: [],
    confidence: 0,
    note: settings.fallbackMode,
    route: 'handoff',
  };
}
