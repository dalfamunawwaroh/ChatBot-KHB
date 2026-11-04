import { NavLink, useNavigate } from 'react-router-dom';

const items = [
  { to: '/dashboard', label: 'Ringkasan' },
  { to: '/chat', label: 'Chat Edukasi', badge: 'AI' },
  { to: '/knowledge', label: 'Knowledge Base' },
  { to: '/integrasi', label: 'Integrasi Web', badge: 'BARU' },
  { to: '/history', label: 'Riwayat Chat' },
];

const LogoutIcon = () => (
  <svg viewBox="0 0 20 20" fill="none"><path d="M8 3H4a1 1 0 00-1 1v12a1 1 0 001 1h4M13 14l4-4-4-4M17 10H7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="sidebar" id="sidebar">
      <NavLink className="brand" to="/dashboard" aria-label="KHB Beranda">
        <div className="brand-mark">
          <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
            <path d="M22 4 36 9.5v11C36 29.8 30 35.3 22 38.8 14 35.3 8 29.8 8 20.5v-11L22 4Z" fill="currentColor" opacity=".2" />
            <path d="m13.5 22 5.2 5.1 11-11" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="brand-copy">
          <strong>komunitas<span>halal</span></strong>
          <small>BANDUNG · AI</small>
        </div>
      </NavLink>
      <div className="sidebar-section-label">UTAMA</div>
      <nav className="main-nav" aria-label="Menu utama">
        {items.map((it) => (
          <NavLink key={it.to} to={it.to} className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
            <span>{it.label}</span>
            {it.badge ? <span className="nav-badge">{it.badge}</span> : null}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-spacer"></div>
      <div className="help-card">
        <div className="help-icon">✦</div>
        <strong>Butuh bantuan?</strong>
        <p>Tim KHB siap membantu Anda.</p>
        <a href="https://halalbandung.com/" target="_blank" rel="noreferrer">Kunjungi KHB <span>↗</span></a>
      </div>
      <NavLink className="profile" to="/edit-profile" id="profile-trigger">
        <div className="avatar avatar-admin" id="sidebar-avatar">A</div>
        <div className="profile-info">
          <strong id="sidebar-name">Admin KHB</strong>
          <small id="sidebar-role">Administrator</small>
        </div>
      </NavLink>
      <button className="logout-btn" onClick={() => navigate('/login')} aria-label="Keluar">
        <LogoutIcon />
        <span>Keluar</span>
      </button>
    </aside>
  );
}
