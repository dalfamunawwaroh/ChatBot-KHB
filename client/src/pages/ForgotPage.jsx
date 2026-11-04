export default function ForgotPage() {
  return (
    <>
<div className="auth-pages" id="auth-pages">
<div className="auth-page active" id="page-forgot">
      <div className="auth-split">
        <div className="auth-brand-panel">
          <span className="blob auth-blob-1"></span>
          <span className="blob auth-blob-2"></span>
          <div className="auth-brand-inner">
            <div className="auth-logo-wrap">
              <div className="auth-logo">
                <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
                  <path d="M22 4 36 9.5v11C36 29.8 30 35.3 22 38.8 14 35.3 8 29.8 8 20.5v-11L22 4Z" fill="currentColor" opacity=".18"/>
                  <path d="m13.5 22 5.2 5.1 11-11" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="auth-brand-name">komunitas<span>halal</span></div>
                <div className="auth-brand-sub">BANDUNG · AI ASSISTANT</div>
              </div>
            </div>
            <h2 className="auth-panel-tagline">Lupa kata sandi? Tenang, kami bantu.</h2>
            <p className="auth-panel-desc">Masukkan email terdaftar — kode OTP meluncur ke inbox Anda dalam hitungan detik.</p>
            <div className="auth-hero-card">
              <div className="kicker">KENAPA KHB?</div>
              <h3>Jawaban halal akurat dalam &lt; 2 detik</h3>
              <p>Berbasis 38 dokumen resmi BPJPH — bukan tebakan AI generik.</p>
              <span className="proof"><span className="avatars"><span style={{background:'#86efac',color:'#15803d'}}>RA</span><span style={{background:'#93c5fd',color:'#1d4ed8'}}>DP</span><span style={{background:'#fca5a5',color:'#dc2626'}}>SW</span></span>847+ UMKM terbantu</span>
            </div>
            <div className="auth-trust">
              <span>✦ Gratis selamanya</span><span>✦ Data terenkripsi</span><span>✦ Rujukan BPJPH</span>
            </div>
            <div className="auth-mini-chat" aria-hidden="true" style={{marginTop:'18px'}}>
              <div className="mrow"><span className="mava">✦</span><span className="mbub">Syarat self declare untuk keripik pisang apa saja?</span></div>
              <div className="mrow user"><span className="mbub">NIB + daftar bahan + alur produksi ✅</span></div>
            </div>
          </div>
        </div>
        <div className="auth-form-panel">
          <div className="auth-form-inner">
            <div className="auth-form-header">
              <a href="/" className="auth-back-link back-home">
                <svg viewBox="0 0 20 20" fill="none"><path d="M13 5l-5 5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Beranda
              </a>
              <div><span className="auth-badge"><i></i>RESET AKSES</span></div>
              <h1>Lupa Kata Sandi?</h1>
              <p>Masukkan email terdaftar — kode OTP 6 digit meluncur ke inbox Anda.</p>
            </div>
            <form className="auth-form" id="forgot-form" noValidate>
              <div className="form-group">
                                <div className="input-wrap float-wrap">
                  <span className="input-icon"><svg viewBox="0 0 20 20" fill="none"><path d="M3 5h14a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4"/><path d="m2 6 8 6 8-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></span>
                  <input type="email" id="forgot-email" placeholder=" " required aria-label="Alamat Email" />
                  <label className="floating" htmlFor="forgot-email">Alamat Email</label>
                </div>
              </div>
              <button type="submit" className="btn-auth">
                <span className="btn-text">Kirim Kode OTP</span>
                <span className="btn-loader hidden"></span>
              </button>
            </form>
            <div className="auth-card-footer">
              <a href="/login" id="go-back-login" className="auth-back-link">
                <svg viewBox="0 0 20 20" fill="none"><path d="M13 5l-5 5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Kembali ke halaman masuk
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

</div>{/*/auth-pages*/}
    </>
  );
}
