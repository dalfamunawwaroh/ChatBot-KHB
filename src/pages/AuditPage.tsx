import { useState } from 'react';
import { PageHead, Panel, Badge, Icon, Empty } from '../components/ui/PageKit';
import { auditLog } from '../data/omni';

const TYPES = ['Semua', 'Dokumen', 'Percakapan', 'Pengaturan'] as const;

export default function AuditPage() {
  const [type, setType] = useState<(typeof TYPES)[number]>('Semua');
  const [query, setQuery] = useState('');

  const rows = auditLog.filter((row) => {
    const matchType =
      type === 'Semua' ||
      (type === 'Dokumen' && (row.action.toLowerCase().includes('dokumen') || row.target.toLowerCase().includes('pdf'))) ||
      (type === 'Percakapan' && (row.action.toLowerCase().includes('percakapan') || row.target.includes('#KHB'))) ||
      (type === 'Pengaturan' && row.action.toLowerCase().includes('pengaturan'));
    const term = query.trim().toLowerCase();
    const matchQuery = !term || row.actor.toLowerCase().includes(term) || row.target.toLowerCase().includes(term);
    return matchType && matchQuery;
  });

  return (
    <section className="view active" id="view-audit">
      <PageHead eyebrow="KEAMANAN" title="Jejak Audit" subtitle="Aktivitas admin, agen, dan sistem pada workspace.">
        <button className="btn btn-secondary" onClick={() => window.print()}>{Icon.download} Unduh Log</button>
      </PageHead>

      <Panel padding={false}>
        <div className="history-toolbar">
          <div>
            <h2>Aktivitas terbaru</h2>
            <p>{rows.length} entri · diurutkan dari yang paling baru</p>
          </div>
          <div className="history-filters">
            <div className="filter-tabs" style={{ height: 36 }}>
              {TYPES.map((item) => (
                <button key={item} className={`filter-tab${type === item ? ' selected' : ''}`} onClick={() => setType(item)}>
                  {item}
                </button>
              ))}
            </div>
            <label className="search-box">
              {Icon.search}
              <input type="search" placeholder="Cari aktor atau target..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </label>
          </div>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>WAKTU</th><th>AKTOR</th><th>AKTIVITAS</th><th>TARGET</th><th>JENIS</th></tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.time}</td>
                  <td>
                    <div className="user-cell">
                      <span className="avatar avatar-admin" style={{ width: 26, height: 26, fontSize: 10 }}>{row.actor.charAt(0)}</span>
                      <strong>{row.actor}</strong>
                    </div>
                  </td>
                  <td>{row.action}</td>
                  <td className="question-cell" data-full={row.target}>{row.target}</td>
                  <td>
                    <Badge tone={row.tone === 'green' ? 'green' : row.tone === 'red' ? 'red' : row.tone === 'amber' ? 'amber' : row.tone === 'blue' ? 'blue' : 'slate'}>
                      {row.action.split(' ')[0]}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 ? <Empty text="Tidak ada entri pada filter ini." /> : null}
        </div>

        <div className="table-footer">
          <span>Menampilkan <strong>{rows.length}</strong> dari <strong>{auditLog.length}</strong> entri terakhir</span>
          <span className="status-active"><i></i> Log tersimpan otomatis</span>
        </div>
      </Panel>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Jejak audit <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
