import { MessageCircle, ArrowRight, ShieldCheck, Sparkles, Clock } from "lucide-react";
import { LINKS } from "../data/content";
import NoiseOverlay from "./NoiseOverlay";

interface CTAProps {
  onOpenChat?: () => void;
}

export default function CTA({ onOpenChat }: CTAProps) {
  return (
    <section id="tanya" className="relative w-full py-[4.28rem] md:py-[3.42rem] sm:py-[2.85rem] bg-white">
      <div className="max-w-[80rem] mx-auto px-5 sm:px-6">
        <div className="relative rounded-[1.57rem] overflow-hidden p-[2.2rem] sm:p-[2.57rem] text-center shadow-[0_20px_50px_rgba(11,92,48,0.25)] border border-white/10 grad-signature">
          <NoiseOverlay className="opacity-15" />

          <div className="aurora absolute -top-20 -right-20 w-[25rem] h-[25rem] bg-[#fde68a] opacity-25 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 border border-white/25 text-[#bbf7d0] text-[0.8rem] font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mulai sekarang · Tanpa akun</span>
            </div>

            <h2 className="text-[1.85rem] font-bold text-white leading-[1.15] tracking-[-0.015em] mb-4 text-balance">
              Siap memahami sertifikasi halal{" "}
              <span className="text-[#fde68a]">tanpa bingung</span>?
            </h2>

            <p className="text-[1.07rem] text-white/85 leading-[1.6] max-w-xl mb-8">
              Tanyakan langsung ke asisten halal KHB, atau hubungi pendamping untuk kasus usaha Anda.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-[1rem] w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenChat}
                className="care-btn-spring w-full sm:w-auto h-[3rem] inline-flex items-center justify-center gap-2 px-6 rounded-full bg-white text-[#0b5c30] text-[1rem] font-bold shadow-lg hover:bg-[#f6fbf7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-all whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Tanya Asisten Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="care-btn-spring w-full sm:w-auto h-[3rem] inline-flex items-center justify-center gap-2 px-6 rounded-full bg-transparent text-white border border-white/30 text-[1rem] font-medium hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-all whitespace-nowrap"
              >
                <span>Hubungi Pendamping</span>
              </a>
            </div>

            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2 text-[0.78rem] text-white/80">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#bbf7d0]" />
                Gratis untuk UMKM
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#bbf7d0]" />
                Aktif 24 jam
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#bbf7d0]" />
                Berbasis dokumen BPJPH
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
