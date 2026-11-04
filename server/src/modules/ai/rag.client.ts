import { env, ragChatConfigured } from '../../config/env';
import { logger } from '../../common/utils/logger';
import { withRetry } from '../../common/utils/retry';

/**
 * Klien layanan RAG eksternal (kontrak sama dengan rag.aiones.app yang dipakai
 * AiOnesCare/omnicare):
 *   POST {RAG_CHAT_API_URL}/api/v1/query
 *   Authorization: Bearer <RAG_CHAT_API_KEY>
 *   { query, knowledge_base_id, history }
 *   → { data: { answer, grounded, sources, model } }
 *
 * Bila layanan ini tidak dikonfigurasi, sistem memakai retrieval lokal
 * (`retrieval.ts`) di atas tabel knowledge_documents.
 */
export class RagError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = 'RagError';
  }
}

export interface RagSource {
  document_id?: string;
  document_name?: string;
  page?: number | null;
}

export interface RagResponse {
  answer: string;
  grounded: boolean;
  sources: RagSource[];
  model?: string;
}

export function isRemoteRagEnabled(): boolean {
  return ragChatConfigured;
}

export function ragKnowledgeBaseId(fallback: string): string {
  return env.RAG_CHAT_KNOWLEDGE_BASE_ID || fallback;
}

export async function queryRemoteRag(params: {
  query: string;
  knowledgeBaseId: string;
  history: Array<{ role: 'user' | 'assistant'; content: string }>;
}): Promise<RagResponse> {
  if (!ragChatConfigured) throw new RagError('Layanan RAG belum dikonfigurasi', 503);

  const call = async (): Promise<RagResponse> => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 60_000);
    try {
      const response = await fetch(`${env.RAG_CHAT_API_URL}/api/v1/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.RAG_CHAT_API_KEY}`,
        },
        body: JSON.stringify({
          query: params.query,
          knowledge_base_id: params.knowledgeBaseId,
          history: params.history.slice(-6),
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const detail = await response.text().catch(() => '');
        throw new RagError(`Layanan RAG merespons ${response.status} ${detail.slice(0, 200)}`, response.status);
      }

      const payload = (await response.json()) as {
        data?: { answer?: string; grounded?: boolean; sources?: RagSource[]; model?: string };
      };
      const data = payload.data ?? {};
      return {
        answer: (data.answer ?? '').trim(),
        grounded: data.grounded === true,
        sources: data.sources ?? [],
        model: data.model,
      };
    } finally {
      clearTimeout(timer);
    }
  };

  return withRetry(call, {
    attempts: 2,
    delayMs: 1_000,
    isRetryable: (error) => (error instanceof RagError ? error.status >= 500 : true),
    onRetry: (error, attempt) =>
      logger.warn(
        { attempt, reason: error instanceof Error ? error.message : 'gagal' },
        'Layanan RAG gagal sementara — mencoba sekali lagi',
      ),
  });
}
