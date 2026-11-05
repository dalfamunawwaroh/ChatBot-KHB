/**
 * Klien API KHB.
 *
 * Semua permintaan memakai path relatif `/api/v1/...` — Vite sudah memproksi
 * ke backend Express di port 4000 (lihat vite.config.ts), jadi tidak ada URL
 * absolut yang perlu diubah saat deploy.
 *
 * Bentuk balasan backend: `{ data, meta? }`; error `{ error: { code, message } }`.
 */

const BASE = '/api/v1';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface Envelope<T> {
  data: T;
  meta?: unknown;
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${BASE}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init.headers ?? {}),
      },
    });
  } catch {
    throw new ApiError('Tidak dapat menghubungi server. Pastikan backend berjalan (npm run dev).', 0, 'NETWORK');
  }

  if (!response.ok) {
    let message = `Permintaan gagal (${response.status})`;
    let code = 'HTTP_ERROR';
    try {
      const body = (await response.json()) as { error?: { message?: string; code?: string } };
      message = body.error?.message ?? message;
      code = body.error?.code ?? code;
    } catch {
      // balasan bukan JSON — pakai pesan default
    }
    throw new ApiError(message, response.status, code);
  }

  if (response.status === 204) return undefined as T;

  const payload = (await response.json()) as Envelope<T> & T;
  return (payload as Envelope<T>).data ?? (payload as T);
}

/* ── Tipe balasan backend ─────────────────────────────────────── */

export interface DashboardSummary {
  stats: {
    channelsActive: number;
    channelsTotal: number;
    documents: number;
    documentsIndexed: number;
    conversations30d: number;
    messages30d: number;
    accuracy: number;
    products: number;
    productsCertified: number;
    customers: number;
  };
  assistant: { name: string; version: string; ragEnabled: boolean; generalEnabled: boolean };
  recent: Array<{
    id: string;
    customerName: string | null;
    status: string;
    lastMessageAt: string | null;
    lastAnswerSource: string | null;
    lastQuestion: string | null;
  }>;
  chart: Array<{ day: string; date: string; conversations: number }>;
  topics: Array<{ label: string; value: number }>;
}

export interface ChatbotSettings {
  assistantName: string;
  greeting: string;
  language: string;
  tone: string;
  fallbackMode: string;
  showSources: boolean;
  autoEscalate: boolean;
  requestContact: boolean;
  allowGeneralKnowledge: boolean;
  generalDisclaimer: boolean;
  model: string | null;
  temperature: number;
  capabilities: { llmConfigured: boolean; ragChatConfigured: boolean; canAnswerGeneral: boolean };
}

export interface DocumentRow {
  id: string;
  title: string;
  fileName: string | null;
  kind: 'pdf' | 'web' | 'text';
  category: string;
  sizeKb: number;
  pages: number | null;
  chunkCount: number;
  status: 'indexed' | 'processing' | 'failed';
  indexedAt: string | null;
  createdAt: string;
}

export interface KnowledgeStats {
  total: number;
  indexed: number;
  chunks: number;
  categories: Array<{ label: string; value: number }>;
}

export interface ProductRow {
  id: string;
  name: string;
  sku: string | null;
  category: string;
  price: string | null;
  halal: 'certified' | 'process' | 'none';
  description: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface ChannelRow {
  id: string;
  platform: 'whatsapp' | 'instagram' | 'web' | 'telegram';
  name: string;
  handle: string | null;
  status: 'draft' | 'active' | 'inactive' | 'error';
  lastSyncAt: string | null;
  messageCount: number;
  conversations: number;
}

export interface CustomerRow {
  id: string;
  name: string;
  business: string | null;
  city: string | null;
  chats: number;
  status: string;
  lastSeenAt: string | null;
}

export interface ConversationRow {
  id: string;
  customerName: string | null;
  channel: string | null;
  status: string;
  messageCount: number;
  lastMessageAt: string | null;
  createdAt: string;
  lastSource: 'rag' | 'general' | 'handoff' | 'none' | null;
}

export interface ConversationDetail {
  id: string;
  customerName: string | null;
  channel: string | null;
  status: string;
  createdAt: string;
  messages: Array<{
    id: string;
    senderType: 'customer' | 'bot' | 'agent' | 'system';
    text: string;
    source: 'rag' | 'general' | 'handoff' | 'none';
    grounded: boolean;
    confidence: number | null;
    citations: string[];
    createdAt: string;
  }>;
}

export interface NotificationRow {
  id: string;
  type: 'chat' | 'knowledge' | 'system' | 'channel';
  title: string;
  description: string;
  isRead: boolean;
  createdAt: string;
}

export interface FlowNodeRow {
  id: string;
  kind: 'greeting' | 'question' | 'answer' | 'escalation';
  title: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
}

export interface ChatAnswer {
  conversationId: string;
  sessionKey: string;
  answer: string;
  source: 'rag' | 'general' | 'handoff';
  grounded: boolean;
  citations: string[];
  confidence: number;
  note?: string;
  route: string;
  assistantName: string;
  createdAt: string;
}

export interface ChatBoot {
  workspace: { name: string; slug: string; city: string | null; tagline: string | null };
  assistant: { name: string; greeting: string; language: string; showSources: boolean };
  starters: string[];
  capabilities: { rag: boolean; general: boolean };
}

/* ── Endpoint per domain ──────────────────────────────────────── */

const query = (params: Record<string, string | number | undefined>): string => {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') search.set(key, String(value));
  }
  const result = search.toString();
  return result.length > 0 ? `?${result}` : '';
};

export const api = {
  dashboard: {
    summary: () => request<DashboardSummary>('/dashboard/summary'),
  },

  chatbot: {
    get: () => request<ChatbotSettings>('/chatbot/settings'),
    update: (patch: Partial<ChatbotSettings>) =>
      request<ChatbotSettings>('/chatbot/settings', { method: 'PUT', body: JSON.stringify(patch) }),
  },

  knowledge: {
    list: async (params: { q?: string; category?: string; page?: number; perPage?: number } = {}) => {
      const response = await fetch(`${BASE}/knowledge${query(params)}`);
      if (!response.ok) throw new ApiError('Gagal memuat dokumen', response.status, 'HTTP_ERROR');
      const payload = (await response.json()) as {
        data: DocumentRow[];
        meta: { page: number; perPage: number; total: number; totalPages: number };
      };
      return { rows: payload.data, total: payload.meta.total };
    },
    stats: () => request<KnowledgeStats>('/knowledge/stats'),
    create: (body: { title: string; category: string; content: string; kind?: string; pages?: number }) =>
      request<DocumentRow>('/knowledge', { method: 'POST', body: JSON.stringify(body) }),
    remove: (id: string) => request<{ id: string }>(`/knowledge/${id}`, { method: 'DELETE' }),
  },

  products: {
    list: async (params: { q?: string; halal?: string; page?: number; perPage?: number } = {}) => {
      const response = await fetch(`${BASE}/products${query(params)}`);
      if (!response.ok) throw new ApiError('Gagal memuat produk', response.status, 'HTTP_ERROR');
      const payload = (await response.json()) as {
        data: ProductRow[];
        meta: { total: number; counts: { certified: number; process: number; none: number } };
      };
      return { rows: payload.data, total: payload.meta.total, counts: payload.meta.counts };
    },
    create: (body: Partial<ProductRow>) =>
      request<ProductRow>('/products', { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: Partial<ProductRow>) =>
      request<ProductRow>(`/products/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    remove: (id: string) => request<{ id: string }>(`/products/${id}`, { method: 'DELETE' }),
  },

  channels: {
    list: () => request<ChannelRow[]>('/channels'),
    create: (body: { platform: string; name: string; handle?: string; status?: string }) =>
      request<ChannelRow>('/channels', { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: Partial<ChannelRow>) =>
      request<ChannelRow>(`/channels/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    remove: (id: string) => request<{ id: string }>(`/channels/${id}`, { method: 'DELETE' }),
  },

  customers: {
    list: async (params: { q?: string; status?: string; page?: number; perPage?: number } = {}) => {
      const response = await fetch(`${BASE}/customers${query(params)}`);
      if (!response.ok) throw new ApiError('Gagal memuat pelanggan', response.status, 'HTTP_ERROR');
      const payload = (await response.json()) as { data: CustomerRow[]; meta: { total: number } };
      return { rows: payload.data, total: payload.meta.total };
    },
  },

  conversations: {
    list: async (params: { q?: string; status?: string; source?: string; page?: number; perPage?: number } = {}) => {
      const response = await fetch(`${BASE}/conversations${query(params)}`);
      if (!response.ok) throw new ApiError('Gagal memuat percakapan', response.status, 'HTTP_ERROR');
      const payload = (await response.json()) as { data: ConversationRow[]; meta: { total: number } };
      return { rows: payload.data, total: payload.meta.total };
    },
    detail: (id: string) => request<ConversationDetail>(`/conversations/${id}`),
    remove: (id: string) => request<{ id: string }>(`/conversations/${id}`, { method: 'DELETE' }),
  },

  notifications: {
    list: (unreadOnly = false) =>
      request<{ rows: NotificationRow[]; unread: number }>(`/notifications${unreadOnly ? '?unread=true' : ''}`),
    markRead: (id: string) => request<{ id: string }>(`/notifications/${id}/read`, { method: 'POST' }),
    markAllRead: () => request<{ updated: number }>('/notifications/read-all', { method: 'POST' }),
    remove: (id: string) => request<{ id: string }>(`/notifications/${id}`, { method: 'DELETE' }),
  },

  flows: {
    list: () => request<FlowNodeRow[]>('/flows'),
    create: (body: { kind: string; title: string; description: string; sortOrder?: number }) =>
      request<FlowNodeRow>('/flows', { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: Partial<FlowNodeRow>) =>
      request<FlowNodeRow>(`/flows/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    remove: (id: string) => request<{ id: string }>(`/flows/${id}`, { method: 'DELETE' }),
  },

  chat: {
    boot: (slug = 'khb-bandung') => request<ChatBoot>(`/chat/boot?slug=${encodeURIComponent(slug)}`),
    send: (body: { message: string; sessionKey?: string; customerName?: string; slug?: string }) =>
      request<ChatAnswer>('/chat', { method: 'POST', body: JSON.stringify(body) }),
    history: (sessionKey: string, slug = 'khb-bandung') =>
      request<{ sessionKey: string; messages: Array<Record<string, unknown>> }>(
        `/chat/history?slug=${encodeURIComponent(slug)}&sessionKey=${encodeURIComponent(sessionKey)}`,
      ),
  },
};

/** Label siap pakai untuk nilai enum backend. */
export const SOURCE_LABEL: Record<string, string> = {
  rag: 'Dokumen KHB',
  general: 'Pengetahuan umum',
  handoff: 'Diteruskan',
  none: '—',
};

export const HALAL_LABEL: Record<ProductRow['halal'], string> = {
  certified: 'Tersertifikasi',
  process: 'Proses',
  none: 'Belum',
};

export const CHANNEL_STATUS_LABEL: Record<ChannelRow['status'], string> = {
  draft: 'Draf',
  active: 'Aktif',
  inactive: 'Nonaktif',
  error: 'Gangguan',
};
