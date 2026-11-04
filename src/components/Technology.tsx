import { Bot, SearchCode, ShieldCheck } from "lucide-react";
import IconTile from "./IconTile";
import { TECHNOLOGIES } from "../data/content";
import NoiseOverlay from "./NoiseOverlay";

export default function Technology() {
  const icons = [Bot, SearchCode, ShieldCheck];

  return (
    <section
      id="teknologi"
      className="relative w-full py-[4.28rem] md:py-[3.42rem] sm:py-[2.85rem] text-white overflow-hidden grad-deep"
    >
      <div
        className="absolute inset-0 bg-grid opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(187,247,208,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(187,247,208,0.06) 1px, transparent 1px)",
        }}
      />

      <div className="aurora absolute -top-12 -right-12 w-[21rem] h-[21rem] bg-[#86efac] opacity-15 pointer-events-none" />
      <div className="aurora absolute -bottom-12 -left-12 w-[20rem] h-[20rem] bg-[#fde68a] opacity-12 pointer-events-none" />

      <NoiseOverlay className="opacity-10" />

      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-[2rem]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#bbf7d0] text-[0.78rem] font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#bbf7d0]" />
            Teknologi
          </div>
          <h2 className="text-[2rem] md:text-[1.71rem] sm:text-[1.57rem] font-bold text-white leading-[1.15] tracking-[-0.015em]">
            AI + RAG + <span className="text-[#bbf7d0]">JEV</span>
          </h2>
          <p className="mt-3 text-[1.07rem] text-white/85 leading-[1.6] max-w-[580px] mx-auto text-balance">
            Tiga pilar yang menjaga jawaban tetap relevan, bersumber, dan bisa
            dipertanggungjawabkan — penting untuk topik kehalalan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1rem]">
          {TECHNOLOGIES.map((tech, idx) => {
            const Icon = icons[idx] ?? Bot;
            const eyebrowColor = tech.title === "RAG" ? "text-[#fde68a]" : "text-[#bbf7d0]";

            return (
              <div
                key={tech.title}
                className="care-glass-card rounded-[1.3rem] p-[1.57rem] flex flex-col justify-between group relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(134,239,172,0.15)]"
              >
                <div className="relative z-10">
                  <div className="mb-4">
                    <IconTile
                      icon={<Icon className="w-5 h-5 text-[#bbf7d0]" strokeWidth={2} />}
                      variant="dark"
                      size="lg"
                    />
                  </div>

                  <div className="mb-2">
                    <span className={`text-[0.75rem] font-bold uppercase tracking-wider ${eyebrowColor}`}>
                      {tech.subtitle}
                    </span>
                    <h3 className="text-[1.42rem] font-extrabold text-white mt-0.5">{tech.title}</h3>
                  </div>

                  <p className="text-[0.92rem] text-white/90 leading-relaxed mt-3">{tech.desc}</p>
                </div>

                <div className="relative z-10 mt-6 pt-3.5 border-t border-white/10 flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${tech.title === "RAG" ? "bg-[#fde68a]" : "bg-[#bbf7d0]"}`} />
                  <span className={`text-[0.85rem] font-semibold ${eyebrowColor}`}>
                    Fondasi keandalan sistem
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
