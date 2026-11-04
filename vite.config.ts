import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    // Jangan pindah port otomatis: kalau 3000 dipakai proyek lain, lebih baik
    // gagal dengan pesan jelas daripada diam-diam membuka aplikasi lain.
    strictPort: true,
  },
});
