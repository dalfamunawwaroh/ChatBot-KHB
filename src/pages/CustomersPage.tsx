import { useMemo, useState } from 'react';
import { PageHead, Panel, Badge, Icon } from '../components/ui/PageKit';
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

      <div className="grid-4" style={{ marginBottom: 16 }}>
        <div className="panel mini-kpi"><span className="mini-icon">{Icon.user}</span><div><small>Total UMKM</small><strong>847</strong></div></div>
        <div className="panel mini-kpi"><span className="mini-icon blue">{Icon.chat}</span><div><small>Percakapan</small><strong>1.284</strong></div></div>
        <div className="panel mini-kpi"><span className="mini-icon amber">{Icon.bolt}</span><div><small>Baru bulan ini</small><strong>38</strong></div></div>
        <div className="panel mini-kpi"><span className="mini-icon violet">{Icon.check}</span><div><small>Sudah sertifikat</small><strong>312</strong></div></div>
      </div>

      <div className="toolbar-row">
        <div className="toolbar-left">
          <div className="chip-row">
            {['Semua', 'Aktif', 'Baru'].map((item) => (
              <button key={item} className={`chip${segment === item ? ' active' : ''}`} onClick={() => setSegment(item)}>{item}</button>
            ))}
          </div>
        </div>
        <div className="toolbar-right">
          <label className="search-box">
            {Icon.search}
            <input type="search" placeholder="Cari nama atau usaha..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
        </div>
      </div>

      <Panel title="Daftar pelanggan" subtitle={`${rows.length} UMKM ditampilkan`}>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>NAMA</th><th>USAHA</th><th>KOTA</th><th>PERCAKAPAN</th><th>TERAKHIR</th><th>STATUS</th></tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span className="avatar avatar-soft-green" style={{ width: 30, height: 30, fontSize: 11 }}>{row.name.charAt(0)}</span>
                      <strong style={{ color: 'var(--ink)', fontSize: 12.5 }}>{row.name}</strong>
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
        </div>
      </Panel>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Data pelanggan <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
