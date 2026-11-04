# KHB Backend — API Asisten Halal

Backend prototipe PKM Komunitas Halal Bandung.
Stack **sama persis** dengan AiOnesCare/omnicare: Node.js + Express 5 + TypeScript +
Prisma + **MySQL**, validasi Zod, logging pino, helmet, rate limit, dan pembagian
`modules/<nama>/{*.routes.ts, *.service.ts, *.schema.ts}`.

Bedanya: KHB satu komunitas (single workspace), tanpa tabel user/agen/CS, dan
**belum ada backend login** sesuai permintaan. Endpoint admin saat ini terbuka
untuk jaringan lokal pengembangan — tambahkan autentikasi sebelum dipublikasikan.

## Menjalankan

```bash
cd server
npm install
cp .env.example .env        # isi DATABASE_URL + LLM_*
npx prisma db push          # buat tabel di MySQL
npm run db:seed             # data contoh KHB + 6 dokumen rujukan
npm run dev                 # http://localhost:4000
```

Database default: `mysql://root@localhost:3306/khb_chatbot` (Laragon).
Buat dulu basis datanya:

```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS khb_chatbot CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

Frontend Vite sudah diproksi: `/api/*` → `http://localhost:4000`, jadi cukup
panggil `fetch('/api/v1/...')` dari React.

## Cara asisten menjawab (inti fitur)

Empat lapis, dicoba berurutan — hasilnya selalu menyebut sumbernya:

| Urutan | Jalur | Syarat | `source` | Keyakinan |
| --- | --- | --- | --- | --- |
| 1 | RAG eksternal | `RAG_CHAT_API_URL` + `RAG_CHAT_API_KEY` terisi | `rag` | 0.9 |
| 2 | Retrieval lokal + LLM | skor dokumen ≥ 0.32 | `rag` | ≥ 0.6 |
| 3 | Retrieval lokal (tanpa LLM) | skor ≥ 0.32, LLM mati | `rag` | skor dokumen |
| 4 | **Pengetahuan umum (LLM)** | `allowGeneralKnowledge` aktif + LLM terisi | `general` | 0.55 |
| 5 | Handoff | tidak ada dokumen cocok & LLM mati/dimatikan | `handoff` | 0 |

Lapis 4 inilah yang membuat asisten **tidak hanya menjawab dari RAG**: pertanyaan
umum (mis. "apa beda halal dan thayyib", "bagaimana tips kemasan produk") dijawab
dari pengetahuan model, ditandai `source: "general"` + catatan
"Jawaban umum di luar dokumen KHB" (`generalDisclaimer`, bisa dimatikan admin).

Aturan yang ditegakkan:
- Prompt memisahkan mode DOKUMEN dan mode UMUM (`src/modules/ai/prompt.ts`).
- Mode umum dilarang mengaku mengutip dokumen KHB atau mengarang nomor regulasi.
- Keluaran LLM dibersihkan dari markdown (`src/modules/ai/reply-style.ts`) agar
  cocok dengan tampilan chat teks polos.
- Semua giliran disimpan ke `conversations` + `messages` beserta `source`,
  `grounded`, `confidence`, dan `citations` sehingga panel admin bisa menampilkan
  dari mana jawaban berasal.

## Endpoint

Semua balasan sukses berbentuk `{ data, meta? }`; error `{ error: { code, message, requestId } }`.
Workspace dipilih lewat header opsional `X-Workspace-Slug` (default `khb-bandung`).

### Publik (dipakai landing page / widget)
| Method | Path | Keterangan |
| --- | --- | --- |
| GET | `/health` | Status server |
| GET | `/api/v1/chat/boot?slug=khb-bandung` | Nama asisten, sapaan, pertanyaan pemulai, kemampuan RAG/umum |
| POST | `/api/v1/chat` | Kirim pertanyaan → jawaban AI (`source`, `citations`, `confidence`) |
| GET | `/api/v1/chat/history?sessionKey=...` | Riwayat satu sesi widget |

Contoh:

```bash
curl -s -X POST http://localhost:4000/api/v1/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Apakah self declare gratis?","sessionKey":"abc"}'
```

### Panel admin
| Method | Path | Keterangan |
| --- | --- | --- |
| GET | `/api/v1/dashboard/summary` | Statistik, percakapan terbaru, grafik 7 hari, distribusi sumber jawaban |
| GET/PUT | `/api/v1/chatbot/settings` | Pengaturan asisten (termasuk `allowGeneralKnowledge`, `generalDisclaimer`) |
| GET | `/api/v1/knowledge` | Daftar dokumen (`q`, `category`, `status`, `page`, `perPage`) |
| GET | `/api/v1/knowledge/stats` | Jumlah dokumen, chunk, kategori |
| POST | `/api/v1/knowledge` | Tambah dokumen (judul, kategori, isi teks) |
| PATCH/DELETE | `/api/v1/knowledge/:id` | Ubah / hapus dokumen |
| GET/POST | `/api/v1/products` · `PATCH/DELETE /:id` | Katalog produk UMKM |
| GET/POST | `/api/v1/channels` · `PATCH/DELETE /:id` | Kanal percakapan |
| GET | `/api/v1/customers` | Daftar UMKM/pelanggan |
| GET | `/api/v1/conversations` | Riwayat percakapan (`q`, `status`, `source`) |
| GET/DELETE | `/api/v1/conversations/:id` | Detail (semua pesan) / hapus |
| GET | `/api/v1/notifications` | Notifikasi (`?unread=true`) |
| POST | `/api/v1/notifications/read-all` · `/:id/read` | Tandai sudah dibaca |
| GET/POST | `/api/v1/flows` · `PATCH/DELETE /:id` | Node alur percakapan (Flow Builder) |

## Struktur

```
server/
├── prisma/
│   ├── schema.prisma        # 10 model: workspace, settings, dokumen, produk, kanal,
│   │                        # pelanggan, percakapan, pesan, node alur, notifikasi
│   └── seed.ts              # data contoh + 6 dokumen rujukan halal
└── src/
    ├── app.ts               # helmet, cors, rate limit, pemasangan router
    ├── server.ts            # listen + graceful shutdown
    ├── config/              # env (Zod), prisma client
    ├── common/              # error handler, response helper, middleware, utils
    └── modules/
        ├── ai/              # retrieval, prompt, llm.client, rag.client, answer.service
        ├── chat/            # endpoint publik percakapan
        ├── chatbot/         # pengaturan asisten
        ├── knowledge/       # dokumen rujukan
        ├── products/ channels/ customers/ conversations/ notifications/ flows/
        └── dashboard/
```

## Variabel lingkungan

| Variabel | Wajib | Keterangan |
| --- | --- | --- |
| `DATABASE_URL` | ya | `mysql://user:pass@host:port/khb_chatbot` |
| `PORT` | tidak | default `4000` |
| `CORS_ORIGINS` | tidak | default `http://localhost:3100` |
| `LLM_API_URL`, `LLM_API_KEY`, `LLM_MODEL` | untuk jawaban AI | endpoint OpenAI-compatible (`/chat/completions`) |
| `RAG_CHAT_API_URL`, `RAG_CHAT_API_KEY`, `RAG_CHAT_KNOWLEDGE_BASE_ID` | tidak | bila kosong → retrieval lokal dari MySQL |

Tanpa `LLM_*`, asisten tetap menjawab dari dokumen (jawaban ekstraktif) dan
meneruskan pertanyaan lain ke pendamping.

## Catatan prototipe

- Retrieval lokal memakai pembobotan token + IDF, bukan vector DB. Cukup untuk
  puluhan dokumen; ganti ke `RAG_CHAT_API_URL` bila dokumen bertambah besar.
- Dokumen contoh ditulis ringkas dari regulasi publik (UU 33/2014, PP 39/2021,
  alur BPJPH) dan bukan pengganti dokumen resmi.
- Belum ada autentikasi, belum ada unggah PDF (kirim teks hasil ekstraksi ke
  `POST /api/v1/knowledge`).
