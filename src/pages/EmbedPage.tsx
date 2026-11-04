import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHead, Panel, Badge, Icon, Field } from '../components/ui/PageKit';
import { useToast } from '../components/Toast';

const TABS = ['Widget', 'Snippet', 'REST API'] as const;
type Tab = (typeof TABS)[number];

const SNIPPETS: Record<Tab, string> = {
  Widget: `<script src="https://khb.halalbandung.com/embed.js"
  data-store="khb-bandung"
  data-position="bottom-right"
  data-color="#16a34a" defer></script>`,
  Snippet: `<div id="khb-chat" data-store="khb-bandung"></div>
<script src="https://khb.halalbandung.com/embed.js" defer></script>`,
  'REST API': `POST https://api.khb.halalbandung.com/v1/chat
Authorization: Bearer <API_KEY>
Content-Type: application/json

{ "message": "Syarat self declare?", "store": "khb-bandung" }`,
};

export default function EmbedPage() {
  const notify = useToast();
  const [tab, setTab] = useState<Tab>('Widget');
  const [position, setPosition] = useState('Kanan bawah');
  const [color, setColor] = useState('#16a34a');
  const [greeting, setGreeting] = useState('Ada yang bisa dibantu soal sertifikasi halal?');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SNIPPETS[tab]);
      notify('Snippet disalin ke clipboard');
    } catch {
      notify('Salin manual: pilih teks pada kotak kode');
    }
  };

  return (
    <section className="view active" id="view-embed">
      <PageHead
        eyebrow="INTEGRASI WEB"
        title="Embed & Widget"
        subtitle="Pasang asisten halal di website komunitas atau portal UMKM."
      >
        <Link className="btn btn-secondary" to="/embed/khb-bandung" target="_blank">
          {Icon.arrow}
          Lihat Demo
        </Link>
      </PageHead>

      <div className="grid-2-1">
        <Panel
          title="Kode pemasangan"
          subtitle="Tempel sebelum tag penutup </body>"
          actions={
            <button className="btn btn-secondary btn-sm" onClick={copy}>
              Salin
            </button>
          }
        >
          <div className="chip-row" style={{ marginBottom: 14 }}>
            {TABS.map((item) => (
              <button key={item} className={`chip${tab === item ? ' active' : ''}`} onClick={() => setTab(item)}>
                {item}
              </button>
            ))}
          </div>
          <pre className="code-block">{SNIPPETS[tab]}</pre>

          <div className="form-grid two" style={{ marginTop: 18 }}>
            <Field label="Posisi tombol">
              <select value={position} onChange={(event) => setPosition(event.target.value)}>
                <option>Kanan bawah</option>
                <option>Kiri bawah</option>
                <option>Kanan atas</option>
              </select>
            </Field>
            <Field label="Warna utama">
              <input type="color" value={color} onChange={(event) => setColor(event.target.value)} style={{ height: 40, padding: 4 }} />
            </Field>
          </div>
          <Field label="Sapaan widget">
            <input value={greeting} onChange={(event) => setGreeting(event.target.value)} />
          </Field>

          <div className="form-actions">
            <button className="btn btn-primary" onClick={() => notify('Konfigurasi widget disimpan')}>
              {Icon.check}
              Simpan Konfigurasi
            </button>
          </div>
        </Panel>

        <div style={{ display: 'grid', gap: 16 }}>
          <Panel title="Pratinjau widget">
            <div className="preview-box" style={{ minHeight: 190, display: 'grid', alignContent: 'end', gap: 8 }}>
              <div className="preview-bubble" style={{ maxWidth: 240, marginLeft: 'auto' }}>{greeting}</div>
              <div
                style={{
                  marginLeft: 'auto', width: 46, height: 46, borderRadius: '50%',
                  background: color, display: 'grid', placeItems: 'center', color: '#fff',
                  boxShadow: '0 8px 20px rgba(22,163,74,.35)',
                }}
              >
                {Icon.chat}
              </div>
            </div>
            <p style={{ fontSize: 11.5, color: 'var(--muted-2)', marginTop: 10 }}>
              Posisi: {position} · Warna: {color}
            </p>
          </Panel>

          <Panel title="Status pemasangan">
            <div className="card-list">
              <div className="list-item">
                <span className="list-icon">{Icon.check}</span>
                <div className="list-copy">
                  <strong>halalbandung.com</strong>
                  <span>Aktif sejak 12 Jun 2025</span>
                </div>
                <Badge tone="green" dot>Aktif</Badge>
              </div>
              <div className="list-item">
                <span className="list-icon">{Icon.clock}</span>
                <div className="list-copy">
                  <strong>Portal UMKM Bandung</strong>
                  <span>Menunggu verifikasi domain</span>
                </div>
                <Badge tone="amber" dot>Menunggu</Badge>
              </div>
            </div>
          </Panel>
        </div>
      </div>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Embed & widget <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
