import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ANSWERS = [
  { keys: ['self declare', 'self-declare'], text: 'Self declare adalah jalur gratis untuk usaha mikro/kecil dengan produk berisiko rendah. Pengajuan lewat SIHALAL dan didampingi Pendamping PPH.' },
  { keys: ['dokumen', 'syarat', 'berkas'], text: 'Siapkan NIB, KTP, daftar produk & bahan, alur produksi, denah lokasi, foto produk, dan surat pernyataan.' },
  { keys: ['biaya', 'gratis', 'bayar'], text: 'Untuk UMK jalur self declare, biaya PNBP Rp0 (gratis). Jalur reguler dikenakan tarif sesuai ketentuan BPJPH.' },
  { keys: ['lama', 'berapa hari', 'proses'], text: 'Self declare umumnya selesai sekitar 21 hari kerja setelah berkas dinyatakan lengkap.' },
];

const STARTERS = ['Apa itu self declare?', 'Dokumen yang perlu disiapkan', 'Biaya sertifikasi halal'];

export default function WidgetChatPage() {
  const { slug } = useParams();
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Assalamu'alaikum! Saya Asisten Halal KHB. Silakan tanya seputar sertifikasi halal." },
  ]);
  const [input, setInput] = useState('');

  const answer = (text: string) => {
    const lower = text.toLowerCase();
    const found = ANSWERS.find((item) => item.keys.some((key) => lower.includes(key)));
    return found
      ? found.text
      : 'Pertanyaan itu belum ada di basis pengetahuan saya. Saya teruskan ke Pendamping PPH agar dijawab langsung oleh petugas.';
  };

  const send = (event: React.FormEvent | null, preset?: string) => {
    event?.preventDefault();
    const text = (preset || input).trim();
    if (!text) return;
    setMessages((prev) => [...prev, { from: 'user', text }]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: answer(text) }]);
    }, 500);
  };

  return (
    <div className="public-shell">
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          <Link to="/" style={{ fontSize: 12, color: 'var(--green-dark)', fontWeight: 600 }}>← Kembali ke situs KHB</Link>
        </div>

        <div className="public-card">
          <div className="public-head">
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,.2)', display: 'grid', placeItems: 'center' }}>
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M12 3l7 3v6c0 5-3.3 7.8-7 9-3.7-1.2-7-4-7-9V6l7-3z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" /><path d="M8.5 12l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div>
              <strong>Asisten Halal KHB</strong>
              <span>Online · {slug || 'khb-bandung'}</span>
            </div>
          </div>

          <div className="public-body">
            {messages.map((msg, index) => (
              <div key={index} className={`public-msg ${msg.from}`}>{msg.text}</div>
            ))}
          </div>

          <div style={{ padding: '0 14px 10px' }}>
            <div className="chip-row">
              {STARTERS.map((starter) => (
                <button key={starter} className="chip" onClick={() => send(null, starter)}>{starter}</button>
              ))}
            </div>
          </div>

          <form className="public-input" onSubmit={(event) => send(event)}>
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Tulis pertanyaan..." aria-label="Pertanyaan" />
            <button type="submit">Kirim</button>
          </form>
        </div>

        <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--muted-2)', marginTop: 12 }}>
          Jawaban bersifat edukatif · bukan keputusan resmi BPJPH
        </p>
      </div>
    </div>
  );
}
