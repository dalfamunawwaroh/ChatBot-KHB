export const cn = (...xs) => xs.filter(Boolean).join(' ');
export const escapeHtml = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// ponytail: ganti dengan clsx+tailwind-merge saat redesign Tailwind lands.
