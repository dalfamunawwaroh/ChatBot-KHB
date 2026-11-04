import { useApp } from '../context/AppContext.jsx';

const ICONS = {
  chat: (
    <svg viewBox="0 0 20 20" fill="none"><path d="M3 4h14a1 1 0 011 1v8a1 1 0 01-1 1H6l-4 3V5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
  ),
  system: (
    <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" /><path d="M10 7v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="10" cy="14" r="0.8" fill="currentColor" /></svg>
  ),
};

export default function NotificationsPage() {
  const { notifs } = useApp();
  const unread = notifs.filter((n) => !n.read).length;

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
          <button className="notif-tab selected" data-notif-filter="all">Semua <span className="notif-tab-count" id="notif-tab-all">{notifs.length}</span></button>
          <button className="notif-tab" data-notif-filter="unread">Belum dibaca <span className="notif-tab-count unread" id="notif-tab-unread">{unread}</span></button>
          <button className="notif-tab" data-notif-filter="system">Sistem</button>
          <button className="notif-tab" data-notif-filter="chat">Chat</button>
        </div>
        <div className="notif-list" id="notif-list">
          {notifs.map((n) => (
            <div className={`notif-item${n.read ? '' : ' unread'}`} key={n.id} data-notif-id={n.id}>
              <div className={`notif-icon ${n.icon}`}>
                {ICONS[n.type] || ICONS.system}
              </div>
              <div className="notif-content">
                <span className="notif-title">{n.title}</span>
                <p className="notif-desc">{n.desc}</p>
              </div>
              <div className="notif-side">
                <span className="notif-time">{n.time}</span>
                {n.read ? null : <div className="notif-dot"></div>}
              </div>
            </div>
          ))}
        </div>
        <div className="notif-more-wrap">
          <button className="notif-more" id="notif-more" hidden>
            <svg viewBox="0 0 20 20" fill="none"><path d="M10 4v10M6 10l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Muat lebih banyak
          </button>
          <p className="notif-more-count" id="notif-more-count">{`Menampilkan ${notifs.length} dari ${notifs.length} notifikasi`}</p>
        </div>
      </section>

<footer className="page-footer"><span>© 2025 Komunitas Halal Bandung</span><span>Chatbot edukasi halal <i>●</i> 1 role: Admin</span></footer>
    </>
  );
}
