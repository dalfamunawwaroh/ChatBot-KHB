import { MessageSquareText, Search, FileText, UserCheck } from "lucide-react";
import IconTile from "./IconTile";
import { HOW_IT_WORKS_STEPS } from "../data/content";

export default function HowItWorks() {
  const icons = [MessageSquareText, Search, FileText, UserCheck];

  return (
    <section
      id="cara-kerja"
      className="relative w-full py-[4.28rem] md:py-[3.42rem] sm:py-[2.85rem] bg-gradient-to-b from-[#f6fbf7] to-white overflow-hidden"
    >
      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-[2rem]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[rgba(22,163,74,0.18)] text-[#0b5c30] text-[0.78rem] font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
            Cara kerja
          </div>
          <h2 className="text-[2rem] md:text-[1.71rem] sm:text-[1.57rem] font-bold text-[#06301f] leading-[1.15] tracking-[-0.015em]">
            Dari pertanyaan, menjadi jawaban yang{" "}
            <span className="text-accent-gradient">bisa diperiksa</span>.
          </h2>
          <p className="mt-3 text-[1rem] text-[#10231a]/70 leading-[1.6] max-w-xl mx-auto">
            Empat tahap yang sama untuk setiap pertanyaan — tanpa langkah tersembunyi.
          </p>
        </div>

        <div className="relative">
          <div
            className="hidden lg:block absolute top-[2.85rem] left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-transparent z-0"
            style={{
              borderImage: "linear-gradient(to right, #16a34a, #d4a017) 1",
              opacity: 0.45,
            }}
            aria-hidden="true"
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#d4a017]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1rem] relative z-10">
            {HOW_IT_WORKS_STEPS.map((item, idx) => {
              const Icon = icons[idx] ?? FileText;
              const isDark = item.step === 4;
              const iconColor = isDark ? "text-[#bbf7d0]" : "text-white";

              return (
                <div
                  key={item.step}
                  className={`rounded-[1.3rem] p-[1.4rem] flex flex-col justify-between group relative overflow-hidden transition-all duration-300 ${
                    isDark ? "grad-deep text-white border border-white/10 shadow-lg" : "card-elevated"
                  }`}
                >
                  <div
                    className={`absolute bottom-2 right-2 text-[3.42rem] font-extrabold leading-none select-none pointer-events-none z-0 ${
                      isDark ? "text-[rgba(187,247,208,0.08)]" : "text-[rgba(22,163,74,0.07)]"
                    }`}
                    aria-hidden="true"
                  >
                    0{item.step}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-[2.14rem] h-[2.14rem] rounded-full font-bold text-[1rem] flex items-center justify-center shadow-sm ${
                          isDark ? "bg-[#bbf7d0] text-[#06301f]" : "grad-signature text-white"
                        }`}
                      >
                        {item.step}
                      </div>
                      <IconTile
                        icon={<Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={2} />}
                        variant={isDark ? "dark" : "light"}
                        size="md"
                      />
                    </div>

                    <h3
                      className={`text-[1.14rem] font-bold mb-1.5 leading-snug ${
                        isDark ? "text-white" : "text-[#06301f]"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-[0.92rem] leading-relaxed ${
                        isDark ? "text-white/75" : "text-[#10231a]/70"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>

                  <div
                    className={`relative z-10 mt-4 pt-2.5 border-t ${
                      isDark ? "border-white/12" : "border-[rgba(22,163,74,0.10)]"
                    }`}
                  >
                    <span
                      className={`text-[0.78rem] font-bold uppercase tracking-wider ${
                        isDark ? "text-[#bbf7d0]" : "text-[#0b5c30]"
                      }`}
                    >
                      Tahap 0{item.step}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
