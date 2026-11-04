@echo off
title KHB - Asisten Halal (Dev Server)
cd /d "%~dp0"

if not exist "node_modules" (
  echo [1/2] Memasang dependency (sekali saja)...
  call npm install
  if errorlevel 1 goto error
)

echo [2/2] Menjalankan KHB di http://localhost:3000
echo Jika port 3000 dipakai proyek lain, jalankan: npm run dev -- --port 3100
echo Tutup jendela ini untuk menghentikan server.
echo.
call npm run dev
goto end

:error
echo.
echo GAGAL: npm install tidak berhasil. Periksa koneksi internet lalu jalankan lagi.
pause

:end
pause
