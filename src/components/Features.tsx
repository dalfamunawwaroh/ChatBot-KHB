import {
  MessagesSquare,
  BookOpen,
  FileCheck2,
  ClipboardCheck,
  UserCheck,
  BarChart3,
  CircleCheckBig,
} from "lucide-react";
import NoiseOverlay from "./NoiseOverlay";
import IconTile from "./IconTile";
import { FEATURES, ANALYTICS_TOPICS } from "../data/content";

export default function Features() {
  const iconProps = { className: "w-5 h-5 text-white", strokeWidth: 2 };
  const features = FEATURES;

  return (
    <section id="fitur" className="relative w-full py-[4.28rem] md:py-[3.42rem] sm:py-[2.85rem] bg-white overflow-hidden">
      <div className="aurora absolute -bottom-16 -left-16 w-[21rem] h-[21rem] bg-[rgba(134,239,172,0.18)] opacity-60 pointer-events-none" />

      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-[2rem]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaf6ee] border border-[rgba(22,163,74,0.18)] text-[#0b5c30] text-[0.78rem] font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
            Fitur unggulan
          </div>
          <h2 className="text-[2rem] md:text-[1.71rem] sm:text-[1.57rem] font-bold text-[#06301f] leading-[1.15] tracking-[-0.015em]">
            Semua yang dibutuhkan UMKM untuk{" "}
            <span className="text-accent-gradient">paham halal</span>.
          </h2>
          <p className="mt-3 text-[1rem] text-[#10231a]/70 leading-[1.6] max-w-xl mx-auto">
            Dari pertanyaan pertama sampai berkas siap diajukan ke BPJPH.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem] items-stretch">
          {/* 1. Large signature card */}
          <div className="md:col-span-2 relative rounded-[1.3rem] overflow-hidden p-[1.85rem] text-white shadow-[0_18px_40px_rgba(11,92,48,0.22)] border border-white/10 grad-signature flex flex-col justify-between">
            <NoiseOverlay className="opacity-15" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[#bbf7d0] text-[0.85rem] font-semibold border border-white/20 mb-4">
                <MessagesSquare className="w-3.5 h-3.5" />
                <span>Asisten Edukasi</span>
              </div>
              <h3 className="text-[1.28rem] font-bold mb-3 leading-snug">{features[0].title}</h3>
              <p className="text-white/85 text-[1rem] leading-relaxed max-w-xl">{features[0].desc}</p>
            </div>

            <div className="relative z-10 mt-6 pt-5 border-t border-white/20 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="care-glass-card rounded-xl p-3">
                <div className="text-[0.85rem] font-semibold text-white mb-0.5">Bahasa Sehari-hari</div>
                <div className="text-[0.78rem] text-white/75">Pertanyaan bebas, tanpa istilah teknis</div>
              </div>
              <div className="care-glass-card rounded-xl p-3">
                <div className="text-[0.85rem] font-semibold text-white mb-0.5">Respons &lt; 2 Detik</div>
                <div className="text-[0.78rem] text-white/75">Jawaban langsung dari basis dokumen</div>
              </div>
              <div className="care-glass-card rounded-xl p-3">
                <div className="text-[0.85rem] font-semibold text-white mb-0.5">Aktif 24 Jam</div>
                <div className="text-[0.78rem] text-white/75">Termasuk malam dan akhir pekan</div>
              </div>
            </div>
          </div>

          {/* 2. Knowledge (soft) */}
          <div className="grad-soft rounded-[1.3rem] p-[1.57rem] flex flex-col justify-between group border border-[#d6ecdd]">
            <div>
              <div className="mb-4">
                <IconTile icon={<BookOpen {...iconProps} />} variant="light" size="lg" />
              </div>
              <h3 className="text-[1.14rem] font-bold text-[#06301f] mb-2 leading-snug">{features[1].title}</h3>
              <p className="text-[0.92rem] text-[#10231a]/75 leading-relaxed">{features[1].desc}</p>
            </div>
            <div className="mt-5 pt-3 border-t border-[rgba(22,163,74,0.10)] flex items-center gap-1.5 text-[0.85rem] text-[#0b5c30] font-semibold">
              <CircleCheckBig className="w-3.5 h-3.5 text-[#0f7a3d]" />
              <span>Rujukan dokumen selalu ditampilkan</span>
            </div>
          </div>

          {/* 3. Self declare (elevated) */}
          <div className="card-elevated rounded-[1.3rem] p-[1.57rem] flex flex-col justify-between group">
            <div>
              <div className="mb-4">
                <IconTile icon={<ClipboardCheck {...iconProps} />} variant="light" size="lg" />
              </div>
              <h3 className="text-[1.14rem] font-bold text-[#06301f] mb-2 leading-snug">{features[2].title}</h3>
              <p className="text-[0.92rem] text-[#10231a]/75 leading-relaxed">{features[2].desc}</p>
            </div>
            <div className="mt-5 pt-3 border-t border-[rgba(22,163,74,0.10)] flex items-center gap-1.5 text-[0.85rem] text-[#0b5c30] font-semibold">
              <CircleCheckBig className="w-3.5 h-3.5 text-[#0f7a3d]" />
              <span>Langkah demi langkah, tanpa biaya</span>
            </div>
          </div>

          {/* 4. Documents (soft) */}
          <div className="grad-soft rounded-[1.3rem] p-[1.57rem] flex flex-col justify-between group border border-[#d6ecdd]">
            <div>
              <div className="mb-4">
                <IconTile icon={<FileCheck2 {...iconProps} />} variant="light" size="lg" />
              </div>
              <h3 className="text-[1.14rem] font-bold text-[#06301f] mb-2 leading-snug">{features[3].title}</h3>
              <p className="text-[0.92rem] text-[#10231a]/75 leading-relaxed">{features[3].desc}</p>
            </div>
            <div className="mt-5 pt-3 border-t border-[rgba(22,163,74,0.10)] flex items-center gap-1.5 text-[0.85rem] text-[#0b5c30] font-semibold">
              <CircleCheckBig className="w-3.5 h-3.5 text-[#0f7a3d]" />
              <span>Checklist sebelum berkas diajukan</span>
            </div>
          </div>

          {/* 5. Handoff (elevated) */}
          <div className="card-elevated rounded-[1.3rem] p-[1.57rem] flex flex-col justify-between group">
            <div>
              <div className="mb-4">
                <IconTile icon={<UserCheck {...iconProps} />} variant="light" size="lg" />
              </div>
              <h3 className="text-[1.14rem] font-bold text-[#06301f] mb-2 leading-snug">{features[4].title}</h3>
              <p className="text-[0.92rem] text-[#10231a]/75 leading-relaxed">{features[4].desc}</p>
            </div>
            <div className="mt-5 pt-3 border-t border-[rgba(22,163,74,0.10)] flex items-center gap-1.5 text-[0.85rem] text-[#0b5c30] font-semibold">
              <CircleCheckBig className="w-3.5 h-3.5 text-[#0f7a3d]" />
              <span>Riwayat percakapan ikut diteruskan</span>
            </div>
          </div>

          {/* 6. Analytics (wide) */}
          <div className="md:col-span-2 lg:col-span-3 card-elevated rounded-[1.3rem] p-[1.57rem] lg:p-[1.85rem] flex flex-col lg:flex-row items-center justify-between gap-6 group">
            <div className="max-w-lg">
              <div className="mb-4">
                <IconTile icon={<BarChart3 {...iconProps} />} variant="gold" size="lg" />
              </div>
              <h3 className="text-[1.28rem] font-bold text-[#06301f] mb-2 leading-snug">{features[5].title}</h3>
              <p className="text-[1rem] text-[#10231a]/75 leading-relaxed">{features[5].desc}</p>
            </div>

            <div className="w-full lg:w-[27rem] grad-soft rounded-xl overflow-hidden shrink-0 border border-[#d6ecdd] shadow-sm">
              <div className="grad-deep px-[1rem] py-[0.7rem] flex items-center justify-between">
                <span className="text-[0.78rem] font-semibold text-white uppercase tracking-wider">
                  Distribusi Topik
                </span>
                <span className="text-[0.71rem] text-[#bbf7d0] font-medium">30 hari terakhir</span>
              </div>

              <div className="p-[1rem]">
                <div className="space-y-[0.7rem]">
                  {ANALYTICS_TOPICS.map((bar) => (
                    <div key={bar.label}>
                      <div className="flex justify-between text-[0.78rem] text-[#06301f] font-semibold mb-0.5">
                        <span>{bar.label}</span>
                        <span className="text-[#0f7a3d] text-[0.71rem] font-medium">{bar.pct}%</span>
                      </div>
                      <div className="w-full h-[0.4rem] rounded-full bg-[rgba(22,163,74,0.10)] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#16a34a] to-[#d4a017]"
                          style={{ width: `${bar.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-2.5 border-t border-[rgba(22,163,74,0.12)]">
                  <svg className="w-full h-[3.42rem] text-[#16a34a]" viewBox="0 0 300 40" fill="none" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="khbChartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(22,163,74,0.20)" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,28 C30,32 60,14 90,18 C120,22 150,8 180,12 C210,16 240,28 270,18 C285,13 295,8 300,6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0,28 C30,32 60,14 90,18 C120,22 150,8 180,12 C210,16 240,28 270,18 C285,13 295,8 300,6 L300,40 L0,40 Z"
                      fill="url(#khbChartGrad)"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
