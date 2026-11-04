const base = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// Mock-first: backend belum ada, semua call resolve mock. ponytail: ganti fetch nyata saat API lands.
export async function req(path, { mock = null } = {}) {
  if (mock !== null) return mock;
  const r = await fetch(base + path);
  if (!r.ok) throw new Error('API ' + r.status);
  return r.json();
}
