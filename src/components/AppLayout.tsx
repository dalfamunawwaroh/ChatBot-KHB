import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className="app-shell" id="app-shell">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      {menuOpen ? <div className="sidebar-overlay" onClick={() => setMenuOpen(false)} aria-hidden="true"></div> : null}
      <main className="main-area">
        <Topbar onMenu={() => setMenuOpen(true)} />
        <Outlet />
      </main>
    </div>
  );
}
