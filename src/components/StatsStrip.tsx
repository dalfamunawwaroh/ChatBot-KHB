import { STATS, MARQUEE_ITEMS } from "../data/content";

export default function StatsStrip() {
  return (
    <section className="relative w-full bg-white pt-[0.5rem] pb-[2.5rem]">
      <div className="max-w-[1120px] mx-auto px-5 sm:px-6">
        <div className="rounded-[1.3rem] border border-[rgba(22,163,74,0.14)] bg-[#f6fbf7] px-4 py-5 sm:px-8 sm:py-6 shadow-[0_18px_40px_-30px_rgba(6,48,31,0.5)]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-5">
            {STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center text-center px-2 ${
                  idx !== 0 ? "lg:border-l lg:border-[rgba(22,163,74,0.14)]" : ""
                }`}
              >
                <strong className="text-[1.5rem] font-extrabold text-[#0b5c30] leading-none tracking-tight">
                  {stat.value}
                </strong>
                <span className="mt-1.5 text-[0.78rem] font-medium text-[#10231a]/60">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 relative overflow-hidden border-y border-[rgba(22,163,74,0.10)] bg-white py-3">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
            {[0, 1].map((loop) => (
              <div key={loop} className="flex items-center gap-8" aria-hidden={loop === 1}>
                {MARQUEE_ITEMS.map((item) => (
                  <span
                    key={`${loop}-${item}`}
                    className="inline-flex items-center gap-2 text-[0.8rem] font-semibold text-[#0b5c30]/60"
                  >
                    <span className="text-[#16a34a]">✦</span>
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
