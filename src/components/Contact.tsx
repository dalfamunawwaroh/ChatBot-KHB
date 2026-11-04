import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CircleCheckBig, Store, User } from "lucide-react";
import { CONTACT_INFO, LINKS } from "../data/content";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "./SocialIcons";

export default function Contact() {
  const [form, setForm] = useState({ name: "", business: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="kontak" className="relative w-full py-[4.28rem] md:py-[3.42rem] sm:py-[2.85rem] bg-[#f6fbf7] overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />

      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-[2rem] items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[rgba(22,163,74,0.18)] text-[#0b5c30] text-[0.78rem] font-semibold mb-3">
              <Mail className="w-3.5 h-3.5" />
              Kontak
            </div>
            <h2 className="text-[2rem] md:text-[1.85rem] font-bold text-[#06301f] leading-[1.15] tracking-[-0.015em] mb-3">
              Butuh pendampingan{" "}
              <span className="text-accent-gradient">langsung</span>?
            </h2>
            <p className="text-[0.95rem] text-[#10231a]/70 leading-[1.65] mb-7 max-w-md">
              Tim Komunitas Halal Bandung membuka pendampingan untuk UMKM di Bandung dan sekitarnya.
              Sampaikan kebutuhan Anda, kami akan menghubungi kembali.
            </p>

            <ul className="space-y-4 mb-7">
              <li className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-lg bg-white border border-[rgba(22,163,74,0.16)] text-[#0f7a3d] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-[0.72rem] font-bold uppercase tracking-wider text-[#10231a]/45">
                    Email
                  </div>
                  <a
                    href={LINKS.email}
                    className="text-[0.92rem] font-medium text-[#06301f] hover:text-[#0f7a3d] transition-colors break-all"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-lg bg-white border border-[rgba(22,163,74,0.16)] text-[#0f7a3d] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-[0.72rem] font-bold uppercase tracking-wider text-[#10231a]/45">
                    WhatsApp
                  </div>
                  <a
                    href={LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.92rem] font-medium text-[#06301f] hover:text-[#0f7a3d] transition-colors"
                  >
                    {CONTACT_INFO.whatsappNumber}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-lg bg-white border border-[rgba(22,163,74,0.16)] text-[#0f7a3d] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-[0.72rem] font-bold uppercase tracking-wider text-[#10231a]/45">
                    Sekretariat
                  </div>
                  <p className="text-[0.92rem] font-medium text-[#06301f] leading-snug">
                    {CONTACT_INFO.officeAddress}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-lg bg-white border border-[rgba(22,163,74,0.16)] text-[#0f7a3d] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-[0.72rem] font-bold uppercase tracking-wider text-[#10231a]/45">
                    Jam layanan
                  </div>
                  <p className="text-[0.92rem] font-medium text-[#06301f] leading-snug">
                    {CONTACT_INFO.operatingHours}
                  </p>
                </div>
              </li>
            </ul>

            <div className="flex items-center gap-2.5">
              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Komunitas Halal Bandung"
                className="w-9 h-9 rounded-full bg-white border border-[rgba(22,163,74,0.16)] text-[#0b5c30] flex items-center justify-center hover:bg-[#eaf6ee] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href={LINKS.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Komunitas Halal Bandung"
                className="w-9 h-9 rounded-full bg-white border border-[rgba(22,163,74,0.16)] text-[#0b5c30] flex items-center justify-center hover:bg-[#eaf6ee] transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={LINKS.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Komunitas Halal Bandung"
                className="w-9 h-9 rounded-full bg-white border border-[rgba(22,163,74,0.16)] text-[#0b5c30] flex items-center justify-center hover:bg-[#eaf6ee] transition-colors"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="card-elevated rounded-[1.3rem] p-[1.4rem] sm:p-[1.7rem]">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-[#eaf6ee] border border-[rgba(22,163,74,0.2)] text-[#16a34a] flex items-center justify-center mx-auto mb-4">
                  <CircleCheckBig className="w-9 h-9" />
                </div>
                <h3 className="text-[1.3rem] font-bold text-[#06301f] mb-2">Pesan terkirim!</h3>
                <p className="text-[0.92rem] text-[#10231a]/70 max-w-sm mx-auto mb-6 leading-relaxed">
                  Tim Komunitas Halal Bandung akan menghubungi Anda melalui WhatsApp pada jam kerja.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", business: "", phone: "", message: "" });
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#16a34a] text-white text-[0.92rem] font-semibold hover:bg-[#0f7a3d] transition-colors"
                >
                  Kirim pesan lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-[1rem]">
                <div>
                  <label htmlFor="contact-name" className="block text-[0.72rem] font-bold text-[#0b5c30] uppercase tracking-wider mb-1.5">
                    Nama lengkap
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#0f7a3d] absolute left-3.5 top-3.5" />
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Contoh: Rina Amelia"
                      className="w-full pl-10 pr-4 py-2.5 text-[0.95rem] rounded-xl border border-[rgba(22,163,74,0.2)] bg-white focus:border-[#16a34a] focus:ring-2 focus:ring-[#bbf7d0] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-business" className="block text-[0.72rem] font-bold text-[#0b5c30] uppercase tracking-wider mb-1.5">
                    Nama usaha
                  </label>
                  <div className="relative">
                    <Store className="w-4 h-4 text-[#0f7a3d] absolute left-3.5 top-3.5" />
                    <input
                      id="contact-business"
                      type="text"
                      required
                      value={form.business}
                      onChange={(e) => setForm({ ...form, business: e.target.value })}
                      placeholder="Contoh: Kedai Kopi Barokah"
                      className="w-full pl-10 pr-4 py-2.5 text-[0.95rem] rounded-xl border border-[rgba(22,163,74,0.2)] bg-white focus:border-[#16a34a] focus:ring-2 focus:ring-[#bbf7d0] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-[0.72rem] font-bold text-[#0b5c30] uppercase tracking-wider mb-1.5">
                    Nomor WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#0f7a3d] absolute left-3.5 top-3.5" />
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="0812xxxxxxx"
                      className="w-full pl-10 pr-4 py-2.5 text-[0.95rem] rounded-xl border border-[rgba(22,163,74,0.2)] bg-white focus:border-[#16a34a] focus:ring-2 focus:ring-[#bbf7d0] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[0.72rem] font-bold text-[#0b5c30] uppercase tracking-wider mb-1.5">
                    Kebutuhan Anda
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Ceritakan produk dan kendala sertifikasi halal Anda..."
                    className="w-full px-4 py-2.5 text-[0.95rem] rounded-xl border border-[rgba(22,163,74,0.2)] bg-white focus:border-[#16a34a] focus:ring-2 focus:ring-[#bbf7d0] outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="care-btn-spring w-full py-3.5 rounded-full text-white text-[1rem] font-semibold shadow-md flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
                  style={{ background: "linear-gradient(180deg, #16a34a 0%, #0f7a3d 100%)" }}
                >
                  {loading ? (
                    <span>Mengirim...</span>
                  ) : (
                    <>
                      <span>Kirim Permohonan</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[0.72rem] text-[#10231a]/45 text-center leading-relaxed">
                  Data hanya digunakan untuk keperluan pendampingan dan tidak dibagikan ke pihak lain.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
