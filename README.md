# KHB — Asisten Edukasi Halal (Komunitas Halal Bandung)

Aplikasi prototipe PKM: asisten edukasi halal berbasis AI untuk UMKM Bandung.
**Set halaman mengikuti AiOnesCare (omnicare)** — dashboard, chatbot, kanal, produk, knowledge,
tim, pelanggan, audit, customer service, auth — dengan **tampilan (desain) seperti sebelum refactor**:
sidebar navy, aksen hijau KHB, kartu putih, font Inter + Plus Jakarta Sans.

Seluruh kode ditulis **TypeScript (`.tsx` / `.ts`)**, tanpa file `.jsx`, dan `tsc --noEmit` bersih.

## Menjalankan

```bash
npm install
npm run dev                  # frontend + backend sekaligus
npm run dev -- --port 3100   # tentukan port frontend sendiri
npm run dev -- --api-port 4100
npm run dev:web              # frontend saja
npm run dev:api              # backend saja
npm run build                # build produksi ke dist/
npm run preview
npm run lint                 # tsc --noEmit
```

`vite.config.ts` memakai `strictPort` supaya Vite tidak diam-diam pindah port.
Di Windows cukup klik `start-khb.bat`.

## Halaman

### Publik
| Rute | Halaman |
| --- | --- |
| `/` | Landing (hero, statistik, fitur, cara kerja, FAQ, CTA, footer) |
| `/:slug` | Halaman publik organisasi (mis. `/khb-bandung`): pra-chat, chat, katalog produk |
| `/login` · `/register` · `/forgot` `/forgot-password` · `/reset` · `/change-password` | Autentikasi |
| `/widget` | Halaman widget chat |
| `/chat/:slug` | Pratinjau widget chat publik |
| `/embed/:slug` | Embed chat + panel riwayat (drawer di layar sempit) |
| `/syarat` · `/privasi` | Legal |

### Panel admin (`AppLayout`)
| Rute | Halaman |
| --- | --- |
| `/dashboard` | Ringkasan: 4 statistik, grafik, aktivitas terbaru |
| `/getting-started` | Panduan awal + checklist onboarding |
| `/chat` | Chat edukasi (asisten) |
| `/chatbot` | Pengaturan asisten: identitas, gaya jawaban, eskalasi |
| `/channels` · `/channels/new` · `/channels/:id/edit` | Kanal: daftar, hubungkan, edit |
| `/products` · `/products/new` · `/products/:id/edit` | Katalog produk UMKM |
| `/knowledge-base` | Dokumen rujukan (6 dokumen contoh) |
| `/knowledge` | Flow builder (kanvas node + editor) · `/flows` dialihkan ke sini |
| `/customers` | Data pelanggan/UMKM |
| `/integrasi` | Integrasi web (versi lama, tetap tersedia) |
| `/history` | Riwayat percakapan |
| `/notifications` | Notifikasi (dibuka dari lonceng di topbar) |
| `/settings` · `/edit-profile` | Pengaturan & profil (dibuka dari dropdown avatar) |

Aplikasi ini hanya punya satu peran: admin. Halaman tim (`/team`), CS (`/cs/*`), jejak audit (`/audit`), dan embed admin
(`/embed`) sudah dihapus — rute lamanya dialihkan ke `/dashboard`.

Rute tidak dikenal → halaman 404.

## Desain

Desain memakai kembali CSS sebelum refactor apa adanya:

```
src/assets/css/base.css     # token: navy #1E1B4B, green #16A34A, radius, shadow
src/assets/css/admin.css    # shell admin: sidebar, topbar, panel, tabel, chat
src/assets/css/auth.css     # login/register/reset
src/assets/css/landing.css  # landing publik
src/assets/css/embed.css    # widget embed
src/assets/css/extras.css   # utilitas tambahan untuk halaman baru (grid, badge, form, timeline)
```

Semua halaman baru memakai kelas yang sama (`panel`, `data-table`, `btn btn-primary`, `stat-card`,
`badge-pill`, `field`, `switch`) sehingga tampilannya menyatu dengan halaman lama.

### Aturan tampilan (jangan dilanggar saat menambah halaman)

1. Satu halaman = satu `<PageHead>` + beberapa `.panel`. Jangan membuat kartu di dalam kartu.
2. Angka ringkasan memakai `.stats-grid` + `.stat-card` (maksimal 4 per halaman).
3. Daftar panjang memakai `.panel` + `.history-toolbar` + `.data-table` + `.table-footer`.
4. Form memakai `.settings-field` / `.settings-input`, bukan kartu per field.
5. Baris ringkas (menu, aktivitas, panduan) memakai `.flat-list` + `.flat-row`, bukan deretan kartu.
6. `extras.css` hanya berisi utilitas yang belum ada di CSS lama; jangan menaruh komponen kartu baru di sana.
7. Jarak: `.view.active > * + *` = 20px, gap grid = 20px. Untuk panel bertumpuk di dalam kolom
   (bukan grid) bungkus dengan `.stack`.
8. `.panel` di CSS lama TIDAK punya padding (halaman lama menambah kelas sendiri seperti
   `.activity-panel`, `.card-clean`). Karena itu `<Panel>` dari PageKit selalu membungkus isi dengan
   `.panel-body` (padding 22px). Jangan menaruh isi langsung di dalam `.panel` tanpa `.panel-body`.

## Backend (server/)

Backend ada di `server/` dengan stack **sama seperti AiOnesCare/omnicare**:
Express 5 + TypeScript + Prisma + **MySQL**, Zod, pino, helmet, rate limit.
Login belum punya backend (sesuai permintaan); endpoint admin masih terbuka di
jaringan lokal.

```bash
npm run api:install          # install dependensi backend
mysql -u root -e "CREATE DATABASE IF NOT EXISTS khb_chatbot CHARACTER SET utf8mb4"
cp server/.env.example server/.env   # isi DATABASE_URL + LLM_*
npm run api:db:push          # buat tabel
npm run api:db:seed          # 6 dokumen rujukan + data contoh
npm run api:dev              # http://localhost:4000
```

Vite sudah memproksi `/api/*` ke `http://localhost:4000`, jadi React cukup
memanggil `fetch('/api/v1/...')`.

AI menjawab berlapis: **RAG eksternal → retrieval dokumen lokal → LLM umum
(pengetahuan di luar dokumen) → handoff**. Jawaban selalu membawa `source`
(`rag`/`general`/`handoff`), `citations`, dan `confidence`, dan mode umum bisa
dimatikan admin lewat `allowGeneralKnowledge`. Rincian endpoint + cara kerja:
`server/README.md`.

## Struktur

```
src/
├── App.tsx                 # seluruh rute
├── main.tsx                # bootstrap + import CSS
├── assets/css/             # desain lama + extras.css
├── components/
│   ├── AppLayout.tsx       # sidebar + topbar admin (drawer di mobile)
│   ├── CsLayout.tsx        # layout customer service
│   ├── Sidebar.tsx         # menu 4 grup (AI & Knowledge, Omnichannel, Workspace, KHB)
│   ├── Topbar.tsx          # breadcrumb, notifikasi, menu profil
│   ├── Toast.tsx
│   └── ui/PageKit.tsx      # PageHead, Panel, Field, Badge, Toggle, ikon SVG
├── data/
│   ├── khb.ts              # data landing, dokumen, riwayat, notifikasi, label
│   └── omni.ts             # data halaman baru (kanal, produk, tim, pelanggan, audit, CS)
└── pages/                  # 38 halaman (.tsx)
```

## Catatan prototipe

- Tidak ada backend: form, tombol simpan, dan filter bekerja di sisi klien (state React + toast).
- Belum ada autentikasi: semua rute admin terbuka langsung.
- Placeholder yang perlu diganti: nomor WhatsApp (`628112233445`), email, alamat, dan angka statistik.
- Folder `_arsip-desain-aionescare/` menyimpan versi desain aionescare-style sebelumnya (tidak dipakai
  build). Boleh dihapus jika tidak diperlukan.
- `tailwindcss` masih ada di `package.json` (sisa stack aionescare) tetapi tidak dipakai oleh desain ini.
