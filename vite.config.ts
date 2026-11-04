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
    // Backend KHB (server/) berjalan di port 4000 — semua panggilan /api
    // diteruskan ke sana agar frontend tidak perlu tahu URL absolut.
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
});
