export default function DashboardPage() {
  return (
    <>
{/*─── DASHBOARD VIEW ───*/}
      <section className="view active" id="view-dashboard">
        <div className="welcome-row">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot"></span> KOMUNITAS HALAL BANDUNG</div>
            <h1>Halo, <span id="welcome-name">Admin</span> 👋</h1>
            <p className="subheading">Pantau edukasi halal dan aktivitas chatbot Anda hari ini.</p>
          </div>
          <button className="btn btn-primary" data-go="chat">
            <svg viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
            Mulai Percakapan
          </button>
        </div>

        <div className="notice-banner">
          <div className="notice-icon">
            <svg viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 016 6c0 3 .8 5 1.5 6H2.5C3.2 13 4 11 4 8a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.5"/><path d="M8 16a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <div>
            <strong>Asisten edukasi halal Anda siap membantu</strong>
            <p>Jawaban chatbot bersumber dari basis pengetahuan yang dikelola oleh tim KHB.</p>
          </div>
          <button data-go="chat" className="text-link">Coba chatbot <span>→</span></button>
        </div>

        <div className="section-heading">
          <div>
            <h2>Ringkasan aktivitas</h2>
            <p>Performa chatbot dalam 30 hari terakhir</p>
          </div>
          <button className="select-btn">30 hari terakhir <svg viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></button>
        </div>

        <div className="stats-grid">
          <article className="stat-card">
            <div className="stat-top">
              <span>Total percakapan</span>
              <span className="stat-icon green">
                <svg viewBox="0 0 20 20" fill="none"><path d="M3 4h14a1 1 0 011 1v8a1 1 0 01-1 1H6l-4 3V5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
              </span>
            </div>
            <div className="stat-value">1,284</div>
            <div className="stat-foot">
              <span className="trend up">↗ 12.8%</span>
              <span>dari bulan lalu</span>
            </div>
            <div className="sparkline spark-green" id="spark-total" aria-label="Tren percakapan 30 hari terakhir"></div>
          </article>
          <article className="stat-card">
            <div className="stat-top">
              <span>Pertanyaan terjawab</span>
              <span className="stat-icon blue">
                <svg viewBox="0 0 20 20" fill="none"><path d="M5 10l4 4 6-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </div>
            <div className="stat-value">96.4<span className="stat-unit">%</span></div>
            <div className="stat-foot"><span className="trend up">↗ 2.4%</span><span>tingkat respons</span></div>
            <div className="progress-track"><span style={{width:'96.4%'}}></span></div>
            <small className="progress-caption">Target respons 90%</small>
          </article>
          <article className="stat-card">
            <div className="stat-top">
              <span>Sumber pengetahuan</span>
              <span className="stat-icon orange">
                <svg viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
              </span>
            </div>
            <div className="stat-value">38</div>
            <div className="stat-foot">
              <span className="stat-muted">Dokumen aktif</span>
              <span className="status-active"><i></i> Sinkron</span>
            </div>
            <div className="source-chips">
              <span>Regulasi <b>12</b></span>
              <span>Panduan <b>18</b></span>
              <span>FAQ <b>8</b></span>
            </div>
          </article>
          <article className="stat-card">
            <div className="stat-top">
              <span>Pengguna aktif</span>
              <span className="stat-icon purple">
                <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </span>
            </div>
            <div className="stat-value">847</div>
            <div className="stat-foot"><span className="trend up">↗ 8.2%</span><span>pengguna unik</span></div>
            <div className="user-dots" data-total="847">
              <i></i><i></i><i></i><i></i><i></i>
              <span data-remainder></span>
            </div>
          </article>
        </div>

        <div className="dashboard-lower">
          <article className="panel activity-panel">
            <div className="panel-heading">
              <div>
                <h2>Aktivitas percakapan</h2>
                <p>Jumlah percakapan harian</p>
              </div>
              <button className="dots-btn" aria-label="Opsi">···</button>
            </div>
            <div className="chart-legend">
              <span><i></i>Percakapan</span>
              <span className="chart-total">1,284 <small>total</small></span>
            </div>
            <div className="chart-wrap">
              <div className="y-labels"><span>200</span><span>150</span><span>100</span><span>50</span><span>0</span></div>
              <div className="chart" id="activity-chart">
                <div className="grid-lines"><i></i><i></i><i></i><i></i><i></i></div>
                <svg viewBox="0 0 720 170" preserveAspectRatio="none" role="img" aria-label="Grafik percakapan meningkat">
                  <defs>
                    <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="#16a364" stopOpacity=".22"/>
                      <stop offset="1" stopColor="#16a364" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <path className="chart-area" d="M0,133 C35,120 37,116 66,124 S102,105 132,112 S168,88 198,101 S236,91 264,94 S302,68 330,83 S369,70 396,75 S434,52 462,65 S500,43 528,56 S565,35 594,49 S630,27 660,37 S692,18 720,22 V170 H0Z"/>
                  <path className="chart-line" d="M0,133 C35,120 37,116 66,124 S102,105 132,112 S168,88 198,101 S236,91 264,94 S302,68 330,83 S369,70 396,75 S434,52 462,65 S500,43 528,56 S565,35 594,49 S630,27 660,37 S692,18 720,22"/>
                </svg>
                <div className="chart-hover" id="chart-hover" aria-hidden="true"><i></i></div>
                <div className="chart-tip" id="chart-tip" role="tooltip" aria-hidden="true"></div>
                <div className="x-labels"><span>1 Jun</span><span>5 Jun</span><span>10 Jun</span><span>15 Jun</span><span>20 Jun</span><span>25 Jun</span><span>30 Jun</span></div>
              </div>
            </div>
          </article>
          <article className="panel recent-panel">
            <div className="panel-heading">
              <div>
                <h2>Percakapan terbaru</h2>
                <p>Aktivitas pengguna terkini</p>
              </div>
              <button className="text-link" data-go="history">Lihat semua <span>→</span></button>
            </div>
            <div className="recent-list">
              <div className="recent-item">
                <div className="avatar avatar-soft-green">RA</div>
                <div className="recent-copy">
                  <strong>Rina Amelia</strong>
                  <p>Bagaimana cara daftar sertifikat halal?</p>
                </div>
                <span className="recent-time">2 mnt</span>
              </div>
              <div className="recent-item">
                <div className="avatar avatar-soft-blue">DP</div>
                <div className="recent-copy">
                  <strong>Dimas Pratama</strong>
                  <p>Apa perbedaan self declare dan reguler?</p>
                </div>
                <span className="recent-time">18 mnt</span>
              </div>
              <div className="recent-item">
                <div className="avatar avatar-soft-peach">SW</div>
                <div className="recent-copy">
                  <strong>Siti Wulandari</strong>
                  <p>Dokumen apa yang perlu dipersiapkan?</p>
                </div>
                <span className="recent-time">42 mnt</span>
              </div>
            </div>
            <button className="view-all-btn" data-go="history">Lihat semua riwayat <span>→</span></button>
          </article>
        </div>
        <footer className="page-footer"><span>© 2025 Komunitas Halal Bandung</span><span>Chatbot edukasi halal <i>●</i> Versi prototipe</span></footer>
      </section>

<footer className="page-footer"><span>© 2025 Komunitas Halal Bandung</span><span>Chatbot edukasi halal <i>●</i> 1 role: Admin</span></footer>
    </>
  );
}
