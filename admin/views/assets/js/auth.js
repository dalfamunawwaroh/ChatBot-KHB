/* KHB auth — khusus 1 role admin, login sukses -> admin/ */
'use strict';
/* ══════════════════════════════════════════════
   AUTH PAGES NAVIGATION
══════════════════════════════════════════════ */
/* MPA: tiap halaman auth file sendiri; link antar-halaman href native. */
function showAuthPage() {}
function enterApp() { window.location.href = 'dashboard.html'; }

/* ─ Login form ─ */
document.getElementById('login-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = document.getElementById('login-btn');
  setAuthLoading(btn, true);
  setTimeout(() => {
    setAuthLoading(btn, false);
    enterApp();
    notify('Selamat datang kembali! 👋');
  }, 1000);
});

/* ─ Google login ─ */
document.getElementById('google-login')?.addEventListener('click', () => {
  notify('Login Google — fitur demo');
  setTimeout(enterApp, 800);
});

/* ─ Register form ─ */
document.getElementById('register-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const firstname = document.getElementById('reg-firstname').value.trim();
  const lastname = document.getElementById('reg-lastname').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pw = document.getElementById('reg-password').value;
  const confirm = document.getElementById('reg-confirm').value;
  const terms = document.getElementById('reg-terms').checked;

  if (!firstname || !lastname || !email || !pw) { notify('Harap lengkapi semua kolom yang wajib'); return; }
  if (pw.length < 8) { notify('Kata sandi minimal 8 karakter'); return; }
  if (pw !== confirm) { notify('Kata sandi tidak cocok'); return; }
  if (!terms) { notify('Harap setujui syarat & ketentuan'); return; }

  const btn = document.getElementById('register-btn');
  setAuthLoading(btn, true);
  setTimeout(() => {
    setAuthLoading(btn, false);
    currentUser.firstName = firstname;
    currentUser.lastName = lastname;
    currentUser.email = email;
    currentUser.initials = (firstname[0] + (lastname[0] || '')).toUpperCase();
    enterApp();
    notify(`Akun berhasil dibuat! Selamat datang, ${firstname}! 🎉`);
  }, 1100);
});

/* ─ Forgot password: email -> OTP (demo: kode apa pun 6 digit diterima) ─ */
document.getElementById('forgot-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('forgot-email').value.trim();
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { notify('Masukkan alamat email yang valid'); return; }
  const btn = this.querySelector('.btn-auth');
  setAuthLoading(btn, true);
  setTimeout(() => {
    setAuthLoading(btn, false);
    try { sessionStorage.setItem('khb_reset_email', email); } catch (_) {}
    notify('Kode OTP dikirim ke ' + email + ' ✉️');
    setTimeout(() => window.location.href = 'reset.html', 900);
  }, 900);
});

/* ─ Reset password (guard: OTP dulu) ─ */
document.getElementById('reset-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  let ok = false;
  try { ok = sessionStorage.getItem('khb_otp_ok') === '1'; } catch (_) {}
  if (!ok && document.getElementById('otp-form')) { notify('Verifikasi OTP dulu'); return; }
  const pw = document.getElementById('reset-password').value;
  const confirm = document.getElementById('reset-confirm').value;
  if (!pw || pw.length < 8) { notify('Kata sandi minimal 8 karakter'); return; }
  if (pw !== confirm) { notify('Kata sandi tidak cocok'); return; }
  const btn = this.querySelector('.btn-auth');
  setAuthLoading(btn, true);
  setTimeout(() => {
    setAuthLoading(btn, false);
    notify('Kata sandi berhasil direset! ✅');
    try { sessionStorage.removeItem('khb_otp_ok'); sessionStorage.removeItem('khb_reset_email'); } catch (_) {}
    setTimeout(() => window.location.href = 'login.html', 900);
  }, 900);
});

/* ─ OTP step (reset.html): 6 kotak + timer + guard ─ */
(function initOtp() {
  const row = document.getElementById('otp-row');
  if (!row) return;
  const boxes = Array.from(row.querySelectorAll('.otp-box'));
  let email = '';
  try { email = sessionStorage.getItem('khb_reset_email') || ''; } catch (_) {}
  if (!email) {
    notify('Isi email dulu di halaman lupa kata sandi');
    setTimeout(() => window.location.href = 'forgot.html', 1200);
    return;
  }
  document.getElementById('otp-target').textContent = 'Dikirim ke ' + email;
  boxes.forEach((b, i) => {
    b.addEventListener('input', () => {
      b.value = b.value.replace(/\D/g, '').slice(0, 1);
      b.classList.toggle('filled', !!b.value);
      if (b.value && i < boxes.length - 1) boxes[i + 1].focus();
    });
    b.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && !b.value && i > 0) boxes[i - 1].focus();
    });
  });
  row.addEventListener('paste', e => {
    const t = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 6);
    if (!t) return;
    e.preventDefault();
    t.split('').forEach((d, i) => { boxes[i].value = d; boxes[i].classList.add('filled'); });
    boxes[Math.min(t.length, 5)].focus();
  });
  boxes[0].focus();
  let sec = 60;
  const btn = document.getElementById('otp-resend');
  const tick = setInterval(() => {
    sec -= 1;
    if (sec <= 0) { clearInterval(tick); btn.disabled = false; btn.textContent = 'Kirim ulang kode'; return; }
    document.getElementById('otp-timer').textContent = sec;
  }, 1000);
  btn.addEventListener('click', () => {
    notify('Kode OTP baru dikirim ✉️');
    btn.disabled = true;
    sec = 60;
    btn.innerHTML = 'Kirim ulang (<span id="otp-timer">' + sec + '</span>d)';
  });
  document.getElementById('otp-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const code = boxes.map(b => b.value).join('');
    if (code.length < 6) { notify('Lengkapi 6 digit OTP'); return; }
    const btn2 = this.querySelector('.btn-auth');
    setAuthLoading(btn2, true);
    setTimeout(() => {
      setAuthLoading(btn2, false);
      try { sessionStorage.setItem('khb_otp_ok', '1'); } catch (_) {}
      document.getElementById('otp-form').classList.add('hidden');
      document.getElementById('reset-form').classList.remove('hidden');
      document.getElementById('st-otp').classList.remove('on');
      const st = document.getElementById('st-pw'); st.classList.add('on');
      st.querySelector('i').textContent = '✓';
      document.getElementById('reset-sub').textContent = 'OTP terverifikasi. Buat kata sandi baru Anda.';
      document.getElementById('reset-password').focus();
      notify('OTP benar ✅ — buat kata sandi baru');
    }, 800);
  });
})();

function setAuthLoading(btn, loading) {
  const text = btn.querySelector('.btn-text');
  const loader = btn.querySelector('.btn-loader');
  if (text) text.style.display = loading ? 'none' : '';
  if (loader) loader.classList.toggle('hidden', !loading);
  btn.disabled = loading;
}

/* ── Password strength ── */
document.getElementById('reg-password')?.addEventListener('input', function() {
  const val = this.value;
  const fill = document.getElementById('pw-bar-fill');
  const label = document.getElementById('pw-strength-label');
  if (!val) { fill.className = ''; fill.style.width = '0'; label.textContent = 'Masukkan kata sandi'; return; }
  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^a-zA-Z0-9]/.test(val)) score++;
  if (score <= 1) { fill.className = 'weak'; label.textContent = 'Lemah'; }
  else if (score <= 2) { fill.className = 'medium'; label.textContent = 'Sedang'; }
  else { fill.className = 'strong'; label.textContent = 'Kuat'; }
});

/* ── Password toggle visibility ── */
document.querySelectorAll('.input-toggle-pw').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const input = document.getElementById(targetId);
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
  });
});

/* ── DALFA auth v2: segmented + caps + passkey + remember ── */
(function initAuthV2() {
  document.querySelectorAll('input[type="password"]').forEach(inp => {
    inp.addEventListener('keyup', e => {
      const on = e.getModifierState && e.getModifierState('CapsLock');
      const hint = inp.closest('.form-group')?.querySelector('.caps-hint');
      if (hint) hint.classList.toggle('show', !!on);
    });
  });
  document.getElementById('passkey-login')?.addEventListener('click', () => {
    notify('Passkey — demo, lanjut dengan email dulu');
  });
  const remembered = (() => { try { return localStorage.getItem('khb_email') || ''; } catch (_) { return ''; } })();
  if (remembered) {
    const em = document.getElementById('login-email');
    if (em && !em.value) em.value = remembered;
    const cb = document.getElementById('login-remember');
    if (cb && remembered) cb.checked = true;
  }
  document.getElementById('login-form')?.addEventListener('submit', function() {
    const em = document.getElementById('login-email');
    const err = document.getElementById('err-login-email');
    const bad = !em || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em.value.trim());
    if (err) err.classList.toggle('show', bad);
    em?.closest('.input-wrap')?.classList.toggle('invalid', bad);
    if (bad) { em?.classList.add('shake'); setTimeout(() => em?.classList.remove('shake'), 350); }
    else {
      const cb = document.getElementById('login-remember');
      try {
        if (cb?.checked) localStorage.setItem('khb_email', em.value.trim());
        else localStorage.removeItem('khb_email');
      } catch (_) {}
    }
  }, true);
})();
