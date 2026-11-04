import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { NAV_LINKS } from "../data/content";
import KhbLogoMark from "./KhbLogoMark";

interface NavbarProps {
  onOpenChat?: () => void;
}

export default function Navbar({ onOpenChat }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => setMobileMenuOpen(false);

  const handleChatClick = (e: React.MouseEvent) => {
    if (onOpenChat) {
      e.preventDefault();
      onOpenChat();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav
        className="relative w-full overflow-hidden border-b border-[rgba(22,163,74,0.14)] transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(20px) saturate(150%)",
          WebkitBackdropFilter: "blur(20px) saturate(150%)",
          boxShadow: "0 8px 24px -18px rgba(6,48,31,0.35)",
        }}
        aria-label="Navigasi Utama"
      >
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 28% 120% at 100% 0%, rgba(134,239,172,0.22) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[1120px] mx-auto px-5 sm:px-6 h-[60px] flex items-center justify-between gap-4">
          <a
            href="#beranda"
            className="group flex items-center gap-2.5 rounded-lg p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a]"
            aria-label="Komunitas Halal Bandung — Beranda"
          >
            <KhbLogoMark size={30} />
            <div className="leading-none">
              <div className="text-[15px] font-extrabold tracking-tight text-[#06301f]">
                komunitas<span className="text-[#16a34a]">halal</span>
              </div>
              <div className="mt-1 text-[8.5px] font-bold tracking-[0.18em] text-[#0b5c30]/55">
                BANDUNG
              </div>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-[#10231a]/75 hover:text-[#0b5c30] hover:bg-[#eaf6ee] transition-colors duration-200 rounded-full px-3.5 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenChat}
              className="care-btn-spring h-[36px] px-[18px] inline-flex items-center gap-1.5 text-[13px] font-semibold rounded-full text-white shadow-[0_8px_20px_-8px_rgba(11,92,48,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a] focus-visible:ring-offset-2 transition-all whitespace-nowrap"
              style={{ background: "linear-gradient(180deg, #16a34a 0%, #0f7a3d 100%)" }}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Tanya Asisten
            </button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={onOpenChat}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-full text-white whitespace-nowrap"
              style={{ background: "linear-gradient(180deg, #16a34a 0%, #0f7a3d 100%)" }}
            >
              Tanya
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#0b5c30] hover:bg-[#eaf6ee] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a]"
              aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" strokeWidth={2} /> : <Menu className="w-6 h-6" strokeWidth={2} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden relative z-10 bg-white/98 backdrop-blur-xl border-t border-[rgba(22,163,74,0.14)] px-5 py-4">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="text-[15px] font-medium text-[#10231a]/80 hover:text-[#0b5c30] py-2.5 border-b border-[rgba(22,163,74,0.08)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={(e) => {
                    handleNavClick();
                    handleChatClick(e);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-full text-white py-2.5 px-6 shadow-md"
                  style={{ background: "linear-gradient(180deg, #16a34a 0%, #0f7a3d 100%)" }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Coba Asisten Halal
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
