/* KHB admin — 1 role: admin knowledge (MPA pages + chat demo) */
'use strict';
function exitApp(){ window.location.href='login.html'; }
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

/* Active nav (anchors navigate natively via href) */
const _pg = document.body.dataset.page;
document.querySelectorAll('[data-page]').forEach(elm => {
  elm.classList.toggle('active', elm.dataset.page === _pg);
});
document.getElementById('logout-btn')?.addEventListener('click', () => { window.location.href = 'login.html'; });
document.getElementById('logout-btn-top')?.addEventListener('click', () => { window.location.href = 'login.html'; });
document.querySelectorAll('[data-goto]').forEach(btn =>
  btn.addEventListener('click', () => { window.location.href = btn.dataset.goto + '.html'; })
);

document.querySelectorAll('[data-go]').forEach(btn =>
  btn.addEventListener('click', () => location.href = btn.dataset.go + '.html')
);

/* ── Mobile menu toggle ── */
const mobileMenuBtn = document.getElementById('mobile-menu');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');

mobileMenuBtn?.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('hidden', !sidebar.classList.contains('open'));
});
overlay?.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.add('hidden');
});

/* ── Topbar popups (notif preview + profile menu) ── */
function initTopbarPops() {
  if (document.body.dataset.popsWired) { if (typeof renderNotifPop === 'function') renderNotifPop(); return; }
  document.body.dataset.popsWired = '1';
  const pairs = [
    ['topbar-notif-btn', 'notif-pop'],
    ['topbar-avatar-btn', 'profile-pop']
  ];
  const closeAll = () => {
    pairs.forEach(([bid, pid]) => {
      document.getElementById(pid)?.classList.add('hidden');
      document.getElementById(bid)?.setAttribute('aria-expanded', 'false');
    });
  };
  pairs.forEach(([bid, pid]) => {
    document.getElementById(bid)?.addEventListener('click', e => {
      e.stopPropagation();
      const pop = document.getElementById(pid);
      if (!pop) return;
      const willOpen = pop.classList.contains('hidden');
      closeAll();
      pop.classList.toggle('hidden', !willOpen);
      document.getElementById(bid)?.setAttribute('aria-expanded', String(willOpen));
    });
  });
  document.addEventListener('click', e => { if (!e.target.closest('.topbar-pop-wrap')) closeAll(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });
  if (typeof renderNotifPop === 'function') renderNotifPop();
}

/* ── Floating chat ── */
document.getElementById('floating-chat')?.addEventListener('click', () => {
  setTimeout(() => document.getElementById('chat-input').focus(), 80);
});

/* notif bell & avatar handled by popups above; full pages stay reachable via popup links */
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
const DOC_TOTAL = 38;   // total katalog; tabel hanya memuat sebagian sebagai contoh
const HISTORY_TOTAL = 1284;   // total percakapan pada katalog contoh

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

  // range indicator: "Menampilkan 1–6 dari 38 dokumen"
  const rangeEl = document.getElementById('doc-range');
  if (rangeEl) {
    const from = matching.length ? 1 : 0;
    const to = matching.length;
    rangeEl.innerHTML = `Menampilkan <strong>${from}–${to}</strong> dari <strong>${DOC_TOTAL}</strong> dokumen`;
  }
  // keep the "Semua" tab counter honest
  const allTab = document.querySelector('.filter-tab[data-filter="Semua"] span');
  if (allTab) allTab.textContent = DOC_TOTAL;

  const prev = document.getElementById('doc-prev');
  const next = document.getElementById('doc-next');
  if (prev) prev.disabled = true;          // page 1 of 7
  if (next) next.disabled = false;

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

document.getElementById('doc-next')?.addEventListener('click', () =>
  notify('Halaman berikutnya tersedia setelah backend terhubung.')
);
document.getElementById('doc-prev')?.addEventListener('click', () =>
  notify('Sudah di halaman pertama.')
);

document.getElementById('add-document')?.addEventListener('click', () =>
  document.getElementById('file-input').click()
);
document.getElementById('file-input')?.addEventListener('change', e => {
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
      <td class="question-cell" data-full="${escapeHtml(item.question)}">${escapeHtml(item.question)}</td>
      <td><span class="category-label ${item.category === 'Biaya' ? 'orange' : item.category === 'Self declare' ? 'blue' : ''}">${escapeHtml(item.category)}</span></td>
      <td>${item.time}</td>
      <td><span class="resolved-status ${item.status === 'Terjawab' ? '' : 'escalated'}">${item.status}</span></td>
      <td><button class="row-menu" aria-label="Lihat" data-history="${escapeHtml(item.name)}">···</button></td>
    </tr>
  `).join('');

  const emptyEl = document.getElementById('history-empty');
  if (emptyEl) emptyEl.classList.toggle('hidden', matching.length > 0);

  // range indicator: "Menampilkan 1–10 dari 1.284 percakapan"
  const rangeEl = document.getElementById('history-range');
  if (rangeEl) {
    const from = matching.length ? 1 : 0;
    rangeEl.innerHTML = `Menampilkan <strong>${from}–${matching.length}</strong> dari <strong>${HISTORY_TOTAL.toLocaleString('id-ID')}</strong> percakapan`;
  }
  const prev = document.getElementById('history-prev');
  const next = document.getElementById('history-next');
  if (prev) prev.disabled = true;      // page 1
  if (next) next.disabled = false;

  document.querySelectorAll('[data-history]').forEach(btn =>
    btn.addEventListener('click', () => notify(`Riwayat ${btn.dataset.history} — demo`))
  );
}

const historySearch = document.getElementById('history-search');
if (historySearch) historySearch.addEventListener('input', e => renderHistory(e.target.value));

document.getElementById('history-next')?.addEventListener('click', () =>
  notify('Halaman berikutnya tersedia setelah backend terhubung.')
);
document.getElementById('history-prev')?.addEventListener('click', () =>
  notify('Sudah di halaman pertama.')
);

document.getElementById('export-history')?.addEventListener('click', () =>
  notify('Ekspor riwayat memerlukan backend — fitur demo.')
);

/* ══════════════════════════════════════════════
   NOTIFICATIONS
══════════════════════════════════════════════ */
let notifFilter = 'all';
let notifData = [...notifications];
const NOTIF_PAGE = 5;         // kartu per batch
let notifShown = NOTIF_PAGE;  // berapa yang sedang dirender

function renderNotifications(filter, opts = {}) {
  notifFilter = filter;
  const list = document.getElementById('notif-list');
  if (!list) return;
  if (!opts.keepCount) notifShown = NOTIF_PAGE;

  const filtered = filter === 'unread'
    ? notifData.filter(n => !n.read)
    : filter === 'system'
    ? notifData.filter(n => n.type === 'system')
    : filter === 'chat'
    ? notifData.filter(n => n.type === 'chat')
    : notifData;

  if (filtered.length === 0) {
    list.innerHTML = '<div class="empty-state">Tidak ada notifikasi.</div>';
    updateNotifMore(0, 0);
    return;
  }

  const visible = filtered.slice(0, notifShown);

  list.innerHTML = visible.map(n => `
    <div class="notif-item ${n.read ? '' : 'unread'}" data-notif-id="${n.id}" tabindex="0" role="button">
      <div class="notif-icon ${n.icon}">
        ${getNotifIcon(n.type, n.icon)}
      </div>
      <div class="notif-content">
        <span class="notif-title">${escapeHtml(n.title)}</span>
        <p class="notif-desc">${escapeHtml(n.desc)}</p>
      </div>
      <div class="notif-side">
        <span class="notif-time">${n.time}</span>
        ${!n.read ? '<div class="notif-dot"></div>' : ''}
      </div>
    </div>
  `).join('');

  updateNotifMore(visible.length, filtered.length);

  document.querySelectorAll('.notif-item').forEach(item => {
    const markRead = () => {
      const id = parseInt(item.dataset.notifId);
      const notif = notifData.find(n => n.id === id);
      if (!notif || notif.read) return;
      notif.read = true;
      // fade out the green edge + dot before re-rendering
      item.classList.add('is-read-flash');
      item.classList.remove('unread');
      const dot = item.querySelector('.notif-dot');
      if (dot) dot.style.opacity = '0';
      setTimeout(() => {
        renderNotifications(notifFilter, { keepCount: true });
        updateNotifBadge();
        if (typeof renderNotifPop === 'function') renderNotifPop();
      }, 300);
    };
    item.addEventListener('click', markRead);
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); markRead(); }
    });
  });

  updateNotifCounts();
}

/* load-more affordance */
function updateNotifMore(shown, total) {
  const btn = document.getElementById('notif-more');
  const label = document.getElementById('notif-more-count');
  if (!btn) return;
  const rest = total - shown;
  btn.hidden = rest <= 0;
  btn.innerHTML = `<svg viewBox="0 0 20 20" fill="none"><path d="M10 4v10M6 10l4 4 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg> Muat lebih banyak (${rest})`;
  if (label) label.textContent = total ? `Menampilkan ${shown} dari ${total} notifikasi` : '';
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

// Load more: tampilkan batch berikutnya
document.getElementById('notif-more')?.addEventListener('click', () => {
  notifShown += NOTIF_PAGE;
  renderNotifications(notifFilter, { keepCount: true });
});

// Mark all read
const markAllBtn = document.getElementById('mark-all-read-btn');
if (markAllBtn) {
  markAllBtn.addEventListener('click', () => {
    notifData.forEach(n => n.read = true);
    renderNotifications(notifFilter);
    updateNotifBadge();
    if (typeof renderNotifPop === 'function') renderNotifPop();
if (el('settings-account')) initSettings();
if (el('edit-profile-form')) syncProfileForm();
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

document.getElementById('change-avatar-btn')?.addEventListener('click', () =>
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
  const messages = document.getElementById('messages');
  if (!messages) return;

  // User message
  const userRow = document.createElement('div');
  userRow.className = 'message-row user-row';
  userRow.innerHTML = `
    <div class="message-content">
      <span class="sender-name">Anda</span>
      <div class="message-bubble">${escapeHtml(value)}<span class="message-time">Sekarang</span></div>
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
      <svg viewBox="0 0 20 20" fill="none"><path d="M10 1.6a1 1 0 011 1v1.1a4 4 0 013.9 4v3.1l1.2 2a.8.8 0 01-.7 1.2H3.6a.8.8 0 01-.7-1.2l1.2-2V7.7A4 4 0 018.9 3.7V2.6a1 1 0 011-1zM8.2 8.6a.9.9 0 100 1.8.9.9 0 000-1.8zM11.8 8.6a.9.9 0 100 1.8.9.9 0 000-1.8zM8.4 12.2h3.2" stroke="currentColor" stroke-width="1.5"/><path d="M8 16a2 2 0 004 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
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
        <svg viewBox="0 0 20 20" fill="none"><path d="M10 1.6a1 1 0 011 1v1.1a4 4 0 013.9 4v3.1l1.2 2a.8.8 0 01-.7 1.2H3.6a.8.8 0 01-.7-1.2l1.2-2V7.7A4 4 0 018.9 3.7V2.6a1 1 0 011-1zM8.2 8.6a.9.9 0 100 1.8.9.9 0 000-1.8zM11.8 8.6a.9.9 0 100 1.8.9.9 0 000-1.8zM8.4 12.2h3.2" stroke="currentColor" stroke-width="1.5"/><path d="M8 16a2 2 0 004 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </div>
      <div class="message-content">
        <span class="sender-name">Asisten Halal KHB</span>
        <div class="message-bubble">${responseFor(value)}<span class="message-time">Sekarang</span></div>
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
document.getElementById('chat-form')?.addEventListener('submit', e => {
  e.preventDefault();
  sendMessage(document.getElementById('chat-input').value);
});

// Enter key
document.getElementById('chat-input')?.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    document.getElementById('chat-form').requestSubmit();
  }
});

// Auto-resize textarea
document.getElementById('chat-input')?.addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 100) + 'px';
});

// Topic/suggested prompt buttons
document.querySelectorAll('[data-prompt]').forEach(btn =>
  btn.addEventListener('click', () => sendMessage(btn.dataset.prompt))
);
/* ══════════════════════════════════════════════
   DASHBOARD WIDGETS (avatar remainder, tooltips)
══════════════════════════════════════════════ */
/* Remaining users = total − avatars actually rendered (never hardcoded) */
function initUserRemainder() {
  document.querySelectorAll('.user-dots[data-total]').forEach(box => {
    const total = Number(box.dataset.total) || 0;
    const shown = box.querySelectorAll('i').length;
    const out = box.querySelector('[data-remainder]');
    if (out) out.textContent = `+${Math.max(0, total - shown).toLocaleString('id-ID')} lainnya`;
  });
}

/* Chart series: one point per day, values derived from the drawn path */
const CHART_SERIES = [
  { d: '1 Jun', v: 84 }, { d: '3 Jun', v: 92 }, { d: '5 Jun', v: 88 }, { d: '7 Jun', v: 105 },
  { d: '9 Jun', v: 98 },  { d: '11 Jun', v: 121 }, { d: '13 Jun', v: 112 }, { d: '15 Jun', v: 138 },
  { d: '17 Jun', v: 126 }, { d: '19 Jun', v: 149 }, { d: '21 Jun', v: 141 }, { d: '23 Jun', v: 163 },
  { d: '25 Jun', v: 152 }, { d: '27 Jun', v: 176 }, { d: '29 Jun', v: 168 }, { d: '30 Jun', v: 191 }
];

function initChartTooltip() {
  const chart = el('activity-chart');
  const tip = el('chart-tip');
  const guide = el('chart-hover');
  if (!chart || !tip || !guide) return;

  const maxV = 200;                       // matches the y-axis top label
  const dot = guide.querySelector('i');

  const move = e => {
    const box = chart.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - box.left, 0), box.width);
    const idx = Math.min(CHART_SERIES.length - 1,
      Math.round((x / box.width) * (CHART_SERIES.length - 1)));
    const pt = CHART_SERIES[idx];

    guide.style.left = `${(idx / (CHART_SERIES.length - 1)) * 100}%`;
    guide.style.top = '0';
    guide.style.bottom = '20px';
    if (dot) dot.style.top = `${(1 - pt.v / maxV) * 100}%`;

    tip.innerHTML = `<b>${pt.v}</b><small>percakapan · ${pt.d}</small>`;
    tip.style.left = `${Math.min(Math.max((idx / (CHART_SERIES.length - 1)) * box.width, 42), box.width - 42)}px`;
    tip.style.top = `${(1 - pt.v / maxV) * box.height - 10}px`;
    tip.classList.add('show');
    guide.classList.add('show');
  };

  const leave = () => {
    tip.classList.remove('show');
    guide.classList.remove('show');
  };

  chart.addEventListener('mousemove', move);
  chart.addEventListener('mouseleave', leave);
}

/* Sparkline bars are generated so each can carry its own datum */
function initSparkline() {
  const spark = el('spark-total');
  if (!spark) return;

  const data = CHART_SERIES.slice(-12).map(p => ({ d: p.d, v: p.v }));
  const max = Math.max(...data.map(p => p.v));

  spark.innerHTML = data
    .map(p => `<i style="height:${Math.round((p.v / max) * 100)}%" data-d="${p.d}" data-v="${p.v}"></i>`)
    .join('');

  const tip = document.createElement('div');
  tip.className = 'chart-tip';
  spark.parentElement.classList.add('spark-wrap');
  spark.parentElement.appendChild(tip);

  spark.querySelectorAll('i').forEach(bar => {
    bar.addEventListener('mouseenter', () => {
      spark.querySelectorAll('i').forEach(b => b.classList.remove('hot'));
      bar.classList.add('hot');
      tip.innerHTML = `<b>${bar.dataset.v}</b><small>percakapan · ${bar.dataset.d}</small>`;
      const host = spark.parentElement.getBoundingClientRect();
      const b = bar.getBoundingClientRect();
      tip.style.left = `${Math.min(Math.max(b.left - host.left + b.width / 2, 40), host.width - 40)}px`;
      tip.style.top = `${b.top - host.top - 6}px`;
      tip.classList.add('show');
    });
    bar.addEventListener('mouseleave', () => {
      bar.classList.remove('hot');
      tip.classList.remove('show');
    });
  });
}

/* ══════════════════════════════════════════════
   CHAT: TOPICS DRAWER (mobile)
══════════════════════════════════════════════ */
function initTopicsDrawer() {
  const panel = el('chat-topics');
  const toggle = el('topics-toggle');
  const close = el('topics-close');
  if (!panel || !toggle) return;

  let backdrop = null;

  const shut = () => {
    panel.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    if (backdrop) { backdrop.remove(); backdrop = null; }
  };

  const open = () => {
    panel.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    backdrop = document.createElement('div');
    backdrop.className = 'topics-backdrop';
    backdrop.addEventListener('click', shut);
    document.body.appendChild(backdrop);
  };

  toggle.addEventListener('click', () =>
    panel.classList.contains('open') ? shut() : open()
  );
  close?.addEventListener('click', shut);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') shut(); });
  // picking a topic closes the drawer so the conversation is visible
  panel.querySelectorAll('.topic-btn').forEach(b => b.addEventListener('click', shut));
}

/* ══════════════════════════════════════════════
   PAGINATION (demo)
══════════════════════════════════════════════ */
document.querySelectorAll('.pagination button:not(:disabled)').forEach(btn =>
  btn.addEventListener('click', () => notify('Navigasi halaman tersedia setelah backend terhubung.'))
);
/* ══════════════════════════════════════════════
   INIT
══════════════════════════════════════════════ */
if (el('document-rows')) renderDocuments();
if (el('history-rows')) renderHistory();
if (el('notif-list')) renderNotifications('all');
initUserRemainder();
initSparkline();
initChartTooltip();
initTopicsDrawer();
updateNotifBadge();
initTopbarPops();
if (el('settings-account')) initSettings();
if (el('edit-profile-form')) syncProfileForm();

/* ── Notif header preview ── */
function renderNotifPop() {
  const box = document.getElementById('notif-pop-list');
  if (!box || typeof notifData === 'undefined') return;
  const top = notifData.slice(0, 4);
  box.innerHTML = top.map(n => `
    <div class="topbar-pop-item ${n.read ? '' : 'unread'}">
      <span class="notif-dot-mini"></span>
      <div><strong>${escapeHtml(n.title)}</strong><small>${escapeHtml(n.time)}</small></div>
    </div>`).join('');
}
