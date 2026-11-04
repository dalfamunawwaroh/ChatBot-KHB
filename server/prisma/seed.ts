/**
 * Seed data prototipe KHB (Komunitas Halal Bandung).
 *
 * Semua data di sini adalah contoh untuk demo PKM: dokumen rujukan ditulis
 * ringkas dari regulasi publik (UU 33/2014, PP 39/2021, alur BPJPH) dan TIDAK
 * menggantikan dokumen resmi. Jalankan: npm run db:seed
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const WORKSPACE_SLUG = 'khb-bandung';

const DOCUMENTS = [
  {
    title: 'Panduan Self Declare untuk Usaha Mikro dan Kecil',
    fileName: 'Panduan_Self_Declare.pdf',
    kind: 'pdf' as const,
    category: 'Self Declare',
    pages: 12,
    content: `Self declare (pernyataan pelaku usaha) adalah jalur sertifikasi halal yang disediakan pemerintah untuk usaha mikro dan kecil. Pelaku usaha mengajukan sertifikasi halal secara mandiri melalui sistem SIHALAL yang dikelola BPJPH, tanpa harus melalui jalur reguler yang lebih panjang.

Syarat utama self declare: produk tidak mengandung bahan yang berasal dari hewan yang diharamkan, bahan tersebut bukan bahan berbahaya, proses produksinya sederhana, dan usaha memiliki Nomor Induk Berusaha (NIB). Pelaku usaha juga wajib memiliki pendamping proses produk halal (P3H) yang mendampingi pengajuan.

Alur self declare: (1) pelaku usaha mendaftar akun SIHALAL, (2) mengisi data usaha dan produk, (3) memilih pendamping, (4) mengunggah dokumen usaha, (5) pemeriksaan oleh LPH, (6) penetapan halal oleh BPJPH, (7) sertifikat halal diterbitkan dan dapat diunduh di SIHALAL.

Untuk usaha mikro dan kecil, program self declare umumnya tidak dipungut biaya sertifikasi karena ditanggung melalui program pemerintah. Biaya yang mungkin timbul adalah biaya pendampingan sukarela atau pengujian laboratorium bila diminta.

Sertifikat halal berlaku selama 4 tahun sejak diterbitkan dan wajib diperpanjang sebelum masa berlakunya habis. Perpanjangan diajukan melalui SIHALAL dengan melampirkan dokumen terbaru.`,
  },
  {
    title: 'Dokumen yang Dibutuhkan Saat Mengajukan Sertifikasi Halal',
    fileName: 'Checklist_Dokumen_Sertifikasi_Halal.pdf',
    kind: 'pdf' as const,
    category: 'Dokumen',
    pages: 8,
    content: `Dokumen usaha yang perlu disiapkan: Nomor Induk Berusaha (NIB) yang masih berlaku, KTP pemilik usaha, dan surat keterangan domisili usaha bila diminta.

Dokumen produk: daftar produk beserta komposisi bahan, nama pemasok bahan baku, dan alur proses produksi sederhana. Untuk produk makanan olahan, sertakan foto kemasan dan label produk.

Dokumen pendukung lain: surat pernyataan pelaku usaha bahwa bahan yang digunakan tidak mengandung unsur haram dan tidak tercemar bahan haram, daftar alat produksi yang dipakai, serta bukti kepemilikan tempat produksi atau surat sewa.

Bila bahan baku berasal dari pemasok lain, sertakan sertifikat halal pemasok atau surat pernyataan pemasok. Untuk bahan yang tergolong kritis (misalnya gelatin, enzim, perisa, pengemulsi), LPH dapat meminta dokumen tambahan atau pengujian laboratorium.`,
  },
  {
    title: 'Bahan Kritis dalam Sertifikasi Halal',
    fileName: 'Panduan_Bahan_Kritis.pdf',
    kind: 'pdf' as const,
    category: 'Bahan Kritis',
    pages: 10,
    content: `Bahan kritis adalah bahan yang asal-usulnya perlu ditelusuri karena berpotensi berasal dari hewan atau proses yang tidak halal. Contoh yang sering muncul pada produk UMKM: gelatin (dari kulit/tulang hewan), enzim (sering dipakai pada keju dan roti), mono dan digliserida (pengemulsi), perisa dan pewarna tertentu, serta shortening dan lemak hewani.

Untuk bahan kritis, sertifikasi halal membutuhkan bukti asal bahan. Bila bahan berasal dari pemasok bersertifikat halal, cukup melampirkan sertifikat pemasok. Bila tidak, perlu surat pernyataan pemasok dan bisa berlanjut ke pengujian laboratorium.

Bahan nabati umumnya tidak menjadi masalah, tetapi tetap perlu memastikan tidak ada kontaminasi silang dengan bahan haram pada proses produksi, misalnya penggunaan minyak goreng yang sama untuk produk non-halal atau alat yang dipakai bergantian.

Praktik yang disarankan: pisahkan alat dan area produksi untuk bahan haram, catat pemasok setiap bahan, dan simpan bukti pembelian agar mudah ditelusuri saat audit LPH.`,
  },
  {
    title: 'Alur Sertifikasi Halal Reguler Melalui BPJPH',
    fileName: 'Alur_Sertifikasi_Reguler.pdf',
    kind: 'pdf' as const,
    category: 'Sertifikasi',
    pages: 9,
    content: `Sertifikasi halal diselenggarakan BPJPH (Badan Penyelenggara Jaminan Produk Halal) bersama LPH (Lembaga Pemeriksa Halal) dan MUI sebagai penetap fatwa. Dasar hukumnya Undang-Undang Nomor 33 Tahun 2014 tentang Jaminan Produk Halal dan Peraturan Pemerintah Nomor 39 Tahun 2021.

Alur reguler: pelaku usaha mengajukan permohonan melalui SIHALAL, BPJPH memeriksa kelengkapan dokumen, LPH melakukan audit dan pemeriksaan kehalalan produk di lokasi produksi, hasil pemeriksaan disidangkan untuk fatwa, lalu BPJPH menetapkan status halal dan menerbitkan sertifikat.

Waktu proses bergantung pada kelengkapan dokumen dan hasil audit LPH. Bila dokumen kurang, pengajuan dikembalikan untuk dilengkapi sehingga prosesnya lebih lama.

Pelaku usaha dapat memantau status pengajuan melalui akun SIHALAL. Sertifikat halal yang sudah terbit dapat diunduh dan dicantumkan pada label produk dengan logo halal Indonesia.`,
  },
  {
    title: 'Kewajiban Sertifikasi Halal bagi Produk Makanan dan Minuman',
    fileName: 'Kewajiban_Sertifikasi_Halal.pdf',
    kind: 'pdf' as const,
    category: 'Sertifikasi',
    pages: 6,
    content: `Undang-Undang Jaminan Produk Halal mewajibkan produk yang masuk, beredar, dan diperdagangkan di Indonesia memiliki sertifikat halal. Kewajiban ini berlaku bertahap, dimulai dari produk makanan dan minuman, lalu kosmetik, obat, barang gunaan, dan jasa penyajian.

Produk yang berasal dari bahan yang diharamkan tetap tidak dapat disertifikasi halal. Yang disertifikasi adalah produk dan proses produksinya, termasuk bahan, alat, dan tempat produksi.

Bagi UMKM, pemerintah menyediakan jalur self declare agar biaya dan proses lebih ringan. Namun kewajiban memiliki sertifikat tetap berlaku, dan pelaku usaha yang belum bersertifikat berisiko mendapat teguran hingga penarikan produk.

Logo halal hanya boleh dicantumkan setelah sertifikat terbit. Mencantumkan logo halal tanpa sertifikat merupakan pelanggaran.`,
  },
  {
    title: 'Pertanyaan Umum Seputar Sertifikasi Halal UMKM',
    fileName: 'FAQ_UMKM_Halal.pdf',
    kind: 'pdf' as const,
    category: 'FAQ',
    pages: 7,
    content: `Apakah self declare gratis? Untuk usaha mikro dan kecil, program self declare umumnya digratiskan melalui program pemerintah. Pastikan ke BPJPH atau pendamping karena skema program dapat berubah.

Berapa lama sertifikat halal berlaku? Sertifikat berlaku 4 tahun dan dapat diperpanjang sebelum masa berlaku habis.

Apakah usaha rumahan bisa mengajukan? Bisa, selama memiliki NIB dan memenuhi syarat self declare. Tempat produksi rumahan diperiksa sebagai bagian dari audit.

Apakah produk yang sudah bersertifikat perlu diajukan ulang bila resep berubah? Ya. Perubahan komposisi atau pemasok bahan wajib dilaporkan dan dapat memerlukan pembaruan sertifikasi.

Bagaimana bila NIB belum terbit? NIB merupakan syarat utama pengajuan. Selesaikan NIB melalui sistem OSS terlebih dahulu, baru ajukan sertifikasi halal.

Apakah perlu uji laboratorium? Tidak selalu. Uji laboratorium dilakukan bila ada bahan kritis yang asal-usulnya belum terbukti dari dokumen.`,
  },
];

async function main() {
  console.log('◇ Membersihkan data seed lama…');
  await prisma.workspace.deleteMany({ where: { slug: WORKSPACE_SLUG } });

  console.log('◇ Membuat workspace + pengaturan asisten…');
  const workspace = await prisma.workspace.create({
    data: {
      name: 'Komunitas Halal Bandung',
      slug: WORKSPACE_SLUG,
      city: 'Bandung',
      tagline: 'Asisten edukasi halal untuk UMKM Bandung',
      settings: {
        create: {
          assistantName: 'Asisten Halal KHB',
          greeting:
            "Assalamu'alaikum! Saya Asisten Halal KHB. Tanya apa saja soal sertifikasi halal — saya jawab dari dokumen KHB, dan untuk pertanyaan umum saya bantu dari pengetahuan umum (dengan penanda).",
          language: 'Bahasa Indonesia',
          tone: 'Ramah & ringkas',
          fallbackMode: 'Eskalasi ke Pendamping PPH',
          showSources: true,
          autoEscalate: true,
          requestContact: false,
          allowGeneralKnowledge: true,
          generalDisclaimer: true,
          temperature: 0.3,
        },
      },
    },
  });

  console.log('◇ Menanam dokumen rujukan…');
  for (const doc of DOCUMENTS) {
    await prisma.knowledgeDocument.create({
      data: {
        workspaceId: workspace.id,
        title: doc.title,
        fileName: doc.fileName,
        kind: doc.kind,
        category: doc.category,
        content: doc.content,
        pages: doc.pages,
        sizeKb: Math.max(1, Math.round(Buffer.byteLength(doc.content, 'utf8') / 1024)),
        chunkCount: Math.max(1, Math.ceil(doc.content.length / 1_200)),
        status: 'indexed',
        indexedAt: new Date(),
      },
    });
  }

  console.log('◇ Menanam kanal…');
  const channels = await Promise.all(
    [
      { platform: 'whatsapp' as const, name: 'WhatsApp KHB', handle: '+62 811-2233-445', status: 'active' as const, messageCount: 812 },
      { platform: 'instagram' as const, name: 'Instagram KHB', handle: '@komunitashalalbandung', status: 'active' as const, messageCount: 341 },
      { platform: 'web' as const, name: 'Widget Website', handle: 'halalbandung.com', status: 'active' as const, messageCount: 213 },
      { platform: 'telegram' as const, name: 'Telegram KHB', handle: '@khbbot', status: 'draft' as const, messageCount: 0 },
    ].map((channel) =>
      prisma.channel.create({
        data: {
          workspaceId: workspace.id,
          platform: channel.platform,
          name: channel.name,
          handle: channel.handle,
          status: channel.status,
          messageCount: channel.messageCount,
          lastSyncAt: channel.status === 'active' ? new Date() : null,
        },
      }),
    ),
  );

  const webChannel = channels.find((channel) => channel.platform === 'web') ?? channels[0];

  console.log('◇ Menanam produk…');
  await Promise.all(
    [
      { name: 'Kopi Arabika Preanger 200g', sku: 'KHB-KOP-01', category: 'Minuman', price: 'Rp45.000', halal: 'certified' as const },
      { name: 'Sambal Cumi Bu Fajar', sku: 'KHB-SAM-02', category: 'Bumbu', price: 'Rp38.000', halal: 'certified' as const },
      { name: 'Madu Hutan Lestari 500ml', sku: 'KHB-MAD-03', category: 'Madu', price: 'Rp95.000', halal: 'process' as const },
      { name: 'Keripik Pisang Kang Agus', sku: 'KHB-KRP-04', category: 'Makanan Ringan', price: 'Rp22.000', halal: 'none' as const },
      { name: 'Katering Harian Dapur Wulan', sku: 'KHB-KAT-05', category: 'Katering', price: 'Rp25.000/porsi', halal: 'none' as const },
    ].map((product) => prisma.product.create({ data: { workspaceId: workspace.id, ...product } })),
  );

  console.log('◇ Menanam pelanggan…');
  const customers = await Promise.all(
    [
      { name: 'Rina Amelia', business: 'Kedai Kopi Barokah', city: 'Bandung', chatCount: 24, status: 'Aktif' },
      { name: 'Fajar Nugraha', business: 'Sambal Cumi Pak Fajar', city: 'Cimahi', chatCount: 18, status: 'Aktif' },
      { name: 'Nadia Putri', business: 'Madu Hutan Lestari', city: 'Bandung Barat', chatCount: 12, status: 'Aktif' },
      { name: 'Agus Setiawan', business: 'Keripik Kang Agus', city: 'Bandung', chatCount: 9, status: 'Baru' },
      { name: 'Wulan Sari', business: 'Dapur Wulan', city: 'Sumedang', chatCount: 6, status: 'Aktif' },
    ].map((customer) =>
      prisma.customer.create({
        data: { workspaceId: workspace.id, ...customer, lastSeenAt: new Date() },
      }),
    ),
  );

  console.log('◇ Menanam alur percakapan…');
  await Promise.all(
    [
      { kind: 'greeting' as const, title: 'Pesan pembuka', description: "Assalamu'alaikum! Ada yang bisa dibantu soal sertifikasi halal?", sortOrder: 0 },
      { kind: 'question' as const, title: 'Apa itu self declare?', description: 'Jalur sertifikasi halal untuk usaha mikro dan kecil.', sortOrder: 1 },
      { kind: 'question' as const, title: 'Dokumen apa saja yang diperlukan?', description: 'NIB, KTP, komposisi bahan, dan alur produksi.', sortOrder: 2 },
      { kind: 'question' as const, title: 'Berapa biaya dan lama prosesnya?', description: 'Program self declare UMK umumnya gratis; sertifikat berlaku 4 tahun.', sortOrder: 3 },
      { kind: 'escalation' as const, title: 'Teruskan ke Pendamping PPH', description: 'Bila pertanyaan menyangkut bahan kritis atau kasus khusus.', sortOrder: 4 },
    ].map((node) => prisma.flowNode.create({ data: { workspaceId: workspace.id, ...node } })),
  );

  console.log('◇ Menanam percakapan contoh…');
  interface SeedMessage {
    senderType: 'customer' | 'bot';
    text: string;
    source?: 'rag' | 'general' | 'handoff' | 'none';
    grounded?: boolean;
    confidence?: number;
    citations?: string[];
  }

  const conversations: Array<{
    customer: (typeof customers)[number] | undefined;
    sessionKey: string;
    messages: SeedMessage[];
  }> = [
    {
      customer: customers[0],
      sessionKey: 'seed-session-1',
      messages: [
        { senderType: 'customer' as const, text: 'Apakah self declare gratis untuk usaha rumahan?' },
        {
          senderType: 'bot' as const,
          text: 'Untuk usaha mikro dan kecil, program self declare umumnya tidak dipungut biaya sertifikasi karena ditanggung program pemerintah. Biaya bisa muncul bila ada pengujian laboratorium atau pendampingan sukarela.',
          source: 'rag' as const,
          grounded: true,
          confidence: 0.86,
          citations: ['Panduan Self Declare untuk Usaha Mikro dan Kecil'],
        },
      ],
    },
    {
      customer: customers[1],
      sessionKey: 'seed-session-2',
      messages: [
        { senderType: 'customer' as const, text: 'Kalau gelatin di permen itu bagaimana ya?' },
        {
          senderType: 'bot' as const,
          text: 'Gelatin termasuk bahan kritis karena bisa berasal dari kulit atau tulang hewan. Untuk sertifikasi, asal bahan perlu dibuktikan lewat sertifikat halal pemasok, surat pernyataan pemasok, atau pengujian laboratorium bila dokumen belum cukup.',
          source: 'rag' as const,
          grounded: true,
          confidence: 0.78,
          citations: ['Bahan Kritis dalam Sertifikasi Halal'],
        },
      ],
    },
    {
      customer: customers[3],
      sessionKey: 'seed-session-3',
      messages: [
        { senderType: 'customer' as const, text: 'Logo halal di kemasan saya dari luar negeri, boleh dipakai?' },
        {
          senderType: 'bot' as const,
          text: 'Logo halal Indonesia hanya boleh dicantumkan setelah sertifikat halal dari BPJPH terbit. Logo dari lembaga luar negeri tidak otomatis berlaku di Indonesia; produk impor tetap perlu mendaftar sertifikasi halal di Indonesia bila diperdagangkan di sini.\n\n_Jawaban ini bersumber dari pengetahuan umum, bukan dari dokumen resmi KHB._',
          source: 'general' as const,
          grounded: false,
          confidence: 0.55,
        },
      ],
    },
  ];

  for (const conversation of conversations) {
    const created = await prisma.conversation.create({
      data: {
        workspaceId: workspace.id,
        channelId: webChannel?.id ?? null,
        customerId: conversation.customer?.id ?? null,
        customerName: conversation.customer?.name ?? 'Pengunjung web',
        sessionKey: conversation.sessionKey,
        status: 'bot',
        lastMessageAt: new Date(),
      },
    });

    let offset = conversation.messages.length;
    for (const message of conversation.messages) {
      await prisma.message.create({
        data: {
          conversationId: created.id,
          senderType: message.senderType,
          text: message.text,
          source: message.source ?? 'none',
          grounded: message.grounded ?? false,
          confidence: message.confidence ?? null,
          citations: message.citations ?? undefined,
          createdAt: new Date(Date.now() - offset * 60_000),
        },
      });
      offset -= 1;
    }
  }

  console.log('◇ Menanam notifikasi…');
  await Promise.all(
    [
      { type: 'knowledge' as const, title: 'Dokumen baru terindeks', description: '6 dokumen rujukan halal siap dipakai asisten.' },
      { type: 'chat' as const, title: '3 percakapan baru hari ini', description: 'Satu percakapan memakai jawaban pengetahuan umum.' },
      { type: 'system' as const, title: 'Prototipe PKM v2.0', description: 'Mode jawaban umum aktif — jawaban di luar dokumen diberi penanda.' },
    ].map((notification) => prisma.notification.create({ data: { workspaceId: workspace.id, ...notification } })),
  );

  console.log('✓ Seed selesai. Workspace:', workspace.slug, '| dokumen:', DOCUMENTS.length);
}

main()
  .catch((error) => {
    console.error('Seed gagal:', error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
