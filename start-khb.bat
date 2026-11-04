@echo off
title KHB - Asisten Halal (Dev Server)
cd /d "%~dp0"

if not exist "node_modules" (
  echo [1/2] Memasang dependency (sekali saja)...
  call npm install
  if errorlevel 1 goto error
)

echo [2/2] Menjalankan frontend + backend KHB...
echo Frontend otomatis pindah port bila 3000 terpakai (mis. 3100). Backend: 4000.
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
