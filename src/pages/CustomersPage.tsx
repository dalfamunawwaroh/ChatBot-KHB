import { useMemo, useState } from 'react';
import { PageHead, Panel, Stat, StatsGrid, Badge, Icon, Empty } from '../components/ui/PageKit';
import { customers } from '../data/omni';

export default function CustomersPage() {
  const [query, setQuery] = useState('');
  const [segment, setSegment] = useState('Semua');

  const rows = useMemo(() => {
    const term = query.trim().toLowerCase();
    return customers.filter((row) => {
      const matchSegment = segment === 'Semua' || row.status === segment;
      const matchQuery = !term || row.name.toLowerCase().includes(term) || row.business.toLowerCase().includes(term);
      return matchSegment && matchQuery;
    });
  }, [query, segment]);

  return (
    <section className="view active" id="view-customers">
      <PageHead eyebrow="DATA UMKM" title="Pelanggan" subtitle="Pelaku usaha yang berinteraksi dengan asisten halal.">
        <button className="btn btn-secondary" onClick={() => window.print()}>{Icon.download} Ekspor Data</button>
      </PageHead>

      <StatsGrid>
        <Stat label="Total UMKM" value="847" icon={Icon.user} tone="green" foot={<span className="history-trend">↗ 38 bulan ini</span>} />
        <Stat label="Percakapan" value="1.284" icon={Icon.chat} tone="blue" foot={<span>30 hari terakhir</span>} />
        <Stat label="Pelanggan baru" value="38" icon={Icon.bolt} tone="orange" foot={<span>bulan ini</span>} />
        <Stat label="Sudah bersertifikat" value="312" icon={Icon.check} tone="purple" foot={<span>37% dari total</span>} />
      </StatsGrid>

      <Panel padding={false}>
        <div className="history-toolbar">
          <div>
            <h2>Daftar pelanggan</h2>
            <p>{rows.length} UMKM ditampilkan</p>
          </div>
          <div className="history-filters">
            <div className="filter-tabs" style={{ height: 36 }}>
              {['Semua', 'Aktif', 'Baru'].map((item) => (
                <button key={item} className={`filter-tab${segment === item ? ' selected' : ''}`} onClick={() => setSegment(item)}>
                  {item}
                </button>
              ))}
            </div>
            <label className="search-box">
              {Icon.search}
              <input type="search" placeholder="Cari nama atau usaha..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </label>
          </div>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>NAMA</th><th>USAHA</th><th>KOTA</th><th>PERCAKAPAN</th><th>TERAKHIR</th><th>STATUS</th></tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="user-cell">
                      <span className="avatar avatar-soft-green" style={{ width: 30, height: 30, fontSize: 11 }}>{row.name.charAt(0)}</span>
                      <div><strong>{row.name}</strong><small>{row.city}</small></div>
                    </div>
                  </td>
                  <td>{row.business}</td>
                  <td>{row.city}</td>
                  <td>{row.chats}</td>
                  <td>{row.last}</td>
                  <td><Badge tone={row.status === 'Baru' ? 'blue' : 'green'} dot>{row.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 ? <Empty text="Tidak ada pelanggan yang cocok." /> : null}
        </div>

        <div className="table-footer">
          <span>Menampilkan <strong>{rows.length}</strong> dari <strong>847</strong> UMKM</span>
          <div className="pagination">
            <button className="current-page" aria-current="page">1</button>
            <button>2</button>
            <button>3</button>
            <span className="page-gap">…</span>
            <button>170</button>
            <button className="page-nav">Next ›</button>
          </div>
        </div>
      </Panel>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Data pelanggan <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
