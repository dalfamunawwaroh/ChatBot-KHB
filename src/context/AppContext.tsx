import { createContext, useContext, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { currentUser as seedUser, notifications as seedNotif } from '../data/khb';
import type { CurrentUser, NotificationItem } from '../data/khb';

interface AppState {
  user: CurrentUser;
  setUser: Dispatch<SetStateAction<CurrentUser>>;
  notifs: NotificationItem[];
  markRead: (id: number) => void;
  markAllRead: () => void;
}

const AppCtx = createContext<AppState | null>(null);

export const useApp = (): AppState => {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useApp harus dipakai di dalam AppProvider');
  return ctx;
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser>(seedUser);
  const [notifs, setNotifs] = useState<NotificationItem[]>(seedNotif);

  const markRead = (id: number) =>
    setNotifs((items) => items.map((item) => (item.id === id ? { ...item, read: true } : item)));

  const markAllRead = () => setNotifs((items) => items.map((item) => ({ ...item, read: true })));

  return (
    <AppCtx.Provider value={{ user, setUser, notifs, markRead, markAllRead }}>{children}</AppCtx.Provider>
  );
}
