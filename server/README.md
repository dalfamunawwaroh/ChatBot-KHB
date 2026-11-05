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

Sama seperti AiOnesCare/omnicare: **penjawab = layanan RAG**, **unggah dokumen = KMS**.

| Layanan | URL | Autentikasi | Isolasi |
| --- | --- | --- | --- |
| RAG (penjawab) | `https://rag.aiones.app` | `Authorization: Bearer RAG_CHAT_API_KEY` | `knowledge_base_id` |
| KMS (repositori dokumen) | `https://ragkms.aiones.app` | `X-API-Key: RAG_API_KEY` | `organizationId` |

Nilai yang dipakai proyek ini (sudah terisi di `server/.env`):

- Knowledge base KHB: **`kb_khb_halal_bandung_3cqm`**
- Project KMS: **`org-1793839982638`** (`KHB_HALAL_BANDUNG`) — dokumen yang diunggah
  lewat panel muncul di https://ragkms.aiones.app sekaligus terindeks ke KB di atas,
  jadi chatbot langsung bisa menjawabnya.

Urutan penjawaban:

| Urutan | Jalur | Syarat | `source` | Keyakinan |
| --- | --- | --- | --- | --- |
| 1 | **RAG eksternal** | RAG menjawab `grounded: true` | `rag` | 0.9 |
| 2 | Retrieval lokal + LLM | RAG tidak grounded, skor dokumen ≥ 0.32 | `rag` | ≥ 0.6 |
| 3 | Retrieval lokal ekstraktif | sama, LLM mati | `rag` | skor dokumen |
| 4 | **Pengetahuan umum (LLM)** | `allowGeneralKnowledge` aktif + LLM terisi | `general` | 0.55 |
| 5 | Handoff | tidak ada dokumen cocok & LLM mati/dimatikan | `handoff` | 0 |

Artinya: pertanyaan yang ada di dokumen dijawab oleh RAG beserta sitasi; pertanyaan
di luar dokumen dijawab LLM dan ditandai "pengetahuan umum". Bila layanan RAG gagal,
retrieval lokal MySQL tetap menjadi jaring pengaman (`src/modules/ai/retrieval.ts`).

### Alur unggah dokumen (KMS)

`POST /api/v1/knowledge` (atau seed) → `storeDocument()` di
`src/modules/rag-kms/rag.service.ts`:

1. `ensureRagTarget(workspaceId)` memastikan `organizationId` KMS + `knowledgeBaseId`
   tersimpan di tabel `workspaces` (project dibuat otomatis bila belum ada).
2. Teks dokumen dikirim sebagai berkas **`.txt`** ke `POST {KMS}/api/documents/upload`
   (multipart) — KMS yang mengekstrak, menyimpan di panel, dan mengindeks ke KB.
3. Bila KMS belum dikonfigurasi, unggahan langsung ke layanan RAG
   (`PUT {RAG}/api/v1/knowledge/:id`, `content_base64`).
4. `ragDocumentId` disimpan di `knowledge_documents`; hapus/reindex dokumen ikut
   menghapus di KMS/RAG.

`GET /api/v1/knowledge/rag` menampilkan KB aktif, project KMS, jalur unggahan, dan
status indeks setiap dokumen (dipakai panel Knowledge Base).

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
| GET | `/api/v1/knowledge/rag` | Knowledge base aktif, project KMS, status indeks tiap dokumen |
| POST | `/api/v1/knowledge/:id/reindex` | Unggah ulang dokumen ke RAG/KMS |
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
| `RAG_CHAT_API_URL`, `RAG_CHAT_API_KEY`, `RAG_CHAT_KNOWLEDGE_BASE_ID` | untuk RAG | penjawab chat (`https://rag.aiones.app`) + KB KHB |
| `RAG_API_URL`, `RAG_API_KEY`, `KMS_ORGANIZATION_ID` | untuk unggah | KMS repositori dokumen + project organisasi |
| `KMS_OWNER_EMAIL`, `KMS_OWNER_NAME`, `KMS_DOCUMENT_CATEGORY` | tidak | pemilik & kategori dokumen di panel KMS |

Tanpa `LLM_*`, asisten tetap menjawab dari dokumen (jawaban ekstraktif) dan
meneruskan pertanyaan lain ke pendamping.

## Catatan prototipe

- Penjawaban memakai layanan RAG sungguhan; retrieval lokal (token + IDF) hanya
  jaring pengaman bila RAG tidak tersedia.
- Isi dokumen dikirim ke KMS sebagai teks `.txt`. Jangan memberi nama `.pdf` untuk
  konten teks — KMS akan mencoba ekstraksi PDF dan status indeksnya `failed`.
- Dokumen contoh ditulis ringkas dari regulasi publik (UU 33/2014, PP 39/2021,
  alur BPJPH) dan bukan pengganti dokumen resmi.
- Belum ada autentikasi, belum ada unggah PDF (kirim teks hasil ekstraksi ke
  `POST /api/v1/knowledge`).
