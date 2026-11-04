import { Link } from "react-router-dom";
import {
  MessagesSquare,
  Users,
  BookOpen,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  ChevronRight,
  Download,
} from "lucide-react";
import {
  ADMIN_STATS,
  CHAT_SERIES,
  TOP_TOPICS,
  CONVERSATIONS,
} from "../../data/admin";
import { useAdmin } from "../AdminContext";

const STAT_ICONS = [MessagesSquare, Users, BookOpen, Target];

export default function Dashboard() {
  const { showToast } = useAdmin();
  const recent = CONVERSATIONS.slice(0, 5);

  const values = CHAT_SERIES.map((point) => point.value);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const chartWidth = 600;
  const chartHeight = 170;
  const paddingY = 18;

  const points = CHAT_SERIES.map((point, index) => {
    const x = (index / (CHAT_SERIES.length - 1)) * chartWidth;
    const ratio = (point.value - minValue) / Math.max(maxValue - minValue, 1);
    const y = chartHeight - paddingY - ratio * (chartHeight - paddingY * 2);
    return { x, y, ...point };
  });

  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${chartWidth},${chartHeight} L0,${chartHeight} Z`;

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-[1.6rem] font-extrabold text-[#06301f] tracking-[-0.02em] leading-tight">
            Halo, Admin 👋
          </h1>
          <p className="text-[0.88rem] text-[#10231a]/60 mt-1">
            Ringkasan aktivitas Asisten Halal KHB · 30 hari terakhir
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => showToast("Laporan ringkasan diunduh (demo)")}
            className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-[rgba(22,163,74,0.2)] bg-white text-[#0b5c30] text-[0.8rem] font-semibold hover:bg-[#eaf6ee] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Unduh laporan
          </button>
          <Link
            to="/admin/knowledge"
            className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-white text-[0.8rem] font-semibold shadow-[0_8px_18px_-8px_rgba(11,92,48,0.6)]"
            style={{ background: "linear-gradient(180deg, #16a34a 0%, #0f7a3d 100%)" }}
          >
            <Plus className="w-3.5 h-3.5" />
            Tambah dokumen
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
        {ADMIN_STATS.map((stat, index) => {
          const Icon = STAT_ICONS[index] ?? MessagesSquare;
          const isUp = stat.trend === "up";
          return (
            <div key={stat.id} className="card-elevated rounded-[1.1rem] p-4">
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="w-9 h-9 rounded-xl grad-signature text-white flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
                  <Icon className="w-4 h-4" />
                </span>
                <span
                  className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[0.68rem] font-bold ${
                    isUp ? "bg-[#eaf6ee] text-[#0b5c30]" : "bg-[#fdf4d9] text-[#8a6508]"
                  }`}
                >
                  {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.delta}
                </span>
              </div>
              <div className="text-[1.55rem] font-extrabold text-[#06301f] leading-none tracking-tight">
                {stat.value}
              </div>
              <div className="mt-1.5 text-[0.8rem] font-medium text-[#10231a]/70">{stat.label}</div>
              <div className="text-[0.7rem] text-[#10231a]/40 mt-0.5">{stat.hint}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-3.5">
        {/* Chart */}
        <div className="card-elevated rounded-[1.1rem] p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h2 className="text-[1rem] font-bold text-[#06301f]">Volume percakapan</h2>
              <p className="text-[0.78rem] text-[#10231a]/50 mt-0.5">Juni 2026 · per 2 hari</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#eaf6ee] text-[#0b5c30] text-[0.7rem] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
              1.284 total
            </span>
          </div>

          <div className="w-full overflow-hidden">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-[180px]"
              preserveAspectRatio="none"
              role="img"
              aria-label="Grafik volume percakapan bulan Juni"
            >
              <defs>
                <linearGradient id="adminChartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(22,163,74,0.28)" />
                  <stop offset="100%" stopColor="rgba(22,163,74,0)" />
                </linearGradient>
              </defs>

              {[0, 1, 2, 3].map((line) => {
                const y = paddingY + (line * (chartHeight - paddingY * 2)) / 3;
                return (
                  <line
                    key={line}
                    x1="0"
                    y1={y}
                    x2={chartWidth}
                    y2={y}
                    stroke="rgba(22,163,74,0.10)"
                    strokeWidth="1"
                    strokeDasharray="4 6"
                  />
                );
              })}

              <path d={areaPath} fill="url(#adminChartFill)" />
              <path
                d={linePath}
                fill="none"
                stroke="#16a34a"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {points.map((point, index) =>
                index === points.length - 1 ? (
                  <g key={point.label}>
                    <circle cx={point.x} cy={point.y} r="7" fill="rgba(22,163,74,0.15)" />
                    <circle cx={point.x} cy={point.y} r="3.5" fill="#16a34a" stroke="#ffffff" strokeWidth="2" />
                  </g>
                ) : null
              )}
            </svg>
          </div>

          <div className="flex items-center justify-between text-[0.7rem] text-[#10231a]/40 mt-2">
            <span>{CHAT_SERIES[0].label}</span>
            <span>{CHAT_SERIES[Math.floor(CHAT_SERIES.length / 2)].label}</span>
            <span>{CHAT_SERIES[CHAT_SERIES.length - 1].label}</span>
          </div>
        </div>

        {/* Topics */}
        <div className="card-elevated rounded-[1.1rem] p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h2 className="text-[1rem] font-bold text-[#06301f]">Topik terbanyak</h2>
              <p className="text-[0.78rem] text-[#10231a]/50 mt-0.5">Pertanyaan UMKM</p>
            </div>
            <Link to="/admin/percakapan" className="text-[0.72rem] font-semibold text-[#0b5c30] hover:underline">
              Detail
            </Link>
          </div>

          <div className="space-y-3">
            {TOP_TOPICS.map((topic) => (
              <div key={topic.label}>
                <div className="flex items-center justify-between text-[0.78rem] mb-1">
                  <span className="font-medium text-[#06301f] truncate pr-2">{topic.label}</span>
                  <span className="text-[#10231a]/45 shrink-0">{topic.count}</span>
                </div>
                <div className="h-1.5 rounded-full bg-[rgba(22,163,74,0.10)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#16a34a] to-[#86efac]"
                    style={{ width: `${topic.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent conversations */}
      <div className="card-elevated rounded-[1.1rem] overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-4 border-b border-[rgba(22,163,74,0.10)]">
          <div>
            <h2 className="text-[1rem] font-bold text-[#06301f]">Percakapan terbaru</h2>
            <p className="text-[0.78rem] text-[#10231a]/50 mt-0.5">5 dari 1.284 percakapan</p>
          </div>
          <Link
            to="/admin/percakapan"
            className="inline-flex items-center gap-1 text-[0.78rem] font-semibold text-[#0b5c30] hover:underline shrink-0"
          >
            Lihat semua
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-[rgba(22,163,74,0.08)]">
          {recent.map((row) => (
            <div key={row.id} className="flex items-center gap-3 px-4 sm:px-5 py-3 hover:bg-[#f6fbf7]/70 transition-colors">
              <div className="w-9 h-9 rounded-full bg-[#eaf6ee] border border-[rgba(22,163,74,0.14)] text-[#0b5c30] text-[0.72rem] font-bold flex items-center justify-center shrink-0">
                {row.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[0.85rem] font-semibold text-[#06301f] truncate">{row.name}</span>
                  <span className="hidden sm:inline text-[0.68rem] px-1.5 py-0.5 rounded bg-[#f6fbf7] border border-[rgba(22,163,74,0.14)] text-[#0b5c30]">
                    {row.category}
                  </span>
                </div>
                <p className="text-[0.78rem] text-[#10231a]/60 truncate">{row.question}</p>
              </div>
              <div className="hidden md:block text-[0.72rem] text-[#10231a]/40 shrink-0">{row.time}</div>
              <span
                className={`text-[0.68rem] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                  row.status === "Terjawab"
                    ? "bg-[#eaf6ee] text-[#0b5c30]"
                    : "bg-[#fdf4d9] text-[#8a6508]"
                }`}
              >
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
