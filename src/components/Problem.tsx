import { Layers, FileWarning, Clock } from "lucide-react";
import IconTile from "./IconTile";
import { PROBLEMS } from "../data/content";

export default function Problem() {
  const icons = [Layers, FileWarning, Clock];

  return (
    <section className="relative w-full py-[4.28rem] md:py-[3.42rem] sm:py-[2.85rem] bg-[#fdf9ec] overflow-hidden">
      <div className="absolute inset-0 bg-dots-deep opacity-80 z-0 pointer-events-none" />

      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-[2rem]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-[rgba(180,134,11,0.25)] text-[#8a6508] text-[0.78rem] font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a017]" />
            Tantangan di lapangan
          </div>
          <h2 className="text-[2rem] md:text-[1.71rem] sm:text-[1.57rem] font-bold text-[#06301f] leading-[1.15] tracking-[-0.015em]">
            Edukasi halal masih{" "}
            <span className="text-accent-gradient">sulit dijangkau</span> UMKM.
          </h2>
          <p className="mt-3 text-[1rem] text-[#10231a]/70 leading-[1.6] max-w-xl mx-auto">
            Tiga hambatan yang paling sering dikeluhkan pelaku usaha mikro dan kecil di Bandung.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1rem]">
          {PROBLEMS.map((item, idx) => {
            const Icon = icons[idx] ?? Layers;
            const isDark = idx === 1;
            const colorClass = isDark ? "text-[#bbf7d0]" : "text-white";

            return (
              <div
                key={item.title}
                className={`rounded-[1.3rem] p-[1.3rem] flex flex-col justify-between group overflow-hidden transition-all duration-300 ${
                  isDark
                    ? "grad-deep text-white shadow-[0_20px_40px_-16px_rgba(6,48,31,0.45)] border border-white/10"
                    : "card-elevated"
                }`}
              >
                <div className="relative z-10">
                  <div className="mb-3.5">
                    <IconTile
                      icon={<Icon className={`w-5 h-5 ${colorClass}`} strokeWidth={2} />}
                      variant={isDark ? "dark" : "gold"}
                      size="lg"
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
                  className={`relative z-10 mt-[1.2rem] pt-[0.85rem] border-t flex items-center gap-2 ${
                    isDark ? "border-white/12" : "border-[rgba(22,163,74,0.10)]"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-[#bbf7d0]" : "bg-[#d4a017]"}`} />
                  <span
                    className={`text-[0.78rem] font-bold uppercase tracking-wider ${
                      isDark ? "text-[#bbf7d0]" : "text-[#8a6508]"
                    }`}
                  >
                    {item.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="fade-to-white" />
    </section>
  );
}
