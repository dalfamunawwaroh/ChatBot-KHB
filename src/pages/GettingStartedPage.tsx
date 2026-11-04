import { Link } from 'react-router-dom';
import { PageHead, Panel, Badge, Icon } from '../components/ui/PageKit';
import { onboardingSteps } from '../data/omni';

const QUICK_LINKS = [
  { to: '/channels', title: 'Hubungkan kanal', desc: 'WhatsApp, Instagram, widget web.', icon: Icon.link },
  { to: '/knowledge-base', title: 'Tambah dokumen', desc: 'Regulasi BPJPH & panduan KHB.', icon: Icon.doc },
  { to: '/embed', title: 'Pasang di website', desc: 'Salin snippet embed siap pakai.', icon: Icon.chat },
  { to: '/cs/inbox', title: 'Buka inbox agen', desc: 'Balas percakapan yang dieskalasi.', icon: Icon.user },
];

export default function GettingStartedPage() {
  const done = onboardingSteps.filter((step) => step.done).length;
  const percent = Math.round((done / onboardingSteps.length) * 100);

  return (
    <section className="view active" id="view-getting-started">
      <PageHead
        eyebrow="PANDUAN AWAL"
        title="Mulai dari sini"
        subtitle="Siapkan asisten halal KHB dalam lima langkah singkat."
      />

      <div className="grid-2-1" style={{ alignItems: 'stretch' }}>
        <Panel title="Checklist persiapan" subtitle={`${done} dari ${onboardingSteps.length} langkah selesai`}>
          <div className="progress-track" style={{ marginTop: 4, marginBottom: 18 }}>
            <span style={{ width: `${percent}%` }}></span>
          </div>
          <div className="steps">
            {onboardingSteps.map((step, index) => (
              <div className={`step-item${step.done ? ' done' : ''}`} key={step.title}>
                <span className="step-num">{step.done ? '✓' : index + 1}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.desc}</p>
                </div>
                <span style={{ marginLeft: 'auto' }}>
                  <Badge tone={step.done ? 'green' : 'amber'}>{step.done ? 'Selesai' : 'Belum'}</Badge>
                </span>
              </div>
            ))}
          </div>
          <div className="form-actions" style={{ justifyContent: 'flex-start' }}>
            <Link className="btn btn-primary" to="/chatbot">
              {Icon.bolt}
              Lanjut atur asisten
            </Link>
          </div>
        </Panel>

        <Panel title="Status singkat" subtitle="Ringkasan kesiapan asisten">
          <div className="kv">
            <div className="kv-row"><span>Kanal aktif</span><strong>3 dari 4</strong></div>
            <div className="kv-row"><span>Dokumen terindeks</span><strong>38 dokumen</strong></div>
            <div className="kv-row"><span>Percakapan 30 hari</span><strong>1.284</strong></div>
            <div className="kv-row"><span>Akurasi jawaban</span><strong>96,4%</strong></div>
            <div className="kv-row"><span>Rata-rata respons</span><strong>1,8 detik</strong></div>
            <div className="kv-row"><span>Versi asisten</span><strong>v2.0 · prototipe</strong></div>
          </div>

          <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--line-2)' }}>
            <div className="preview-label" style={{ marginBottom: 8 }}>Langkah berikutnya</div>
            <div className="card-list">
              <div className="list-item" style={{ padding: '10px 12px' }}>
                <span className="list-icon">{Icon.bolt}</span>
                <div className="list-copy"><strong>Atur nada jawaban</strong><span>2 menit</span></div>
              </div>
              <div className="list-item" style={{ padding: '10px 12px' }}>
                <span className="list-icon">{Icon.chat}</span>
                <div className="list-copy"><strong>Uji coba widget</strong><span>3 menit</span></div>
              </div>
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid-4" style={{ marginTop: 16 }}>
        {QUICK_LINKS.map((item) => (
          <Link key={item.to} to={item.to} className="panel quick-card">
            <span className="mini-icon">{item.icon}</span>
            <strong>{item.title}</strong>
            <span>{item.desc}</span>
          </Link>
        ))}
      </div>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Panduan awal <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
