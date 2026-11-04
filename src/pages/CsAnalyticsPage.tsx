import { PageHead, Panel, Stat, StatsGrid, Badge, Icon } from '../components/ui/PageKit';
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

      <StatsGrid>
        <Stat label="Percakapan" value="1.284" icon={Icon.chat} tone="green" foot={<span className="history-trend">↗ 12,4%</span>} />
        <Stat label="Respons rata-rata" value="1,8" unit="s" icon={Icon.clock} tone="blue" foot={<span>target &lt; 3 detik</span>} />
        <Stat label="Eskalasi" value="6,2" unit="%" icon={Icon.bolt} tone="orange" foot={<span>dari total percakapan</span>} />
        <Stat label="Kepuasan" value="4,8" unit="/5" icon={Icon.check} tone="purple" foot={<span>dari 214 rating</span>} />
      </StatsGrid>

      <div className="grid-2">
        <Panel title="Volume harian" subtitle="7 hari terakhir">
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 210, padding: '6px 2px' }}>
            {DAYS.map((item) => (
              <div key={item.day} style={{ flex: 1, display: 'grid', justifyItems: 'center', gap: 6 }}>
                <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', height: 165 }}>
                  <div
                    title={`${item.value} percakapan`}
                    style={{
                      width: '100%',
                      height: `${(item.value / max) * 100}%`,
                      background: 'linear-gradient(180deg, #22c55e, #16a34a)',
                      borderRadius: '6px 6px 3px 3px',
                      opacity: 0.9,
                    }}
                  ></div>
                </div>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.day}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Topik terbanyak" subtitle="Distribusi pertanyaan UMKM">
          {csTopics.map((topic) => (
            <div key={topic.label} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
                <span style={{ color: 'var(--ink-2)' }}>{topic.label}</span>
                <span style={{ color: 'var(--muted-2)' }}>{topic.value}%</span>
              </div>
              <div className="progress-track" style={{ marginTop: 0 }}>
                <span style={{ width: `${topic.value}%` }}></span>
              </div>
            </div>
          ))}
          <p className="knowledge-note">Akurasi jawaban 96,4% · 38 dokumen rujukan aktif.</p>
        </Panel>
      </div>

      <Panel title="Catatan kualitas" subtitle="Rekomendasi otomatis untuk tim">
        <div className="flat-list">
          <div className="flat-row">
            <span className="row-icon amber">{Icon.doc}</span>
            <span className="row-copy"><strong>Tambahkan dokumen bahan kritis</strong><span>12 pertanyaan eskalasi terkait gelatin dan enzim.</span></span>
            <span className="row-meta"><Badge tone="amber">Prioritas</Badge></span>
          </div>
          <div className="flat-row">
            <span className="row-icon blue">{Icon.clock}</span>
            <span className="row-copy"><strong>Perpendek jawaban pada kanal WhatsApp</strong><span>Rata-rata jawaban 92 kata, disarankan &lt; 60 kata.</span></span>
            <span className="row-meta"><Badge tone="blue">Saran</Badge></span>
          </div>
        </div>
      </Panel>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Analitik CS <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
