/* KHB data — contoh prototipe (ganti backend nanti) */
'use strict';

/* ══════════════════════════════════════════════
   KHB CHATBOT — APP.JS v2.0
   Full SPA: Auth + Dashboard + Chat + Knowledge + History + Notifications + Settings + Edit Profile
══════════════════════════════════════════════ */

/* ── DATA ── */
const documents = [
  {name:'Panduan Sertifikasi Halal untuk UMK',file:'Panduan_Sertifikasi_UMK.pdf',category:'Panduan',source:'BPJPH',updated:'Hari ini, 09:42',status:'Aktif',icon:'PDF',type:'pdf'},
  {name:'Undang-Undang No. 33 Tahun 2014',file:'UU_Jaminan_Produk_Halal.pdf',category:'Regulasi',source:'JDIH BPK RI',updated:'Kemarin, 14:20',status:'Aktif',icon:'PDF',type:'pdf'},
  {name:'FAQ Sertifikasi Halal Self Declare',file:'FAQ_Self_Declare.pdf',category:'FAQ',source:'KHB',updated:'24 Jun 2025',status:'Aktif',icon:'PDF',type:'pdf'},
  {name:'Kriteria Sistem Jaminan Produk Halal',file:'Kriteria_SJPH.pdf',category:'Regulasi',source:'BPJPH',updated:'22 Jun 2025',status:'Aktif',icon:'PDF',type:'pdf'},
  {name:'Checklist Persiapan Dokumen Halal',file:'Checklist_Dokumen.pdf',category:'Panduan',source:'KHB',updated:'20 Jun 2025',status:'Aktif',icon:'PDF',type:'pdf'},
  {name:'Keputusan Kepala BPJPH No. 57 Tahun 2021',file:'Kepkaban_57_2021.pdf',category:'Regulasi',source:'BPJPH',updated:'18 Jun 2025',status:'Proses',icon:'PDF',type:'pdf'}
];

const historyData = [
  {name:'Rina Amelia',initials:'RA',email:'rina.amelia@email.com',question:'Bagaimana cara daftar sertifikat halal untuk usaha makanan saya?',category:'Sertifikasi',time:'Hari ini, 10:42',status:'Terjawab',tone:'green'},
  {name:'Dimas Pratama',initials:'DP',email:'dimas.p@email.com',question:'Apa perbedaan self declare dan jalur reguler?',category:'Self declare',time:'Hari ini, 10:26',status:'Terjawab',tone:'blue'},
  {name:'Siti Wulandari',initials:'SW',email:'siti.wulandari@email.com',question:'Dokumen apa saja yang perlu saya siapkan?',category:'Dokumen',time:'Hari ini, 09:58',status:'Terjawab',tone:'peach'},
  {name:'Fajar Nugraha',initials:'FN',email:'fajar.n@email.com',question:'Apakah biaya sertifikat halal gratis untuk UMKM?',category:'Biaya',time:'Hari ini, 09:31',status:'Perlu tindak lanjut',tone:'blue'},
  {name:'Nadia Putri',initials:'NP',email:'nadia.putri@email.com',question:'Berapa lama proses sertifikasi halal berlangsung?',category:'Sertifikasi',time:'Hari ini, 09:12',status:'Terjawab',tone:'green'},
  {name:'Agus Setiawan',initials:'AS',email:'agus.s@email.com',question:'Bagaimana cara mengecek status pengajuan halal?',category:'Proses',time:'Hari ini, 08:45',status:'Terjawab',tone:'peach'}
];

const notifications = [
  {id:1, type:'chat', icon:'green', title:'Percakapan baru dari Rina Amelia', desc:'Bagaimana cara daftar sertifikat halal untuk usaha makanan saya?', time:'2 menit lalu', read:false},
  {id:2, type:'system', icon:'blue', title:'Knowledge base diperbarui', desc:'Dokumen "Panduan Sertifikasi Halal UMK" berhasil disinkronkan.', time:'1 jam lalu', read:false},
  {id:3, type:'system', icon:'orange', title:'Laporan mingguan tersedia', desc:'Ringkasan aktivitas chatbot minggu ini sudah bisa dilihat.', time:'3 jam lalu', read:false},
  {id:4, type:'chat', icon:'green', title:'Percakapan baru dari Dimas Pratama', desc:'Apa perbedaan self declare dan jalur reguler?', time:'Kemarin, 10:26', read:true},
  {id:5, type:'system', icon:'blue', title:'Sistem diperbarui ke v2.0', desc:'Antarmuka KHB Chatbot telah diperbarui dengan fitur baru.', time:'2 hari lalu', read:true},
  {id:6, type:'chat', icon:'green', title:'Percakapan baru dari Siti Wulandari', desc:'Dokumen apa saja yang perlu saya siapkan?', time:'3 hari lalu', read:true},
  {id:7, type:'system', icon:'red', title:'Percobaan login gagal terdeteksi', desc:'Ada 2 percobaan login gagal pada akun Anda dari IP tidak dikenal.', time:'5 hari lalu', read:true},
  {id:8, type:'system', icon:'orange', title:'Kuota storage 80% penuh', desc:'Pertimbangkan untuk menghapus dokumen yang tidak digunakan.', time:'1 minggu lalu', read:true}
];

/* ── USER STATE ── */
let currentUser = {
  firstName: 'Admin',
  lastName: 'KHB',
  email: 'admin@khb.or.id',
  phone: '+62 812-3456-7890',
  org: 'Komunitas Halal Bandung',
  bio: 'Administrator Komunitas Halal Bandung.',
  role: 'Administrator',
  initials: 'A',
};

/* ── VIEW LABELS ── */
const labels = {
  dashboard: 'Ringkasan',
  chat: 'Chat Edukasi',
  knowledge: 'Knowledge Base',
  history: 'Riwayat Chat',
  notifications: 'Notifikasi',
  integrasi: 'Integrasi Web',
  settings: 'Pengaturan',
  'edit-profile': 'Edit Profil'
};
