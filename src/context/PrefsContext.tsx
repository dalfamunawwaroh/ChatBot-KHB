import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';
export type TextSize = 'small' | 'medium' | 'large';

const THEME_KEY = 'khb-theme';
const TEXT_KEY = 'khb-text-size';

interface PrefsState {
  theme: ThemeMode;
  textSize: TextSize;
  /** Tema yang benar-benar dipakai setelah mode 'system' diselesaikan. */
  resolvedTheme: 'light' | 'dark';
  setTheme: (mode: ThemeMode) => void;
  setTextSize: (size: TextSize) => void;
}

const PrefsCtx = createContext<PrefsState | null>(null);

export const usePrefs = (): PrefsState => {
  const ctx = useContext(PrefsCtx);
  if (!ctx) throw new Error('usePrefs harus dipakai di dalam PrefsProvider');
  return ctx;
};

const readTheme = (): ThemeMode => {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
  } catch {
    /* localStorage bisa diblokir (mode privat) — pakai default */
  }
  return 'light';
};

const readTextSize = (): TextSize => {
  try {
    const saved = localStorage.getItem(TEXT_KEY);
    if (saved === 'small' || saved === 'medium' || saved === 'large') return saved;
  } catch {
    /* abaikan */
  }
  return 'medium';
};

const prefersDark = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(readTheme);
  const [textSize, setTextSizeState] = useState<TextSize>(readTextSize);
  const [systemDark, setSystemDark] = useState<boolean>(prefersDark);

  // Mode 'system' harus ikut berubah saat pengaturan OS berganti.
  useEffect(() => {
    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!media) return;
    const onChange = (event: MediaQueryListEvent) => setSystemDark(event.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const resolvedTheme: 'light' | 'dark' =
    theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;

  // Terapkan ke <body> + <html> supaya CSS `body.dark-theme` dan skala teks aktif.
  useEffect(() => {
    const body = document.body;
    body.classList.toggle('dark-theme', resolvedTheme === 'dark');
    body.dataset.theme = resolvedTheme;
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    document.documentElement.dataset.textSize = textSize;
  }, [textSize]);

  const setTheme = useCallback((mode: ThemeMode) => {
    setThemeState(mode);
    try {
      localStorage.setItem(THEME_KEY, mode);
    } catch {
      /* abaikan */
    }
  }, []);

  const setTextSize = useCallback((size: TextSize) => {
    setTextSizeState(size);
    try {
      localStorage.setItem(TEXT_KEY, size);
    } catch {
      /* abaikan */
    }
  }, []);

  const value = useMemo<PrefsState>(
    () => ({ theme, textSize, resolvedTheme, setTheme, setTextSize }),
    [theme, textSize, resolvedTheme, setTheme, setTextSize],
  );

  return <PrefsCtx.Provider value={value}>{children}</PrefsCtx.Provider>;
}
