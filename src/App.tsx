import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminLayout from "./admin/AdminLayout";
import { AdminProvider } from "./admin/AdminContext";
import Dashboard from "./admin/pages/Dashboard";
import Conversations from "./admin/pages/Conversations";
import KnowledgeBase from "./admin/pages/KnowledgeBase";
import Notifications from "./admin/pages/Notifications";
import Settings from "./admin/pages/Settings";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/admin"
          element={
            <AdminProvider>
              <AdminLayout />
            </AdminProvider>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="percakapan" element={<Conversations />} />
          <Route path="knowledge" element={<KnowledgeBase />} />
          <Route path="notifikasi" element={<Notifications />} />
          <Route path="pengaturan" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
