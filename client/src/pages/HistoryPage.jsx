export default function HistoryPage() {
  return (
    <>
{/*─── HISTORY VIEW ───*/}
      <section className="view active" id="view-history">
        <div className="page-title-row">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot"></span> MONITORING PENGGUNA</div>
            <h1>Riwayat Percakapan</h1>
            <p className="subheading">Lihat pertanyaan pengguna dan aktivitas chatbot.</p>
          </div>
          <button className="btn btn-secondary" id="export-history">
            <svg viewBox="0 0 20 20" fill="none"><path d="M10 3v10M6 9l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 15h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            Ekspor Data
          </button>
        </div>
        <div className="history-stats">
          <div className="history-stat panel">
            <span className="history-stat-icon">
              <svg viewBox="0 0 20 20" fill="none"><path d="M3 4h14a1 1 0 011 1v8a1 1 0 01-1 1H6l-4 3V5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
            </span>
            <div><small>Total percakapan</small><strong>1,284</strong><span className="history-trend">↗ 12.8% bulan ini</span></div>
          </div>
          <div className="history-stat panel">
            <span className="history-stat-icon blue">
              <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </span>
            <div><small>Pengguna unik</small><strong>847</strong><span className="history-trend">↗ 8.2% bulan ini</span></div>
          </div>
          <div className="history-stat panel">
            <span className="history-stat-icon orange">
              <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6v4l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </span>
            <div><small>Rata-rata respons</small><strong>1.8 <small>detik</small></strong><span className="history-neutral">Stabil dari bulan lalu</span></div>
          </div>
          <div className="history-stat panel">
            <span className="history-stat-icon purple">
              <svg viewBox="0 0 20 20" fill="none"><path d="M5 10l4 4 6-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <div><small>Resolusi otomatis</small><strong>94.6<span className="smaller-percent">%</span></strong><span className="history-trend">↗ 3.1% bulan ini</span></div>
          </div>
        </div>
        <div className="panel history-panel">
          <div className="history-toolbar">
            <div>
              <h2>Semua percakapan</h2>
              <p>1.284 percakapan ditemukan</p>
            </div>
            <div className="history-filters">
              <label className="search-box">
                <svg viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5"/><path d="M15 15l-2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                <input type="search" id="history-search" placeholder="Cari pengguna atau pesan..." />
              </label>
              <button className="select-btn">Semua status <svg viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></button>
              <button className="select-btn">
                <svg viewBox="0 0 20 20" fill="none"><path d="M3 5h14M6 10h8M9 15h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                Filter
              </button>
            </div>
          </div>
          <div className="table-wrap">
            <table className="data-table history-table">
              <thead><tr><th>PENGGUNA</th><th>PERTANYAAN</th><th>KATEGORI</th><th>WAKTU</th><th>STATUS</th><th></th></tr></thead>
              <tbody id="history-rows"></tbody>
            </table>
            <div className="empty-state hidden" id="history-empty">Tidak ada percakapan yang cocok.</div>
          </div>
          <div className="table-footer">
            <span id="history-range">Menampilkan <strong>1–10</strong> dari <strong>1.284</strong> percakapan</span>
            <div className="pagination" role="navigation" aria-label="Navigasi halaman">
              <button className="page-nav" id="history-prev" disabled aria-label="Halaman sebelumnya">&lsaquo; Previous</button>
              <button className="current-page" aria-current="page">1</button>
              <button>2</button>
              <button>3</button>
              <span className="page-gap">…</span>
              <button>214</button>
              <button className="page-nav" id="history-next" aria-label="Halaman berikutnya">Next &rsaquo;</button>
            </div>
          </div>
        </div>
        <footer className="page-footer"><span>© 2025 Komunitas Halal Bandung</span><span>Data contoh untuk prototipe</span></footer>
      </section>

<footer className="page-footer"><span>© 2025 Komunitas Halal Bandung</span><span>Chatbot edukasi halal <i>●</i> 1 role: Admin</span></footer>
    </>
  );
}
