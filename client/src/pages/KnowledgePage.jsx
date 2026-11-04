export default function KnowledgePage() {
  return (
    <>
{/*─── KNOWLEDGE BASE VIEW ───*/}
      <section className="view active" id="view-knowledge">
        <div className="page-title-row">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot"></span> PENGELOLAAN DATA AI</div>
            <h1>Knowledge Base</h1>
            <p className="subheading">Kelola sumber informasi yang digunakan chatbot untuk menjawab.</p>
          </div>
          <button className="btn btn-primary" id="add-document">
            <svg viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
            Tambah Dokumen
          </button>
        </div>
        <div className="knowledge-summary">
          <div className="knowledge-stat">
            <span className="knowledge-stat-icon green">
              <svg viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            </span>
            <div><small>Total dokumen</small><strong>38</strong></div>
          </div>
          <div className="knowledge-stat">
            <span className="knowledge-stat-icon blue">
              <svg viewBox="0 0 20 20" fill="none"><path d="M5 10l4 4 6-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <div><small>Dokumen aktif</small><strong>34</strong></div>
          </div>
          <div className="knowledge-stat">
            <span className="knowledge-stat-icon orange">
              <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6v4l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </span>
            <div><small>Menunggu proses</small><strong>2</strong></div>
          </div>
          <div className="knowledge-stat">
            <span className="knowledge-stat-icon slate">
              <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M5.5 5.5l9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </span>
            <div><small>Nonaktif / draf</small><strong>2</strong></div>
          </div>
          <div className="knowledge-stat">
            <span className="knowledge-stat-icon purple">
              <svg viewBox="0 0 20 20" fill="none"><path d="M10 4v2M10 14v2M4 10H2M18 10h-2M5.4 5.4l1.4 1.4M13.2 13.2l1.4 1.4M5.4 14.6l1.4-1.4M13.2 6.8l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/></svg>
            </span>
            <div><small>Pembaruan terakhir</small><strong className="date-value">Hari ini, 09:42</strong></div>
          </div>
        </div>
        <div className="panel document-panel">
          <div className="document-toolbar">
            <div className="filter-tabs">
              <button className="filter-tab selected" data-filter="Semua">Semua <span>38</span></button>
              <button className="filter-tab" data-filter="Regulasi">Regulasi</button>
              <button className="filter-tab" data-filter="Panduan">Panduan</button>
              <button className="filter-tab" data-filter="FAQ">FAQ</button>
            </div>
            <label className="search-box">
              <svg viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5"/><path d="M15 15l-2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <input id="doc-search" type="search" placeholder="Cari dokumen..." />
            </label>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>NAMA DOKUMEN</th><th>KATEGORI</th><th>SUMBER</th><th>STATUS</th><th>TERAKHIR DIPERBARUI</th><th></th></tr></thead>
              <tbody id="document-rows"></tbody>
            </table>
            <div className="empty-state hidden" id="doc-empty">Dokumen tidak ditemukan.</div>
          </div>
          <div className="table-footer">
            <span id="doc-range">Menampilkan <strong>1–6</strong> dari <strong>38</strong> dokumen</span>
            <div className="pagination" role="navigation" aria-label="Navigasi halaman">
              <button className="page-nav" id="doc-prev" disabled aria-label="Halaman sebelumnya">&lsaquo; Previous</button>
              <button className="current-page" aria-current="page">1</button>
              <button>2</button>
              <button>3</button>
              <span className="page-gap">…</span>
              <button>7</button>
              <button className="page-nav" id="doc-next" aria-label="Halaman berikutnya">Next &rsaquo;</button>
            </div>
          </div>
        </div>
        <p className="knowledge-note">ⓘ Knowledge base ini menggunakan data contoh. Unggah dokumen belum tersambung ke sistem backend.</p>
        <input type="file" id="file-input" accept=".pdf,.doc,.docx,.txt" hidden />
      </section>

<footer className="page-footer"><span>© 2025 Komunitas Halal Bandung</span><span>Chatbot edukasi halal <i>●</i> 1 role: Admin</span></footer>
    </>
  );
}
