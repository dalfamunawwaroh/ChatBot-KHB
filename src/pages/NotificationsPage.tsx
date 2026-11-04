import { useState } from 'react';
import { useApp } from '../context/AppContext';

const ICONS: Record<string, React.ReactNode> = {
  chat: (
    <svg viewBox="0 0 20 20" fill="none"><path d="M3 4h14a1 1 0 011 1v8a1 1 0 01-1 1H6l-4 3V5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
  ),
  system: (
    <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" /><path d="M10 7v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="10" cy="14" r="0.8" fill="currentColor" /></svg>
  ),
};

type Filter = 'all' | 'unread' | 'system' | 'chat';

export default function NotificationsPage() {
  const { notifs, markRead, markAllRead } = useApp();
  const [filter, setFilter] = useState<Filter>('all');
  const unread = notifs.filter((n) => !n.read).length;

  const rows = notifs.filter((item) => {
    if (filter === 'unread') return !item.read;
    if (filter === 'system') return item.type === 'system';
    if (filter === 'chat') return item.type === 'chat';
    return true;
  });

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
          <button className="btn btn-secondary" id="mark-all-read-btn" onClick={markAllRead}>
            <svg viewBox="0 0 20 20" fill="none"><path d="M3 10l5 5 9-9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Tandai Semua Dibaca
          </button>
        </div>
        <div className="notif-tabs">
          <button className={`notif-tab${filter === 'all' ? ' selected' : ''}`} onClick={() => setFilter('all')}>Semua <span className="notif-tab-count" id="notif-tab-all">{notifs.length}</span></button>
          <button className={`notif-tab${filter === 'unread' ? ' selected' : ''}`} onClick={() => setFilter('unread')}>Belum dibaca <span className="notif-tab-count unread" id="notif-tab-unread">{unread}</span></button>
          <button className={`notif-tab${filter === 'system' ? ' selected' : ''}`} onClick={() => setFilter('system')}>Sistem</button>
          <button className={`notif-tab${filter === 'chat' ? ' selected' : ''}`} onClick={() => setFilter('chat')}>Chat</button>
        </div>
        <div className="notif-list" id="notif-list">
          {rows.map((n) => (
            <button
              type="button"
              className={`notif-item${n.read ? '' : ' unread'}`}
              key={n.id}
              onClick={() => markRead(n.id)}
              style={{ width: '100%', textAlign: 'left', border: 0, background: 'transparent', cursor: 'pointer' }}
            >
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
            </button>
          ))}
          {rows.length === 0 ? <div className="empty-state">Tidak ada notifikasi pada filter ini.</div> : null}
        </div>
        <div className="notif-more-wrap">
          <button className="notif-more" id="notif-more" hidden>
            <svg viewBox="0 0 20 20" fill="none"><path d="M10 4v10M6 10l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Muat lebih banyak
          </button>
          <p className="notif-more-count" id="notif-more-count">{`Menampilkan ${rows.length} dari ${notifs.length} notifikasi`}</p>
        </div>
      </section>

<footer className="page-footer"><span>© 2025 Komunitas Halal Bandung</span><span>Chatbot edukasi halal <i>●</i> 1 role: Admin</span></footer>
    </>
  );
}
