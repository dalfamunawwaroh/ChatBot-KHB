/* KHB widget chat — jawaban edukatif demo */
'use strict';
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
