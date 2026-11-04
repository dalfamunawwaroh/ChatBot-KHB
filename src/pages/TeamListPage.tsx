import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHead, Panel, Stat, StatsGrid, Badge, Icon, Empty } from '../components/ui/PageKit';
import { team } from '../data/omni';
import { useToast } from '../components/Toast';

export default function TeamListPage() {
  const navigate = useNavigate();
  const notify = useToast();
  const [rows, setRows] = useState(team);
  const [filter, setFilter] = useState('Semua');

  const visible = rows.filter((row) => filter === 'Semua' || row.role === filter);

  const toggle = (id: string) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, status: row.status === 'Aktif' ? 'Ditangguhkan' : 'Aktif' } : row))
    );
    notify('Status anggota diperbarui');
  };

  return (
    <section className="view active" id="view-team">
      <PageHead eyebrow="KOLABORASI" title="Pengguna" subtitle="Kelola admin, pendamping, dan agen yang mengelola asisten.">
        <div style={{ display: 'flex', gap: 8 }}>
          <Link className="btn btn-secondary" to="/team/register-admin">Daftarkan Admin</Link>
          <Link className="btn btn-primary" to="/team/new">{Icon.plus} Tambah Anggota</Link>
        </div>
      </PageHead>

      <StatsGrid>
        <Stat label="Total anggota" value={rows.length} icon={Icon.user} tone="green" foot={<span>di workspace KHB</span>} />
        <Stat label="Aktif" value={rows.filter((r) => r.status === 'Aktif').length} icon={Icon.check} tone="blue" foot={<span>dapat mengakses panel</span>} />
        <Stat label="Menunggu verifikasi" value={rows.filter((r) => r.status === 'Menunggu').length} icon={Icon.clock} tone="orange" foot={<span>undangan terkirim</span>} />
        <Stat label="Peran tersedia" value="3" icon={Icon.shield} tone="purple" foot={<span>Admin · Pendamping · Agen</span>} />
      </StatsGrid>

      <Panel padding={false}>
        <div className="history-toolbar">
          <div>
            <h2>Anggota tim</h2>
            <p>{visible.length} pengguna ditampilkan</p>
          </div>
          <div className="filter-tabs" style={{ height: 36 }}>
            {['Semua', 'Admin', 'Pendamping', 'Agen'].map((item) => (
              <button key={item} className={`filter-tab${filter === item ? ' selected' : ''}`} onClick={() => setFilter(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>NAMA</th><th>EMAIL</th><th>PERAN</th><th>BERGABUNG</th><th>STATUS</th><th></th></tr>
            </thead>
            <tbody>
              {visible.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="user-cell">
                      <span className="avatar avatar-admin" style={{ width: 30, height: 30, fontSize: 11 }}>{row.name.charAt(0)}</span>
                      <div><strong>{row.name}</strong><small>{row.email}</small></div>
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
          {visible.length === 0 ? <Empty text="Tidak ada anggota pada filter ini." /> : null}
        </div>

        <div className="table-footer">
          <span>Menampilkan <strong>{visible.length}</strong> dari <strong>{rows.length}</strong> anggota</span>
          <div className="pagination"><button className="current-page" aria-current="page">1</button></div>
        </div>
      </Panel>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Manajemen pengguna <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
