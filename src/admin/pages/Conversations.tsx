import { useMemo, useState } from "react";
import { Search, X, MessageCircle, FileText, Check, ChevronRight } from "lucide-react";
import { CONVERSATIONS, type Conversation, type ConversationStatus } from "../../data/admin";
import { useAdmin } from "../AdminContext";

const FILTERS: Array<"Semua" | ConversationStatus> = ["Semua", "Terjawab", "Perlu tindak lanjut"];

export default function Conversations() {
  const { showToast } = useAdmin();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Semua");
  const [statuses, setStatuses] = useState<Record<string, ConversationStatus>>({});
  const [selected, setSelected] = useState<Conversation | null>(null);

  const rows = useMemo(() => {
    const term = query.trim().toLowerCase();
    return CONVERSATIONS.map((item) => ({
      ...item,
      status: statuses[item.id] ?? item.status,
    })).filter((item) => {
      const matchFilter = filter === "Semua" || item.status === filter;
      const matchQuery =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.question.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term);
      return matchFilter && matchQuery;
    });
  }, [query, filter, statuses]);

  const resolve = (id: string) => {
    setStatuses((prev) => ({ ...prev, [id]: "Terjawab" }));
    setSelected((prev) => (prev ? { ...prev, status: "Terjawab" } : prev));
    showToast("Percakapan ditandai selesai");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-[1.5rem] font-extrabold text-[#06301f] tracking-[-0.02em] leading-tight">
            Percakapan
          </h1>
          <p className="text-[0.86rem] text-[#10231a]/60 mt-1">
            Riwayat tanya jawab UMKM dengan Asisten Halal KHB.
          </p>
        </div>
        <span className="text-[0.78rem] text-[#10231a]/50">
          {rows.length} dari {CONVERSATIONS.length} percakapan
        </span>
      </div>

      <div className="card-elevated rounded-[1.1rem] p-3.5 flex flex-col sm:flex-row gap-2.5 sm:items-center">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#0f7a3d] absolute left-3.5 top-3" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari nama, pertanyaan, atau kategori..."
            aria-label="Cari percakapan"
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-[rgba(22,163,74,0.2)] bg-white text-[0.85rem] focus:border-[#16a34a] focus:ring-2 focus:ring-[#bbf7d0] outline-none transition-all"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`h-8 px-3 rounded-full text-[0.75rem] font-semibold border transition-colors ${
                filter === item
                  ? "bg-[#16a34a] border-[#16a34a] text-white"
                  : "bg-white border-[rgba(22,163,74,0.2)] text-[#0b5c30] hover:bg-[#eaf6ee]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="card-elevated rounded-[1.1rem] overflow-hidden">
        <div className="hidden md:grid grid-cols-[1.1fr_1.8fr_0.7fr_0.7fr_0.8fr_2rem] gap-3 px-5 py-2.5 border-b border-[rgba(22,163,74,0.10)] text-[0.68rem] font-bold uppercase tracking-wider text-[#10231a]/40">
          <span>Pengguna</span>
          <span>Pertanyaan</span>
          <span>Kategori</span>
          <span>Waktu</span>
          <span>Status</span>
          <span />
        </div>

        <div className="divide-y divide-[rgba(22,163,74,0.08)]">
          {rows.map((row) => (
            <button
              key={row.id}
              type="button"
              onClick={() => setSelected(row)}
              className="w-full text-left px-4 md:px-5 py-3 hover:bg-[#f6fbf7]/70 transition-colors grid grid-cols-1 md:grid-cols-[1.1fr_1.8fr_0.7fr_0.7fr_0.8fr_2rem] gap-2 md:gap-3 md:items-center"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#eaf6ee] border border-[rgba(22,163,74,0.14)] text-[#0b5c30] text-[0.68rem] font-bold flex items-center justify-center shrink-0">
                  {row.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-[0.83rem] font-semibold text-[#06301f] truncate">{row.name}</div>
                  <div className="text-[0.7rem] text-[#10231a]/45 truncate">{row.email}</div>
                </div>
              </div>

              <div className="text-[0.8rem] text-[#10231a]/70 truncate">{row.question}</div>

              <div className="hidden md:block">
                <span className="text-[0.7rem] px-2 py-0.5 rounded-full bg-[#f6fbf7] border border-[rgba(22,163,74,0.14)] text-[#0b5c30]">
                  {row.category}
                </span>
              </div>

              <div className="hidden md:block text-[0.72rem] text-[#10231a]/45">{row.time}</div>

              <div className="flex items-center gap-2 md:block">
                <span
                  className={`text-[0.68rem] font-semibold px-2 py-0.5 rounded-full ${
                    row.status === "Terjawab" ? "bg-[#eaf6ee] text-[#0b5c30]" : "bg-[#fdf4d9] text-[#8a6508]"
                  }`}
                >
                  {row.status}
                </span>
                <span className="md:hidden text-[0.68rem] text-[#10231a]/40">{row.time}</span>
              </div>

              <div className="hidden md:flex justify-end text-[#10231a]/30">
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ))}

          {rows.length === 0 && (
            <div className="px-5 py-12 text-center">
              <p className="text-[0.9rem] font-semibold text-[#06301f]">Tidak ada percakapan</p>
              <p className="text-[0.8rem] text-[#10231a]/50 mt-1">Coba ubah kata kunci atau filter status.</p>
            </div>
          )}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-labelledby="conv-title">
          <div className="absolute inset-0 bg-[#06301f]/45 backdrop-blur-sm" onClick={() => setSelected(null)} aria-hidden="true" />
          <div className="relative z-10 w-full sm:max-w-[26rem] h-full bg-white border-l border-[rgba(22,163,74,0.14)] shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-[rgba(22,163,74,0.10)] px-4 py-3 flex items-center justify-between gap-2">
              <h2 id="conv-title" className="text-[0.95rem] font-bold text-[#06301f]">
                Detail percakapan
              </h2>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Tutup detail"
                className="w-8 h-8 rounded-full bg-[#f6fbf7] border border-[rgba(22,163,74,0.16)] text-[#0b5c30] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#eaf6ee] border border-[rgba(22,163,74,0.14)] text-[#0b5c30] font-bold flex items-center justify-center">
                  {selected.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-[0.9rem] font-bold text-[#06301f]">{selected.name}</div>
                  <div className="text-[0.75rem] text-[#10231a]/50 break-all">{selected.email}</div>
                </div>
              </div>

              <div className="rounded-xl bg-[#f6fbf7] border border-[rgba(22,163,74,0.14)] p-3">
                <div className="text-[0.68rem] font-bold uppercase tracking-wider text-[#10231a]/40 mb-1">
                  Pertanyaan
                </div>
                <p className="text-[0.85rem] text-[#10231a] leading-relaxed">{selected.question}</p>
                <div className="mt-2 flex items-center gap-2 text-[0.7rem] text-[#10231a]/45">
                  <span className="px-1.5 py-0.5 rounded bg-white border border-[rgba(22,163,74,0.14)] text-[#0b5c30]">
                    {selected.category}
                  </span>
                  <span>{selected.time}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-[#0f7a3d]" />
                  <span className="text-[0.72rem] font-bold uppercase tracking-wider text-[#0b5c30]">
                    Jawaban AI
                  </span>
                </div>
                <p className="text-[0.85rem] text-[#10231a]/75 leading-relaxed">
                  Jawaban dikirim otomatis dari basis pengetahuan resmi. Untuk pertanyaan kasuistis,
                  sistem mengarahkan pengguna ke Pendamping PPH agar tidak terjadi misinformasi.
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#f6fbf7] border border-[rgba(22,163,74,0.18)] text-[0.7rem] font-medium text-[#0b5c30]">
                  <FileText className="w-3 h-3 text-[#0f7a3d]" />
                  Sumber mengikuti dokumen terkait
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => resolve(selected.id)}
                  disabled={selected.status === "Terjawab"}
                  className="w-full h-10 rounded-full text-white text-[0.85rem] font-semibold inline-flex items-center justify-center gap-1.5 disabled:opacity-50"
                  style={{ background: "linear-gradient(180deg, #16a34a 0%, #0f7a3d 100%)" }}
                >
                  <Check className="w-4 h-4" />
                  {selected.status === "Terjawab" ? "Sudah terjawab" : "Tandai selesai"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    showToast("Eskalasi ke Pendamping PPH (demo)");
                    setSelected(null);
                  }}
                  className="w-full h-10 rounded-full border border-[rgba(22,163,74,0.24)] bg-white text-[#0b5c30] text-[0.85rem] font-semibold hover:bg-[#eaf6ee] transition-colors"
                >
                  Eskalasi ke Pendamping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
