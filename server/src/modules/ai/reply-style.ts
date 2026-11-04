/**
 * Penegakan gaya jawaban secara deterministik.
 *
 * Prompt saja tidak cukup: model kadang tetap memakai heading markdown,
 * penebalan, atau tabel. Fungsi ini merapikan keluaran LLM supaya konsisten
 * dengan tampilan chat KHB yang menampilkan teks polos.
 */
export function sanitizeAnswer(raw: string): string {
  let text = raw.replace(/\r\n/g, '\n');

  // Heading markdown → baris teks biasa.
  text = text.replace(/^#{1,6}\s*(.+)$/gm, (_, title: string) => title.trim());
  // Penebalan/miring/kode inline.
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  text = text.replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,:;!?]|$)/g, '$1$2');
  text = text.replace(/`([^`]+)`/g, '$1');
  // Miring dengan garis bawah (_..._) — dipakai untuk catatan penutup.
  text = text.replace(/(^|[\s(])_([^_\n]+)_(?=[\s).,:;!?]|$)/g, '$1$2');
  // Tabel markdown → buang garis pemisah, sisakan sel dengan pemisah "·".
  text = text
    .split('\n')
    .filter((line) => !/^\s*\|?[\s:-]*-{2,}[\s:|-]*\|?\s*$/.test(line))
    .map((line) => {
      if (/^\s*\|.*\|\s*$/.test(line)) {
        const cells = line
          .split('|')
          .map((cell) => cell.trim())
          .filter((cell) => cell.length > 0);
        return cells.join(' · ');
      }
      return line;
    })
    .join('\n');
  // Blok kode berpagar.
  text = text.replace(/```[a-z]*\n?/gi, '').replace(/```/g, '');
  // Rapikan bullet & spasi berlebih.
  text = text.replace(/^\s*[-*+]\s+/gm, '- ');
  text = text.replace(/\n{3,}/g, '\n\n');
  text = text.replace(/[ \t]+$/gm, '');

  return text.trim();
}

/** Perkiraan jumlah kata (dipakai untuk log & pengujian gaya). */
export function wordCount(text: string): number {
  return text.split(/\s+/).filter((word) => word.length > 0).length;
}
