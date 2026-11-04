import { Scale, Lock, TriangleAlert } from "lucide-react";
import IconTile from "./IconTile";
import { ETHICS_POINTS } from "../data/content";

export default function Ethics() {
  const icons = [Scale, Lock, TriangleAlert];

  return (
    <section id="etika" className="relative w-full py-[4.28rem] md:py-[3.42rem] sm:py-[2.85rem] bg-white">
      <div className="max-w-[80rem] mx-auto px-5 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-[2rem]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdf4d9] border border-[rgba(180,134,11,0.25)] text-[#8a6508] text-[0.78rem] font-semibold mb-3">
            <Scale className="w-3.5 h-3.5" />
            Etika &amp; tanggung jawab
          </div>
          <h2 className="text-[2rem] md:text-[1.71rem] sm:text-[1.57rem] font-bold text-[#06301f] leading-[1.15] tracking-[-0.015em]">
            Menjawab soal halal butuh{" "}
            <span className="text-accent-gradient">kehati-hatian</span>.
          </h2>
          <p className="mt-3 text-[1rem] text-[#10231a]/70 leading-[1.6] max-w-xl mx-auto">
            Asisten ini dirancang untuk edukasi, bukan menggantikan fatwa atau keputusan resmi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1rem]">
          {ETHICS_POINTS.map((item, idx) => {
            const Icon = icons[idx] ?? Scale;
            const isDark = idx === 2;
            const iconColor = isDark ? "text-[#bbf7d0]" : "text-white";

            return (
              <div
                key={item.title}
                className={`rounded-[1.3rem] p-[1.4rem] flex flex-col justify-between group relative overflow-hidden transition-all duration-300 ${
                  isDark ? "grad-deep text-white shadow-lg border border-white/10" : "card-elevated"
                }`}
              >
                <div className="relative z-10">
                  <div className="mb-4">
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
                  className={`relative z-10 mt-5 pt-3 border-t flex items-center gap-2 ${
                    isDark ? "border-white/12" : "border-[rgba(22,163,74,0.10)]"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-[#bbf7d0]" : "bg-[#0f7a3d]"}`} />
                  <span
                    className={`text-[0.75rem] font-bold uppercase tracking-wider ${
                      isDark ? "text-[#bbf7d0]" : "text-[#0b5c30]"
                    }`}
                  >
                    Prinsip KHB
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-[0.8rem] text-[#10231a]/50 max-w-2xl mx-auto leading-relaxed">
          Asisten Halal KHB bukan lembaga sertifikasi. Penetapan halal hanya dilakukan oleh BPJPH
          melalui proses yang berlaku. Untuk kasus produk khusus, konsultasikan dengan Pendamping PPH.
        </p>
      </div>
    </section>
  );
}
