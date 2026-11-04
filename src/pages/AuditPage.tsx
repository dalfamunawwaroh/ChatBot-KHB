import { useState } from 'react';
import { PageHead, Panel, Badge, Icon } from '../components/ui/PageKit';
import { auditLog } from '../data/omni';

const TYPES = ['Semua', 'Dokumen', 'Percakapan', 'Pengaturan'];

export default function AuditPage() {
  const [type, setType] = useState('Semua');

  const rows = auditLog.filter((row) => {
    if (type === 'Semua') return true;
    if (type === 'Dokumen') return row.action.toLowerCase().includes('dokumen') || row.target.toLowerCase().includes('pdf');
    if (type === 'Percakapan') return row.action.toLowerCase().includes('percakapan') || row.target.includes('#KHB');
    return row.action.toLowerCase().includes('pengaturan');
  });

  return (
    <section className="view active" id="view-audit">
      <PageHead eyebrow="KEAMANAN" title="Audit Log" subtitle="Jejak aktivitas admin, agen, dan sistem pada workspace.">
        <button className="btn btn-secondary" onClick={() => window.print()}>{Icon.download} Unduh Log</button>
      </PageHead>

      <div className="toolbar-row">
        <div className="chip-row">
          {TYPES.map((item) => (
            <button key={item} className={`chip${type === item ? ' active' : ''}`} onClick={() => setType(item)}>{item}</button>
          ))}
        </div>
        <span style={{ fontSize: 12, color: 'var(--muted-2)' }}>{rows.length} entri</span>
      </div>

      <Panel title="Aktivitas terbaru" subtitle="Diurutkan dari yang paling baru">
        <div className="timeline">
          {rows.map((row) => (
            <div className="timeline-item" key={row.id}>
              <span className="timeline-dot">{Icon.clock}</span>
              <div className="timeline-copy">
                <strong>{row.action}</strong>
                <span>{row.actor} · {row.target}</span>
                <time>{row.time}</time>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Ringkasan" subtitle="Aktivitas 7 hari terakhir" className="panel" >
        <div className="grid-3">
          <div className="kv-row"><span>Perubahan dokumen</span><strong>12</strong></div>
          <div className="kv-row"><span>Eskalasi percakapan</span><strong>34</strong></div>
          <div className="kv-row"><span>Perubahan pengaturan</span><strong>5</strong></div>
        </div>
        <div style={{ marginTop: 12 }}>
          <Badge tone="green" dot>Log tersimpan otomatis</Badge>
        </div>
      </Panel>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Audit log <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
