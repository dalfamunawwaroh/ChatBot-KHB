export default function NotificationsPage() {
  return (
    <>
{/*─── NOTIFICATIONS VIEW ───*/}
      <section className="view active" id="view-notifications">
        <div className="page-title-row">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot"></span> PUSAT NOTIFIKASI</div>
            <h1>Notifikasi</h1>
            <p className="subheading">Pantau aktivitas terbaru dan pembaruan sistem.</p>
          </div>
          <button className="btn btn-secondary" id="mark-all-read-btn">
            <svg viewBox="0 0 20 20" fill="none"><path d="M3 10l5 5 9-9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Tandai Semua Dibaca
          </button>
        </div>
        <div className="notif-tabs">
          <button className="notif-tab selected" data-notif-filter="all">Semua <span className="notif-tab-count" id="notif-tab-all">8</span></button>
          <button className="notif-tab" data-notif-filter="unread">Belum dibaca <span className="notif-tab-count unread" id="notif-tab-unread">3</span></button>
          <button className="notif-tab" data-notif-filter="system">Sistem</button>
          <button className="notif-tab" data-notif-filter="chat">Chat</button>
        </div>
        <div className="notif-list" id="notif-list"></div>
        <div className="notif-more-wrap">
          <button className="notif-more" id="notif-more" hidden>
            <svg viewBox="0 0 20 20" fill="none"><path d="M10 4v10M6 10l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Muat lebih banyak
          </button>
          <p className="notif-more-count" id="notif-more-count"></p>
        </div>
      </section>

<footer className="page-footer"><span>© 2025 Komunitas Halal Bandung</span><span>Chatbot edukasi halal <i>●</i> 1 role: Admin</span></footer>
    </>
  );
}
