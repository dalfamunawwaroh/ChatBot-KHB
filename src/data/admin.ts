export interface AdminUser {
  name: string;
  role: string;
  email: string;
  phone: string;
  org: string;
  initials: string;
}

export const ADMIN_USER: AdminUser = {
  name: "Admin KHB",
  role: "Administrator",
  email: "admin@khb.or.id",
  phone: "+62 812-3456-7890",
  org: "Komunitas Halal Bandung",
  initials: "A",
};

export interface StatItem {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "flat";
  hint: string;
}

export const ADMIN_STATS: StatItem[] = [
  { id: "chats", label: "Percakapan bulan ini", value: "1.284", delta: "+12,4%", trend: "up", hint: "dibanding bulan lalu" },
  { id: "umkm", label: "UMKM terbantu", value: "847", delta: "+38", trend: "up", hint: "pendaftar baru" },
  { id: "docs", label: "Dokumen aktif", value: "38", delta: "6 baru", trend: "up", hint: "terindeks RAG" },
  { id: "accuracy", label: "Akurasi jawaban", value: "96,4%", delta: "−0,3%", trend: "down", hint: "rata-rata 30 hari" },
];

export interface ChartPoint {
  label: string;
  value: number;
}

export const CHAT_SERIES: ChartPoint[] = [
  { label: "1 Jun", value: 84 },
  { label: "3 Jun", value: 92 },
  { label: "5 Jun", value: 88 },
  { label: "7 Jun", value: 105 },
  { label: "9 Jun", value: 98 },
  { label: "11 Jun", value: 121 },
  { label: "13 Jun", value: 112 },
  { label: "15 Jun", value: 138 },
  { label: "17 Jun", value: 126 },
  { label: "19 Jun", value: 149 },
  { label: "21 Jun", value: 141 },
  { label: "23 Jun", value: 163 },
  { label: "25 Jun", value: 152 },
  { label: "27 Jun", value: 176 },
  { label: "29 Jun", value: 168 },
  { label: "30 Jun", value: 191 },
];

export interface TopicItem {
  label: string;
  count: number;
  pct: number;
}

export const TOP_TOPICS: TopicItem[] = [
  { label: "Sertifikasi & self declare", count: 486, pct: 38 },
  { label: "Kelengkapan dokumen", count: 332, pct: 26 },
  { label: "Biaya & pembiayaan", count: 218, pct: 17 },
  { label: "Bahan kritis produk", count: 152, pct: 12 },
  { label: "Status pengajuan", count: 96, pct: 7 },
];

export type ConversationStatus = "Terjawab" | "Perlu tindak lanjut";

export interface Conversation {
  id: string;
  name: string;
  initials: string;
  email: string;
  question: string;
  category: string;
  time: string;
  status: ConversationStatus;
}

export const CONVERSATIONS: Conversation[] = [
  {
    id: "c-1",
    name: "Rina Amelia",
    initials: "RA",
    email: "rina.amelia@email.com",
    question: "Bagaimana cara daftar sertifikat halal untuk usaha makanan saya?",
    category: "Sertifikasi",
    time: "Hari ini, 10:42",
    status: "Terjawab",
  },
  {
    id: "c-2",
    name: "Dimas Pratama",
    initials: "DP",
    email: "dimas.p@email.com",
    question: "Apa perbedaan self declare dan jalur reguler?",
    category: "Self declare",
    time: "Hari ini, 10:26",
    status: "Terjawab",
  },
  {
    id: "c-3",
    name: "Siti Wulandari",
    initials: "SW",
    email: "siti.wulandari@email.com",
    question: "Dokumen apa saja yang perlu saya siapkan?",
    category: "Dokumen",
    time: "Hari ini, 09:58",
    status: "Terjawab",
  },
  {
    id: "c-4",
    name: "Fajar Nugraha",
    initials: "FN",
    email: "fajar.n@email.com",
    question: "Apakah biaya sertifikat halal gratis untuk UMKM?",
    category: "Biaya",
    time: "Hari ini, 09:31",
    status: "Perlu tindak lanjut",
  },
  {
    id: "c-5",
    name: "Nadia Putri",
    initials: "NP",
    email: "nadia.putri@email.com",
    question: "Berapa lama proses sertifikasi halal berlangsung?",
    category: "Sertifikasi",
    time: "Hari ini, 09:12",
    status: "Terjawab",
  },
  {
    id: "c-6",
    name: "Agus Setiawan",
    initials: "AS",
    email: "agus.s@email.com",
    question: "Bagaimana cara mengecek status pengajuan halal?",
    category: "Proses",
    time: "Hari ini, 08:45",
    status: "Terjawab",
  },
  {
    id: "c-7",
    name: "Wulan Sari",
    initials: "WS",
    email: "wulan.sari@email.com",
    question: "Apakah gelatin pada permen perlu sertifikat halal terpisah?",
    category: "Bahan kritis",
    time: "Kemarin, 16:20",
    status: "Perlu tindak lanjut",
  },
  {
    id: "c-8",
    name: "Bayu Ramadhan",
    initials: "BR",
    email: "bayu.r@email.com",
    question: "Usaha katering rumahan apakah bisa self declare?",
    category: "Self declare",
    time: "Kemarin, 14:05",
    status: "Terjawab",
  },
];

export type DocumentStatus = "Aktif" | "Proses";

export interface KnowledgeDocument {
  id: string;
  name: string;
  file: string;
  category: "Panduan" | "Regulasi" | "FAQ";
  source: string;
  updated: string;
  status: DocumentStatus;
  pages: string;
}

export const ADMIN_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: "d-1",
    name: "Panduan Sertifikasi Halal untuk UMK",
    file: "Panduan_Sertifikasi_UMK.pdf",
    category: "Panduan",
    source: "BPJPH",
    updated: "Hari ini, 09:42",
    status: "Aktif",
    pages: "48 hal.",
  },
  {
    id: "d-2",
    name: "Undang-Undang No. 33 Tahun 2014",
    file: "UU_Jaminan_Produk_Halal.pdf",
    category: "Regulasi",
    source: "JDIH BPK RI",
    updated: "Kemarin, 14:20",
    status: "Aktif",
    pages: "32 hal.",
  },
  {
    id: "d-3",
    name: "FAQ Sertifikasi Halal Self Declare",
    file: "FAQ_Self_Declare.pdf",
    category: "FAQ",
    source: "KHB",
    updated: "24 Jun 2025",
    status: "Aktif",
    pages: "18 hal.",
  },
  {
    id: "d-4",
    name: "Kriteria Sistem Jaminan Produk Halal",
    file: "Kriteria_SJPH.pdf",
    category: "Regulasi",
    source: "BPJPH",
    updated: "22 Jun 2025",
    status: "Aktif",
    pages: "26 hal.",
  },
  {
    id: "d-5",
    name: "Checklist Persiapan Dokumen Halal",
    file: "Checklist_Dokumen.pdf",
    category: "Panduan",
    source: "KHB",
    updated: "20 Jun 2025",
    status: "Aktif",
    pages: "9 hal.",
  },
  {
    id: "d-6",
    name: "Keputusan Kepala BPJPH No. 57 Tahun 2021",
    file: "Kepkaban_57_2021.pdf",
    category: "Regulasi",
    source: "BPJPH",
    updated: "18 Jun 2025",
    status: "Proses",
    pages: "21 hal.",
  },
];

export interface AdminNotification {
  id: number;
  type: "chat" | "system";
  title: string;
  desc: string;
  time: string;
  read: boolean;
}

export const ADMIN_NOTIFICATIONS: AdminNotification[] = [
  {
    id: 1,
    type: "chat",
    title: "Percakapan baru dari Rina Amelia",
    desc: "Bagaimana cara daftar sertifikat halal untuk usaha makanan saya?",
    time: "2 menit lalu",
    read: false,
  },
  {
    id: 2,
    type: "system",
    title: "Knowledge base diperbarui",
    desc: 'Dokumen "Panduan Sertifikasi Halal UMK" berhasil disinkronkan.',
    time: "1 jam lalu",
    read: false,
  },
  {
    id: 3,
    type: "system",
    title: "Laporan mingguan tersedia",
    desc: "Ringkasan aktivitas chatbot minggu ini sudah bisa dilihat.",
    time: "3 jam lalu",
    read: false,
  },
  {
    id: 4,
    type: "chat",
    title: "Percakapan baru dari Dimas Pratama",
    desc: "Apa perbedaan self declare dan jalur reguler?",
    time: "Kemarin, 10:26",
    read: true,
  },
  {
    id: 5,
    type: "system",
    title: "Basis pengetahuan diperbarui",
    desc: "Dua dokumen regulasi BPJPH selesai diindeks ulang.",
    time: "2 hari lalu",
    read: true,
  },
  {
    id: 6,
    type: "chat",
    title: "Percakapan baru dari Siti Wulandari",
    desc: "Dokumen apa saja yang perlu saya siapkan?",
    time: "3 hari lalu",
    read: true,
  },
  {
    id: 7,
    type: "system",
    title: "Percobaan login gagal terdeteksi",
    desc: "Ada 2 percobaan login gagal pada akun Anda dari IP tidak dikenal.",
    time: "5 hari lalu",
    read: true,
  },
  {
    id: 8,
    type: "system",
    title: "Kuota penyimpanan 80% penuh",
    desc: "Pertimbangkan menghapus dokumen yang sudah tidak digunakan.",
    time: "1 minggu lalu",
    read: true,
  },
];
