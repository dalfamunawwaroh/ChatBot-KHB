import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHead, Panel, Badge, Icon } from '../components/ui/PageKit';
import { team } from '../data/omni';
import { useToast } from '../components/Toast';

export default function TeamListPage() {
  const navigate = useNavigate();
  const notify = useToast();
  const [rows, setRows] = useState(team);

  const toggle = (id: string) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, status: row.status === 'Aktif' ? 'Ditangguhkan' : 'Aktif' } : row)));
    notify('Status anggota diperbarui');
  };

  return (
    <section className="view active" id="view-team">
      <PageHead eyebrow="KOLABORASI" title="Tim" subtitle="Kelola admin, pendamping, dan agen yang mengelola asisten.">
        <div style={{ display: 'flex', gap: 8 }}>
          <Link className="btn btn-secondary" to="/team/register-admin">Daftarkan Admin</Link>
          <Link className="btn btn-primary" to="/team/new">{Icon.plus} Tambah Anggota</Link>
        </div>
      </PageHead>

      <div className="grid-3" style={{ marginBottom: 16 }}>
        <div className="panel mini-kpi"><span className="mini-icon">{Icon.user}</span><div><small>Total anggota</small><strong>{rows.length}</strong></div></div>
        <div className="panel mini-kpi"><span className="mini-icon blue">{Icon.check}</span><div><small>Aktif</small><strong>{rows.filter((r) => r.status === 'Aktif').length}</strong></div></div>
        <div className="panel mini-kpi"><span className="mini-icon amber">{Icon.clock}</span><div><small>Menunggu verifikasi</small><strong>{rows.filter((r) => r.status === 'Menunggu').length}</strong></div></div>
      </div>

      <Panel title="Anggota tim" subtitle="Peran menentukan akses ke panel admin">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>NAMA</th><th>EMAIL</th><th>PERAN</th><th>BERGABUNG</th><th>STATUS</th><th></th></tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span className="avatar avatar-admin" style={{ width: 30, height: 30, fontSize: 11 }}>{row.name.charAt(0)}</span>
                      <strong style={{ color: 'var(--ink)', fontSize: 12.5 }}>{row.name}</strong>
                    </div>
                  </td>
                  <td>{row.email}</td>
                  <td><span className="role-badge">{row.role}</span></td>
                  <td>{row.joined}</td>
                  <td><Badge tone={row.status === 'Aktif' ? 'green' : row.status === 'Menunggu' ? 'amber' : 'slate'} dot>{row.status}</Badge></td>
                  <td>
                    <div className="row-actions">
                      <button className="icon-action" aria-label="Edit anggota" onClick={() => navigate(`/team/${row.id}/edit`)}>{Icon.edit}</button>
                      <button className="icon-action danger" aria-label="Ubah status" onClick={() => toggle(row.id)}>{Icon.clock}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Manajemen tim <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
