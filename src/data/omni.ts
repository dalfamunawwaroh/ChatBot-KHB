/* Data demo untuk halaman-halaman baru (turunan struktur AiOnesCare/omnicare) */

export interface Channel {
  id: string;
  platform: string;
  name: string;
  handle: string;
  status: 'Aktif' | 'Draf';
  lastSync: string;
  messages: number;
  tone: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  sku: string;
  status: 'Aktif' | 'Draf';
  halal: 'Tersertifikasi' | 'Proses' | 'Belum';
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Pendamping' | 'Agen';
  status: 'Aktif' | 'Menunggu' | 'Ditangguhkan';
  joined: string;
}

export interface Customer {
  id: string;
  name: string;
  business: string;
  city: string;
  chats: number;
  status: 'Aktif' | 'Baru';
  last: string;
}

export interface AuditEntry {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
  tone: 'green' | 'blue' | 'amber' | 'violet' | 'red' | 'slate';
}

export interface QueueItem {
  id: string;
  question: string;
  confidence: number;
  topic: string;
  time: string;
  status: 'Perlu tinjauan' | 'Siap kirim';
}

export interface InboxItem {
  id: string;
  name: string;
  channel: string;
  last: string;
  time: string;
  unread: number;
  status: 'Terbuka' | 'Selesai' | 'Eskalasi';
}

export interface Topic {
  label: string;
  value: number;
}

export interface OnboardingStep {
  title: string;
  desc: string;
  done: boolean;
}

export const channels: Channel[] = [
  { id: 'ch-1', platform: 'WhatsApp', name: 'WhatsApp KHB', handle: '+62 811-2233-445', status: 'Aktif', lastSync: '2 menit lalu', messages: 842, tone: 'green' },
  { id: 'ch-2', platform: 'Instagram', name: 'Instagram @komunitashalal', handle: '@komunitashalal', status: 'Aktif', lastSync: '11 menit lalu', messages: 316, tone: 'violet' },
  { id: 'ch-3', platform: 'Web Chat', name: 'Widget halalbandung.com', handle: 'halalbandung.com', status: 'Aktif', lastSync: 'Baru saja', messages: 208, tone: 'blue' },
  { id: 'ch-4', platform: 'Telegram', name: 'Bot Telegram KHB', handle: '@khb_halal_bot', status: 'Draf', lastSync: 'Belum terhubung', messages: 0, tone: 'slate' },
];

export const products: Product[] = [
  { id: 'pr-1', name: 'Kopi Arabika Preanger 200g', category: 'Minuman', price: 'Rp45.000', sku: 'KHB-KOP-01', status: 'Aktif', halal: 'Tersertifikasi' },
  { id: 'pr-2', name: 'Bumbu Rendang Rumahan', category: 'Bumbu', price: 'Rp28.000', sku: 'KHB-BMB-02', status: 'Aktif', halal: 'Tersertifikasi' },
  { id: 'pr-3', name: 'Keripik Pisang Cokelat', category: 'Makanan Ringan', price: 'Rp18.000', sku: 'KHB-KRP-03', status: 'Aktif', halal: 'Proses' },
  { id: 'pr-4', name: 'Madu Hutan Bandung 500ml', category: 'Madu', price: 'Rp95.000', sku: 'KHB-MDH-04', status: 'Draf', halal: 'Belum' },
  { id: 'pr-5', name: 'Sambal Cumi Kemasan', category: 'Bumbu', price: 'Rp32.000', sku: 'KHB-SMB-05', status: 'Aktif', halal: 'Tersertifikasi' },
];

export const team: TeamMember[] = [
  { id: 'tm-1', name: 'Admin KHB', email: 'admin@khb.or.id', role: 'Admin', status: 'Aktif', joined: '12 Jan 2025' },
  { id: 'tm-2', name: 'Rina Amelia', email: 'rina@khb.or.id', role: 'Pendamping', status: 'Aktif', joined: '3 Mar 2025' },
  { id: 'tm-3', name: 'Dimas Pratama', email: 'dimas@khb.or.id', role: 'Agen', status: 'Aktif', joined: '18 Apr 2025' },
  { id: 'tm-4', name: 'Siti Wulandari', email: 'siti@khb.or.id', role: 'Agen', status: 'Menunggu', joined: '2 Jun 2025' },
];

export const customers: Customer[] = [
  { id: 'cs-1', name: 'Rina Amelia', business: 'Kedai Kopi Barokah', city: 'Bandung', chats: 24, status: 'Aktif', last: 'Hari ini, 10:42' },
  { id: 'cs-2', name: 'Fajar Nugraha', business: 'Sambal Cumi Pak Fajar', city: 'Cimahi', chats: 18, status: 'Aktif', last: 'Hari ini, 09:31' },
  { id: 'cs-3', name: 'Nadia Putri', business: 'Madu Hutan Lestari', city: 'Bandung Barat', chats: 12, status: 'Aktif', last: 'Hari ini, 09:12' },
  { id: 'cs-4', name: 'Agus Setiawan', business: 'Keripik Kang Agus', city: 'Bandung', chats: 9, status: 'Baru', last: 'Kemarin, 16:20' },
  { id: 'cs-5', name: 'Wulan Sari', business: 'Dapur Wulan', city: 'Sumedang', chats: 6, status: 'Aktif', last: 'Kemarin, 14:05' },
];

export const auditLog: AuditEntry[] = [
  { id: 'a-1', actor: 'Admin KHB', action: 'Menambahkan dokumen', target: 'Panduan Sertifikasi Halal untuk UMK', time: 'Hari ini, 09:42', tone: 'green' },
  { id: 'a-2', actor: 'Rina Amelia', action: 'Menandai percakapan selesai', target: '#KHB-1284 · Fajar Nugraha', time: 'Hari ini, 09:20', tone: 'blue' },
  { id: 'a-3', actor: 'Sistem', action: 'Indeks ulang basis pengetahuan', target: '38 dokumen', time: 'Hari ini, 08:15', tone: 'slate' },
  { id: 'a-4', actor: 'Admin KHB', action: 'Mengubah pengaturan asisten', target: 'Nada jawaban → Ramah & ringkas', time: 'Kemarin, 17:02', tone: 'amber' },
  { id: 'a-5', actor: 'Dimas Pratama', action: 'Mengeskalasi percakapan', target: '#KHB-1279 · Wulan Sari', time: 'Kemarin, 15:48', tone: 'violet' },
  { id: 'a-6', actor: 'Admin KHB', action: 'Menghapus dokumen', target: 'Draf_Panduan_Lama.pdf', time: '2 hari lalu', tone: 'red' },
];

export const aiQueue: QueueItem[] = [
  { id: 'q-1', question: 'Apakah gelatin pada permen perlu sertifikat halal terpisah?', confidence: 62, topic: 'Bahan kritis', time: '2 menit lalu', status: 'Perlu tinjauan' },
  { id: 'q-2', question: 'Usaha katering rumahan apakah bisa self declare?', confidence: 88, topic: 'Self declare', time: '9 menit lalu', status: 'Siap kirim' },
  { id: 'q-3', question: 'Bagaimana jika NIB belum keluar?', confidence: 54, topic: 'Dokumen', time: '14 menit lalu', status: 'Perlu tinjauan' },
  { id: 'q-4', question: 'Berapa lama sertifikat halal berlaku?', confidence: 93, topic: 'Sertifikasi', time: '22 menit lalu', status: 'Siap kirim' },
];

export const csInbox: InboxItem[] = [
  { id: 'in-1', name: 'Rina Amelia', channel: 'WhatsApp', last: 'Baik, terima kasih infonya min 🙏', time: '10:42', unread: 0, status: 'Selesai' },
  { id: 'in-2', name: 'Fajar Nugraha', channel: 'Instagram', last: 'Kalau biaya self declare benar gratis?', time: '10:31', unread: 2, status: 'Terbuka' },
  { id: 'in-3', name: 'Wulan Sari', channel: 'WhatsApp', last: 'Produk saya mengandung gelatin, bagaimana?', time: '09:58', unread: 1, status: 'Eskalasi' },
  { id: 'in-4', name: 'Agus Setiawan', channel: 'Web Chat', last: 'Mau cek status pengajuan saya', time: '09:12', unread: 0, status: 'Terbuka' },
];

export const csTopics: Topic[] = [
  { label: 'Sertifikasi & self declare', value: 38 },
  { label: 'Kelengkapan dokumen', value: 26 },
  { label: 'Biaya & pembiayaan', value: 17 },
  { label: 'Bahan kritis', value: 12 },
  { label: 'Status pengajuan', value: 7 },
];

export const onboardingSteps: OnboardingStep[] = [
  { title: 'Lengkapi profil komunitas', desc: 'Nama organisasi, kontak, dan jam layanan.', done: true },
  { title: 'Hubungkan kanal percakapan', desc: 'WhatsApp, Instagram, atau widget website.', done: true },
  { title: 'Unggah dokumen rujukan', desc: 'Regulasi BPJPH dan panduan internal KHB.', done: true },
  { title: 'Atur nada jawaban asisten', desc: 'Bahasa, gaya jawaban, dan aturan eskalasi.', done: false },
  { title: 'Uji coba di widget', desc: 'Kirim pertanyaan contoh dan periksa rujukan.', done: false },
];
