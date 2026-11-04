export const LINKS = {
  website: "https://halalbandung.com",
  bpjph: "https://halal.go.id",
  sihalal: "https://ptsp.halal.go.id",
  whatsapp: "https://wa.me/628112233445",
  email: "mailto:halo@halalbandung.com",
  demo: "#tanya",
};

export const CONTACT_INFO = {
  email: "halo@halalbandung.com",
  whatsappNumber: "+62 811-2233-445",
  officeAddress: "Sekretariat Komunitas Halal Bandung, Kota Bandung, Jawa Barat",
  operatingHours: "Asisten AI aktif 24 jam · Pendamping PPH: Senin–Jumat, 08.00–17.00 WIB",
};

export const NAV_LINKS = [
  { label: "Fitur", href: "#fitur" },
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Sumber", href: "#sumber" },
  { label: "Teknologi", href: "#teknologi" },
  { label: "FAQ", href: "#faq" },
];

export const STATS = [
  { value: "1.284+", label: "Percakapan" },
  { value: "847", label: "UMKM terbantu" },
  { value: "38", label: "Dokumen BPJPH" },
  { value: "96,4%", label: "Akurasi jawaban" },
  { value: "Gratis", label: "Untuk semua UMKM" },
];

export const MARQUEE_ITEMS = [
  "Sertifikasi Halal",
  "Self Declare Gratis",
  "38 Dokumen BPJPH",
  "1.284+ Percakapan",
  "847 UMKM Terbantu",
  "Respons < 2 Detik",
];

export const PROBLEMS = [
  {
    title: "Informasi halal tersebar dan tidak seragam",
    desc: "Penjelasan dari grup WhatsApp, media sosial, dan mesin pencari sering berbeda. UMKM akhirnya ragu dan menunda pengajuan sertifikasi.",
    tag: "Kebingungan informasi",
  },
  {
    title: "Alur self declare terasa rumit",
    desc: "Istilah teknis, daftar dokumen, dan tahapan BPJPH sulit dipahami pelaku usaha mikro yang baru pertama kali mengurus sertifikat halal.",
    tag: "Hambatan literasi",
  },
  {
    title: "Pertanyaan berulang membanjiri pendamping",
    desc: "Pendamping PPH menghabiskan waktu untuk pertanyaan dasar yang sama, sehingga pendampingan untuk berkas dan audit produk jadi berkurang.",
    tag: "Beban pendamping",
  },
];

export const FEATURES = [
  {
    id: "chat",
    title: "Chat Edukasi Halal 24 Jam",
    desc: "Tanya jawab interaktif seputar sertifikasi halal, self declare, dokumen, bahan kritis, dan alur BPJPH — dijawab dalam hitungan detik tanpa antre.",
  },
  {
    id: "knowledge",
    title: "Jawaban Bersumber Dokumen Resmi",
    desc: "Setiap jawaban diambil dari basis pengetahuan yang dikurasi dari UU Jaminan Produk Halal, regulasi BPJPH, dan panduan Komunitas Halal Bandung.",
  },
  {
    id: "self-declare",
    title: "Panduan Self Declare",
    desc: "Langkah demi langkah jalur self declare untuk usaha mikro dan kecil: syarat, dokumen, pendamping, sampai sertifikat terbit.",
  },
  {
    id: "documents",
    title: "Pemeriksaan Kelengkapan Dokumen",
    desc: "Checklist otomatis membantu memastikan NIB, daftar bahan, dan alur produksi sudah lengkap sebelum berkas diajukan ke BPJPH.",
  },
  {
    id: "handoff",
    title: "Eskalasi ke Pendamping PPH",
    desc: "Pertanyaan yang butuh verifikasi manusia diteruskan ke pendamping beserta ringkasan percakapan, tanpa perlu mengulang cerita dari awal.",
  },
  {
    id: "analytics",
    title: "Analitik Kebutuhan UMKM",
    desc: "Topik pertanyaan terbanyak, tingkat penyelesaian otomatis, dan tren kebutuhan edukasi tersaji dalam satu ringkasan untuk evaluasi program komunitas.",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Ajukan Pertanyaan",
    desc: "Ketik pertanyaan dengan bahasa sehari-hari — tidak perlu hafal istilah resmi atau nomor pasal.",
  },
  {
    step: 2,
    title: "AI Menelusuri Dokumen",
    desc: "Sistem mencari bagian paling relevan dari dokumen BPJPH dan panduan KHB yang tersimpan di basis pengetahuan.",
  },
  {
    step: 3,
    title: "Jawaban + Sumber",
    desc: "Jawaban disusun ringkas bersama rujukan dokumen dan halaman asalnya, sehingga bisa diperiksa sendiri.",
  },
  {
    step: 4,
    title: "Diteruskan ke Pendamping",
    desc: "Jika pertanyaan bersifat kasuistis atau butuh keputusan resmi, percakapan dialihkan ke Pendamping PPH.",
  },
];

export const KNOWLEDGE_DOCS = [
  { name: "Panduan Sertifikasi Halal untuk UMK", file: "Panduan_Sertifikasi_UMK.pdf", category: "Panduan", source: "BPJPH", pages: "48 hal." },
  { name: "UU No. 33 Tahun 2014 tentang Jaminan Produk Halal", file: "UU_Jaminan_Produk_Halal.pdf", category: "Regulasi", source: "JDIH BPK RI", pages: "32 hal." },
  { name: "FAQ Sertifikasi Halal Self Declare", file: "FAQ_Self_Declare.pdf", category: "FAQ", source: "KHB", pages: "18 hal." },
  { name: "Kriteria Sistem Jaminan Produk Halal", file: "Kriteria_SJPH.pdf", category: "Regulasi", source: "BPJPH", pages: "26 hal." },
  { name: "Checklist Persiapan Dokumen Halal", file: "Checklist_Dokumen.pdf", category: "Panduan", source: "KHB", pages: "9 hal." },
  { name: "Keputusan Kepala BPJPH No. 57 Tahun 2021", file: "Kepkaban_57_2021.pdf", category: "Regulasi", source: "BPJPH", pages: "21 hal." },
];

export const TECHNOLOGIES = [
  {
    title: "AI",
    subtitle: "Model Bahasa Indonesia",
    desc: "Memahami pertanyaan pelaku usaha dalam bahasa sehari-hari, termasuk singkatan, typo, dan istilah pasar — lalu menjawab dengan nada sopan dan solutif.",
  },
  {
    title: "RAG",
    subtitle: "Retrieval-Augmented Generation",
    desc: "Pencarian semantik yang memastikan jawaban diambil dari dokumen resmi yang terindeks, bukan karangan bebas model bahasa.",
  },
  {
    title: "JEV",
    subtitle: "Justified Execution & Verification",
    desc: "Lapisan verifikasi yang memeriksa kesesuaian jawaban dengan rujukan dokumen, menolak klaim tanpa dasar, dan mencatat jejak audit setiap respons.",
  },
];

export const ETHICS_POINTS = [
  {
    title: "Transparansi Sumber",
    desc: "Setiap jawaban mencantumkan dokumen rujukan dan halamannya. Pengguna dapat membuka kembali dokumen asli untuk memverifikasi sendiri.",
  },
  {
    title: "Privasi Data UMKM",
    desc: "Data percakapan dan dokumen usaha tidak diperjualbelikan. Akses dibatasi berbasis peran dan dienkripsi saat transit maupun penyimpanan.",
  },
  {
    title: "Batas Edukatif",
    desc: "Asisten bersifat edukatif, bukan penetapan fatwa atau keputusan resmi. Kasus khusus selalu diarahkan ke Pendamping PPH dan BPJPH.",
  },
];

export const FAQS = [
  {
    question: "Apakah platform ini benar-benar gratis?",
    answer:
      "Ya. KHB Asisten Halal gratis untuk seluruh pelaku UMKM. Tidak ada biaya tersembunyi dan tidak perlu kartu kredit. Program ini dijalankan sebagai bagian dari edukasi Komunitas Halal Bandung.",
  },
  {
    question: "Dari mana sumber jawaban asisten ini?",
    answer:
      "Jawaban diambil dari basis pengetahuan yang dikurasi dari dokumen resmi BPJPH, Undang-Undang Jaminan Produk Halal, serta panduan yang disusun tim Komunitas Halal Bandung. Setiap jawaban menampilkan dokumen rujukannya.",
  },
  {
    question: "Apakah jawaban AI bisa dijadikan acuan resmi?",
    answer:
      "Jawaban AI bersifat edukatif dan informatif. Untuk keputusan resmi, pengajuan sertifikasi, atau kasus produk yang kompleks, selalu rujuk ke BPJPH melalui SIHALAL atau konsultasikan dengan Pendamping PPH terdekat.",
  },
  {
    question: "Apa itu jalur self declare?",
    answer:
      "Self declare adalah skema sertifikasi halal gratis untuk usaha mikro dan kecil dengan produk berisiko rendah serta bahan yang sudah terpastikan kehalalannya. Pengajuan dilakukan melalui SIHALAL dan didampingi Pendamping PPH.",
  },
  {
    question: "Apakah data usaha saya aman?",
    answer:
      "Data percakapan disimpan terenkripsi dan hanya digunakan untuk meningkatkan kualitas jawaban. Kami tidak membagikan data usaha Anda kepada pihak ketiga tanpa izin.",
  },
  {
    question: "Bagaimana jika pertanyaan saya belum terjawab?",
    answer:
      "Asisten akan menawarkan eskalasi ke Pendamping PPH melalui WhatsApp beserta ringkasan pertanyaan Anda, sehingga Anda tidak perlu menjelaskan ulang dari awal.",
  },
];

export const CHAT_STARTERS = [
  "Cara daftar sertifikasi halal",
  "Apa itu self declare?",
  "Dokumen yang perlu disiapkan",
  "Biaya sertifikasi halal",
  "Cek status pengajuan",
];

export const CHAT_ANSWERS: {
  keywords: string[];
  answer: string;
  source: string;
  sourceDetail: string;
}[] = [
  {
    keywords: ["self declare", "self-declare", "selfdeclare", "jalur gratis", "usaha mikro"],
    answer:
      "Self declare adalah jalur sertifikasi halal gratis untuk usaha mikro dan kecil dengan produk berisiko rendah. Syaratnya: pelaku usaha mikro/kecil, produk tidak mengandung bahan berisiko, dan bahan yang dipakai sudah terpastikan kehalalannya. Pengajuan dilakukan lewat SIHALAL dan didampingi Pendamping PPH — bukan melalui asisten ini.",
    source: "FAQ_Self_Declare.pdf",
    sourceDetail: "Bagian 2 · Hal. 4",
  },
  {
    keywords: ["dokumen", "syarat", "berkas", "persiapan", "nib", "ktp"],
    answer:
      "Dokumen yang umumnya disiapkan: NIB, fotokopi KTP pelaku usaha, NPWP (jika ada), daftar produk beserta bahan yang digunakan, alur proses produksi, denah lokasi usaha, foto produk, dan surat pernyataan pelaku usaha. Untuk jalur self declare, berkas diperiksa Pendamping PPH sebelum diajukan.",
    source: "Checklist_Dokumen.pdf",
    sourceDetail: "Lampiran A · Hal. 3",
  },
  {
    keywords: ["biaya", "gratis", "bayar", "tarif", "harga", "pnbp"],
    answer:
      "Untuk usaha mikro dan kecil, sertifikasi halal jalur self declare tidak dikenakan biaya (PNBP Rp0) dan dibiayai program pemerintah. Jalur reguler untuk produk berisiko tinggi atau perusahaan menengah-besar dikenakan tarif sesuai ketentuan BPJPH.",
    source: "UU_Jaminan_Produk_Halal.pdf",
    sourceDetail: "Pasal 5 & Penjelasan",
  },
  {
    keywords: ["status", "cek", "pengajuan", "progres", "sihalal", "lacak"],
    answer:
      "Status pengajuan dapat dicek di SIHALAL (ptsp.halal.go.id). Masuk dengan akun pelaku usaha, buka menu Permohonan, lalu pilih nomor pengajuan Anda. Jika status berhenti di verifikasi berkas, hubungi Pendamping PPH yang mendampingi pengajuan tersebut.",
    source: "FAQ_Self_Declare.pdf",
    sourceDetail: "Bagian 5 · Hal. 11",
  },
  {
    keywords: ["lama", "berapa hari", "durasi", "waktu", "proses"],
    answer:
      "Untuk jalur self declare, proses verifikasi dan penetapan halal umumnya selesai sekitar 21 hari kerja setelah berkas dinyatakan lengkap. Waktu dapat lebih panjang jika ada perbaikan dokumen atau penjadwalan ulang pendampingan.",
    source: "Panduan_Sertifikasi_UMK.pdf",
    sourceDetail: "Bab 4 · Hal. 22",
  },
  {
    keywords: ["bahan", "gelatin", "alkohol", "enzim", "kritis", "haram"],
    answer:
      "Bahan yang perlu perhatian khusus antara lain turunan hewani (gelatin, rennet, enzim), alkohol pada perisa atau pelarut, serta bahan tambahan yang tidak jelas asalnya. Simpan bukti sertifikat halal bahan dari pemasok — dokumen ini biasanya diminta saat pemeriksaan.",
    source: "Kriteria_SJPH.pdf",
    sourceDetail: "Bab 3 · Hal. 14",
  },
  {
    keywords: ["daftar", "registrasi", "cara mengajukan", "mengurus", "sertifikasi halal", "sertifikat"],
    answer:
      "Alur umumnya: (1) buat akun pelaku usaha di SIHALAL, (2) pilih skema self declare atau reguler, (3) lengkapi data usaha dan daftar produk, (4) tunggu penugasan Pendamping PPH, (5) ikuti pendampingan dan pemeriksaan, lalu (6) sertifikat halal diterbitkan BPJPH secara elektronik.",
    source: "Panduan_Sertifikasi_UMK.pdf",
    sourceDetail: "Bab 2 · Hal. 9",
  },
  {
    keywords: ["pendamping", "pph", "konsultasi", "bantuan", "hubungi"],
    answer:
      "Pendamping Proses Produk Halal (PPH) adalah pihak yang membantu memeriksa kesiapan usaha Anda. Anda bisa meminta rekomendasi Pendamping PPH terdekat melalui Komunitas Halal Bandung, atau melihat daftar pendamping pada SIHALAL.",
    source: "Panduan_Sertifikasi_UMK.pdf",
    sourceDetail: "Bab 5 · Hal. 31",
  },
];

export const CHAT_FALLBACK = {
  answer:
    "Pertanyaan itu belum ada di basis pengetahuan saya. Supaya tidak salah informasi, saya teruskan ke Pendamping PPH Komunitas Halal Bandung agar dijawab langsung oleh petugas. Anda juga bisa menuliskan pertanyaan dengan kata kunci lain, misalnya “dokumen”, “biaya”, atau “self declare”.",
  source: "Eskalasi Pendamping PPH",
  sourceDetail: "Kanal WhatsApp KHB",
};

export const MOCKUP_CONVERSATIONS = [
  {
    id: "topik-1",
    topic: "Self declare",
    question: "Apa syarat ikut jalur self declare?",
    answer:
      "Self declare terbuka untuk usaha mikro dan kecil dengan produk berisiko rendah. Bahan yang dipakai harus sudah terpastikan kehalalannya, dan pengajuan dilakukan lewat SIHALAL bersama Pendamping PPH.",
    source: "Panduan_Sertifikasi_UMK.pdf",
    sourcePage: "Bab 2 · Hal. 9",
    time: "Baru saja",
  },
  {
    id: "topik-2",
    topic: "Dokumen",
    question: "Dokumen apa saja yang harus saya siapkan?",
    answer:
      "Siapkan NIB, KTP pelaku usaha, daftar produk dan bahan, alur produksi, denah lokasi, foto produk, serta surat pernyataan. Checklist lengkapnya ada di panduan KHB.",
    source: "Checklist_Dokumen.pdf",
    sourcePage: "Lampiran A · Hal. 3",
    time: "1 menit lalu",
  },
  {
    id: "topik-3",
    topic: "Biaya",
    question: "Apakah sertifikasi halal harus bayar?",
    answer:
      "Untuk UMK jalur self declare, biaya PNBP Rp0 atau gratis karena dibiayai program pemerintah. Jalur reguler dikenakan tarif sesuai ketentuan BPJPH.",
    source: "UU_Jaminan_Produk_Halal.pdf",
    sourcePage: "Pasal 5",
    time: "2 menit lalu",
  },
  {
    id: "topik-4",
    topic: "Status",
    question: "Bagaimana cara mengecek status pengajuan?",
    answer:
      "Buka SIHALAL di ptsp.halal.go.id, masuk dengan akun pelaku usaha, lalu pilih menu Permohonan untuk melihat tahapan berkas Anda saat ini.",
    source: "FAQ_Self_Declare.pdf",
    sourcePage: "Bagian 5 · Hal. 11",
    time: "3 menit lalu",
  },
];

export const HERO_DOCS = KNOWLEDGE_DOCS.slice(0, 3);

export const TRUST_AVATARS = [
  { initials: "RA", bg: "#bbf7d0", color: "#15803d" },
  { initials: "DP", bg: "#bfdbfe", color: "#1d4ed8" },
  { initials: "SW", bg: "#fecaca", color: "#b91c1c" },
  { initials: "FN", bg: "#ddd6fe", color: "#6d28d9" },
];

export const ANALYTICS_TOPICS = [
  { label: "Sertifikasi & self declare", pct: 88 },
  { label: "Kelengkapan dokumen", pct: 64 },
  { label: "Bahan kritis produk", pct: 46 },
];
