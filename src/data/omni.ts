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

export interface Customer {
  id: string;
  name: string;
  business: string;
  city: string;
  chats: number;
  status: 'Aktif' | 'Baru';
  last: string;
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

export const customers: Customer[] = [
  { id: 'cs-1', name: 'Rina Amelia', business: 'Kedai Kopi Barokah', city: 'Bandung', chats: 24, status: 'Aktif', last: 'Hari ini, 10:42' },
  { id: 'cs-2', name: 'Fajar Nugraha', business: 'Sambal Cumi Pak Fajar', city: 'Cimahi', chats: 18, status: 'Aktif', last: 'Hari ini, 09:31' },
  { id: 'cs-3', name: 'Nadia Putri', business: 'Madu Hutan Lestari', city: 'Bandung Barat', chats: 12, status: 'Aktif', last: 'Hari ini, 09:12' },
  { id: 'cs-4', name: 'Agus Setiawan', business: 'Keripik Kang Agus', city: 'Bandung', chats: 9, status: 'Baru', last: 'Kemarin, 16:20' },
  { id: 'cs-5', name: 'Wulan Sari', business: 'Dapur Wulan', city: 'Sumedang', chats: 6, status: 'Aktif', last: 'Kemarin, 14:05' },
];

export const onboardingSteps: OnboardingStep[] = [
  { title: 'Lengkapi profil komunitas', desc: 'Nama organisasi, kontak, dan jam layanan.', done: true },
  { title: 'Hubungkan kanal percakapan', desc: 'WhatsApp, Instagram, atau widget website.', done: true },
  { title: 'Unggah dokumen rujukan', desc: 'Regulasi BPJPH dan panduan internal KHB.', done: true },
  { title: 'Atur nada jawaban asisten', desc: 'Bahasa, gaya jawaban, dan aturan eskalasi.', done: false },
  { title: 'Uji coba di widget', desc: 'Kirim pertanyaan contoh dan periksa rujukan.', done: false },
];
