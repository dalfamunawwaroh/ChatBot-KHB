import { useState } from 'react';
import { useParams } from 'react-router-dom';

interface ChatMessage {
  from: 'bot' | 'user';
  text: string;
}

interface HistoryItem {
  id: number;
  title: string;
  time: string;
  snippet: string;
}

const HISTORY: HistoryItem[] = [
  { id: 1, title: 'Syarat self declare', time: 'Hari ini, 10:42', snippet: 'Usaha katering rumahan bisa self declare?' },
  { id: 2, title: 'Kelengkapan dokumen', time: 'Hari ini, 09:58', snippet: 'Dokumen apa saja yang perlu disiapkan?' },
  { id: 3, title: 'Biaya sertifikasi', time: 'Kemarin, 16:20', snippet: 'Apakah benar gratis untuk UMK?' },
  { id: 4, title: 'Bahan kritis', time: 'Kemarin, 14:05', snippet: 'Gelatin pada permen bagaimana?' },
];

const ANSWER = 'Untuk jalur self declare, biaya PNBP Rp0 (gratis) dan pengajuan dilakukan lewat SIHALAL bersama Pendamping PPH. Sumber: FAQ_Self_Declare.pdf · Bagian 2.';

export default function EmbedChatPage() {
  const { slug } = useParams();
  const store = slug || 'khb-bandung';

  const [activeId, setActiveId] = useState(1);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { from: 'bot', text: "Assalamu'alaikum! Saya Asisten Halal KHB. Ada yang bisa dibantu soal sertifikasi halal?" },
    { from: 'user', text: 'Apakah self declare benar-benar gratis?' },
    { from: 'bot', text: ANSWER },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const send = (event: React.FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || typing) return;
    setMessages((prev) => [...prev, { from: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: ANSWER }]);
      setTyping(false);
    }, 500);
  };

  return (
    <div className="embed-page">
      <aside className={`embed-history${historyOpen ? ' open' : ''}`}>
        <div className="embed-history-head">
          <div>
            <strong>Riwayat</strong>
            <span>{store}</span>
          </div>
          <button type="button" className="icon-action" aria-label="Tutup riwayat" onClick={() => setHistoryOpen(false)}>×</button>
        </div>
        <div className="embed-history-list">
          {HISTORY.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`embed-history-item${activeId === item.id ? ' active' : ''}`}
              onClick={() => { setActiveId(item.id); setHistoryOpen(false); }}
            >
              <strong>{item.title}</strong>
              <span>{item.snippet}</span>
              <time>{item.time}</time>
            </button>
          ))}
        </div>
        <button type="button" className="btn btn-secondary btn-sm" style={{ margin: 12 }}>Percakapan baru</button>
      </aside>

      {historyOpen ? <div className="embed-backdrop" onClick={() => setHistoryOpen(false)} aria-hidden="true"></div> : null}

      <div className="embed-chat">
        <header className="embed-head">
          <button type="button" className="icon-action" aria-label="Buka riwayat" onClick={() => setHistoryOpen(true)}>☰</button>
          <span className="store-chat-avatar">✦</span>
          <div>
            <strong>Asisten Halal KHB</strong>
            <span><i></i>Online · {store}</span>
          </div>
        </header>

        <div className="embed-body">
          {messages.map((message, index) => (
            <div key={index} className={`public-msg ${message.from}`}>{message.text}</div>
          ))}
          {typing ? <div className="public-msg bot" style={{ width: 54 }}>•••</div> : null}
        </div>

        <form className="embed-input" onSubmit={send}>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Tulis pertanyaan..."
            aria-label="Tulis pertanyaan"
          />
          <button className="btn btn-primary btn-sm" type="submit">Kirim</button>
        </form>

        <p className="embed-note">Jawaban bersifat edukatif · bukan keputusan resmi BPJPH</p>
      </div>
    </div>
  );
}
