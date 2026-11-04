import { PageHead, Panel, Badge, Icon } from '../components/ui/PageKit';
import { csTopics } from '../data/omni';

const DAYS = [
  { day: 'Sen', value: 62 }, { day: 'Sel', value: 74 }, { day: 'Rab', value: 58 },
  { day: 'Kam', value: 81 }, { day: 'Jum', value: 69 }, { day: 'Sab', value: 44 }, { day: 'Min', value: 31 },
];

export default function CsAnalyticsPage() {
  const max = Math.max(...DAYS.map((item) => item.value));

  return (
    <section className="view active" id="view-cs-analytics">
      <PageHead eyebrow="ANALITIK" title="Performa layanan" subtitle="Ringkasan kualitas jawaban dan beban agen.">
        <button className="btn btn-secondary" onClick={() => window.print()}>{Icon.download} Ekspor</button>
      </PageHead>

      <div className="grid-4" style={{ marginBottom: 16 }}>
        <div className="panel mini-kpi"><span className="mini-icon">{Icon.chat}</span><div><small>Percakapan</small><strong>1.284</strong></div></div>
        <div className="panel mini-kpi"><span className="mini-icon blue">{Icon.clock}</span><div><small>Respons rata-rata</small><strong>1,8 s</strong></div></div>
        <div className="panel mini-kpi"><span className="mini-icon amber">{Icon.bolt}</span><div><small>Eskalasi</small><strong>6,2%</strong></div></div>
        <div className="panel mini-kpi"><span className="mini-icon violet">{Icon.check}</span><div><small>Kepuasan</small><strong>4,8/5</strong></div></div>
      </div>

      <div className="grid-2-1">
        <Panel title="Volume harian" subtitle="7 hari terakhir">
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 220, padding: '10px 4px' }}>
            {DAYS.map((item) => (
              <div key={item.day} style={{ flex: 1, display: 'grid', justifyItems: 'center', gap: 6 }}>
                <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', height: 170 }}>
                  <div
                    style={{
                      width: '100%', height: `${(item.value / max) * 100}%`,
                      background: 'linear-gradient(180deg, #22c55e, #16a34a)',
                      borderRadius: '8px 8px 4px 4px', opacity: 0.9,
                    }}
                    title={`${item.value} percakapan`}
                  ></div>
                </div>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.day}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Topik terbanyak" subtitle="Distribusi pertanyaan UMKM">
          <div style={{ display: 'grid', gap: 12 }}>
            {csTopics.map((topic) => (
              <div key={topic.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: 'var(--ink-2)' }}>{topic.label}</span>
                  <span style={{ color: 'var(--muted-2)' }}>{topic.value}%</span>
                </div>
                <div className="progress-track" style={{ marginTop: 0 }}>
                  <span style={{ width: `${topic.value}%` }}></span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <Badge tone="green" dot>Akurasi 96,4%</Badge>
          </div>
        </Panel>
      </div>

      <Panel title="Catatan kualitas" subtitle="Rekomendasi otomatis">
        <div className="card-list">
          <div className="list-item"><span className="list-icon">{Icon.doc}</span><div className="list-copy"><strong>Tambahkan dokumen bahan kritis</strong><span>12 pertanyaan eskalasi terkait gelatin dan enzim.</span></div><Badge tone="amber">Prioritas</Badge></div>
          <div className="list-item"><span className="list-icon">{Icon.clock}</span><div className="list-copy"><strong>Perpendek jawaban pada kanal WhatsApp</strong><span>Rata-rata jawaban 92 kata, disarankan &lt; 60 kata.</span></div><Badge tone="blue">Saran</Badge></div>
        </div>
      </Panel>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Analitik CS <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
