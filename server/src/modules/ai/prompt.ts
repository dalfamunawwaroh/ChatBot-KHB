/**
 * Prompt untuk model bahasa.
 *
 * Dua mode yang sengaja dipisah tegas:
 * 1. GROUNDED — jawaban wajib bertumpu pada potongan dokumen yang dilampirkan.
 * 2. GENERAL  — pertanyaan di luar dokumen KHB; model boleh memakai pengetahuan
 *    umumnya sendiri (fiqh halal dasar, prosedur BPJPH, dsb.) dengan batasan:
 *    tidak mengarang nomor regulasi/harga, mengaku bila ragu, dan tidak
 *    mengaku sebagai dokumen resmi KHB.
 */
import type { RetrievedChunk } from './retrieval';

export const SERVICE_RULES = [
  'Jawab dalam Bahasa Indonesia yang ramah, ringkas, dan mudah dipahami pelaku UMKM.',
  'Gunakan maksimal 120 kata; bila perlu rincian, pakai poin-poin singkat dengan tanda "-".',
  'Tulis teks biasa: jangan memakai markdown heading (#, ##), tabel, atau blok kode.',
  'Langsung jawab pertanyaannya. Jangan membuka dengan kalimat meta seperti "berdasarkan dokumen" atau "menurut konteks".',
  'Jangan menuliskan penanda sitasi seperti [1], [2], atau "Sumber: ..." di dalam jawaban.',
  'Jangan mengarang nomor sertifikat, nomor regulasi, biaya, atau tenggat yang tidak ada di konteks.',
  'Jangan menjanjikan hasil sertifikasi; sampaikan bahwa keputusan ada pada BPJPH/LPH.',
  'Bila pengguna tampak butuh pendampingan, sarankan berbicara dengan Pendamping PPH KHB.',
];

export function buildGroundedPrompt(params: {
  assistantName: string;
  tone: string;
  question: string;
  chunks: RetrievedChunk[];
  history: Array<{ role: 'user' | 'assistant'; content: string }>;
}): { system: string; user: string } {
  const { assistantName, tone, question, chunks, history } = params;
  const context = chunks
    .map((chunk, index) => {
      const label = chunk.page != null ? `${chunk.documentTitle} (hlm. ${chunk.page})` : chunk.documentTitle;
      return `[DOKUMEN ${index + 1} — ${label}]\n${chunk.text}`;
    })
    .join('\n\n');

  const system = [
    `Kamu adalah ${assistantName}, asisten edukasi halal untuk Komunitas Halal Bandung.`,
    `Gaya jawaban yang diminta admin: ${tone}.`,
    ...SERVICE_RULES,
    'ATURAN MODE DOKUMEN: jawab HANYA berdasarkan potongan dokumen di bawah.',
    'Bila dokumen tidak memuat jawabannya, katakan terus terang bahwa informasinya belum ada di dokumen KHB, lalu sarankan langkah berikutnya (tanya Pendamping PPH atau cek SIHALAL).',
  ].join('\n');

  const historyBlock = history
    .slice(-6)
    .map((turn) => `${turn.role === 'user' ? 'Pengguna' : 'Asisten'}: ${turn.content}`)
    .join('\n');

  const user = [
    context.length > 0 ? `Potongan dokumen rujukan:\n${context}` : 'Tidak ada dokumen rujukan yang cocok.',
    historyBlock ? `Riwayat singkat:\n${historyBlock}` : '',
    `Pertanyaan pengguna: ${question}`,
  ]
    .filter((part) => part.length > 0)
    .join('\n\n');

  return { system, user };
}

export function buildGeneralPrompt(params: {
  assistantName: string;
  tone: string;
  question: string;
  history: Array<{ role: 'user' | 'assistant'; content: string }>;
  knownTopics: string[];
}): { system: string; user: string } {
  const { assistantName, tone, question, history, knownTopics } = params;

  const system = [
    `Kamu adalah ${assistantName}, asisten edukasi halal untuk Komunitas Halal Bandung.`,
    `Gaya jawaban yang diminta admin: ${tone}.`,
    ...SERVICE_RULES,
    'ATURAN MODE UMUM: pertanyaan ini tidak terjawab oleh dokumen internal KHB.',
    'Jangan menyebut atau mengutip dokumen KHB sama sekali; jangan menjelaskan bahwa dokumen tidak membahasnya.',
    'Kamu BOLEH menjawab dengan pengetahuan umum tentang sertifikasi halal di Indonesia (BPJPH, LPH, SIHALAL, self declare, bahan kritis, tahapan sertifikasi, dokumen yang biasanya diminta).',
    'Jangan mengaku kutipan dari dokumen KHB. Bila ragu atau informasi bisa berubah (biaya, tenggat, aturan terbaru), katakan bahwa pengguna sebaiknya memastikan ke BPJPH/SIHALAL atau Pendamping PPH KHB.',
    'Jangan memberi fatwa fiqh yang tegas; untuk kasus bahan/penyembelihan yang rumit, arahkan ke pendamping.',
  ].join('\n');

  const historyBlock = history
    .slice(-6)
    .map((turn) => `${turn.role === 'user' ? 'Pengguna' : 'Asisten'}: ${turn.content}`)
    .join('\n');

  const user = [
    knownTopics.length > 0
      ? `Catatan internal (jangan disebut ke pengguna): dokumen KHB hanya membahas ${knownTopics
          .slice(0, 8)
          .join(', ')}. Pertanyaan ini di luar cakupan itu, jadi jawab dengan pengetahuan umum yang meyakinkan.`
      : '',
    historyBlock ? `Riwayat singkat:\n${historyBlock}` : '',
    `Pertanyaan pengguna: ${question}`,
  ]
    .filter((part) => part.length > 0)
    .join('\n\n');

  return { system, user };
}

export const GENERAL_DISCLAIMER =
  'Jawaban ini bersumber dari pengetahuan umum, bukan dari dokumen resmi KHB. Untuk keputusan resmi, cek SIHALAL atau tanyakan ke Pendamping PPH.';
