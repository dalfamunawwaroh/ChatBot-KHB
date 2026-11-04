import { useState } from 'react';
import { PageHead, Panel, Stat, StatsGrid, Badge, Icon, Empty } from '../components/ui/PageKit';
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

      <StatsGrid>
        <Stat label="Antrean hari ini" value="14" icon={Icon.chat} tone="green" foot={<span>masuk sejak 00.00</span>} />
        <Stat label="Disetujui" value="9" icon={Icon.check} tone="blue" foot={<span className="history-trend">↗ 3 dari kemarin</span>} />
        <Stat label="Rata-rata tinjau" value="42" unit="s" icon={Icon.clock} tone="orange" foot={<span>target &lt; 60 detik</span>} />
        <Stat label="Eskalasi ke agen" value="2" icon={Icon.bolt} tone="purple" foot={<span>butuh pendamping</span>} />
      </StatsGrid>

      <Panel padding={false}>
        <div className="history-toolbar">
          <div>
            <h2>Perlu tinjauan</h2>
            <p>Keyakinan model di bawah 80%</p>
          </div>
          <span className="status-active"><i></i> Diperbarui otomatis</span>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>PERTANYAAN</th><th>TOPIK</th><th>KEYAKINAN</th><th>WAKTU</th><th></th></tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="question-cell" data-full={row.question}>{row.question}</td>
                  <td><span className="category-label">{row.topic}</span></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 170 }}>
                      <span className={`badge-pill ${row.confidence >= 80 ? 'badge-green' : 'badge-amber'}`}>
                        {row.confidence}%
                      </span>
                      <span
                        className="progress-track"
                        style={{ width: 70, flex: 'none', marginTop: 0 }}
                        role="img"
                        aria-label={`Keyakinan ${row.confidence} persen`}
                      >
                        <span style={{ width: `${row.confidence}%` }}></span>
                      </span>
                    </div>
                  </td>
                  <td>{row.time}</td>
                  <td>
                    <div className="row-actions">
                      <button className="btn btn-secondary btn-sm" onClick={() => notify('Draf jawaban dibuka')}>Tinjau</button>
                      <button className="btn btn-primary btn-sm" onClick={() => approve(row.id)}>{Icon.check} Setujui</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 ? <Empty text="Antrean kosong. Semua jawaban sudah ditinjau." /> : null}
        </div>

        <div className="table-footer">
          <span>Menampilkan <strong>{rows.length}</strong> jawaban menunggu tinjauan</span>
          <span className="status-active"><i></i> Agen aktif: Admin KHB</span>
        </div>
      </Panel>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Antrean AI <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
