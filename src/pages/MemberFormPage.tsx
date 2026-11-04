import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PageHead, Panel, Field, Icon } from '../components/ui/PageKit';
import { team } from '../data/omni';
import { useToast } from '../components/Toast';

export default function MemberFormPage() {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const notify = useToast();
  const existing = team.find((item) => item.id === memberId);
  const isEdit = Boolean(existing);

  const [form, setForm] = useState({
    name: existing?.name || '',
    email: existing?.email || '',
    role: existing?.role || 'Agen',
    note: '',
  });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    notify(isEdit ? 'Data anggota diperbarui' : 'Anggota ditambahkan');
    navigate('/team');
  };

  return (
    <section className="view active" id="view-member-form">
      <PageHead
        eyebrow="KOLABORASI"
        title={isEdit ? 'Edit anggota' : 'Tambah anggota'}
        subtitle="Anggota baru menerima undangan melalui email."
      >
        <Link className="btn btn-secondary" to="/team">Kembali</Link>
      </PageHead>

      <div className="grid-2-1">
        <Panel title="Data anggota">
          <form onSubmit={submit}>
            <div className="form-grid">
              <Field label="Nama lengkap">
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama anggota" />
              </Field>
              <Field label="Email">
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="nama@khb.or.id" />
              </Field>
              <Field label="Peran">
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as typeof form.role })}>
                  <option>Admin</option><option>Pendamping</option><option>Agen</option>
                </select>
              </Field>
              <Field label="Catatan" hint="Opsional, tampil pada profil internal.">
                <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
              </Field>
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/team')}>Batal</button>
              <button type="submit" className="btn btn-primary">{Icon.check} {isEdit ? 'Simpan' : 'Kirim Undangan'}</button>
            </div>
          </form>
        </Panel>

        <Panel title="Hak akses per peran">
          <div className="card-list">
            <div className="list-item"><span className="list-icon">{Icon.settings}</span><div className="list-copy"><strong>Admin</strong><span>Akses penuh termasuk pengaturan & tim.</span></div></div>
            <div className="list-item"><span className="list-icon">{Icon.user}</span><div className="list-copy"><strong>Pendamping</strong><span>Kelola dokumen, produk, dan eskalasi.</span></div></div>
            <div className="list-item"><span className="list-icon">{Icon.chat}</span><div className="list-copy"><strong>Agen</strong><span>Menjawab inbox dan antrean AI.</span></div></div>
          </div>
        </Panel>
      </div>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Form anggota <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
