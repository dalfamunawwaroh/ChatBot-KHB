import { Link, useLocation, useNavigate } from 'react-router-dom';
import { labels } from '../data/khb.js';

const pathKey = (p) => p.replace('/', '') || 'dashboard';

export default function Topbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const title = labels[pathKey(pathname)] || 'Ringkasan';
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
        <button className="topbar-avatar-btn" aria-label="Menu profil" onClick={() => navigate('/edit-profile')}>
          <div className="avatar avatar-admin" id="topbar-avatar">A</div>
        </button>
        <button className="icon-btn" aria-label="Keluar" title="Keluar" onClick={() => navigate('/login')}>
          <svg viewBox="0 0 20 20" fill="none"><path d="M8 3H4a1 1 0 00-1 1v12a1 1 0 001 1h4M13 14l4-4-4-4M17 10H7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </header>
  );
}
