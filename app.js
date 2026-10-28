'use strict';

/* ══════════════════════════════════════════════
   KHB CHATBOT — APP.JS v2.0
   Full SPA: Auth + Dashboard + Chat + Knowledge + History + Notifications + Settings + Edit Profile
══════════════════════════════════════════════ */

/* ── DATA ── */
const documents = [
  {name:'Panduan Sertifikasi Halal untuk UMK',file:'Panduan_Sertifikasi_UMK.pdf',category:'Panduan',source:'BPJPH',updated:'Hari ini, 09:42',status:'Aktif',icon:'PDF',type:'pdf'},
  {name:'Undang-Undang No. 33 Tahun 2014',file:'UU_Jaminan_Produk_Halal.pdf',category:'Regulasi',source:'JDIH BPK RI',updated:'Kemarin, 14:20',status:'Aktif',icon:'PDF',type:'pdf'},
  {name:'FAQ Sertifikasi Halal Self Declare',file:'FAQ_Self_Declare.pdf',category:'FAQ',source:'KHB',updated:'24 Jun 2025',status:'Aktif',icon:'PDF',type:'pdf'},
  {name:'Kriteria Sistem Jaminan Produk Halal',file:'Kriteria_SJPH.pdf',category:'Regulasi',source:'BPJPH',updated:'22 Jun 2025',status:'Aktif',icon:'PDF',type:'pdf'},
  {name:'Checklist Persiapan Dokumen Halal',file:'Checklist_Dokumen.pdf',category:'Panduan',source:'KHB',updated:'20 Jun 2025',status:'Aktif',icon:'PDF',type:'pdf'},
  {name:'Keputusan Kepala BPJPH No. 57 Tahun 2021',file:'Kepkaban_57_2021.pdf',category:'Regulasi',source:'BPJPH',updated:'18 Jun 2025',status:'Proses',icon:'PDF',type:'pdf'}
];

const historyData = [
  {name:'Rina Amelia',initials:'RA',email:'rina.amelia@email.com',question:'Bagaimana cara daftar sertifikat halal untuk usaha makanan saya?',category:'Sertifikasi',time:'Hari ini, 10:42',status:'Terjawab',tone:'green'},
  {name:'Dimas Pratama',initials:'DP',email:'dimas.p@email.com',question:'Apa perbedaan self declare dan jalur reguler?',category:'Self declare',time:'Hari ini, 10:26',status:'Terjawab',tone:'blue'},
  {name:'Siti Wulandari',initials:'SW',email:'siti.wulandari@email.com',question:'Dokumen apa saja yang perlu saya siapkan?',category:'Dokumen',time:'Hari ini, 09:58',status:'Terjawab',tone:'peach'},
  {name:'Fajar Nugraha',initials:'FN',email:'fajar.n@email.com',question:'Apakah biaya sertifikat halal gratis untuk UMKM?',category:'Biaya',time:'Hari ini, 09:31',status:'Perlu tindak lanjut',tone:'blue'},
  {name:'Nadia Putri',initials:'NP',email:'nadia.putri@email.com',question:'Berapa lama proses sertifikasi halal berlangsung?',category:'Sertifikasi',time:'Hari ini, 09:12',status:'Terjawab',tone:'green'},
  {name:'Agus Setiawan',initials:'AS',email:'agus.s@email.com',question:'Bagaimana cara mengecek status pengajuan halal?',category:'Proses',time:'Hari ini, 08:45',status:'Terjawab',tone:'peach'}
];

const notifications = [
  {id:1, type:'chat', icon:'green', title:'Percakapan baru dari Rina Amelia', desc:'Bagaimana cara daftar sertifikat halal untuk usaha makanan saya?', time:'2 menit lalu', read:false},
  {id:2, type:'system', icon:'blue', title:'Knowledge base diperbarui', desc:'Dokumen "Panduan Sertifikasi Halal UMK" berhasil disinkronkan.', time:'1 jam lalu', read:false},
  {id:3, type:'system', icon:'orange', title:'Laporan mingguan tersedia', desc:'Ringkasan aktivitas chatbot minggu ini sudah bisa dilihat.', time:'3 jam lalu', read:false},
  {id:4, type:'chat', icon:'green', title:'Percakapan baru dari Dimas Pratama', desc:'Apa perbedaan self declare dan jalur reguler?', time:'Kemarin, 10:26', read:true},
  {id:5, type:'system', icon:'blue', title:'Sistem diperbarui ke v2.0', desc:'Antarmuka KHB Chatbot telah diperbarui dengan fitur baru.', time:'2 hari lalu', read:true},
  {id:6, type:'chat', icon:'green', title:'Percakapan baru dari Siti Wulandari', desc:'Dokumen apa saja yang perlu saya siapkan?', time:'3 hari lalu', read:true},
  {id:7, type:'system', icon:'red', title:'Percobaan login gagal terdeteksi', desc:'Ada 2 percobaan login gagal pada akun Anda dari IP tidak dikenal.', time:'5 hari lalu', read:true},
  {id:8, type:'system', icon:'orange', title:'Kuota storage 80% penuh', desc:'Pertimbangkan untuk menghapus dokumen yang tidak digunakan.', time:'1 minggu lalu', read:true}
];

/* ── USER STATE ── */
let currentUser = {
  firstName: 'Admin',
  lastName: 'KHB',
  email: 'admin@khb.or.id',
  phone: '+62 812-3456-7890',
  org: 'Komunitas Halal Bandung',
  bio: 'Administrator Komunitas Halal Bandung.',
  role: 'Administrator',
  initials: 'A',
};

/* ── VIEW LABELS ── */
const labels = {
  dashboard: 'Ringkasan',
  chat: 'Chat Edukasi',
  knowledge: 'Knowledge Base',
  history: 'Riwayat Chat',
  notifications: 'Notifikasi',
  settings: 'Pengaturan',
  'edit-profile': 'Edit Profil'
};

/* ══════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════ */
const toastEl = document.getElementById('toast');
let toastTimer;
function notify(msg, duration = 2600) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), duration);
}

/* ══════════════════════════════════════════════
   AUTH PAGES NAVIGATION
══════════════════════════════════════════════ */
function showAuthPage(id) {
  document.querySelectorAll('.auth-page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + id);
  if (target) target.classList.add('active');
}

function enterApp() {
  document.getElementById('auth-pages').classList.add('hidden');
  document.getElementById('app-shell').classList.remove('hidden');
  document.getElementById('floating-chat').classList.remove('hidden');
  updateUserUI();
  navigate('dashboard');
}

function exitApp() {
  document.getElementById('auth-pages').classList.remove('hidden');
  document.getElementById('app-shell').classList.add('hidden');
  document.getElementById('floating-chat').classList.add('hidden');
  showAuthPage('login');
}

/* Wiring auth links */
document.getElementById('go-register').addEventListener('click', e => { e.preventDefault(); showAuthPage('register'); });
document.getElementById('go-login').addEventListener('click', e => { e.preventDefault(); showAuthPage('login'); });
document.getElementById('go-forgot').addEventListener('click', e => { e.preventDefault(); showAuthPage('forgot'); });
document.getElementById('go-back-login').addEventListener('click', e => { e.preventDefault(); showAuthPage('login'); });

/* ─ Login form ─ */
document.getElementById('login-form').addEventListener('submit', function(e) {
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
document.getElementById('google-login').addEventListener('click', () => {
  notify('Login Google — fitur demo');
  setTimeout(enterApp, 800);
});

/* ─ Register form ─ */
document.getElementById('register-form').addEventListener('submit', function(e) {
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

/* ─ Forgot password ─ */
document.getElementById('forgot-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('forgot-email').value.trim();
  if (!email) { notify('Masukkan alamat email'); return; }
  const btn = this.querySelector('.btn-auth');
  setAuthLoading(btn, true);
  setTimeout(() => {
    setAuthLoading(btn, false);
    notify('Tautan reset dikirim ke ' + email + ' ✉️');
    setTimeout(() => showAuthPage('reset'), 1200);
  }, 1000);
});

/* ─ Reset password ─ */
document.getElementById('reset-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const pw = document.getElementById('reset-password').value;
  const confirm = document.getElementById('reset-confirm').value;
  if (!pw || pw.length < 8) { notify('Kata sandi minimal 8 karakter'); return; }
  if (pw !== confirm) { notify('Kata sandi tidak cocok'); return; }
  const btn = this.querySelector('.btn-auth');
  setAuthLoading(btn, true);
  setTimeout(() => {
    setAuthLoading(btn, false);
    notify('Kata sandi berhasil direset! ✅');
    showAuthPage('login');
  }, 900);
});

function setAuthLoading(btn, loading) {
  const text = btn.querySelector('.btn-text');
  const loader = btn.querySelector('.btn-loader');
  if (text) text.style.display = loading ? 'none' : '';
  if (loader) loader.classList.toggle('hidden', !loading);
  btn.disabled = loading;
}

/* ── Password strength ── */
document.getElementById('reg-password').addEventListener('input', function() {
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

/* ══════════════════════════════════════════════
   MAIN APP NAVIGATION
══════════════════════════════════════════════ */
function navigate(view) {
  if (!labels[view]) return;

  // Update views
  document.querySelectorAll('.view').forEach(el =>
    el.classList.toggle('active', el.id === `view-${view}`)
  );

  // Update nav items
  document.querySelectorAll('.nav-item').forEach(el =>
    el.classList.toggle('active', el.dataset.view === view)
  );

  // Update breadcrumb
  const bc = document.getElementById('breadcrumb-current');
  if (bc) bc.textContent = labels[view];

  // Close sidebar on mobile
  document.getElementById('sidebar').classList.remove('open');
  const overlay = document.getElementById('sidebar-overlay');
  if (overlay) overlay.classList.add('hidden');

  // Scroll top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // View-specific inits
  if (view === 'notifications') renderNotifications('all');
  if (view === 'settings') initSettings();
  if (view === 'edit-profile') syncProfileForm();
}

/* Wire nav buttons */
document.querySelectorAll('[data-view]').forEach(btn => {
  btn.addEventListener('click', () => {
    const view = btn.dataset.view;
    if (document.getElementById('view-' + view)) {
      navigate(view);
    }
    // Close profile dropdown
    document.getElementById('profile-dropdown').classList.add('hidden');
  });
});

document.querySelectorAll('[data-go]').forEach(btn =>
  btn.addEventListener('click', () => navigate(btn.dataset.go))
);

/* ── Mobile menu toggle ── */
const mobileMenuBtn = document.getElementById('mobile-menu');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');

mobileMenuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('hidden', !sidebar.classList.contains('open'));
});
overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.add('hidden');
});

/* ── Profile dropdown ── */
const profileMenuBtn = document.getElementById('profile-menu-btn');
const profileDropdown = document.getElementById('profile-dropdown');
profileMenuBtn.addEventListener('click', e => {
  e.stopPropagation();
  profileDropdown.classList.toggle('hidden');
});
document.addEventListener('click', () => profileDropdown.classList.add('hidden'));

/* ── Logout ── */
document.getElementById('logout-btn').addEventListener('click', () => {
  exitApp();
  notify('Anda telah keluar. Sampai jumpa!');
});

/* ── Floating chat ── */
document.getElementById('floating-chat').addEventListener('click', () => {
  navigate('chat');
  setTimeout(() => document.getElementById('chat-input').focus(), 80);
});

/* ── Topbar notification button ── */
document.getElementById('topbar-notif-btn').addEventListener('click', () => navigate('notifications'));

/* ── Topbar avatar ── */
document.getElementById('topbar-avatar-btn').addEventListener('click', () => navigate('edit-profile'));

/* ══════════════════════════════════════════════
   UPDATE USER UI
══════════════════════════════════════════════ */
function updateUserUI() {
  const fullName = (currentUser.firstName + ' ' + currentUser.lastName).trim();
  const initials = currentUser.initials || (currentUser.firstName[0] + (currentUser.lastName[0] || '')).toUpperCase();

  const els = {
    'sidebar-name': fullName,
    'sidebar-role': currentUser.role,
    'welcome-name': currentUser.firstName,
    'profile-card-name': fullName,
    'profile-card-email': currentUser.email,
  };
  Object.entries(els).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  });

  // Avatars
  ['sidebar-avatar', 'topbar-avatar', 'profile-avatar-large'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = initials;
  });
  const roleEl = document.getElementById('profile-card-role');
  if (roleEl) roleEl.textContent = currentUser.role;
}

/* ══════════════════════════════════════════════
   DOCUMENT RENDERING (Knowledge Base)
══════════════════════════════════════════════ */
let activeDocFilter = 'Semua';

function renderDocuments(filter = 'Semua', query = '') {
  const normalized = query.trim().toLowerCase();
  const matching = documents.filter(doc =>
    (filter === 'Semua' || doc.category === filter) &&
    (!normalized || `${doc.name} ${doc.file} ${doc.category} ${doc.source}`.toLowerCase().includes(normalized))
  );

  document.getElementById('document-rows').innerHTML = matching.map(doc => `
    <tr>
      <td><div class="doc-name">
        <span class="file-icon ${doc.type}">${doc.icon}</span>
        <span><strong>${escapeHtml(doc.name)}</strong><small>${escapeHtml(doc.file)}</small></span>
      </div></td>
      <td><span class="category-label ${doc.category === 'Regulasi' ? 'orange' : doc.category === 'FAQ' ? 'blue' : ''}">${doc.category}</span></td>
      <td>${escapeHtml(doc.source)}</td>
      <td><span class="status-label ${doc.status === 'Proses' ? 'processing' : ''}">${doc.status === 'Proses' ? 'Diproses' : doc.status}</span></td>
      <td>${doc.updated}</td>
      <td><button class="row-menu" aria-label="Opsi dokumen" data-document="${escapeHtml(doc.name)}">···</button></td>
    </tr>
  `).join('');

  const emptyEl = document.getElementById('doc-empty');
  if (emptyEl) emptyEl.classList.toggle('hidden', matching.length > 0);
  const countEl = document.getElementById('doc-count');
  if (countEl) countEl.textContent = `${matching.length} dokumen`;

  document.querySelectorAll('[data-document]').forEach(btn =>
    btn.addEventListener('click', () => notify(`Opsi dokumen "${btn.dataset.document}" — demo`))
  );
}

document.querySelectorAll('.filter-tab').forEach(btn =>
  btn.addEventListener('click', () => {
    activeDocFilter = btn.dataset.filter;
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.toggle('selected', t === btn));
    renderDocuments(activeDocFilter, document.getElementById('doc-search').value);
  })
);

const docSearch = document.getElementById('doc-search');
if (docSearch) docSearch.addEventListener('input', e => renderDocuments(activeDocFilter, e.target.value));

document.getElementById('add-document').addEventListener('click', () =>
  document.getElementById('file-input').click()
);
document.getElementById('file-input').addEventListener('change', e => {
  if (e.target.files.length)
    notify(`"${e.target.files[0].name}" dipilih. Unggah belum tersedia di prototipe.`);
  e.target.value = '';
});

/* ══════════════════════════════════════════════
   HISTORY RENDERING
══════════════════════════════════════════════ */
function renderHistory(query = '') {
  const normalized = query.trim().toLowerCase();
  const matching = historyData.filter(item =>
    `${item.name} ${item.email} ${item.question} ${item.category}`.toLowerCase().includes(normalized)
  );

  document.getElementById('history-rows').innerHTML = matching.map(item => `
    <tr>
      <td><div class="user-cell">
        <div class="avatar avatar-soft-${item.tone}">${item.initials}</div>
        <span><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.email)}</small></span>
      </div></td>
      <td class="question-cell" title="${escapeHtml(item.question)}">${escapeHtml(item.question)}</td>
      <td><span class="category-label ${item.category === 'Biaya' ? 'orange' : item.category === 'Self declare' ? 'blue' : ''}">${escapeHtml(item.category)}</span></td>
      <td>${item.time}</td>
      <td><span class="resolved-status ${item.status === 'Terjawab' ? '' : 'escalated'}">${item.status}</span></td>
      <td><button class="row-menu" aria-label="Lihat" data-history="${escapeHtml(item.name)}">···</button></td>
    </tr>
  `).join('');

  const emptyEl = document.getElementById('history-empty');
  if (emptyEl) emptyEl.classList.toggle('hidden', matching.length > 0);

  document.querySelectorAll('[data-history]').forEach(btn =>
    btn.addEventListener('click', () => notify(`Riwayat ${btn.dataset.history} — demo`))
  );
}

const historySearch = document.getElementById('history-search');
if (historySearch) historySearch.addEventListener('input', e => renderHistory(e.target.value));

document.getElementById('export-history').addEventListener('click', () =>
  notify('Ekspor riwayat memerlukan backend — fitur demo.')
);

/* ══════════════════════════════════════════════
   NOTIFICATIONS
══════════════════════════════════════════════ */
let notifFilter = 'all';
let notifData = [...notifications];

function renderNotifications(filter) {
  notifFilter = filter;
  const list = document.getElementById('notif-list');
  if (!list) return;

  const filtered = filter === 'unread'
    ? notifData.filter(n => !n.read)
    : filter === 'system'
    ? notifData.filter(n => n.type === 'system')
    : filter === 'chat'
    ? notifData.filter(n => n.type === 'chat')
    : notifData;

  if (filtered.length === 0) {
    list.innerHTML = '<div class="empty-state">Tidak ada notifikasi.</div>';
    return;
  }

  list.innerHTML = filtered.map(n => `
    <div class="notif-item ${n.read ? '' : 'unread'}" data-notif-id="${n.id}">
      <div class="notif-icon ${n.icon}">
        ${getNotifIcon(n.type, n.icon)}
      </div>
      <div class="notif-content">
        <span class="notif-title">${escapeHtml(n.title)}</span>
        <p class="notif-desc">${escapeHtml(n.desc)}</p>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">
        <span class="notif-time">${n.time}</span>
        ${!n.read ? '<div class="notif-dot"></div>' : ''}
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.notif-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = parseInt(item.dataset.notifId);
      const notif = notifData.find(n => n.id === id);
      if (notif && !notif.read) {
        notif.read = true;
        renderNotifications(notifFilter);
        updateNotifBadge();
      }
    });
  });

  updateNotifCounts();
}

function getNotifIcon(type, color) {
  const icons = {
    chat: '<svg viewBox="0 0 20 20" fill="none"><path d="M3 4h14a1 1 0 011 1v8a1 1 0 01-1 1H6l-4 3V5a1 1 0 011-1z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
    system: '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M10 7v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="10" cy="14" r="0.8" fill="currentColor"/></svg>'
  };
  return icons[type] || icons.system;
}

function updateNotifCounts() {
  const unread = notifData.filter(n => !n.read).length;
  const allCount = document.getElementById('notif-tab-all');
  const unreadCount = document.getElementById('notif-tab-unread');
  if (allCount) allCount.textContent = notifData.length;
  if (unreadCount) unreadCount.textContent = unread;
}

function updateNotifBadge() {
  const unread = notifData.filter(n => !n.read).length;
  const badge = document.getElementById('notif-badge');
  const dot = document.getElementById('nav-notif-dot');
  if (badge) {
    badge.textContent = unread;
    badge.classList.toggle('hidden', unread === 0);
  }
  if (dot) dot.classList.toggle('hidden', unread === 0);
}

// Notif tabs
document.querySelectorAll('[data-notif-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-notif-filter]').forEach(t => t.classList.toggle('selected', t === btn));
    renderNotifications(btn.dataset.notifFilter);
  });
});

// Mark all read
const markAllBtn = document.getElementById('mark-all-read-btn');
if (markAllBtn) {
  markAllBtn.addEventListener('click', () => {
    notifData.forEach(n => n.read = true);
    renderNotifications(notifFilter);
    updateNotifBadge();
    notify('Semua notifikasi ditandai sebagai dibaca ✅');
  });
}

/* ══════════════════════════════════════════════
   SETTINGS
══════════════════════════════════════════════ */
function initSettings() {
  // Settings nav
  document.querySelectorAll('.settings-nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.settings-nav-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const section = btn.dataset.settings;
      document.querySelectorAll('.settings-section').forEach(s => s.classList.remove('active'));
      const target = document.getElementById('settings-' + section);
      if (target) target.classList.add('active');
    });
  });

  // Theme toggle
  document.querySelectorAll('input[name="theme"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const theme = radio.value;
      if (theme === 'dark') document.body.classList.add('dark-theme');
      else document.body.classList.remove('dark-theme');
      // Update label selected class
      document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('selected'));
      const parentLabel = radio.closest('.theme-option');
      if (parentLabel) parentLabel.classList.add('selected');
      notify(`Tema "${theme === 'light' ? 'Terang' : theme === 'dark' ? 'Gelap' : 'Ikuti Sistem'}" diterapkan`);
    });
  });

  // Font size
  document.querySelectorAll('.font-size-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.font-size-opt').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      notify(`Ukuran teks "${btn.textContent}" diterapkan`);
    });
  });

  // Change password
  const changePwBtn = document.getElementById('change-pw-btn');
  if (changePwBtn && !changePwBtn._wired) {
    changePwBtn._wired = true;
    changePwBtn.addEventListener('click', () => {
      const cur = document.getElementById('sec-current-pw').value;
      const nw = document.getElementById('sec-new-pw').value;
      if (!cur || !nw) { notify('Isi semua kolom kata sandi'); return; }
      if (nw.length < 8) { notify('Kata sandi baru minimal 8 karakter'); return; }
      notify('Kata sandi berhasil diubah ✅');
      document.getElementById('sec-current-pw').value = '';
      document.getElementById('sec-new-pw').value = '';
    });
  }

  // Toggle switches - already work natively, just show feedback
  document.querySelectorAll('.settings-toggle-item .toggle-switch input').forEach(toggle => {
    if (!toggle._wired) {
      toggle._wired = true;
      toggle.addEventListener('change', () => {
        const label = toggle.closest('.settings-toggle-item').querySelector('strong').textContent;
        notify(`"${label}" ${toggle.checked ? 'diaktifkan' : 'dinonaktifkan'}`);
      });
    }
  });

  // Save settings buttons
  document.querySelectorAll('.settings-actions .btn-primary').forEach(btn => {
    if (!btn._wired && btn.id !== 'save-profile-btn' && btn.id !== 'change-pw-btn') {
      btn._wired = true;
      btn.addEventListener('click', () => notify('Pengaturan disimpan ✅'));
    }
  });
}

/* ══════════════════════════════════════════════
   EDIT PROFILE
══════════════════════════════════════════════ */
function syncProfileForm() {
  const f = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
  f('ep-firstname', currentUser.firstName);
  f('ep-lastname', currentUser.lastName);
  f('ep-email', currentUser.email);
  f('ep-phone', currentUser.phone);
  f('ep-org', currentUser.org);
  f('ep-bio', currentUser.bio);
}

const editProfileForm = document.getElementById('edit-profile-form');
if (editProfileForm) {
  editProfileForm.addEventListener('submit', function(e) {
    e.preventDefault();
    currentUser.firstName = document.getElementById('ep-firstname').value.trim() || currentUser.firstName;
    currentUser.lastName = document.getElementById('ep-lastname').value.trim() || currentUser.lastName;
    currentUser.email = document.getElementById('ep-email').value.trim() || currentUser.email;
    currentUser.phone = document.getElementById('ep-phone').value.trim();
    currentUser.org = document.getElementById('ep-org').value.trim();
    currentUser.bio = document.getElementById('ep-bio').value.trim();
    currentUser.initials = (currentUser.firstName[0] + (currentUser.lastName[0] || '')).toUpperCase();

    updateUserUI();
    notify('Profil berhasil disimpan ✅');
    navigate('dashboard');
  });
}

document.getElementById('change-avatar-btn').addEventListener('click', () =>
  notify('Upload foto profil — fitur demo')
);

/* ══════════════════════════════════════════════
   CHAT
══════════════════════════════════════════════ */
const responseFor = text => {
  const q = text.toLowerCase();
  if (q.includes('self declare') || q.includes('self-declare'))
    return 'Sertifikasi halal jalur <strong>self declare</strong> ditujukan untuk pelaku usaha mikro dan kecil dengan produk berisiko rendah, bahan yang sudah dipastikan kehalalannya, dan proses produksi sederhana. Pengajuan didampingi oleh Pendamping PPH. Persyaratan dan kebijakan dapat berubah, jadi pastikan mengecek informasi terbaru di BPJPH.';
  if (q.includes('dokumen') || q.includes('persiap'))
    return 'Secara umum, pelaku usaha perlu menyiapkan data pelaku usaha, Nomor Induk Berusaha (NIB), daftar produk dan bahan, serta alur proses produksi. Dokumen tambahan bisa diperlukan sesuai jenis usaha dan jalur sertifikasi. Silakan cek persyaratan resmi BPJPH untuk informasi terkini.';
  if (q.includes('bahan'))
    return 'Titik kritis halal dapat ditemukan pada bahan hewani, bahan tambahan, bahan penolong, serta proses penyimpanan dan pengolahan. Periksa komposisi dan dokumen pendukung dari pemasok. Untuk keputusan resmi, konsultasikan dengan Pendamping PPH atau BPJPH.';
  if (q.includes('biaya') || q.includes('gratis') || q.includes('murah'))
    return 'Program sertifikasi halal gratis (SEHATI) tersedia untuk pelaku usaha mikro dan kecil yang memenuhi kriteria dan kuota program. Ketersediaan dapat berubah. Periksa pengumuman resmi BPJPH atau tanyakan ke Pendamping PPH.';
  if (q.includes('lama') || q.includes('berapa') || q.includes('durasi') || q.includes('waktu'))
    return 'Proses sertifikasi halal umumnya memakan waktu beberapa minggu hingga beberapa bulan tergantung jalur (self declare vs reguler), kelengkapan dokumen, dan antrian di BPJPH. Jalur self declare cenderung lebih cepat. Informasi terkini silakan cek di website SIHALAL.';
  if (q.includes('daftar') || q.includes('sertifikat') || q.includes('sertifikasi') || q.includes('cara'))
    return 'Untuk memulai, pelaku usaha dapat membuat akun pada <strong>SIHALAL (sihalal.halal.go.id)</strong>, melengkapi data usaha dan produk, lalu mengajukan sertifikasi sesuai skema yang memenuhi kriteria. UMK dengan produk berisiko rendah mungkin dapat mengajukan jalur self declare. Persyaratan dapat berubah; silakan rujuk informasi resmi BPJPH.';
  if (q.includes('status') || q.includes('cek') || q.includes('pantau'))
    return 'Anda dapat memantau status pengajuan sertifikasi halal melalui portal <strong>SIHALAL</strong> menggunakan akun yang telah didaftarkan. Sistem akan menampilkan tahapan proses secara real-time.';
  return 'Terima kasih atas pertanyaannya! Saya bisa membantu edukasi umum tentang sertifikasi halal, self declare, persiapan dokumen, bahan halal, dan proses pengajuan. Mohon jelaskan sedikit konteks usaha atau produk Anda agar saya bisa memberi panduan yang lebih relevan. Untuk informasi resmi terkini, silakan merujuk pada BPJPH.';
};

function sendMessage(text) {
  const value = String(text || '').trim();
  if (!value) return;
  navigate('chat');
  const messages = document.getElementById('messages');

  // User message
  const userRow = document.createElement('div');
  userRow.className = 'message-row user-row';
  userRow.innerHTML = `
    <div class="message-content">
      <span class="sender-name">Anda</span>
      <div class="message-bubble">${escapeHtml(value)}</div>
      <span class="message-time">Sekarang</span>
    </div>
  `;
  messages.append(userRow);
  document.getElementById('chat-input').value = '';
  messages.scrollTop = messages.scrollHeight;

  // Typing indicator
  const typing = document.createElement('div');
  typing.className = 'message-row bot-row';
  typing.id = 'typing-indicator';
  typing.innerHTML = `
    <div class="message-avatar">
      <svg viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 016 6c0 3 .8 5 1.5 6H2.5C3.2 13 4 11 4 8a6 6 0 016-6z" stroke="currentColor" stroke-width="1.5"/><path d="M8 16a2 2 0 004 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
    <div class="message-content">
      <span class="sender-name">Asisten Halal KHB</span>
      <div class="message-bubble" style="display:flex;gap:5px;align-items:center;padding:14px 16px">
        <span style="width:7px;height:7px;background:#9ca3af;border-radius:50%;animation:typing-dot .8s infinite 0s"></span>
        <span style="width:7px;height:7px;background:#9ca3af;border-radius:50%;animation:typing-dot .8s infinite .2s"></span>
        <span style="width:7px;height:7px;background:#9ca3af;border-radius:50%;animation:typing-dot .8s infinite .4s"></span>
      </div>
    </div>
  `;
  messages.append(typing);
  messages.scrollTop = messages.scrollHeight;

  // Bot response
  setTimeout(() => {
    const oldTyping = document.getElementById('typing-indicator');
    if (oldTyping) oldTyping.remove();

    const reply = document.createElement('div');
    reply.className = 'message-row bot-row';
    reply.innerHTML = `
      <div class="message-avatar">
        <svg viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 016 6c0 3 .8 5 1.5 6H2.5C3.2 13 4 11 4 8a6 6 0 016-6z" stroke="currentColor" stroke-width="1.5"/><path d="M8 16a2 2 0 004 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </div>
      <div class="message-content">
        <span class="sender-name">Asisten Halal KHB</span>
        <div class="message-bubble">${responseFor(value)}</div>
        <span class="message-time">Sekarang</span>
      </div>
    `;
    messages.append(reply);
    messages.scrollTop = messages.scrollHeight;
  }, 1000 + Math.random() * 600);
}

// Add typing animation
const style = document.createElement('style');
style.textContent = `@keyframes typing-dot { 0%,80%,100%{transform:scale(.6);opacity:.4} 40%{transform:scale(1);opacity:1} }`;
document.head.append(style);

// Chat form submit
document.getElementById('chat-form').addEventListener('submit', e => {
  e.preventDefault();
  sendMessage(document.getElementById('chat-input').value);
});

// Enter key
document.getElementById('chat-input').addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    document.getElementById('chat-form').requestSubmit();
  }
});

// Auto-resize textarea
document.getElementById('chat-input').addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 100) + 'px';
});

// Topic/suggested prompt buttons
document.querySelectorAll('[data-prompt]').forEach(btn =>
  btn.addEventListener('click', () => sendMessage(btn.dataset.prompt))
);

/* ══════════════════════════════════════════════
   PAGINATION (demo)
══════════════════════════════════════════════ */
document.querySelectorAll('.pagination button:not(:disabled)').forEach(btn =>
  btn.addEventListener('click', () => notify('Navigasi halaman tersedia setelah backend terhubung.'))
);

/* ══════════════════════════════════════════════
   UTILITY
══════════════════════════════════════════════ */
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
}

/* ══════════════════════════════════════════════
   INIT
══════════════════════════════════════════════ */
renderDocuments();
renderHistory();
updateNotifBadge();

/* ══════════════════════════════════════════════
   LANDING PAGE
══════════════════════════════════════════════ */

/* ── Show / hide landing page ── */
function showLanding() {
  document.getElementById('landing-page').classList.remove('hidden');
  document.getElementById('auth-pages').classList.add('hidden');
  document.getElementById('app-shell').classList.add('hidden');
  document.getElementById('floating-chat').classList.add('hidden');
  window.scrollTo({ top: 0 });
}

function goToAuthFromLanding(page) {
  document.getElementById('landing-page').classList.add('hidden');
  document.getElementById('auth-pages').classList.remove('hidden');
  showAuthPage(page);
  window.scrollTo({ top: 0 });
}

/* Patch enterApp / exitApp to show landing instead of login */
const _originalExitApp = exitApp;
window.exitApp = function() {
  document.getElementById('auth-pages').classList.add('hidden');
  document.getElementById('app-shell').classList.add('hidden');
  document.getElementById('floating-chat').classList.add('hidden');
  showLanding();
};

/* Wire landing page logout back to landing */
document.getElementById('logout-btn').removeEventListener('click', () => {});
document.getElementById('logout-btn').addEventListener('click', () => {
  window.exitApp();
  notify('Anda telah keluar. Sampai jumpa!');
});

/* ── NAV CTA buttons ── */
const lpBtnIds = {
  'lp-login-btn'        : () => goToAuthFromLanding('login'),
  'lp-register-btn'     : () => goToAuthFromLanding('register'),
  'lp-login-btn-m'      : () => goToAuthFromLanding('login'),
  'lp-register-btn-m'   : () => goToAuthFromLanding('register'),
  'lp-hero-cta-main'    : () => goToAuthFromLanding('register'),
  'lp-hero-cta-demo'    : () => goToAuthFromLanding('login'),
  'lp-faq-chat-btn'     : () => goToAuthFromLanding('register'),
  'lp-cta-register'     : () => goToAuthFromLanding('register'),
  'lp-cta-login'        : () => goToAuthFromLanding('login'),
  'lp-footer-login'     : () => goToAuthFromLanding('login'),
  'lp-footer-register'  : () => goToAuthFromLanding('register'),
};
Object.entries(lpBtnIds).forEach(([id, handler]) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', e => { e.preventDefault(); handler(); });
});

/* Wire auth "go back" links to show landing */
document.getElementById('go-login').addEventListener('click', e => {
  e.preventDefault();
  showAuthPage('login');
});

/* ── Navbar scroll effect ── */
const lpNav = document.getElementById('lp-nav');
if (lpNav) {
  window.addEventListener('scroll', () => {
    lpNav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ── Mobile menu toggle ── */
const lpMobileToggle = document.getElementById('lp-mobile-toggle');
const lpMobileMenu   = document.getElementById('lp-mobile-menu');
if (lpMobileToggle && lpMobileMenu) {
  lpMobileToggle.addEventListener('click', () => {
    lpMobileMenu.classList.toggle('hidden');
  });
  /* Close on link click */
  lpMobileMenu.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', () => lpMobileMenu.classList.add('hidden'));
  });
}

/* ── Smooth anchor scroll for nav links ── */
document.querySelectorAll('.lp-nav-link, .lp-mobile-link').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
});

/* ── FAQ Accordion ── */
document.querySelectorAll('.lp-faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.lp-faq-item');
    const isOpen = item.classList.contains('open');
    /* Close all */
    document.querySelectorAll('.lp-faq-item.open').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.lp-faq-q').setAttribute('aria-expanded', 'false');
    });
    /* Open clicked (unless it was already open) */
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ── Scroll Reveal (IntersectionObserver) ── */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(
    '.lp-feature-card, .lp-step-content, .lp-testimonial-card, .lp-faq-item, .lp-section-header, .lp-stat-item'
  );
  revealEls.forEach((el, i) => {
    el.classList.add('lp-reveal');
    const delay = (i % 4) * 0.1;
    el.style.transitionDelay = delay + 's';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

/* ── Animated number counters ── */
function animateCounters() {
  const statEls = document.querySelectorAll('.lp-stat-item strong');
  statEls.forEach(el => {
    const rawText = el.textContent.trim();
    const numMatch = rawText.match(/[\d,.]+/);
    if (!numMatch) return;

    const raw = numMatch[0].replace(/[,.]/g, '');
    const target = parseInt(raw, 10);
    if (isNaN(target) || target === 0) return;

    const suffix = rawText.replace(numMatch[0], '');
    const prefix = rawText.slice(0, rawText.indexOf(numMatch[0]));
    const duration = 1800;
    const startTime = performance.now();
    const hasComma = numMatch[0].includes(',') || numMatch[0].includes('.');

    el._animated = true;

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(ease * target);

      let display = current.toString();
      if (hasComma && current >= 1000) {
        display = current.toLocaleString('id-ID');
      }
      el.textContent = prefix + display + suffix;

      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

/* ── Stats bar counter trigger ── */
function initStatsObserver() {
  const statsBar = document.querySelector('.lp-stats-bar');
  if (!statsBar) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  observer.observe(statsBar);
}

/* ── Init landing page (runs once DOM ready) ── */
function initLandingPage() {
  initScrollReveal();
  initStatsObserver();
}

/* Start init */
initLandingPage();
