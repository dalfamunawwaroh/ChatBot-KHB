import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHead, Panel, Field, Icon } from '../components/ui/PageKit';
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
        <Panel title="1. Pilih platform" subtitle="Kanal tempat UMKM menghubungi komunitas">
          <div className="flat-list" role="radiogroup" aria-label="Pilih platform">
            {PLATFORMS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={platform === item.id}
                className="flat-row"
                onClick={() => setPlatform(item.id)}
                style={{
                  width: '100%',
                  border: 0,
                  borderBottom: '1px solid var(--line-2)',
                  background: platform === item.id ? 'var(--green-subtle)' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  paddingLeft: platform === item.id ? 10 : 0,
                  paddingRight: platform === item.id ? 10 : 0,
                  borderRadius: platform === item.id ? 8 : 0,
                }}
              >
                <span className={`row-icon ${item.tone === 'violet' ? 'violet' : item.tone === 'blue' ? 'blue' : ''}`}>{Icon.chat}</span>
                <span className="row-copy">
                  <strong>{item.name}</strong>
                  <span>{item.desc}</span>
                </span>
                <span className="row-meta">{platform === item.id ? '✓ Dipilih' : ''}</span>
              </button>
            ))}
          </div>

          <form onSubmit={submit} style={{ marginTop: 18 }}>
            <Field label="Nama kanal">
              <input
                className="settings-input"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Contoh: WhatsApp KHB"
              />
            </Field>
            <div className="form-row-two">
              <Field label="Nomor / akun">
                <input
                  className="settings-input"
                  required
                  value={form.account}
                  onChange={(e) => setForm({ ...form, account: e.target.value })}
                  placeholder="+62 811-2233-445"
                />
              </Field>
              <Field label="Token akses" hint="Disimpan terenkripsi pada implementasi nyata.">
                <input
                  className="settings-input"
                  value={form.token}
                  onChange={(e) => setForm({ ...form, token: e.target.value })}
                  placeholder="EAAB..."
                />
              </Field>
            </div>
            <div className="settings-actions">
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/channels')}>Batal</button>
              <button type="submit" className="btn btn-primary">{Icon.check} Hubungkan</button>
            </div>
          </form>
        </Panel>

        <Panel title="Panduan singkat" subtitle="Tiga langkah sebelum kanal aktif">
          <div className="flat-list">
            <div className="flat-row">
              <span className="row-icon">1</span>
              <span className="row-copy"><strong>Siapkan akses kanal</strong><span>Pastikan akun resmi komunitas sudah aktif.</span></span>
            </div>
            <div className="flat-row">
              <span className="row-icon">2</span>
              <span className="row-copy"><strong>Salin kredensial</strong><span>Token dari dashboard platform masing-masing.</span></span>
            </div>
            <div className="flat-row">
              <span className="row-icon">3</span>
              <span className="row-copy"><strong>Uji percakapan</strong><span>Kirim pesan uji sebelum diumumkan ke UMKM.</span></span>
            </div>
          </div>
          <p className="knowledge-note">Status awal kanal baru: menunggu kredensial.</p>
        </Panel>
      </div>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Hubungkan kanal <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
