import { createContext, useContext, useState } from 'react';
import { currentUser as seedUser, notifications as seedNotif } from '../data/khb.js';

const AppCtx = createContext(null);
export const useApp = () => useContext(AppCtx);

export function AppProvider({ children }) {
  const [user, setUser] = useState(seedUser);
  const [notifs, setNotifs] = useState(seedNotif);
  const markRead = (id) => setNotifs((ns) => ns.map((n) => (n.id === id ? { ...n, read: true } : n)));
  return <AppCtx.Provider value={{ user, setUser, notifs, markRead }}>{children}</AppCtx.Provider>;
}
