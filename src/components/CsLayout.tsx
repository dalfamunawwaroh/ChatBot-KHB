import { useState } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';

const ITEMS = [
  { to: '/cs/queue', label: 'Antrean AI', icon: <path d="M3 4h14a1 1 0 011 1v8a1 1 0 01-1 1H6l-4 3V5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /> },
  { to: '/cs/inbox', label: 'Inbox', icon: <><rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M3 9h4l1 2h4l1-2h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></> },
  { to: '/cs/analytics', label: 'Analitik', icon: <><path d="M4 16V8M10 16V4M16 16v-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></> },
];

export default function CsLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app-shell" id="app-shell">
      <aside className={'sidebar' + (menuOpen ? ' open' : '')} id="sidebar" onClick={() => setMenuOpen(false)}>
        <Link className="brand" to="/cs/queue" aria-label="KHB Customer Service">
          <div className="brand-mark">
            <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
              <path d="M22 4 36 9.5v11C36 29.8 30 35.3 22 38.8 14 35.3 8 29.8 8 20.5v-11L22 4Z" fill="currentColor" opacity=".2" />
              <path d="m13.5 22 5.2 5.1 11-11" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="brand-copy">
            <strong>komunitas<span>halal</span></strong>
            <small>BANDUNG · CS</small>
          </div>
        </Link>

        <div className="sidebar-section-label">CUSTOMER SERVICE</div>
        <nav className="main-nav" aria-label="Menu customer service">
          {ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
              <span className="nav-icon">
                <svg viewBox="0 0 20 20" fill="none">{item.icon}</svg>
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-spacer"></div>

        <div className="help-card">
          <div className="help-icon">✦</div>
          <strong>Mode agen</strong>
          <p>Balas pertanyaan yang dieskalasi asisten.</p>
          <Link to="/dashboard">Ke panel admin <span>↗</span></Link>
        </div>

        <Link className="profile" to="/edit-profile">
          <div className="avatar avatar-admin">A</div>
          <div className="profile-info">
            <strong>Admin KHB</strong>
            <small>Agen · CS</small>
          </div>
        </Link>
      </aside>
      {menuOpen ? <div className="sidebar-overlay" onClick={() => setMenuOpen(false)} aria-hidden="true"></div> : null}

      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu icon-btn" onClick={() => setMenuOpen(true)} aria-label="Buka menu">
            <svg viewBox="0 0 20 20" fill="none"><path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
          </button>
          <div className="breadcrumb">
            <span>Customer Service</span>
            <span className="crumb-slash">/</span>
            <strong>Ruang kerja agen</strong>
          </div>
          <div className="topbar-actions">
            <span className="prototype-badge"><i></i> PROTOTIPE</span>
            <Link className="btn btn-secondary btn-sm" to="/dashboard">Panel Admin</Link>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
