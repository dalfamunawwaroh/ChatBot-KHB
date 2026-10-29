/* KHB halaman Integrasi — bangun snippet + pratinjau */
'use strict';
(function () {
  var colorEl = document.getElementById('embed-color');
  var posEl = document.getElementById('embed-pos');
  var labelEl = document.getElementById('embed-label');
  var codeEl = document.getElementById('embed-snippet');
  function widgetUrl() {
    return location.origin + location.pathname.replace(/\/[^/]*$/, '') + '/widget/chat.html';
  }
  function snippet() {
    return '<!-- KHB Chatbot Widget — tempel sebelum </body> di halalbandung.com -->\n'
      + '<script>\n  window.KHB_CHAT = {\n    url: \'' + widgetUrl() + '\',\n'
      + "    color: '" + colorEl.value + "',\n"
      + "    position: '" + posEl.value + "',\n"
      + "    label: '" + labelEl.value.replace(/'/g, "\\'") + "'\n  };\n</" + 'script>\n'
      + '<script src="' + location.origin + location.pathname.replace(/\/[^/]*$/, '') + '/widget/khb-chat.js" defer></' + 'script>';
  }
  function render() {
    codeEl.textContent = snippet();
    var f = document.getElementById('preview-float');
    f.style.background = colorEl.value;
    f.className = 'khb-float ' + (posEl.value === 'bottom-left' ? 'bl' : 'br');
    document.getElementById('preview-label').textContent = labelEl.value || 'Tanya Halal KHB';
    var m = document.getElementById('preview-modal');
    m.className = 'khb-modal ' + (posEl.value === 'bottom-left' ? 'bl' : 'br') + (m.classList.contains('hidden') ? ' hidden' : '');
  }
  [colorEl, posEl, labelEl].forEach(function (elm) { elm.addEventListener('input', render); elm.addEventListener('change', render); });
  document.getElementById('embed-copy').addEventListener('click', function () {
    var done = function () { notify('Kode embed disalin ✅ — tempel sebelum </body>'); };
    if (navigator.clipboard) navigator.clipboard.writeText(snippet()).then(done, done);
    else done();
  });
  document.getElementById('preview-float').addEventListener('click', function () {
    document.getElementById('preview-modal').classList.toggle('hidden');
  });
  document.getElementById('preview-close').addEventListener('click', function () {
    document.getElementById('preview-modal').classList.add('hidden');
  });
  render();
})();
