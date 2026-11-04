# Pembagian Tugas Redesign — Dalfa & Esa (per halaman, CSS/JS bebas)

## Dalfa (7 halaman)
- `admin/views/index.html` — landing publik
- `admin/views/login.html` — masuk
- `admin/views/register.html` — daftar
- `admin/views/forgot.html` — lupa kata sandi
- `admin/views/reset.html` — reset kata sandi
- `admin/views/widget/chat.html` — chat embed
- `admin/views/integrasi.html` — halaman integrasi web

## Esa (7 halaman)
- `admin/views/dashboard.html` — ringkasan
- `admin/views/chat.html` — chat edukasi
- `admin/views/knowledge.html` — knowledge base
- `admin/views/history.html` — riwayat chat
- `admin/views/notifications.html` — notifikasi
- `admin/views/settings.html` — pengaturan
- `admin/views/edit-profile.html` — edit profil

## Bebas / shared (koordinasi seperlunya)
- `admin/views/assets/` — semua CSS & JS
- `admin/views/partials/` — sidebar, topbar, view-*.html
- `admin/views/widget/khb-chat.js`, `widget-app.js` — logic embed

## Aturan
1. Satu halaman = satu pemilik. Jangan edit halaman milik partner tanpa izin.
2. CSS/JS/partials/widget bebas disentuh dua-duanya.
3. Branch: `dalfa` dan `esa` dari `main`. Merge via PR.
