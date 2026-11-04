import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHead, Panel, Field, Badge, Icon } from '../components/ui/PageKit';
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
        title="Embed Website"
        subtitle="Pasang asisten halal di website komunitas atau portal UMKM."
      >
        <Link className="btn btn-secondary" to="/embed/khb-bandung" target="_blank">
          {Icon.arrow}
          Lihat Demo
        </Link>
      </PageHead>

      <div className="grid-2-1">
        <Panel padding={false}>
          <div className="document-toolbar" style={{ padding: '0 18px', borderBottom: '1px solid var(--line)' }}>
            <div className="filter-tabs">
              {TABS.map((item) => (
                <button key={item} className={`filter-tab${tab === item ? ' selected' : ''}`} onClick={() => setTab(item)}>
                  {item}
                </button>
              ))}
            </div>
            <button className="btn btn-secondary btn-sm" onClick={copy}>Salin Kode</button>
          </div>

          <div style={{ padding: 18 }}>
            <pre className="code-block">{SNIPPETS[tab]}</pre>

            <div className="form-row-two" style={{ marginTop: 18 }}>
              <Field label="Posisi tombol">
                <select className="settings-select" value={position} onChange={(e) => setPosition(e.target.value)}>
                  <option>Kanan bawah</option>
                  <option>Kiri bawah</option>
                  <option>Kanan atas</option>
                </select>
              </Field>
              <Field label="Warna utama">
                <input
                  className="settings-input"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  style={{ height: 41, padding: 4 }}
                />
              </Field>
            </div>

            <Field label="Sapaan widget">
              <input className="settings-input" value={greeting} onChange={(e) => setGreeting(e.target.value)} />
            </Field>

            <div className="settings-actions">
              <button className="btn btn-primary" onClick={() => notify('Konfigurasi widget disimpan')}>
                {Icon.check}
                Simpan Konfigurasi
              </button>
            </div>
          </div>
        </Panel>

        <div className="stack">
          <Panel title="Pratinjau widget">
            <div className="preview-widget">
              <div className="public-msg bot" style={{ marginLeft: 'auto' }}>{greeting}</div>
              <div className="preview-bubble-btn" style={{ background: color }}>{Icon.chat}</div>
            </div>
            <div className="kv" style={{ marginTop: 14 }}>
              <div className="kv-row"><span>Posisi</span><strong>{position}</strong></div>
              <div className="kv-row"><span>Warna</span><strong>{color}</strong></div>
            </div>
          </Panel>

          <Panel title="Status pemasangan" subtitle="Domain yang sudah memakai widget">
            <div className="flat-list">
              <div className="flat-row">
                <span className="row-icon">{Icon.check}</span>
                <span className="row-copy"><strong>halalbandung.com</strong><span>Aktif sejak 12 Jun 2025</span></span>
                <span className="row-meta"><Badge tone="green" dot>Aktif</Badge></span>
              </div>
              <div className="flat-row">
                <span className="row-icon amber">{Icon.clock}</span>
                <span className="row-copy"><strong>Portal UMKM Bandung</strong><span>Menunggu verifikasi domain</span></span>
                <span className="row-meta"><Badge tone="amber" dot>Menunggu</Badge></span>
              </div>
            </div>
          </Panel>
        </div>
      </div>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Embed &amp; widget <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
