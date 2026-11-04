export default function ChatPage() {
  return (
    <>
{/*─── CHAT VIEW ───*/}
      <section className="view active" id="view-chat">
        <div className="page-title-row">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot"></span> ASISTEN CERDAS KHB</div>
            <h1>Chat Edukasi Halal</h1>
            <p className="subheading">Tanyakan informasi seputar halal dan sertifikasi produk.</p>
          </div>
          <span className="online-pill"><i></i> Asisten online</span>
        </div>
        <button className="topics-toggle" id="topics-toggle" aria-label="Buka topik populer" aria-expanded="false" aria-controls="chat-topics">
          <svg viewBox="0 0 20 20" fill="none"><path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
          Topik populer
        </button>
        <div className="chat-layout">
          <aside className="chat-topics panel" id="chat-topics">
            <div className="chat-topics-head">
              <h3>Topik populer</h3>
              <button className="topics-close icon-btn" id="topics-close" aria-label="Tutup topik">
                <svg viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
              </button>
            </div>
            <p>Pilih topik untuk memulai percakapan</p>
            <button className="topic-btn" data-prompt="Bagaimana cara mengajukan sertifikasi halal untuk UMKM?">
              <span className="topic-icon topic-green">
                <svg viewBox="0 0 20 20" fill="none"><path d="M10 2l2.5 5H18l-4.5 3.5 1.7 5.5L10 13l-5.2 3 1.7-5.5L2 7h5.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
              </span>
              <span><strong>Sertifikasi halal</strong><small>Proses dan persyaratan</small></span>
              <b>→</b>
            </button>
            <button className="topic-btn" data-prompt="Apa persyaratan untuk mengajukan sertifikat halal jalur self declare?">
              <span className="topic-icon topic-blue">
                <svg viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
              </span>
              <span><strong>Self declare</strong><small>Sertifikasi gratis UMK</small></span>
              <b>→</b>
            </button>
            <button className="topic-btn" data-prompt="Dokumen apa yang perlu disiapkan untuk sertifikasi halal?">
              <span className="topic-icon topic-orange">
                <svg viewBox="0 0 20 20" fill="none"><path d="M4 2h9l4 4v12H4V2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M13 2v4h4" stroke="currentColor" strokeWidth="1.4"/><path d="M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
              </span>
              <span><strong>Persiapan dokumen</strong><small>Checklist pengajuan</small></span>
              <b>→</b>
            </button>
            <button className="topic-btn" data-prompt="Apa saja bahan yang termasuk titik kritis halal?">
              <span className="topic-icon topic-purple">
                <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4"/><path d="M10 7v3l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
              </span>
              <span><strong>Bahan halal</strong><small>Bahan dan titik kritis</small></span>
              <b>→</b>
            </button>
            <div className="chat-disclaimer">ⓘ Jawaban AI bersifat edukatif. Untuk informasi resmi, silakan merujuk pada BPJPH.</div>
          </aside>

          <div className="chat-window panel">
            <div className="chat-window-head">
              <div className="bot-avatar">
                <svg viewBox="0 0 20 20" fill="none"><path d="M10 1.6a1 1 0 011 1v1.1a4 4 0 013.9 4v3.1l1.2 2a.8.8 0 01-.7 1.2H3.6a.8.8 0 01-.7-1.2l1.2-2V7.7A4 4 0 018.9 3.7V2.6a1 1 0 011-1zM8.2 8.6a.9.9 0 100 1.8.9.9 0 000-1.8zM11.8 8.6a.9.9 0 100 1.8.9.9 0 000-1.8zM8.4 12.2h3.2" stroke="currentColor" strokeWidth="1.5"/><path d="M8 16a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <div>
                <strong>Asisten Halal KHB</strong>
                <small><i></i> Siap membantu Anda</small>
              </div>
              <button className="icon-btn chat-more" aria-label="Opsi chat">
                <svg viewBox="0 0 20 20" fill="none"><circle cx="5" cy="10" r="1.2" fill="currentColor"/><circle cx="10" cy="10" r="1.2" fill="currentColor"/><circle cx="15" cy="10" r="1.2" fill="currentColor"/></svg>
              </button>
            </div>
            <div className="messages" id="messages">
              <div className="day-divider"><span>Hari ini</span></div>
              <div className="message-row bot-row">
                <div className="message-avatar">
                  <svg viewBox="0 0 20 20" fill="none"><path d="M10 1.6a1 1 0 011 1v1.1a4 4 0 013.9 4v3.1l1.2 2a.8.8 0 01-.7 1.2H3.6a.8.8 0 01-.7-1.2l1.2-2V7.7A4 4 0 018.9 3.7V2.6a1 1 0 011-1zM8.2 8.6a.9.9 0 100 1.8.9.9 0 000-1.8zM11.8 8.6a.9.9 0 100 1.8.9.9 0 000-1.8zM8.4 12.2h3.2" stroke="currentColor" strokeWidth="1.5"/><path d="M8 16a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                <div className="message-content">
                  <span className="sender-name">Asisten Halal KHB</span>
                  <div className="message-bubble">
                    Assalamu'alaikum! 👋<br /><br />
                    Saya asisten edukasi halal dari Komunitas Halal Bandung. Saya siap membantu menjawab pertanyaan seputar <strong>sertifikasi halal, proses pengajuan, persyaratan,</strong> dan edukasi halal lainnya.<br /><br />
                    Ada yang bisa saya bantu hari ini?
                    <span className="message-time">10:24</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="suggested-prompts">
              <span>Coba tanyakan:</span>
              <button data-prompt="Bagaimana cara mengajukan sertifikasi halal untuk UMKM?">Cara sertifikasi halal</button>
              <button data-prompt="Apa itu sertifikat halal self declare?">Apa itu self declare?</button>
              <button data-prompt="Berapa biaya sertifikasi halal?">Biaya sertifikasi</button>
            </div>
            <form className="chat-input-row" id="chat-form">
              <button type="button" className="chat-attach-btn" aria-label="Lampirkan file">
                <svg viewBox="0 0 20 20" fill="none"><path d="M15 8l-6 6a3 3 0 01-4.2-4.2l7-7a1.5 1.5 0 012 2.1l-7 7a.8.8 0 01-1.1-1.1l5.5-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
              <textarea id="chat-input" rows={1} placeholder="Tulis pertanyaan seputar halal..." aria-label="Tulis pesan"></textarea>
              <button className="send-button" type="submit" aria-label="Kirim pesan">
                <svg viewBox="0 0 20 20" fill="none"><path d="M4 10l12-6-6 12V10H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
              </button>
            </form>
            <div className="input-footnote">AI dapat membuat kesalahan. Periksa kembali informasi penting. <span>Didukung Komunitas Halal Bandung</span></div>
          </div>
        </div>
      </section>

<footer className="page-footer"><span>© 2025 Komunitas Halal Bandung</span><span>Chatbot edukasi halal <i>●</i> 1 role: Admin</span></footer>
    </>
  );
}
