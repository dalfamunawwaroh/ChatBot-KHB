/* KHB Chatbot — salin blok di bawah ini ke halalbandung.com, tepat sebelum </body>.
   Ganti WIDGET_URL dengan alamat publish widget/chat.html Anda.
   Contoh: https://chatbot.khb.or.id/widget/chat.html */
(function () {
  var OPT = window.KHB_CHAT || {};
  var URL = OPT.url || 'WIDGET_URL/widget/chat.html';
  var COLOR = OPT.color || '#16A34A';
  var POS = OPT.position === 'bottom-left' ? 'bl' : 'br';
  var LABEL = OPT.label || 'Tanya Halal KHB';
  var css = '.khb-float{position:fixed;z-index:9998;display:flex;align-items:center;gap:8px;background:' + COLOR + ';color:#fff;border:none;border-radius:999px;padding:13px 20px;font:600 14px Inter,system-ui,sans-serif;cursor:pointer;box-shadow:0 8px 28px rgba(22,163,74,.45)}'
    + '.khb-float.br{right:22px;bottom:22px}.khb-float.bl{left:22px;bottom:22px}'
    + '.khb-modal{position:fixed;z-index:9999;width:min(400px,calc(100vw - 32px));height:min(640px,calc(100vh - 60px));background:#fff;border-radius:16px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 70px rgba(15,23,42,.3);border:1px solid #e5e7eb}'
    + '.khb-modal.br{right:22px;bottom:92px}.khb-modal.bl{left:22px;bottom:92px}'
    + '.khb-mh{display:flex;align-items:center;gap:8px;background:#15803D;color:#fff;padding:12px 14px;font:700 14px Inter,system-ui,sans-serif}'
    + '.khb-mh small{font:500 11px Inter,sans-serif;opacity:.85;margin-left:auto}'
    + '.khb-mh button{background:rgba(255,255,255,.15);border:none;color:#fff;width:26px;height:26px;border-radius:8px;cursor:pointer}'
    + '.khb-modal iframe{flex:1;border:none;width:100%;background:#f9fafb}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  var btn = document.createElement('button');
  btn.className = 'khb-float ' + POS; btn.textContent = '💬 ' + LABEL;
  var box = document.createElement('div');
  box.className = 'khb-modal ' + POS; box.style.display = 'none';
  box.innerHTML = '<div class="khb-mh">Asisten Halal KHB <small>● Online</small><button aria-label="Tutup">✕</button></div>'
    + '<iframe title="Chatbot KHB" src="' + URL + '"></iframe>';
  box.querySelector('button').onclick = function () { box.style.display = 'none'; };
  btn.onclick = function () { box.style.display = box.style.display === 'none' ? 'flex' : 'none'; };
  document.body.appendChild(btn); document.body.appendChild(box);
})();
