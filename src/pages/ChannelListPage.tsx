import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHead, Panel, Stat, StatsGrid, Badge, Icon, Empty } from '../components/ui/PageKit';
import { channels } from '../data/omni';
import { useToast } from '../components/Toast';

const FILTERS = ['Semua', 'Aktif', 'Draf'] as const;

export default function ChannelListPage() {
  const navigate = useNavigate();
  const notify = useToast();
  const [rows, setRows] = useState(channels);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('Semua');

  const visible = useMemo(
    () => rows.filter((row) => filter === 'Semua' || row.status === filter),
    [rows, filter]
  );

  const disconnect = (id: string) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, status: 'Draf', lastSync: 'Terputus' } : row)));
    notify('Kanal diputuskan');
  };

  const totalMessages = rows.reduce((sum, row) => sum + row.messages, 0);

  return (
    <section className="view active" id="view-channels">
      <PageHead eyebrow="KANAL PERCAKAPAN" title="Channels" subtitle="Hubungkan asisten halal ke kanal yang dipakai UMKM.">
        <Link className="btn btn-primary" to="/channels/new">
          {Icon.plus}
          Hubungkan Kanal
        </Link>
      </PageHead>

      <StatsGrid>
        <Stat label="Kanal aktif" value={rows.filter((r) => r.status === 'Aktif').length} icon={Icon.link} tone="green" foot={<span>dari {rows.length} kanal terdaftar</span>} />
        <Stat label="Pesan 30 hari" value={totalMessages.toLocaleString('id-ID')} icon={Icon.chat} tone="blue" foot={<span className="history-trend">↗ 12,4%</span>} />
        <Stat label="Menunggu" value={rows.filter((r) => r.status !== 'Aktif').length} icon={Icon.clock} tone="orange" foot={<span>perlu kredensial</span>} />
        <Stat label="Respons rata-rata" value="1,8" unit="s" icon={Icon.bolt} tone="purple" foot={<span>di semua kanal</span>} />
      </StatsGrid>

      <Panel padding={false}>
        <div className="history-toolbar">
          <div>
            <h2>Daftar kanal</h2>
            <p>{visible.length} kanal ditampilkan</p>
          </div>
          <div className="filter-tabs" style={{ height: 36 }}>
            {FILTERS.map((item) => (
              <button key={item} className={`filter-tab${filter === item ? ' selected' : ''}`} onClick={() => setFilter(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>KANAL</th><th>IDENTITAS</th><th>STATUS</th><th>SINKRON TERAKHIR</th><th>PESAN</th><th></th></tr>
            </thead>
            <tbody>
              {visible.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="user-cell">
                      <span className="avatar avatar-soft-green" style={{ width: 30, height: 30, fontSize: 11 }}>{row.platform.charAt(0)}</span>
                      <div>
                        <strong>{row.name}</strong>
                        <small>{row.platform}</small>
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
          {visible.length === 0 ? <Empty text="Tidak ada kanal pada filter ini." /> : null}
        </div>

        <div className="table-footer">
          <span>Menampilkan <strong>{visible.length}</strong> dari <strong>{rows.length}</strong> kanal</span>
          <div className="pagination">
            <button className="current-page" aria-current="page">1</button>
          </div>
        </div>
      </Panel>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Kanal percakapan <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
