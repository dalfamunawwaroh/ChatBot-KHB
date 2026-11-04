import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products } from '../data/omni';

interface ChatMessage {
  from: 'bot' | 'user';
  text: string;
}

const ANSWERS: Array<{ keys: string[]; text: string }> = [
  { keys: ['self declare', 'self-declare'], text: 'Self declare adalah jalur gratis untuk usaha mikro dan kecil dengan produk berisiko rendah. Pengajuan lewat SIHALAL dan didampingi Pendamping PPH.' },
  { keys: ['dokumen', 'syarat', 'berkas'], text: 'Siapkan NIB, KTP, daftar produk & bahan, alur produksi, denah lokasi, foto produk, dan surat pernyataan.' },
  { keys: ['biaya', 'gratis', 'bayar'], text: 'Untuk UMK jalur self declare, biaya PNBP Rp0 (gratis). Jalur reguler dikenakan tarif sesuai ketentuan BPJPH.' },
  { keys: ['lama', 'berapa hari', 'proses'], text: 'Self declare umumnya selesai sekitar 21 hari kerja setelah berkas dinyatakan lengkap.' },
  { keys: ['produk', 'katalog', 'jual'], text: 'Produk yang sudah tersertifikasi halal ditandai pada katalog. Produk berstatus “Proses” masih menunggu penetapan BPJPH.' },
];

const answerFor = (text: string): string => {
  const lower = text.toLowerCase();
  const found = ANSWERS.find((item) => item.keys.some((key) => lower.includes(key)));
  return found
    ? found.text
    : 'Pertanyaan itu belum ada di basis pengetahuan saya. Saya teruskan ke Pendamping PPH agar dijawab langsung oleh petugas.';
};

export default function StoreChatPage() {
  const { slug } = useParams();
  const store = slug || 'khb-bandung';

  const [profile, setProfile] = useState({ name: '', contact: '' });
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const start = (event: React.FormEvent) => {
    event.preventDefault();
    if (!profile.name.trim() || !profile.contact.trim()) return;
    setStarted(true);
    setMessages([
      {
        from: 'bot',
        text: `Halo ${profile.name.split(' ')[0]}! Saya Asisten Halal KHB. Silakan tanya seputar sertifikasi halal, dokumen, atau produk di katalog.`,
      },
    ]);
  };

  const send = (event: React.FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || typing) return;
    setMessages((prev) => [...prev, { from: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: answerFor(text) }]);
      setTyping(false);
    }, 550);
  };

  return (
    <div className="store-page">
      <header className="store-nav">
        <div className="store-brand">
          <span className="store-logo">H</span>
          <div>
            <strong>komunitas<span>halal</span></strong>
            <small>BANDUNG · {store}</small>
          </div>
        </div>
        <div className="store-nav-actions">
          <Link className="btn btn-secondary btn-sm" to="/">Tentang KHB</Link>
          <Link className="btn btn-primary btn-sm" to="/login">Masuk Pengelola</Link>
        </div>
      </header>

      <main className="store-main">
        <section className="store-hero">
          <span className="badge-pill badge-green"><i></i>Asisten halal aktif 24 jam</span>
          <h1>Tanya halal, jawabannya bersumber dokumen resmi.</h1>
          <p>
            Asisten edukasi halal Komunitas Halal Bandung membantu pelaku UMKM memahami sertifikasi halal,
            self declare, dan kelengkapan dokumen — gratis, tanpa perlu membuat akun.
          </p>
          <div className="store-stats">
            <div><strong>1.284</strong><span>percakapan</span></div>
            <div><strong>847</strong><span>UMKM terbantu</span></div>
            <div><strong>38</strong><span>dokumen BPJPH</span></div>
          </div>
        </section>

        <section className="store-chat-card">
          <div className="store-chat-head">
            <span className="store-chat-avatar">✦</span>
            <div>
              <strong>Asisten Halal KHB</strong>
              <span><i></i>Online · balas &lt; 2 detik</span>
            </div>
          </div>

          {!started ? (
            <form className="store-pretch" onSubmit={start}>
              <h2>Mulai percakapan</h2>
              <p>Isi nama dan nomor WhatsApp agar pendamping bisa menindaklanjuti.</p>
              <label className="field">
                <span>Nama</span>
                <input
                  required
                  value={profile.name}
                  onChange={(event) => setProfile({ ...profile, name: event.target.value })}
                  placeholder="Nama Anda"
                />
              </label>
              <label className="field">
                <span>WhatsApp / Email</span>
                <input
                  required
                  value={profile.contact}
                  onChange={(event) => setProfile({ ...profile, contact: event.target.value })}
                  placeholder="08xxxxxxxxxx"
                />
              </label>
              <button className="btn btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
                Mulai Chat
              </button>
              <small>Data hanya dipakai untuk pendampingan. Tanpa akun, tanpa biaya.</small>
            </form>
          ) : (
            <>
              <div className="store-chat-body">
                {messages.map((message, index) => (
                  <div key={index} className={`public-msg ${message.from}`}>{message.text}</div>
                ))}
                {typing ? (
                  <div className="public-msg bot" style={{ width: 60 }}>
                    <span className="dot-typing" style={{ animation: 'none' }}>•••</span>
                  </div>
                ) : null}
              </div>
              <form className="store-chat-input" onSubmit={send}>
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Tulis pertanyaan seputar halal..."
                  aria-label="Tulis pertanyaan"
                />
                <button className="btn btn-primary btn-sm" type="submit">Kirim</button>
              </form>
            </>
          )}
        </section>
      </main>

      <section className="store-products">
        <div className="store-products-head">
          <h2>Produk UMKM binaan</h2>
          <span>{products.length} produk contoh</span>
        </div>
        <div className="grid-3">
          {products.slice(0, 3).map((product) => (
            <article className="panel" key={product.id} style={{ padding: 16 }}>
              <div className="store-product-thumb"></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
                <strong style={{ fontSize: 13, color: 'var(--ink)' }}>{product.name}</strong>
                <span className={`badge-pill ${product.halal === 'Tersertifikasi' ? 'badge-green' : 'badge-amber'}`}>
                  <i></i>{product.halal}
                </span>
              </div>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>{product.category} · {product.price}</span>
            </article>
          ))}
        </div>
      </section>

      <footer className="store-footer">
        <span>© 2025 Komunitas Halal Bandung · Halaman publik /{store}</span>
        <span>Jawaban bersifat edukatif, bukan keputusan resmi BPJPH.</span>
      </footer>
    </div>
  );
}
