import { FileText, CircleCheckBig, ExternalLink, Database, Search, ShieldCheck } from "lucide-react";
import { KNOWLEDGE_DOCS, LINKS } from "../data/content";

const CATEGORY_STYLE: Record<string, string> = {
  Regulasi: "bg-[#eaf6ee] text-[#0b5c30] border-[rgba(22,163,74,0.2)]",
  Panduan: "bg-[#fdf4d9] text-[#8a6508] border-[rgba(180,134,11,0.25)]",
  FAQ: "bg-[#f1f5f9] text-[#334155] border-[#e2e8f0]",
};

export default function Knowledge() {
  return (
    <section id="sumber" className="relative w-full py-[4.28rem] md:py-[3.42rem] sm:py-[2.85rem] bg-white overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-40 pointer-events-none" />

      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-[2rem] items-start">
          <div className="lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaf6ee] border border-[rgba(22,163,74,0.18)] text-[#0b5c30] text-[0.78rem] font-semibold mb-3">
              <Database className="w-3.5 h-3.5" />
              Basis pengetahuan
            </div>
            <h2 className="text-[2rem] md:text-[1.85rem] font-bold text-[#06301f] leading-[1.15] tracking-[-0.015em] mb-3">
              Sumber jawabannya bisa{" "}
              <span className="text-accent-gradient">Anda telusuri sendiri</span>.
            </h2>
            <p className="text-[1rem] text-[#10231a]/70 leading-[1.65] mb-6 max-w-lg">
              Tidak ada jawaban tanpa rujukan. Setiap respons menunjuk dokumen resmi BPJPH
              atau panduan Komunitas Halal Bandung yang tersimpan di basis pengetahuan.
            </p>

            <div className="space-y-3 mb-7">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 w-8 h-8 rounded-lg bg-[#eaf6ee] text-[#0f7a3d] flex items-center justify-center shrink-0">
                  <Search className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-[0.92rem] font-semibold text-[#06301f]">Pencarian semantik</div>
                  <p className="text-[0.85rem] text-[#10231a]/65 leading-relaxed">
                    Pertanyaan bebas dicocokkan dengan bagian dokumen yang paling relevan.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 w-8 h-8 rounded-lg bg-[#fdf4d9] text-[#8a6508] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-[0.92rem] font-semibold text-[#06301f]">Dikurasi manusia</div>
                  <p className="text-[0.85rem] text-[#10231a]/65 leading-relaxed">
                    Dokumen diperiksa tim KHB sebelum masuk ke basis pengetahuan.
                  </p>
                </div>
              </div>
            </div>

            <a
              href={LINKS.sihalal}
              target="_blank"
              rel="noopener noreferrer"
              className="care-btn-spring inline-flex items-center gap-2 h-[2.8rem] px-5 rounded-full bg-white border border-[rgba(11,92,48,0.2)] text-[#0b5c30] text-[0.92rem] font-semibold hover:bg-[#f6fbf7] transition-colors"
            >
              Buka SIHALAL (BPJPH)
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="space-y-3">
            {KNOWLEDGE_DOCS.map((doc) => (
              <div
                key={doc.file}
                className="card-elevated rounded-[1.1rem] p-[1rem] sm:p-[1.14rem] flex items-start gap-3"
              >
                <span className="w-10 h-10 rounded-xl bg-[#f6fbf7] border border-[rgba(22,163,74,0.16)] text-[#0f7a3d] flex items-center justify-center shrink-0">
                  <FileText className="w-4.5 h-4.5" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span
                      className={`text-[0.7rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        CATEGORY_STYLE[doc.category] ?? CATEGORY_STYLE.FAQ
                      }`}
                    >
                      {doc.category}
                    </span>
                    <span className="text-[0.7rem] text-[#10231a]/50">{doc.pages}</span>
                  </div>
                  <h3 className="text-[0.95rem] font-semibold text-[#06301f] leading-snug">
                    {doc.name}
                  </h3>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.78rem] text-[#10231a]/55">
                    <span className="font-mono text-[0.72rem]">{doc.file}</span>
                    <span className="inline-flex items-center gap-1 text-[#0f7a3d] font-medium">
                      <CircleCheckBig className="w-3 h-3" />
                      Terindeks · {doc.source}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <p className="text-[0.78rem] text-[#10231a]/50 leading-relaxed pt-1">
              Menampilkan 6 dari 38 dokumen pada basis pengetahuan. Dokumen baru ditambahkan
              setelah melalui peninjauan tim KHB.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
