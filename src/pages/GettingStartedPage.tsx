import { Link } from 'react-router-dom';
import { PageHead, Panel, Badge, Icon } from '../components/ui/PageKit';
import { onboardingSteps } from '../data/omni';

const QUICK_LINKS = [
  { to: '/channels', title: 'Hubungkan kanal', desc: 'WhatsApp, Instagram, atau widget website.', icon: Icon.link, tone: 'blue' },
  { to: '/knowledge-base', title: 'Tambah dokumen', desc: 'Regulasi BPJPH dan panduan internal KHB.', icon: Icon.doc, tone: '' },
  { to: '/embed', title: 'Pasang di website', desc: 'Salin snippet embed siap pakai.', icon: Icon.chat, tone: 'amber' },
  { to: '/cs/inbox', title: 'Buka inbox agen', desc: 'Balas percakapan yang dieskalasi asisten.', icon: Icon.user, tone: 'violet' },
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

      <div className="grid-2-1">
        <Panel title="Checklist persiapan" subtitle={`${done} dari ${onboardingSteps.length} langkah selesai`}>
          <div className="progress-track" style={{ marginTop: 2, marginBottom: 16 }}>
            <span style={{ width: `${percent}%` }}></span>
          </div>
          <div className="steps">
            {onboardingSteps.map((step, index) => (
              <div className={`step-item${step.done ? ' done' : ''}`} key={step.title}>
                <span className="step-num">{step.done ? '✓' : index + 1}</span>
                <div style={{ flex: 1 }}>
                  <strong>{step.title}</strong>
                  <p>{step.desc}</p>
                </div>
                <span className="step-badge">
                  <Badge tone={step.done ? 'green' : 'amber'}>{step.done ? 'Selesai' : 'Belum'}</Badge>
                </span>
              </div>
            ))}
          </div>
          <div className="settings-actions" style={{ justifyContent: 'flex-start' }}>
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

          <div style={{ marginTop: 18, paddingTop: 4 }}>
            <div className="eyebrow" style={{ marginBottom: 6 }}><span className="eyebrow-dot"></span> LANGKAH BERIKUTNYA</div>
            <div className="flat-list">
              <Link className="flat-row" to="/chatbot" style={{ textDecoration: 'none' }}>
                <span className="row-icon">{Icon.bolt}</span>
                <span className="row-copy"><strong>Atur nada jawaban</strong><span>Bahasa, gaya jawaban, dan eskalasi</span></span>
                <span className="row-meta">2 menit</span>
              </Link>
              <Link className="flat-row" to="/embed" style={{ textDecoration: 'none' }}>
                <span className="row-icon blue">{Icon.chat}</span>
                <span className="row-copy"><strong>Uji coba widget</strong><span>Kirim pertanyaan contoh ke asisten</span></span>
                <span className="row-meta">3 menit</span>
              </Link>
            </div>
          </div>
        </Panel>
      </div>

      <Panel title="Aksi cepat" subtitle="Pintasan konfigurasi yang sering dipakai" className="panel" >
        <div className="flat-rows-2" style={{ marginTop: 14 }}>
          {QUICK_LINKS.map((item) => (
            <Link key={item.to} to={item.to} className="flat-row" style={{ textDecoration: 'none' }}>
              <span className={`row-icon ${item.tone}`}>{item.icon}</span>
              <span className="row-copy"><strong>{item.title}</strong><span>{item.desc}</span></span>
              <span className="row-meta">Buka →</span>
            </Link>
          ))}
        </div>
      </Panel>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Panduan awal <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
