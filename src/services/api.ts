const base = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface RequestOptions {
  mock?: unknown;
}

// Mock-first: backend belum ada, semua call resolve mock.
export async function req<T = unknown>(path: string, { mock = null }: RequestOptions = {}): Promise<T> {
  if (mock !== null) return mock as T;
  const response = await fetch(base + path);
  if (!response.ok) throw new Error('API ' + response.status);
  return (await response.json()) as T;
}
