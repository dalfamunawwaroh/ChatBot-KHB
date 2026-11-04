import { useState } from 'react';
import { PageHead, Badge, Icon, Empty } from '../components/ui/PageKit';
import { aiQueue } from '../data/omni';
import { useToast } from '../components/Toast';

export default function CsQueuePage() {
  const notify = useToast();
  const [rows, setRows] = useState(aiQueue);

  const approve = (id: string) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
    notify('Jawaban disetujui dan dikirim');
  };

  return (
    <section className="view active" id="view-cs-queue">
      <PageHead eyebrow="ANTREAN AI" title="Antrean jawaban" subtitle="Tinjau jawaban dengan keyakinan rendah sebelum dikirim ke UMKM.">
        <Badge tone="amber" dot>{rows.length} menunggu tinjauan</Badge>
      </PageHead>

      <div className="grid-3" style={{ marginBottom: 16 }}>
        <div className="panel mini-kpi"><span className="mini-icon">{Icon.chat}</span><div><small>Antrean hari ini</small><strong>14</strong></div></div>
        <div className="panel mini-kpi"><span className="mini-icon blue">{Icon.check}</span><div><small>Disetujui</small><strong>9</strong></div></div>
        <div className="panel mini-kpi"><span className="mini-icon amber">{Icon.clock}</span><div><small>Rata-rata tinjau</small><strong>42 s</strong></div></div>
      </div>

      <div className="card-list">
        {rows.map((row) => (
          <div className="panel" key={row.id} style={{ padding: 16 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span className="list-icon">{Icon.bolt}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 4 }}>
                  <Badge tone={row.confidence >= 80 ? 'green' : 'amber'}>{row.confidence}% keyakinan</Badge>
                  <span style={{ fontSize: 11.5, color: 'var(--muted-2)' }}>{row.topic} · {row.time}</span>
                </div>
                <strong style={{ display: 'block', fontSize: 13, color: 'var(--ink)', marginBottom: 6 }}>{row.question}</strong>
                <div className="progress-track" style={{ marginTop: 0 }}>
                  <span style={{ width: `${row.confidence}%` }}></span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="btn btn-secondary btn-sm" onClick={() => notify('Draf jawaban dibuka')}>Tinjau</button>
                <button className="btn btn-primary btn-sm" onClick={() => approve(row.id)}>{Icon.check} Setujui</button>
              </div>
            </div>
          </div>
        ))}
        {rows.length === 0 ? <Empty text="Antrean kosong. Semua jawaban sudah ditinjau." /> : null}
      </div>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Antrean AI <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
