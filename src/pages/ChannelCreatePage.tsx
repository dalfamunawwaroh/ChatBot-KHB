import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHead, Panel, Field, Badge, Icon } from '../components/ui/PageKit';
import { useToast } from '../components/Toast';

const PLATFORMS = [
  { id: 'wa', name: 'WhatsApp', desc: 'Nomor bisnis & pesan pelanggan', tone: 'green' },
  { id: 'ig', name: 'Instagram', desc: 'DM dan komentar akun resmi', tone: 'violet' },
  { id: 'web', name: 'Web Chat', desc: 'Widget pada website komunitas', tone: 'blue' },
  { id: 'tg', name: 'Telegram', desc: 'Bot percakapan 24 jam', tone: 'slate' },
];

export default function ChannelCreatePage() {
  const navigate = useNavigate();
  const notify = useToast();
  const [platform, setPlatform] = useState('wa');
  const [form, setForm] = useState({ name: '', account: '', token: '' });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    notify('Kanal berhasil dihubungkan (demo)');
    navigate('/channels');
  };

  return (
    <section className="view active" id="view-channel-create">
      <PageHead eyebrow="KANAL PERCAKAPAN" title="Hubungkan kanal baru" subtitle="Pilih platform lalu lengkapi kredensial kanal.">
        <Link className="btn btn-secondary" to="/channels">Kembali</Link>
      </PageHead>

      <div className="grid-2-1">
        <Panel title="1. Pilih platform">
          <div className="grid-2">
            {PLATFORMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setPlatform(item.id)}
                className="panel"
                style={{
                  textAlign: 'left', cursor: 'pointer', padding: 16,
                  borderColor: platform === item.id ? 'var(--green)' : 'var(--line)',
                  boxShadow: platform === item.id ? '0 0 0 3px rgba(22,163,74,.12)' : 'none',
                  background: platform === item.id ? 'var(--green-subtle)' : '#fff',
                }}
              >
                <span className="list-icon" style={{ marginBottom: 8 }}>{Icon.chat}</span>
                <strong style={{ display: 'block', fontSize: 13, color: 'var(--ink)' }}>{item.name}</strong>
                <span style={{ fontSize: 11.5, color: 'var(--muted)' }}>{item.desc}</span>
              </button>
            ))}
          </div>

          <form onSubmit={submit} style={{ marginTop: 20 }}>
            <div className="form-grid">
              <Field label="Nama kanal">
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Contoh: WhatsApp KHB" />
              </Field>
              <div className="form-grid two">
                <Field label="Nomor / akun">
                  <input required value={form.account} onChange={(e) => setForm({ ...form, account: e.target.value })} placeholder="+62 811-2233-445" />
                </Field>
                <Field label="Token akses" hint="Disimpan terenkripsi pada implementasi nyata.">
                  <input value={form.token} onChange={(e) => setForm({ ...form, token: e.target.value })} placeholder="EAAB..." />
                </Field>
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/channels')}>Batal</button>
              <button type="submit" className="btn btn-primary">{Icon.check} Hubungkan</button>
            </div>
          </form>
        </Panel>

        <Panel title="Panduan singkat">
          <div className="card-list">
            <div className="list-item">
              <span className="list-icon">1</span>
              <div className="list-copy"><strong>Siapkan akses kanal</strong><span>Pastikan akun resmi komunitas sudah aktif.</span></div>
            </div>
            <div className="list-item">
              <span className="list-icon">2</span>
              <div className="list-copy"><strong>Salin kredensial</strong><span>Token dari dashboard platform masing-masing.</span></div>
            </div>
            <div className="list-item">
              <span className="list-icon">3</span>
              <div className="list-copy"><strong>Uji percakapan</strong><span>Kirim pesan uji sebelum diumumkan ke UMKM.</span></div>
            </div>
          </div>
          <div className="preview-box" style={{ marginTop: 14 }}>
            <div className="preview-label">Status</div>
            <Badge tone="amber" dot>Menunggu kredensial</Badge>
          </div>
        </Panel>
      </div>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Hubungkan kanal <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
