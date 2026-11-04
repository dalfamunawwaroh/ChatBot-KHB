import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHead, Panel, Field, Badge, Icon } from '../components/ui/PageKit';
import { useToast } from '../components/Toast';

export default function RegisterAdminPage() {
  const navigate = useNavigate();
  const notify = useToast();
  const [form, setForm] = useState({ name: '', email: '', org: 'Komunitas Halal Bandung', confirm: false });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    notify('Admin baru berhasil didaftarkan');
    navigate('/team');
  };

  return (
    <section className="view active" id="view-register-admin">
      <PageHead eyebrow="KOLABORASI" title="Daftarkan admin" subtitle="Buat akses admin baru untuk pengelola komunitas.">
        <Link className="btn btn-secondary" to="/team">Kembali</Link>
      </PageHead>

      <div className="grid-2-1">
        <Panel title="Form pendaftaran admin" subtitle="Admin baru dapat mengelola seluruh konfigurasi">
          <form onSubmit={submit}>
            <Field label="Nama lengkap">
              <input
                className="settings-input"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nama pengelola"
              />
            </Field>
            <Field label="Email resmi">
              <input
                className="settings-input"
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="admin@khb.or.id"
              />
            </Field>
            <Field label="Organisasi">
              <input className="settings-input" value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} />
            </Field>

            <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 12.5, color: 'var(--muted)', marginTop: 4 }}>
              <input
                type="checkbox"
                checked={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.checked })}
                style={{ marginTop: 3 }}
              />
              Saya menyetujui bahwa admin baru memiliki akses penuh ke data percakapan UMKM.
            </label>

            <div className="settings-actions">
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/team')}>Batal</button>
              <button type="submit" className="btn btn-primary" disabled={!form.confirm}>{Icon.check} Daftarkan</button>
            </div>
          </form>
        </Panel>

        <Panel title="Ketentuan akses" subtitle="Berlaku untuk peran Admin">
          <div className="flat-list">
            <div className="flat-row">
              <span className="row-icon">{Icon.settings}</span>
              <span className="row-copy"><strong>Akses penuh</strong><span>Termasuk pengaturan asisten dan manajemen pengguna.</span></span>
            </div>
            <div className="flat-row">
              <span className="row-icon amber">{Icon.doc}</span>
              <span className="row-copy"><strong>Data sensitif</strong><span>Wajib menjaga kerahasiaan data UMKM dan dokumen internal.</span></span>
            </div>
            <div className="flat-row">
              <span className="row-icon blue">{Icon.shield}</span>
              <span className="row-copy"><strong>Jejak audit</strong><span>Semua aktivitas admin tercatat pada halaman Jejak Audit.</span></span>
            </div>
          </div>
          <p className="knowledge-note">Status undangan: <Badge tone="amber" dot>Menunggu konfirmasi email</Badge></p>
        </Panel>
      </div>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Pendaftaran admin <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
