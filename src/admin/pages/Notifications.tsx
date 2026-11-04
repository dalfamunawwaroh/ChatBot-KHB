import { useState } from "react";
import { Bell, MessageCircle, CheckCheck, Check, Inbox } from "lucide-react";
import { useAdmin } from "../AdminContext";

export default function Notifications() {
  const { notifications, unreadCount, markRead, markAllRead } = useAdmin();
  const [filter, setFilter] = useState<"semua" | "belum">("semua");

  const rows = notifications.filter((item) => (filter === "belum" ? !item.read : true));

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-[1.5rem] font-extrabold text-[#06301f] tracking-[-0.02em] leading-tight">
            Notifikasi
          </h1>
          <p className="text-[0.86rem] text-[#10231a]/60 mt-1">
            {unreadCount > 0 ? `${unreadCount} notifikasi belum dibaca` : "Semua notifikasi sudah dibaca"}
          </p>
        </div>
        <button
          type="button"
          onClick={markAllRead}
          disabled={unreadCount === 0}
          className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-[rgba(22,163,74,0.2)] bg-white text-[#0b5c30] text-[0.8rem] font-semibold hover:bg-[#eaf6ee] transition-colors disabled:opacity-40 self-start sm:self-auto"
        >
          <CheckCheck className="w-3.5 h-3.5" />
          Tandai semua dibaca
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        {[
          { id: "semua" as const, label: "Semua", count: notifications.length },
          { id: "belum" as const, label: "Belum dibaca", count: unreadCount },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            className={`h-8 px-3.5 rounded-full text-[0.75rem] font-semibold border transition-colors ${
              filter === tab.id
                ? "bg-[#16a34a] border-[#16a34a] text-white"
                : "bg-white border-[rgba(22,163,74,0.2)] text-[#0b5c30] hover:bg-[#eaf6ee]"
            }`}
          >
            {tab.label}
            <span className={`ml-1.5 text-[0.68rem] ${filter === tab.id ? "text-white/75" : "text-[#10231a]/40"}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div className="card-elevated rounded-[1.1rem] overflow-hidden">
        <div className="divide-y divide-[rgba(22,163,74,0.08)]">
          {rows.map((item) => {
            const Icon = item.type === "chat" ? MessageCircle : Bell;
            return (
              <div
                key={item.id}
                className={`flex items-start gap-3 px-4 sm:px-5 py-3.5 transition-colors ${
                  item.read ? "bg-white" : "bg-[#f6fbf7]/80"
                }`}
              >
                <span
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                    item.type === "chat"
                      ? "bg-[#eaf6ee] border-[rgba(22,163,74,0.18)] text-[#0f7a3d]"
                      : "bg-[#fdf4d9] border-[rgba(180,134,11,0.22)] text-[#8a6508]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-2">
                    <h2 className={`text-[0.86rem] leading-snug ${item.read ? "font-medium text-[#06301f]" : "font-bold text-[#06301f]"}`}>
                      {item.title}
                    </h2>
                    {!item.read && <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mt-1.5 shrink-0" />}
                  </div>
                  <p className="text-[0.8rem] text-[#10231a]/60 leading-relaxed mt-0.5">{item.desc}</p>
                  <div className="text-[0.7rem] text-[#10231a]/40 mt-1">{item.time}</div>
                </div>

                <button
                  type="button"
                  onClick={() => markRead(item.id)}
                  disabled={item.read}
                  aria-label={`Tandai "${item.title}" sebagai dibaca`}
                  className="w-8 h-8 rounded-lg border border-[rgba(22,163,74,0.16)] bg-white text-[#0b5c30] flex items-center justify-center hover:bg-[#eaf6ee] transition-colors disabled:opacity-30 shrink-0"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}

          {rows.length === 0 && (
            <div className="px-5 py-14 text-center">
              <span className="w-12 h-12 rounded-full bg-[#eaf6ee] text-[#0f7a3d] flex items-center justify-center mx-auto mb-3">
                <Inbox className="w-5 h-5" />
              </span>
              <p className="text-[0.9rem] font-semibold text-[#06301f]">Tidak ada notifikasi</p>
              <p className="text-[0.8rem] text-[#10231a]/50 mt-1">Semua sudah dibaca. Kerja bagus!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
