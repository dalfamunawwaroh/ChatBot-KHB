import { useState, useEffect } from "react";
import {
  MessageCircle,
  FileText,
  CircleCheckBig,
  ShieldCheck,
  CornerDownLeft,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { MOCKUP_CONVERSATIONS, HERO_DOCS, TRUST_AVATARS } from "../data/content";
import NoiseOverlay from "./NoiseOverlay";

interface HeroProps {
  onOpenChat?: () => void;
}

export default function Hero({ onOpenChat }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const current = MOCKUP_CONVERSATIONS[activeIndex];

  useEffect(() => {
    setTypedLength(0);
    setIsTyping(true);

    const fullText = current.answer;
    let idx = 0;

    const interval = setInterval(() => {
      idx += 2;
      if (idx >= fullText.length) {
        setTypedLength(fullText.length);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setTypedLength(idx);
      }
    }, 26);

    return () => clearInterval(interval);
  }, [activeIndex, current.answer]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MOCKUP_CONVERSATIONS.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="beranda" className="relative w-full pt-[3.14rem] pb-[4rem] bg-white">
      <div className="absolute inset-0 bg-grid opacity-80 z-0 pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="aurora absolute -top-10 -right-10 w-[20rem] h-[20rem] bg-[#86efac] opacity-30" />
        <div className="aurora absolute top-1/3 -left-6 w-[16rem] h-[16rem] bg-[#fde68a] opacity-25" />
      </div>

      <div className="max-w-[1120px] mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eaf6ee] border border-[rgba(22,163,74,0.2)] text-[#0b5c30] text-[0.78rem] font-semibold mb-[1.4rem]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16a34a] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16a34a]" />
            </span>
            Asisten edukasi halal · Komunitas Halal Bandung
          </div>

          <h1 className="text-[2.6rem] sm:text-[2.857rem] font-extrabold text-[#06301f] leading-[1.08] tracking-[-0.025em] max-w-[820px] mb-[1rem] text-balance">
            Sertifikasi halal jadi{" "}
            <span className="text-accent-gradient">lebih mudah</span> dengan AI.
          </h1>

          <p className="text-[1.071rem] text-[#10231a]/75 leading-[1.65] max-w-[620px] mb-[1.7rem]">
            Tanya apa saja seputar sertifikasi halal, self declare, dan dokumen BPJPH.
            Jawaban diambil dari dokumen resmi, lengkap dengan sumbernya — gratis untuk semua UMKM.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-[0.85rem] w-full sm:w-auto mb-[2.2rem]">
            <button
              type="button"
              onClick={onOpenChat}
              className="care-btn-spring w-full sm:w-auto h-[3rem] inline-flex items-center justify-center gap-2 px-[1.7rem] rounded-full text-white text-[1rem] font-semibold"
              style={{
                background: "linear-gradient(180deg, #16a34a 0%, #0f7a3d 100%)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 10px 24px -8px rgba(11,92,48,0.55)",
              }}
            >
              <MessageCircle className="w-4.5 h-4.5" />
              <span>Mulai Tanya — Gratis</span>
            </button>
            <a
              href="#cara-kerja"
              className="care-btn-spring w-full sm:w-auto h-[3rem] inline-flex items-center justify-center gap-1.5 px-[1.7rem] rounded-full bg-white text-[#0b5c30] border border-[rgba(11,92,48,0.22)] text-[1rem] font-medium hover:bg-[#f6fbf7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a] transition-all"
            >
              <span>Lihat Cara Kerja</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center gap-3 mb-[2.5rem]">
            <div className="flex -space-x-2.5">
              {TRUST_AVATARS.map((a) => (
                <div
                  key={a.initials}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[0.7rem] font-bold shadow-sm"
                  style={{ background: a.bg, color: a.color }}
                  aria-hidden="true"
                >
                  {a.initials}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-[#fdf4d9] text-[#b8860b] flex items-center justify-center text-[0.7rem] font-bold shadow-sm">
                +
              </div>
            </div>
            <p className="text-[0.85rem] text-[#10231a]/70">
              <strong className="font-semibold text-[#0b5c30]">847+ pelaku UMKM</strong> sudah terbantu bulan ini
            </p>
          </div>
        </div>

        {/* Showcase */}
        <div
          className="max-w-[71.4rem] mx-auto relative rounded-[1.57rem] p-[1rem] sm:p-[1.14rem] pb-[1.2rem] shadow-[0_40px_80px_-24px_rgba(6,48,31,0.35)] border-gradient min-h-[27rem]"
          style={{
            backgroundColor: "#0f7a3d",
            backgroundImage: `
              radial-gradient(ellipse 60% 50% at 95% 0%, rgba(253,230,138,0.35), transparent 70%),
              radial-gradient(ellipse 70% 60% at 55% 35%, rgba(22,163,74,0.92), transparent 70%),
              radial-gradient(ellipse 80% 70% at 0% 95%, rgba(6,48,31,0.95), transparent 70%)
            `,
          }}
        >
          <div className="absolute inset-0 rounded-[1.57rem] overflow-hidden pointer-events-none">
            <NoiseOverlay className="opacity-10" />
          </div>

          <div className="relative z-10 flex items-center justify-between gap-2 pb-[0.8rem] mb-[0.8rem] border-b border-white/20">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex items-center gap-1 shrink-0">
                <span className="w-[0.4rem] h-[0.4rem] rounded-full bg-white/40" />
                <span className="w-[0.4rem] h-[0.4rem] rounded-full bg-white/40" />
                <span className="w-[0.4rem] h-[0.4rem] rounded-full bg-white/40" />
              </div>
              <span className="text-[0.85rem] font-medium text-white/90 pl-2 border-l border-white/20 truncate">
                KHB Asisten Halal · Ruang Edukasi
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-[0.7rem] py-[0.15rem] rounded-full bg-white/15 text-white text-[0.78rem] font-medium border border-white/25 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#86efac]" />
              <span className="hidden sm:inline">RAG &amp; AI Aktif</span>
              <span className="sm:hidden">Aktif</span>
            </span>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[16rem_1fr] lg:grid-cols-[16rem_1fr_14.5rem] gap-[1rem] items-stretch">
            {/* Left: topik populer */}
            <div className="hidden md:flex care-glass-card rounded-[1rem] p-[0.85rem] flex-col gap-1.5">
              <div className="flex items-center justify-between px-1.5 py-0.5 mb-0.5">
                <span className="text-[0.78rem] font-semibold text-white tracking-wider uppercase">
                  Topik Populer
                </span>
                <span className="text-[0.7rem] text-white/70">4 topik</span>
              </div>

              <div className="flex flex-col gap-[0.4rem]">
                {MOCKUP_CONVERSATIONS.map((conv, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={conv.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`text-left p-[0.6rem] px-[0.85rem] rounded-[0.85rem] transition-all duration-200 border ${
                        isActive
                          ? "bg-white/25 border-white/40 shadow-sm"
                          : "bg-white/10 hover:bg-white/15 border-white/15"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-white truncate">
                          <span className="p-0.5 rounded bg-white/20 text-[#bbf7d0]">
                            <Sparkles className="w-3 h-3" />
                          </span>
                          <span className="truncate">{conv.topic}</span>
                        </span>
                        <span className="text-[0.7rem] text-white/70 shrink-0">{conv.time}</span>
                      </div>
                      <p className="text-[0.82rem] text-white/80 line-clamp-2 leading-snug">
                        {conv.question}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Middle: chat */}
            <div className="care-glass-card rounded-[1rem] p-[1rem] sm:p-[1.14rem] flex flex-col h-full min-h-[22.8rem]">
              <div className="flex-1">
                <div className="flex items-center justify-between pb-[0.7rem] mb-[0.85rem] border-b border-white/20">
                  <div className="flex items-center gap-2">
                    <div className="w-[1.9rem] h-[1.9rem] rounded-full bg-white/20 flex items-center justify-center text-[#bbf7d0] border border-white/30">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[0.92rem] font-semibold text-white">Asisten Halal KHB</div>
                      <div className="text-[0.71rem] text-white/70 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#86efac]" />
                        Online · Basis dokumen BPJPH
                      </div>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-white/12 border border-white/20 text-[0.7rem] text-white/80">
                    {current.topic}
                  </span>
                </div>

                <div className="space-y-[0.85rem]">
                  <div className="flex flex-col items-end">
                    <div className="max-w-[88%] bg-white/20 border border-white/30 rounded-[0.85rem] rounded-tr-xs px-[0.92rem] py-[0.64rem] text-white text-[0.92rem] leading-relaxed">
                      {current.question}
                    </div>
                  </div>

                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-1.5 mb-1 ml-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#86efac]" />
                      <span className="text-[0.78rem] font-semibold text-[#bbf7d0]">Dijawab AI</span>
                    </div>

                    <div className="max-w-[94%] bg-white text-[#10231a] rounded-[0.85rem] rounded-tl-xs px-[0.92rem] py-[0.7rem] shadow-md border border-[rgba(22,163,74,0.15)]">
                      <p className="text-[0.92rem] leading-relaxed mb-2 min-h-[3.4rem]">
                        {current.answer.slice(0, typedLength)}
                        {isTyping && (
                          <span className="inline-block w-1.5 h-3 bg-[#16a34a] ml-1 animate-pulse" />
                        )}
                      </p>

                      <div className="inline-flex items-center gap-1.5 px-[0.57rem] py-[0.14rem] rounded-md bg-[#f6fbf7] border border-[rgba(22,163,74,0.2)] text-[0.78rem] font-medium text-[#0b5c30]">
                        <FileText className="w-3 h-3 text-[#0f7a3d]" />
                        <span className="truncate">Sumber: {current.source}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-[1.2rem] pt-[0.85rem] border-t border-white/20 flex items-center gap-2">
                <button
                  type="button"
                  onClick={onOpenChat}
                  className="flex-1 text-left bg-white/10 rounded-full px-3 py-[0.4rem] text-[0.78rem] text-white/70 border border-white/20 truncate hover:bg-white/15 transition-colors"
                >
                  Tulis pertanyaan seputar halal...
                </button>
                <button
                  type="button"
                  onClick={onOpenChat}
                  aria-label="Buka asisten halal"
                  className="w-[1.9rem] h-[1.9rem] rounded-full bg-white/20 hover:bg-white/30 text-[#bbf7d0] flex items-center justify-center shrink-0 transition-colors"
                >
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: basis dokumen */}
            <div className="hidden lg:flex care-glass-card rounded-[1rem] p-[1rem] flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between pb-[0.7rem] mb-[0.7rem] border-b border-white/20">
                  <div className="flex items-center gap-1.5 text-[0.78rem] font-semibold text-white uppercase tracking-wider">
                    <FileText className="w-3.5 h-3.5 text-[#bbf7d0]" />
                    <span>Basis Dokumen</span>
                  </div>
                </div>

                <div className="space-y-[0.57rem]">
                  {HERO_DOCS.map((doc) => (
                    <div
                      key={doc.file}
                      className="p-[0.57rem] rounded-[0.57rem] bg-white/10 border border-white/20 hover:bg-white/15 transition-colors"
                      title={doc.name}
                    >
                      <div className="flex items-start gap-1.5 mb-1">
                        <FileText className="w-3 h-3 text-[#bbf7d0] mt-0.5 shrink-0" />
                        <span className="text-[0.8rem] font-medium text-white leading-snug line-clamp-3">
                          {doc.name}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[0.7rem]">
                        <span className="text-white/60">{doc.pages}</span>
                        <span className="inline-flex items-center gap-1 text-[#bbf7d0]">
                          <CircleCheckBig className="w-2.5 h-2.5" />
                          <span>Terindeks</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-[1.2rem] pt-[0.85rem] border-t border-white/20 flex items-center gap-1.5 text-white/80">
                <ShieldCheck className="w-3.5 h-3.5 text-[#bbf7d0] shrink-0" />
                <span className="text-[0.7rem] leading-tight">
                  Setiap jawaban wajib punya rujukan dokumen
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
