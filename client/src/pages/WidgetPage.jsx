export default function WidgetPage() {
  return (
    <>
<div className="wchat">
    <div className="whead">
      <span className="wava"><svg viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 016 6c0 3 .8 5 1.5 6H2.5C3.2 13 4 11 4 8a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.5"/><path d="M8 16a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></span>
      <div className="whead-info"><strong>Asisten Halal KHB</strong><small><i></i>Online · balas &lt; 2 dtk</small></div>
      <span className="whead-badge">AI</span>
    </div>
    <div className="messages" id="messages">
      <div className="day-divider"><span>Hari ini</span></div>
      <div className="message-row bot-row">
        <div className="message-avatar"><svg viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 016 6c0 3 .8 5 1.5 6H2.5C3.2 13 4 11 4 8a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.5"/><path d="M8 16a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
        <div className="message-content">
          <span className="sender-name">Asisten Halal KHB</span>
          <div className="message-bubble">Assalamu'alaikum! 👋<br /><br />Saya asisten edukasi halal Komunitas Halal Bandung. Tanya seputar <strong>sertifikasi halal, self declare, dokumen,</strong> dan proses BPJPH.<br /><br />Ada yang bisa saya bantu?</div>
          <span className="message-time">Sekarang</span>
        </div>
      </div>
    </div>
    <div className="wtyping hidden" id="wtyping"><span></span><span></span><span></span></div>
    <div className="suggested-prompts widget-prompts">
      <button className="qr-chip" data-prompt="Bagaimana cara mengajukan sertifikasi halal untuk UMKM?">Cara sertifikasi</button>
      <button className="qr-chip" data-prompt="Apa itu sertifikat halal self declare?">Self declare</button>
      <button className="qr-chip" data-prompt="Berapa biaya sertifikasi halal?">Biaya</button>
      <button className="qr-chip" data-prompt="Dokumen apa saja yang perlu disiapkan?">Dokumen</button>
    </div>
    <form className="chat-input-row" id="chat-form">
      <textarea id="chat-input" rows="1" placeholder="Tulis pertanyaan seputar halal..." aria-label="Tulis pesan"></textarea>
      <button className="send-button" type="submit" aria-label="Kirim pesan"><svg viewBox="0 0 20 20" fill="none"><path d="M4 10l12-6-6 12V10H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg></button>
    </form>
    <div className="input-footnote">AI dapat membuat kesalahan. Rujuk BPJPH untuk info resmi.</div>
  </div>
  <div className="toast" id="toast" role="status" aria-live="polite"></div>
    </>
  );
}
