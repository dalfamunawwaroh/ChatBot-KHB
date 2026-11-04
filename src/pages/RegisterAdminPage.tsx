import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHead, Panel, Field, Icon, Badge } from '../components/ui/PageKit';
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
        <Panel title="Form pendaftaran admin">
          <form onSubmit={submit}>
            <div className="form-grid">
              <Field label="Nama lengkap">
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama pengelola" />
              </Field>
              <Field label="Email resmi">
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="admin@khb.or.id" />
              </Field>
              <Field label="Organisasi">
                <input value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} />
              </Field>
              <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 12.5, color: 'var(--muted)' }}>
                <input type="checkbox" checked={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.checked })} style={{ marginTop: 3 }} />
                Saya menyetujui bahwa admin baru memiliki akses penuh ke data percakapan UMKM.
              </label>
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/team')}>Batal</button>
              <button type="submit" className="btn btn-primary" disabled={!form.confirm}>{Icon.check} Daftarkan</button>
            </div>
          </form>
        </Panel>

        <Panel title="Ketentuan akses">
          <div className="card-list">
            <div className="list-item"><span className="list-icon">{Icon.settings}</span><div className="list-copy"><strong>Akses penuh</strong><span>Termasuk pengaturan asisten dan manajemen tim.</span></div></div>
            <div className="list-item"><span className="list-icon">{Icon.doc}</span><div className="list-copy"><strong>Data sensitif</strong><span>Wajib menjaga kerahasiaan data UMKM.</span></div></div>
          </div>
          <div className="preview-box" style={{ marginTop: 14 }}>
            <div className="preview-label">Status undangan</div>
            <Badge tone="amber" dot>Menunggu konfirmasi email</Badge>
          </div>
        </Panel>
      </div>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Pendaftaran admin <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
