# KHB — Asisten Edukasi Halal (Komunitas Halal Bandung)

Aplikasi untuk PKM: asisten edukasi halal berbasis AI untuk UMKM Bandung.
Terdiri dari **satu halaman publik** (konsep mengikuti AionesCare) dan **panel admin** terpisah
untuk mengelola percakapan, dokumen rujukan, dan pengaturan asisten.

## Stack (identik dengan AionesCare)

| Bagian | Teknologi |
| --- | --- |
| UI | React 19 + TypeScript 5.7 |
| Build | Vite 6 (`@vitejs/plugin-react` 4) |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` (tanpa `tailwind.config`) |
| Ikon | `lucide-react` |
| Routing | `react-router-dom` 7 (hanya untuk memisahkan `/` dan `/admin`) |
| Font | Plus Jakarta Sans + Inter (Google Fonts) |

Tidak ada backend — seluruh data adalah demo di sisi klien.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
npm run dev -- --port 3100   # kalau port 3000 sedang dipakai proyek lain
npm run build    # typecheck + build produksi ke dist/
npm run preview  # pratinjau hasil build
npm run lint     # tsc --noEmit
```

`vite.config.ts` memakai `strictPort`, jadi Vite berhenti dengan pesan jelas bila port 3000
sudah dipakai (tidak diam-diam pindah port dan membuka aplikasi lain).

Di Windows cukup klik dua kali `start-khb.bat`.

## Halaman & rute

| Rute | Isi |
| --- | --- |
| `/` | Landing publik (hero, fitur, cara kerja, sumber, teknologi, etika, FAQ, CTA, kontak) |
| `/admin` | Panel admin — Ringkasan (statistik, grafik, topik, percakapan terbaru) |
| `/admin/percakapan` | Riwayat percakapan + pencarian, filter status, panel detail |
| `/admin/knowledge` | Knowledge base: tambah, aktif/nonaktif, indeks ulang, hapus dokumen |
| `/admin/notifikasi` | Daftar notifikasi, tandai dibaca / semua dibaca |
| `/admin/pengaturan` | Profil pengelola, informasi komunitas, perilaku asisten |

Akses admin juga tersedia lewat tautan **“Panel admin”** di footer landing.
Belum ada autentikasi — `/admin` terbuka langsung karena ini prototipe PKM.

## Struktur

```
.
├── index.html                  # entri HTML + meta/OG + font
├── src/
│   ├── main.tsx                # bootstrap React + BrowserRouter
│   ├── App.tsx                 # definisi rute
│   ├── index.css               # Tailwind v4 @theme + utility (card, mesh, aurora, input)
│   ├── pages/
│   │   └── LandingPage.tsx     # komposisi halaman publik
│   ├── data/
│   │   ├── content.ts          # SEMUA teks landing + pasangan tanya-jawab chatbot
│   │   └── admin.ts            # data demo panel admin
│   ├── components/             # komponen landing (Navbar, Hero, Features, ChatDemo, ...)
│   └── admin/
│       ├── AdminLayout.tsx     # sidebar + topbar + footer admin
│       ├── AdminContext.tsx    # state notifikasi + toast
│       └── pages/              # Dashboard, Conversations, KnowledgeBase, Notifications, Settings
├── public/favicon.svg
├── metadata.json
└── start-khb.bat
```

## Mengubah konten

**Landing & chatbot** → `src/data/content.ts`:

```ts
export const CHAT_ANSWERS = [
  {
    keywords: ["kemasan", "packaging"],   // kata kunci huruf kecil
    answer: "Penjelasan singkat...",
    source: "Nama_Dokumen.pdf",
    sourceDetail: "Bab 1 · Hal. 3",
  },
];
```

`ChatDemo` memakai entri pertama yang kata kuncinya muncul; jika tidak ada, dipakai
`CHAT_FALLBACK` (eskalasi ke Pendamping PPH).

**Panel admin** → `src/data/admin.ts` (statistik, grafik, topik, percakapan, dokumen, notifikasi).

## Sebelum dipakai untuk presentasi PKM

Ganti placeholder di `src/data/content.ts`:

- `LINKS.whatsapp` — nomor WhatsApp asli (sekarang `628112233445`)
- `CONTACT_INFO.email`, `whatsappNumber`, `officeAddress`
- Angka pada `STATS` dan `MARQUEE_ITEMS` (1.284+, 847, 38, 96,4%)

## Catatan refactor

Versi lama (MPA `admin/views/*.html` + salinan React 18 dengan `react-router-dom` dan CSS per
halaman) sudah dihapus dari working tree. Isinya tetap dapat diambil dari riwayat git
(`git show 3a6e98d:client/src/App.jsx`, `git checkout 3a6e98d -- admin`), karena belum ada commit
baru setelah refactor.
