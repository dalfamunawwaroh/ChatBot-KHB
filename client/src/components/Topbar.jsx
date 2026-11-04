import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { labels } from '../data/khb.js';

const pathKey = (p) => p.replace('/', '') || 'dashboard';

const MENU = [
  {
    to: '/edit-profile',
    label: 'Edit Profil',
    icon: <path d="M13 3l4 4-9 9H4v-4L13 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />,
  },
  {
    to: '/settings',
    label: 'Pengaturan',
    icon: (
      <>
        <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10 2v2M10 16v2M2 10h2M16 10h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
];

export default function Topbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const title = labels[pathKey(pathname)] || 'Ringkasan';
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (!wrap.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('click', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className="topbar">
      <div className="breadcrumb">
        <span>Workspace</span>
        <span className="crumb-slash">/</span>
        <strong id="breadcrumb-current">{title}</strong>
      </div>
      <div className="topbar-actions">
        <span className="prototype-badge"><i></i> PROTOTIPE</span>
        <Link className="icon-btn notification-btn" to="/notifications" aria-label="Notifikasi">
          <svg viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 016 6c0 3 .8 5 1.5 6H2.5C3.2 13 4 11 4 8a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.5" /><path d="M8 16a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          <span className="notif-badge" id="notif-badge">3</span>
        </Link>
        <div className="topbar-pop-wrap" ref={wrap}>
          <button
            className="topbar-avatar-btn"
            aria-label="Menu profil"
            aria-expanded={open}
            aria-haspopup="menu"
            onClick={() => setOpen((v) => !v)}
          >
            <div className="avatar avatar-admin" id="topbar-avatar">A</div>
          </button>
          <div className={`topbar-pop${open ? '' : ' hidden'}`} id="profile-pop" role="menu" aria-label="Menu profil">
            {MENU.map((it) => (
              <button
                key={it.to}
                className="profile-dd-item"
                role="menuitem"
                onClick={() => { setOpen(false); navigate(it.to); }}
              >
                <svg viewBox="0 0 20 20" fill="none">{it.icon}</svg>
                {it.label}
              </button>
            ))}
            <div className="profile-dd-divider"></div>
            <button
              className="profile-dd-item danger"
              role="menuitem"
              onClick={() => { setOpen(false); navigate('/login'); }}
            >
              <svg viewBox="0 0 20 20" fill="none"><path d="M8 3H4a1 1 0 00-1 1v12a1 1 0 001 1h4M13 14l4-4-4-4M17 10H7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Keluar
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
