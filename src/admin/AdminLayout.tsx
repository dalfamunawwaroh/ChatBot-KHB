import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MessagesSquare,
  BookOpen,
  Bell,
  Settings,
  Menu,
  X,
  ArrowUpRight,
  LogOut,
  Home,
  Sparkles,
} from "lucide-react";
import KhbLogoMark from "../components/KhbLogoMark";
import { ADMIN_USER } from "../data/admin";
import { useAdmin } from "./AdminContext";

const NAV_ITEMS = [
  { to: "/admin", label: "Ringkasan", icon: LayoutDashboard, end: true },
  { to: "/admin/percakapan", label: "Percakapan", icon: MessagesSquare, end: false },
  { to: "/admin/knowledge", label: "Knowledge Base", icon: BookOpen, end: false },
  { to: "/admin/notifikasi", label: "Notifikasi", icon: Bell, end: false },
  { to: "/admin/pengaturan", label: "Pengaturan", icon: Settings, end: false },
];

const PAGE_TITLES: Record<string, string> = {
  "/admin": "Ringkasan",
  "/admin/percakapan": "Percakapan",
  "/admin/knowledge": "Knowledge Base",
  "/admin/notifikasi": "Notifikasi",
  "/admin/pengaturan": "Pengaturan",
};

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { unreadCount, toast } = useAdmin();

  const currentTitle = PAGE_TITLES[location.pathname] ?? "Admin";

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.title = `${currentTitle} · KHB Admin`;
  }, [currentTitle]);

  useEffect(() => {
    if (!sidebarOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#10231a]">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[16.5rem] flex-col bg-white border-r border-[rgba(22,163,74,0.14)] z-40">
        <SidebarContent unreadCount={unreadCount} />
      </aside>

      {/* Sidebar mobile */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-[#06301f]/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative z-10 w-[17rem] h-full bg-white border-r border-[rgba(22,163,74,0.14)] flex flex-col shadow-2xl">
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              aria-label="Tutup menu"
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#f6fbf7] border border-[rgba(22,163,74,0.16)] text-[#0b5c30] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
            <SidebarContent unreadCount={unreadCount} />
          </aside>
        </div>
      )}

      <div className="lg:pl-[16.5rem] flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-30 h-[62px] shrink-0 bg-white/90 backdrop-blur-xl border-b border-[rgba(22,163,74,0.14)]">
          <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                aria-label="Buka menu"
                className="lg:hidden w-9 h-9 rounded-lg border border-[rgba(22,163,74,0.16)] bg-white text-[#0b5c30] flex items-center justify-center"
              >
                <Menu className="w-4.5 h-4.5" />
              </button>
              <div className="flex items-center gap-1.5 text-[0.8rem] text-[#10231a]/50 min-w-0">
                <span className="hidden sm:inline">Workspace</span>
                <span className="hidden sm:inline text-[#10231a]/25">/</span>
                <strong className="font-semibold text-[#06301f] truncate">{currentTitle}</strong>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fdf4d9] border border-[rgba(180,134,11,0.25)] text-[#8a6508] text-[0.68rem] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4a017]" />
                Prototipe
              </span>

              <Link
                to="/admin/notifikasi"
                aria-label="Buka notifikasi"
                className="relative w-9 h-9 rounded-lg border border-[rgba(22,163,74,0.16)] bg-white text-[#0b5c30] flex items-center justify-center hover:bg-[#eaf6ee] transition-colors"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[1.05rem] h-[1.05rem] px-1 rounded-full bg-[#16a34a] text-white text-[0.62rem] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Link>

              <Link
                to="/"
                className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-[rgba(22,163,74,0.16)] bg-white text-[#0b5c30] text-[0.8rem] font-semibold hover:bg-[#eaf6ee] transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                Lihat situs
              </Link>

              <div className="flex items-center gap-2 pl-2 border-l border-[rgba(22,163,74,0.14)]">
                <div className="w-8 h-8 rounded-full grad-signature text-white text-[0.72rem] font-bold flex items-center justify-center">
                  {ADMIN_USER.initials}
                </div>
                <div className="hidden md:block leading-tight">
                  <div className="text-[0.78rem] font-semibold text-[#06301f]">{ADMIN_USER.name}</div>
                  <div className="text-[0.68rem] text-[#10231a]/50">{ADMIN_USER.role}</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 py-5 sm:py-6">
          <Outlet />
        </main>

        <footer className="px-4 sm:px-6 py-4 border-t border-[rgba(22,163,74,0.10)] text-[0.72rem] text-[#10231a]/45 flex flex-col sm:flex-row items-center justify-between gap-1">
          <span>© 2026 Komunitas Halal Bandung · Panel admin prototipe</span>
          <span>Data demo · belum terhubung ke backend</span>
        </footer>
      </div>

      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] px-4 py-2.5 rounded-full bg-[#06301f] text-white text-[0.82rem] font-medium shadow-[0_16px_40px_-12px_rgba(6,48,31,0.6)]">
          {toast}
        </div>
      )}
    </div>
  );
}

function SidebarContent({ unreadCount }: { unreadCount: number }) {
  return (
    <>
      <div className="h-[62px] shrink-0 flex items-center px-5 border-b border-[rgba(22,163,74,0.12)]">
        <Link to="/admin" className="flex items-center gap-2.5" aria-label="KHB Admin — Ringkasan">
          <KhbLogoMark size={28} />
          <div className="leading-none">
            <div className="text-[0.92rem] font-extrabold tracking-tight text-[#06301f]">
              komunitas<span className="text-[#16a34a]">halal</span>
            </div>
            <div className="mt-1 text-[0.5rem] font-bold tracking-[0.18em] text-[#0b5c30]/50">
              BANDUNG · ADMIN
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Menu admin">
        <div className="px-2 pb-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#10231a]/35">
          Utama
        </div>
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `group flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[0.85rem] font-medium transition-colors ${
                    isActive
                      ? "bg-[#eaf6ee] text-[#0b5c30] font-semibold"
                      : "text-[#10231a]/65 hover:bg-[#f6fbf7] hover:text-[#0b5c30]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? "bg-white text-[#16a34a] shadow-sm"
                          : "bg-[#f6fbf7] text-[#0f7a3d]/70 group-hover:bg-white"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {item.to === "/admin/notifikasi" && unreadCount > 0 && (
                      <span className="min-w-[1.15rem] h-[1.15rem] px-1 rounded-full bg-[#16a34a] text-white text-[0.62rem] font-bold flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      <div className="px-3 pb-3">
        <div className="rounded-[1rem] p-3.5 bg-[#f6fbf7] border border-[rgba(22,163,74,0.14)]">
          <div className="w-8 h-8 rounded-lg bg-white text-[#16a34a] border border-[rgba(22,163,74,0.16)] flex items-center justify-center mb-2">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-[0.8rem] font-bold text-[#06301f] mb-0.5">Butuh bantuan?</div>
          <p className="text-[0.72rem] text-[#10231a]/55 leading-snug mb-2">
            Tim KHB siap membantu operasional asisten.
          </p>
          <a
            href="https://halalbandung.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[0.72rem] font-semibold text-[#0b5c30] hover:underline"
          >
            Kunjungi KHB
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="px-3 pb-3">
        <Link
          to="/admin/pengaturan"
          className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-[#f6fbf7] transition-colors"
        >
          <div className="w-9 h-9 rounded-full grad-signature text-white text-[0.78rem] font-bold flex items-center justify-center shrink-0">
            {ADMIN_USER.initials}
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="text-[0.8rem] font-semibold text-[#06301f] truncate">{ADMIN_USER.name}</div>
            <div className="text-[0.68rem] text-[#10231a]/50 truncate">{ADMIN_USER.role}</div>
          </div>
          <LogOut className="w-3.5 h-3.5 text-[#10231a]/30" />
        </Link>
      </div>
    </>
  );
}
