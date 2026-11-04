import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, Phone, MapPin, ExternalLink, LayoutDashboard } from "lucide-react";
import { LINKS, NAV_LINKS, CONTACT_INFO } from "../data/content";
import KhbLogoMark from "./KhbLogoMark";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "./SocialIcons";

const SUMBER_HALAL = [
  { name: "BPJPH", url: LINKS.bpjph, desc: "Badan Penyelenggara Jaminan Produk Halal" },
  { name: "SIHALAL", url: LINKS.sihalal, desc: "Portal pengajuan sertifikasi halal" },
  { name: "KHB Website", url: LINKS.website, desc: "Komunitas Halal Bandung" },
];

export default function Footer() {
  return (
    <footer className="w-full grad-deep text-white border-t border-white/10">
      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 pt-[3.14rem] md:pt-[3rem] sm:pt-[2.85rem] pb-[1.57rem] relative overflow-hidden">
        <div className="aurora absolute -bottom-24 -left-24 w-80 h-80 bg-[#16a34a] opacity-20 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-[2.5rem] border-b border-white/10">
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <KhbLogoMark size={30} />
                <div className="leading-none">
                  <div className="text-[1.1rem] font-extrabold tracking-tight">
                    <span className="text-white">komunitas</span>
                    <span className="text-[#bbf7d0]">halal</span>
                  </div>
                  <div className="mt-1 text-[0.5rem] font-bold tracking-[0.18em] text-white/45">
                    BANDUNG
                  </div>
                </div>
              </div>

              <p className="text-[0.92rem] text-white/70 leading-relaxed max-w-sm mb-5">
                Asisten edukasi halal berbasis AI untuk membantu UMKM memahami sertifikasi halal
                dengan jawaban yang bersumber dari dokumen resmi.
              </p>

              <div className="flex items-center gap-2">
                <a
                  href={LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp KHB"
                  className="w-8 h-8 rounded-full bg-white/10 border border-white/15 text-[#bbf7d0] flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={LINKS.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram KHB"
                  className="w-8 h-8 rounded-full bg-white/10 border border-white/15 text-[#bbf7d0] flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={LINKS.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok KHB"
                  className="w-8 h-8 rounded-full bg-white/10 border border-white/15 text-[#bbf7d0] flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <TikTokIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="pt-5">
              <a
                href={LINKS.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-[#bbf7d0] hover:underline"
              >
                <span>Kunjungi halalbandung.com</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[0.8rem] font-bold uppercase tracking-wider text-white mb-3">
              Navigasi
            </h4>
            <ul className="space-y-2 text-[0.9rem] text-white/70">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#kontak" className="hover:text-white transition-colors">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[0.8rem] font-bold uppercase tracking-wider text-white mb-3">
              Sumber Halal
            </h4>
            <ul className="space-y-2.5 text-[0.9rem] text-white/70">
              {SUMBER_HALAL.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block hover:text-white transition-colors"
                  >
                    <div className="font-semibold text-white/90 group-hover:text-white flex items-center gap-1">
                      <span>{item.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-[0.75rem] text-white/55 leading-snug">{item.desc}</div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[0.8rem] font-bold uppercase tracking-wider text-white mb-3">
              Kontak &amp; Legal
            </h4>
            <ul className="space-y-2.5 text-[0.9rem] text-white/70">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#bbf7d0] mt-0.5 shrink-0" />
                <span className="break-all">{CONTACT_INFO.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#bbf7d0] mt-0.5 shrink-0" />
                <span>{CONTACT_INFO.whatsappNumber}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#bbf7d0] mt-0.5 shrink-0" />
                <span className="leading-snug">Kota Bandung, Jawa Barat</span>
              </li>
            </ul>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[0.75rem] text-white/55">
              <a href="#etika" className="hover:text-white transition-colors">
                Disclaimer AI
              </a>
              <a href="#etika" className="hover:text-white transition-colors">
                Privasi Data
              </a>
              <a href="#etika" className="hover:text-white transition-colors">
                Batas Edukatif
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-[1.5rem] flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.75rem] text-white/55">
          <div>© 2026 Komunitas Halal Bandung. Hak cipta dilindungi.</div>
          <div className="flex items-center gap-4">
            <span>Prototipe PKM · Data demo</span>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 hover:text-[#bbf7d0] transition-colors"
            >
              <LayoutDashboard className="w-3 h-3" />
              Panel admin
            </Link>
            <a href={LINKS.bpjph} target="_blank" rel="noopener noreferrer" className="hover:text-[#bbf7d0] transition-colors">
              halal.go.id
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
