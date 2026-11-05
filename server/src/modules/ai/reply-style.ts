/**
 * Penegakan gaya jawaban secara deterministik.
 *
 * Prompt saja tidak cukup: model kadang tetap memakai heading markdown,
 * penebalan, tabel, atau penanda sitasi. Fungsi ini merapikan keluaran LLM/RAG
 * supaya konsisten dengan tampilan chat KHB: teks polos dan TANPA sitasi.
 */
export function sanitizeAnswer(raw: string): string {
  let text = raw.replace(/\r\n/g, '\n');

  // ── 1. Buang sitasi ──────────────────────────────────────────
  // Penanda [1], [2][3], [doc-…], dan baris "Sumber:/Referensi: …".
  text = text.replace(/\[\s*\d+(?:\s*[,–-]\s*\d+)*\s*\]/g, '');
  text = text.replace(/\[\s*doc[^\]]*\]/gi, '');
  text = text
    .split('\n')
    .filter((line) => !/^\s*(sumber|referensi|rujukan|sources?)\s*[:\-]/i.test(line.trim()))
    .join('\n');
  // Nama berkas dokumen (mis. "Alur_Sertifikasi_KHB.txt").
  text = text.replace(/\b[\w-]+\.(?:txt|pdf|docx?|xlsx?|csv)\b/gi, '');
  // Pembuka meta: "Berdasarkan dokumen X," / "Menurut FAQ_KHB," → dibuang.
  text = text.replace(
    /(^|\n)\s*(?:berdasarkan|menurut|merujuk pada|mengacu pada)\s+(?:dokumen|basis pengetahuan|sumber|referensi)[^,.:\n]*[,:]\s*/gi,
    '$1',
  );
  // Sisa pembuka meta tanpa objek ("Menurut :", "Berdasarkan ,").
  text = text.replace(/(^|\n)\s*(?:berdasarkan|menurut|merujuk pada|mengacu pada)\s*[,:]\s*/gi, '$1');
  // Pembuka meta dengan objek lain (nama dokumen/profil): "Berdasarkan Profil KHB," → dibuang.
  text = text.replace(
    /(^|\n)\s*(?:berdasarkan|menurut|merujuk pada|mengacu pada|mengutip)\s+(?!saya|kami|pendapat|beliau)[^,.:\n]{0,60}[,:]\s*/gi,
    '$1',
  );
  // Sisa backtick tunggal.
  text = text.replace(/`/g, '');

  // ── 2. Rapikan tanda baca & kapitalisasi ─────────────────────
  text = text
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\s+([.,;:!?])/g, '$1')
    .replace(/([,.;:])\s*([,.;:])/g, '$1')
    .replace(/(^|\n)(\s*)([a-z])/g, (_m, lead: string, space: string, ch: string) => `${lead}${space}${ch.toUpperCase()}`);

  // ── 3. Markdown → teks polos ─────────────────────────────────
  text = text.replace(/^#{1,6}\s*(.+)$/gm, (_, title: string) => title.trim());
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  text = text.replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,:;!?]|$)/g, '$1$2');
  text = text.replace(/`([^`]+)`/g, '$1');
  text = text.replace(/(^|[\s(])_([^_\n]+)_(?=[\s).,:;!?]|$)/g, '$1$2');
  text = text.replace(/```[a-z]*\n?/gi, '').replace(/```/g, '');

  // ── 4. Tabel markdown → poin ─────────────────────────────────
  text = text
    .split('\n')
    .filter((line) => !/^\s*\|?[\s:-]*-{2,}[\s:|-]*\|?\s*$/.test(line))
    .map((line) => {
      if (/^\s*\|.*\|\s*$/.test(line)) {
        const cells = line
          .split('|')
          .map((cell) => cell.trim())
          .filter((cell) => cell.length > 0);
        if (cells.length === 0) return '';
        if (/^\d+$/.test(cells[0] ?? '')) return `${cells[0]}. ${cells.slice(1).join(' — ')}`;
        return '';
      }
      return line;
    })
    .join('\n');

  // ── 5. Spasi akhir ───────────────────────────────────────────
  text = text.replace(/^\s*[-*+]\s+/gm, '- ');
  text = text.replace(/\n{3,}/g, '\n\n');
  text = text.replace(/[ \t]+$/gm, '');

  return text.trim();
}

/** Perkiraan jumlah kata (dipakai untuk log & pengujian gaya). */
export function wordCount(text: string): number {
  return text.split(/\s+/).filter((word) => word.length > 0).length;
}
