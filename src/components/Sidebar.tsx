import { NavLink, useNavigate } from 'react-router-dom';

interface NavItem {
  to: string;
  label: string;
  badge?: string;
  icon: React.ReactNode;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const GROUPS: NavGroup[] = [
  {
    label: 'AI & KNOWLEDGE',
    items: [
      { to: '/dashboard', label: 'Dashboard', icon: <><rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" /></> },
      { to: '/chatbot', label: 'Chatbot AI', icon: <><circle cx="10" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.5" /><path d="M4 17c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></> },
      { to: '/embed', label: 'Embed Website', icon: <><path d="M7 4H4v12h3M13 4h3v12h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M8 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></> },
      { to: '/products', label: 'Produk', icon: <><path d="M3 7l7-4 7 4v6l-7 4-7-4V7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M3 7l7 4 7-4M10 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></> },
      { to: '/knowledge-base', label: 'Basis Pengetahuan', icon: <><rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></> },
      { to: '/knowledge', label: 'Flow Builder', icon: <><circle cx="6" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.5" /><circle cx="14" cy="14" r="2.4" stroke="currentColor" strokeWidth="1.5" /><path d="M6 8.4v3.2a2.4 2.4 0 002.4 2.4h3.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></> },
    ],
  },
  {
    label: 'OMNICHANNEL',
    items: [
      { to: '/channels', label: 'Channels', icon: <path d="M7 8a4 4 0 015.7-.4l2 2a4 4 0 01-5.6 5.6l-1.1-1.1M9 12a4 4 0 01-5.7.4l-2-2a4 4 0 015.6-5.6l1.1 1.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /> },
    ],
  },
  {
    label: 'WORKSPACE',
    items: [
      { to: '/customers', label: 'Pelanggan', icon: <><circle cx="8" cy="7" r="2.8" stroke="currentColor" strokeWidth="1.5" /><path d="M2 17c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M14 5.2A2.8 2.8 0 0114 10.6M16 17c0-2.2-1-3.8-2.6-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></> },
      { to: '/team', label: 'Pengguna', icon: <><circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></> },
      { to: '/audit', label: 'Jejak Audit', icon: <><rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M6.5 8h7M6.5 11h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></> },
      { to: '/getting-started', label: 'Panduan Mulai', icon: <path d="M10 2l2.4 5.2 5.6.6-4.2 3.8 1.2 5.6L10 14.4 5 17.2l1.2-5.6L2 7.8l5.6-.6L10 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /> },
    ],
  },
  {
    label: 'KHB',
    items: [
      { to: '/chat', label: 'Chat Edukasi', badge: 'AI', icon: <path d="M3 4h14a1 1 0 011 1v8a1 1 0 01-1 1H6l-4 3V5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /> },
      { to: '/history', label: 'Percakapan', icon: <><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" /><path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></> },
      { to: '/notifications', label: 'Notifikasi', icon: <><path d="M10 2a6 6 0 016 6c0 3 .8 5 1.5 6H2.5C3.2 13 4 11 4 8a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.5" /><path d="M8 16a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></> },
      { to: '/settings', label: 'Pengaturan', icon: <><circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" /><path d="M10 2v2M10 16v2M2 10h2M16 10h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></> },
    ],
  },
];

const LogoutIcon = () => (
  <svg viewBox="0 0 20 20" fill="none"><path d="M8 3H4a1 1 0 00-1 1v12a1 1 0 001 1h4M13 14l4-4-4-4M17 10H7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ open = false, onClose }: SidebarProps) {
  const navigate = useNavigate();
  return (
    <aside className={'sidebar' + (open ? ' open' : '')} id="sidebar">
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

      <nav className="main-nav sidebar-scroll" aria-label="Menu utama">
        {GROUPS.map((group) => (
          <div className="nav-group" key={group.label}>
            <div className="sidebar-section-label">{group.label}</div>
            {group.items.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
                <span className="nav-icon">
                  <svg viewBox="0 0 20 20" fill="none">{item.icon}</svg>
                </span>
                <span>{item.label}</span>
                {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-spacer"></div>

      <NavLink className="profile" to="/edit-profile" id="profile-trigger">
        <div className="avatar avatar-admin" id="sidebar-avatar">A</div>
        <div className="profile-info">
          <strong id="sidebar-name">Admin KHB</strong>
          <small id="sidebar-role">Administrator</small>
        </div>
      </NavLink>
      <button className="logout-btn" onClick={() => { onClose?.(); navigate('/login'); }} aria-label="Keluar">
        <LogoutIcon />
        <span>Keluar</span>
      </button>
    </aside>
  );
}
