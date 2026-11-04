import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHead, Panel, Badge, Icon, Empty } from '../components/ui/PageKit';
import { channels } from '../data/omni';
import { useToast } from '../components/Toast';

export default function ChannelListPage() {
  const navigate = useNavigate();
  const notify = useToast();
  const [rows, setRows] = useState(channels);

  const disconnect = (id: string) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, status: 'Draf', lastSync: 'Terputus' } : row)));
    notify('Kanal diputuskan');
  };

  return (
    <section className="view active" id="view-channels">
      <PageHead
        eyebrow="KANAL PERCAKAPAN"
        title="Kanal"
        subtitle="Hubungkan asisten halal ke kanal yang dipakai UMKM."
      >
        <Link className="btn btn-primary" to="/channels/new">
          {Icon.plus}
          Hubungkan Kanal
        </Link>
      </PageHead>

      <div className="grid-4" style={{ marginBottom: 16 }}>
        <div className="panel mini-kpi">
          <span className="mini-icon">{Icon.link}</span>
          <div><small>Kanal aktif</small><strong>{rows.filter((r) => r.status === 'Aktif').length}</strong></div>
        </div>
        <div className="panel mini-kpi">
          <span className="mini-icon blue">{Icon.chat}</span>
          <div><small>Pesan 30 hari</small><strong>{rows.reduce((sum, r) => sum + r.messages, 0)}</strong></div>
        </div>
        <div className="panel mini-kpi">
          <span className="mini-icon amber">{Icon.clock}</span>
          <div><small>Menunggu</small><strong>{rows.filter((r) => r.status !== 'Aktif').length}</strong></div>
        </div>
        <div className="panel mini-kpi">
          <span className="mini-icon violet">{Icon.bolt}</span>
          <div><small>Respons rata-rata</small><strong>1,8 s</strong></div>
        </div>
      </div>

      <Panel title="Daftar kanal" subtitle={`${rows.length} kanal terdaftar`}>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>KANAL</th><th>IDENTITAS</th><th>STATUS</th><th>SINKRON TERAKHIR</th><th>PESAN</th><th></th></tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span className="list-icon" style={{ width: 30, height: 30 }}>{Icon.chat}</span>
                      <div>
                        <strong style={{ display: 'block', color: 'var(--ink)', fontSize: 12.5 }}>{row.name}</strong>
                        <span style={{ fontSize: 11.5 }}>{row.platform}</span>
                      </div>
                    </div>
                  </td>
                  <td>{row.handle}</td>
                  <td><Badge tone={row.status === 'Aktif' ? 'green' : 'slate'} dot>{row.status}</Badge></td>
                  <td>{row.lastSync}</td>
                  <td>{row.messages}</td>
                  <td>
                    <div className="row-actions">
                      <button className="icon-action" aria-label="Edit kanal" onClick={() => navigate(`/channels/${row.id}/edit`)}>{Icon.edit}</button>
                      <button className="icon-action danger" aria-label="Putuskan kanal" onClick={() => disconnect(row.id)}>{Icon.trash}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 ? <Empty text="Belum ada kanal terhubung." /> : null}
        </div>
      </Panel>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Kanal percakapan <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
