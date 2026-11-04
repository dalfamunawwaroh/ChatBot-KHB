import { useState } from "react";
import { ChevronDown, MessageCircle, HelpCircle } from "lucide-react";
import { FAQS } from "../data/content";

interface FAQProps {
  onOpenChat?: () => void;
}

export default function FAQ({ onOpenChat }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative w-full py-[4.28rem] md:py-[3.42rem] sm:py-[2.85rem] bg-[#f6fbf7] overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />

      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-[2rem] items-start">
          <div className="lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[rgba(22,163,74,0.18)] text-[#0b5c30] text-[0.78rem] font-semibold mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              FAQ
            </div>
            <h2 className="text-[2rem] md:text-[1.85rem] font-bold text-[#06301f] leading-[1.15] tracking-[-0.015em] mb-3">
              Pertanyaan yang{" "}
              <span className="text-accent-gradient">sering diajukan</span>.
            </h2>
            <p className="text-[0.95rem] text-[#10231a]/70 leading-[1.65] mb-6 max-w-sm">
              Belum menemukan jawabannya? Asisten AI tersedia 24 jam, dan pendamping PPH siap
              membantu pada jam kerja.
            </p>

            <div className="rounded-[1.3rem] p-[1.4rem] grad-deep text-white relative overflow-hidden">
              <div className="aurora absolute -bottom-16 -right-10 w-[14rem] h-[14rem] bg-[#86efac] opacity-20 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-[#bbf7d0] mb-3">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h3 className="text-[1.1rem] font-bold mb-1.5">Masih ada pertanyaan?</h3>
                <p className="text-[0.85rem] text-white/75 leading-relaxed mb-4">
                  Tanyakan langsung ke asisten halal — gratis, tanpa perlu membuat akun.
                </p>
                <button
                  type="button"
                  onClick={onOpenChat}
                  className="care-btn-spring w-full h-[2.6rem] rounded-full bg-white text-[#0b5c30] text-[0.9rem] font-bold hover:bg-[#eaf6ee] transition-colors"
                >
                  Tanya Asisten AI
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.question}
                  className={`rounded-[1.1rem] border transition-all duration-200 ${
                    isOpen
                      ? "bg-white border-[rgba(22,163,74,0.28)] shadow-[0_16px_36px_-28px_rgba(6,48,31,0.5)]"
                      : "bg-white/70 border-[rgba(22,163,74,0.12)] hover:border-[rgba(22,163,74,0.24)]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left px-[1.14rem] py-[0.95rem]"
                  >
                    <span className="text-[0.95rem] font-semibold text-[#06301f] leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4.5 h-4.5 shrink-0 text-[#0f7a3d] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-[1.14rem] pb-[1rem] -mt-1">
                      <p className="text-[0.9rem] text-[#10231a]/70 leading-relaxed border-t border-[rgba(22,163,74,0.10)] pt-3">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
