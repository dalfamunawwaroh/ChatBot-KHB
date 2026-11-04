import { useState } from 'react';
import { PageHead, Panel, Badge, Icon } from '../components/ui/PageKit';
import { csInbox } from '../data/omni';

export default function CsInboxPage() {
  const [activeId, setActiveId] = useState(csInbox[0].id);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState([
    { from: 'user', text: 'Halo min, saya mau tanya soal self declare untuk katering rumahan.' },
    { from: 'bot', text: 'Halo! Self declare terbuka untuk usaha mikro dan kecil dengan produk berisiko rendah. Boleh saya tahu produk yang dijual?' },
    { from: 'user', text: 'Katering harian, lauk matang. Bahan dari pasar.' },
  ]);

  const active = csInbox.find((item) => item.id === activeId) || csInbox[0];

  const send = (event: React.FormEvent) => {
    event.preventDefault();
    if (!draft.trim()) return;
    setMessages((prev) => [...prev, { from: 'agent', text: draft.trim() }]);
    setDraft('');
  };

  return (
    <section className="view active" id="view-cs-inbox">
      <PageHead eyebrow="INBOX" title="Percakapan" subtitle="Balas percakapan yang dieskalasi dari asisten AI.">
        <Badge tone="green" dot>{csInbox.filter((item) => item.status === 'Terbuka').length} terbuka</Badge>
      </PageHead>

      <Panel padding={false}>
        <div className="inbox-layout">
          <div className="inbox-list">
            <div className="inbox-search">
              <label className="search-box" style={{ width: '100%' }}>
                {Icon.search}
                <input type="search" placeholder="Cari percakapan..." />
              </label>
            </div>
            {csInbox.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={`inbox-item${activeId === item.id ? ' active' : ''}`}
              >
                <span className="avatar avatar-soft-green" style={{ width: 32, height: 32, fontSize: 11 }}>{item.name.charAt(0)}</span>
                <span className="inbox-item-copy">
                  <strong>{item.name}</strong>
                  <span>{item.last}</span>
                </span>
                <span className="inbox-item-meta">
                  <time>{item.time}</time>
                  {item.unread > 0 ? <Badge tone="green">{item.unread}</Badge> : null}
                </span>
              </button>
            ))}
          </div>

          <div className="inbox-chat">
            <div className="inbox-chat-head">
              <span className="avatar avatar-admin" style={{ width: 32, height: 32, fontSize: 11 }}>{active.name.charAt(0)}</span>
              <div style={{ flex: 1 }}>
                <strong>{active.name}</strong>
                <span>{active.channel} · {active.status}</span>
              </div>
              <Badge tone={active.status === 'Eskalasi' ? 'amber' : 'green'} dot>{active.status}</Badge>
            </div>

            <div className="inbox-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`public-msg ${msg.from === 'user' ? 'user' : 'bot'}`} style={{ maxWidth: '72%', marginLeft: msg.from === 'agent' ? 'auto' : 0, background: msg.from === 'agent' ? 'var(--green)' : undefined, color: msg.from === 'agent' ? '#fff' : undefined }}>
                  {msg.text}
                </div>
              ))}
            </div>

            <form className="inbox-composer" onSubmit={send}>
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Tulis balasan untuk UMKM..."
                aria-label="Tulis balasan"
              />
              <button className="btn btn-primary" type="submit">Kirim</button>
            </form>
          </div>
        </div>
      </Panel>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Inbox agen <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
