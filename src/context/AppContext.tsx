import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { currentUser as seedUser } from '../data/khb';
import type { CurrentUser } from '../data/khb';

const USER_KEY = 'khb-user-profile';

interface AppState {
  user: CurrentUser;
  setUser: Dispatch<SetStateAction<CurrentUser>>;
  /** Simpan patch ke state + localStorage sekaligus. */
  saveUser: (patch: Partial<CurrentUser>) => void;
  /** Data URL foto profil ('' bila belum pernah diunggah). */
  avatar: string;
  setAvatar: (dataUrl: string) => void;
}

const AppCtx = createContext<AppState | null>(null);

export const useApp = (): AppState => {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useApp harus dipakai di dalam AppProvider');
  return ctx;
};

const readUser = (): CurrentUser => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<CurrentUser>;
      // Gabung dengan seed supaya field baru tetap punya nilai.
      return { ...seedUser, ...parsed };
    }
  } catch {
    /* data rusak / localStorage diblokir → pakai seed */
  }
  return seedUser;
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser>(readUser);

  const persist = useCallback((next: CurrentUser) => {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(next));
    } catch {
      /* kuota penuh / diblokir: jangan sampai UI gagal */
    }
  }, []);

  const saveUser = useCallback(
    (patch: Partial<CurrentUser>) => {
      setUser((prev) => {
        const next = { ...prev, ...patch };
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const setAvatar = useCallback(
    (dataUrl: string) => {
      setUser((prev) => {
        const next = { ...prev, avatar: dataUrl };
        persist(next);
        return next;
      });
    },
    [persist],
  );

  // Avatar lama (tersimpan sebelum field `avatar` ada) tetap aman: undefined → ''.
  const value = useMemo<AppState>(
    () => ({ user, setUser, saveUser, avatar: user.avatar ?? '', setAvatar }),
    [user, saveUser, setAvatar],
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}
