import { useMemo, useState } from "react";
import { Search, Plus, FileText, RefreshCw, Trash2, X, Check, Clock3 } from "lucide-react";
import { ADMIN_DOCUMENTS, type KnowledgeDocument } from "../../data/admin";
import { useAdmin } from "../AdminContext";

const CATEGORIES = ["Semua", "Panduan", "Regulasi", "FAQ"] as const;

export default function KnowledgeBase() {
  const { showToast } = useAdmin();
  const [documents, setDocuments] = useState<KnowledgeDocument[]>(ADMIN_DOCUMENTS);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("Semua");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    file: "",
    category: "Panduan" as KnowledgeDocument["category"],
    source: "KHB",
  });

  const rows = useMemo(() => {
    const term = query.trim().toLowerCase();
    return documents.filter((doc) => {
      const matchCategory = category === "Semua" || doc.category === category;
      const matchQuery =
        !term || doc.name.toLowerCase().includes(term) || doc.file.toLowerCase().includes(term);
      return matchCategory && matchQuery;
    });
  }, [documents, query, category]);

  const activeCount = documents.filter((doc) => doc.status === "Aktif").length;
  const processCount = documents.length - activeCount;

  const toggleStatus = (id: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id ? { ...doc, status: doc.status === "Aktif" ? "Proses" : "Aktif" } : doc
      )
    );
    showToast("Status dokumen diperbarui");
  };

  const reindex = (name: string) => showToast(`Mengindeks ulang: ${name}`);

  const remove = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    showToast("Dokumen dihapus dari basis pengetahuan");
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    const fileName = form.file.trim() || `${form.name.trim().replace(/\s+/g, "_")}.pdf`;
    setDocuments((prev) => [
      {
        id: `d-${Date.now()}`,
        name: form.name.trim(),
        file: fileName,
        category: form.category,
        source: form.source.trim() || "KHB",
        updated: "Baru saja",
        status: "Proses",
        pages: "—",
      },
      ...prev,
    ]);
    setForm({ name: "", file: "", category: "Panduan", source: "KHB" });
    setIsAddOpen(false);
    showToast("Dokumen ditambahkan, menunggu proses indeks");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-[1.5rem] font-extrabold text-[#06301f] tracking-[-0.02em] leading-tight">
            Knowledge Base
          </h1>
          <p className="text-[0.86rem] text-[#10231a]/60 mt-1">
            Dokumen rujukan yang dipakai asisten untuk menjawab.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-white text-[0.8rem] font-semibold shadow-[0_8px_18px_-8px_rgba(11,92,48,0.6)] self-start sm:self-auto"
          style={{ background: "linear-gradient(180deg, #16a34a 0%, #0f7a3d 100%)" }}
        >
          <Plus className="w-4 h-4" />
          Tambah dokumen
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total dokumen", value: documents.length },
          { label: "Aktif terindeks", value: activeCount },
          { label: "Dalam proses", value: processCount },
        ].map((item) => (
          <div key={item.label} className="card-elevated rounded-[1rem] px-3.5 py-3">
            <div className="text-[1.25rem] font-extrabold text-[#06301f] leading-none">{item.value}</div>
            <div className="mt-1 text-[0.72rem] text-[#10231a]/55">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="card-elevated rounded-[1.1rem] p-3.5 flex flex-col sm:flex-row gap-2.5 sm:items-center">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#0f7a3d] absolute left-3.5 top-3" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari dokumen atau nama file..."
            aria-label="Cari dokumen"
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-[rgba(22,163,74,0.2)] bg-white text-[0.85rem] focus:border-[#16a34a] focus:ring-2 focus:ring-[#bbf7d0] outline-none transition-all"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`h-8 px-3 rounded-full text-[0.75rem] font-semibold border transition-colors ${
                category === item
                  ? "bg-[#16a34a] border-[#16a34a] text-white"
                  : "bg-white border-[rgba(22,163,74,0.2)] text-[#0b5c30] hover:bg-[#eaf6ee]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        {rows.map((doc) => (
          <div key={doc.id} className="card-elevated rounded-[1.1rem] p-3.5 sm:p-4">
            <div className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-xl bg-[#f6fbf7] border border-[rgba(22,163,74,0.16)] text-[#0f7a3d] flex items-center justify-center shrink-0">
                <FileText className="w-4.5 h-4.5" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5 mb-1">
                  <span className="text-[0.68rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#eaf6ee] border border-[rgba(22,163,74,0.18)] text-[#0b5c30]">
                    {doc.category}
                  </span>
                  <span className="text-[0.68rem] text-[#10231a]/40">{doc.pages}</span>
                  <span
                    className={`text-[0.68rem] font-semibold px-2 py-0.5 rounded-full ${
                      doc.status === "Aktif"
                        ? "bg-[#eaf6ee] text-[#0b5c30]"
                        : "bg-[#fdf4d9] text-[#8a6508]"
                    }`}
                  >
                    {doc.status}
                  </span>
                </div>

                <h2 className="text-[0.9rem] font-semibold text-[#06301f] leading-snug">{doc.name}</h2>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.72rem] text-[#10231a]/50">
                  <span className="font-mono">{doc.file}</span>
                  <span>Sumber: {doc.source}</span>
                  <span>Diperbarui {doc.updated}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => toggleStatus(doc.id)}
                  aria-label={doc.status === "Aktif" ? "Nonaktifkan dokumen" : "Aktifkan dokumen"}
                  title={doc.status === "Aktif" ? "Nonaktifkan" : "Aktifkan"}
                  className="w-8 h-8 rounded-lg border border-[rgba(22,163,74,0.16)] bg-white text-[#0b5c30] flex items-center justify-center hover:bg-[#eaf6ee] transition-colors"
                >
                  {doc.status === "Aktif" ? <Clock3 className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => reindex(doc.name)}
                  aria-label="Indeks ulang dokumen"
                  title="Indeks ulang"
                  className="w-8 h-8 rounded-lg border border-[rgba(22,163,74,0.16)] bg-white text-[#0b5c30] flex items-center justify-center hover:bg-[#eaf6ee] transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(doc.id)}
                  aria-label="Hapus dokumen"
                  title="Hapus"
                  className="w-8 h-8 rounded-lg border border-[rgba(190,18,60,0.18)] bg-white text-[#be123c] flex items-center justify-center hover:bg-[#fff1f2] transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {rows.length === 0 && (
          <div className="card-elevated rounded-[1.1rem] px-5 py-12 text-center">
            <p className="text-[0.9rem] font-semibold text-[#06301f]">Dokumen tidak ditemukan</p>
            <p className="text-[0.8rem] text-[#10231a]/50 mt-1">Ubah kata kunci atau tambah dokumen baru.</p>
          </div>
        )}
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="add-doc-title">
          <div className="absolute inset-0 bg-[#06301f]/45 backdrop-blur-sm" onClick={() => setIsAddOpen(false)} aria-hidden="true" />
          <form
            onSubmit={handleAdd}
            className="relative z-10 w-full max-w-[28rem] bg-white rounded-[1.2rem] border border-[rgba(22,163,74,0.16)] shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-[rgba(22,163,74,0.10)]">
              <h2 id="add-doc-title" className="text-[0.95rem] font-bold text-[#06301f]">
                Tambah dokumen
              </h2>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                aria-label="Tutup form"
                className="w-8 h-8 rounded-full bg-[#f6fbf7] border border-[rgba(22,163,74,0.16)] text-[#0b5c30] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <label htmlFor="doc-name" className="block text-[0.7rem] font-bold uppercase tracking-wider text-[#0b5c30] mb-1">
                  Nama dokumen
                </label>
                <input
                  id="doc-name"
                  required
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder="Contoh: Panduan Label Halal 2026"
                  className="w-full h-10 px-3 rounded-xl border border-[rgba(22,163,74,0.2)] text-[0.85rem] focus:border-[#16a34a] focus:ring-2 focus:ring-[#bbf7d0] outline-none"
                />
              </div>

              <div>
                <label htmlFor="doc-file" className="block text-[0.7rem] font-bold uppercase tracking-wider text-[#0b5c30] mb-1">
                  Nama file (opsional)
                </label>
                <input
                  id="doc-file"
                  value={form.file}
                  onChange={(event) => setForm({ ...form, file: event.target.value })}
                  placeholder="Panduan_Label_Halal.pdf"
                  className="w-full h-10 px-3 rounded-xl border border-[rgba(22,163,74,0.2)] text-[0.85rem] focus:border-[#16a34a] focus:ring-2 focus:ring-[#bbf7d0] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="doc-category" className="block text-[0.7rem] font-bold uppercase tracking-wider text-[#0b5c30] mb-1">
                    Kategori
                  </label>
                  <select
                    id="doc-category"
                    value={form.category}
                    onChange={(event) =>
                      setForm({ ...form, category: event.target.value as KnowledgeDocument["category"] })
                    }
                    className="w-full h-10 px-3 rounded-xl border border-[rgba(22,163,74,0.2)] text-[0.85rem] bg-white focus:border-[#16a34a] focus:ring-2 focus:ring-[#bbf7d0] outline-none"
                  >
                    <option value="Panduan">Panduan</option>
                    <option value="Regulasi">Regulasi</option>
                    <option value="FAQ">FAQ</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="doc-source" className="block text-[0.7rem] font-bold uppercase tracking-wider text-[#0b5c30] mb-1">
                    Sumber
                  </label>
                  <input
                    id="doc-source"
                    value={form.source}
                    onChange={(event) => setForm({ ...form, source: event.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-[rgba(22,163,74,0.2)] text-[0.85rem] focus:border-[#16a34a] focus:ring-2 focus:ring-[#bbf7d0] outline-none"
                  />
                </div>
              </div>

              <p className="text-[0.7rem] text-[#10231a]/45 leading-relaxed">
                Pada prototipe ini file tidak benar-benar diunggah; dokumen baru masuk dengan status
                <strong className="text-[#0b5c30]"> Proses</strong> sampai diindeks.
              </p>
            </div>

            <div className="px-4 pb-4">
              <button
                type="submit"
                className="w-full h-10 rounded-full text-white text-[0.85rem] font-semibold"
                style={{ background: "linear-gradient(180deg, #16a34a 0%, #0f7a3d 100%)" }}
              >
                Simpan dokumen
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
