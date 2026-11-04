import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ADMIN_NOTIFICATIONS, type AdminNotification } from "../data/admin";

interface AdminContextValue {
  notifications: AdminNotification[];
  unreadCount: number;
  markRead: (id: number) => void;
  markAllRead: () => void;
  toast: string | null;
  showToast: (message: string) => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AdminNotification[]>(ADMIN_NOTIFICATIONS);
  const [toast, setToast] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setToast(null), 2400);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const markRead = useCallback((id: number) => {
    setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  }, []);

  const unreadCount = notifications.filter((item) => !item.read).length;

  return (
    <AdminContext.Provider value={{ notifications, unreadCount, markRead, markAllRead, toast, showToast }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin harus dipakai di dalam AdminProvider");
  return context;
}
