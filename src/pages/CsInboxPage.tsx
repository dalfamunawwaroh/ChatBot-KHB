import { useState } from 'react';
import { PageHead, Badge, Icon } from '../components/ui/PageKit';
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

      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', minHeight: 520 }}>
          <div style={{ borderRight: '1px solid var(--line)' }}>
            <div style={{ padding: 14, borderBottom: '1px solid var(--line-2)' }}>
              <label className="search-box" style={{ width: '100%' }}>
                {Icon.search}
                <input type="search" placeholder="Cari percakapan..." />
              </label>
            </div>
            <div>
              {csInbox.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  style={{
                    width: '100%', textAlign: 'left', border: 0, cursor: 'pointer',
                    padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'center',
                    background: activeId === item.id ? 'var(--green-subtle)' : '#fff',
                    borderBottom: '1px solid var(--line-2)',
                  }}
                >
                  <span className="avatar avatar-soft-green" style={{ width: 32, height: 32, fontSize: 11 }}>{item.name.charAt(0)}</span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ display: 'block', fontSize: 12.5, color: 'var(--ink)' }}>{item.name}</strong>
                    <span style={{ display: 'block', fontSize: 11.5, color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.last}</span>
                  </span>
                  <span style={{ textAlign: 'right' }}>
                    <span style={{ display: 'block', fontSize: 10.5, color: 'var(--muted-2)' }}>{item.time}</span>
                    {item.unread > 0 ? <Badge tone="green">{item.unread}</Badge> : null}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--line-2)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="avatar avatar-admin" style={{ width: 32, height: 32, fontSize: 11 }}>{active.name.charAt(0)}</span>
              <div style={{ flex: 1 }}>
                <strong style={{ fontSize: 13, color: 'var(--ink)' }}>{active.name}</strong>
                <span style={{ display: 'block', fontSize: 11.5, color: 'var(--muted)' }}>{active.channel} · {active.status}</span>
              </div>
              <Badge tone={active.status === 'Eskalasi' ? 'amber' : 'green'} dot>{active.status}</Badge>
            </div>

            <div style={{ flex: 1, padding: 18, display: 'grid', gap: 10, alignContent: 'start', background: 'var(--canvas)' }}>
              {messages.map((msg, index) => (
                <div key={index} className={`public-msg ${msg.from === 'user' ? 'user' : 'bot'}`} style={{ maxWidth: '72%', marginLeft: msg.from === 'agent' ? 'auto' : 0, background: msg.from === 'agent' ? 'var(--green)' : undefined, color: msg.from === 'agent' ? '#fff' : undefined }}>
                  {msg.text}
                </div>
              ))}
            </div>

            <form onSubmit={send} style={{ display: 'flex', gap: 8, padding: 14, borderTop: '1px solid var(--line)' }}>
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Tulis balasan untuk UMKM..."
                style={{ flex: 1, padding: '10px 14px', border: '1.5px solid var(--line)', borderRadius: 999, fontSize: 12.5, outline: 'none' }}
              />
              <button className="btn btn-primary" type="submit">Kirim</button>
            </form>
          </div>
        </div>
      </div>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Inbox agen <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
