export default function ResetPage() {
  return (
    <>
<div className="auth-pages" id="auth-pages">
<div className="auth-page active" id="page-reset">
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
            <h2 className="auth-panel-tagline">Satu langkah lagi kembali masuk.</h2>
            <p className="auth-panel-desc">Verifikasi OTP, lalu buat kata sandi baru yang kuat.</p>
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
              <div><span className="auth-badge"><i></i>KATA SANDI BARU</span></div>
              <h1>Reset Kata Sandi</h1>
              <p id="reset-sub">Masukkan 6 digit kode OTP yang dikirim ke email Anda.</p>
            </div>
            <div className="stepper-mini">
              <span className="step-mini on" id="st-otp"><i>1</i>OTP</span>
              <span className="step-mini-bar"></span>
              <span className="step-mini" id="st-pw"><i>2</i>Sandi baru</span>
            </div>
            {/*STEP 1: OTP*/}
            <form className="auth-form" id="otp-form" noValidate>
              <div className="form-group">
                <label>Kode OTP</label>
                <div className="otp-row" id="otp-row">
                  <input className="otp-box" inputmode="numeric" maxLength="1" aria-label="Digit 1" />
                  <input className="otp-box" inputmode="numeric" maxLength="1" aria-label="Digit 2" />
                  <input className="otp-box" inputmode="numeric" maxLength="1" aria-label="Digit 3" />
                  <input className="otp-box" inputmode="numeric" maxLength="1" aria-label="Digit 4" />
                  <input className="otp-box" inputmode="numeric" maxLength="1" aria-label="Digit 5" />
                  <input className="otp-box" inputmode="numeric" maxLength="1" aria-label="Digit 6" />
                </div>
                <div className="otp-meta">
                  <span id="otp-target">Dikirim ke email Anda</span>
                  <button type="button" className="otp-resend" id="otp-resend" disabled>Kirim ulang (<span id="otp-timer">60</span>d)</button>
                </div>
              </div>
              <button type="submit" className="btn-auth">
                <span className="btn-text">Verifikasi OTP</span>
                <span className="btn-loader hidden"></span>
              </button>
            </form>
            {/*STEP 2: PASSWORD (hidden)*/}
            <form className="auth-form hidden" id="reset-form" noValidate>
              <div className="form-group">
                
                <div className="input-wrap float-wrap">
                  <span className="input-icon"><svg viewBox="0 0 20 20" fill="none"><rect x="3" y="9" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M7 9V6a3 3 0 016 0v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></span>
                  <input type="password" id="reset-password" placeholder=" " required aria-label="Kata Sandi Baru" />
                  <label className="floating" htmlFor="reset-password">Kata Sandi Baru (min. 8)</label>
                  <button type="button" className="input-toggle-pw" data-target="reset-password" aria-label="Tampilkan">
                    <svg viewBox="0 0 20 20" fill="none"><path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" stroke="currentColor" strokeWidth="1.4"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4"/></svg>
                  </button>
                </div>
              </div>
              <div className="form-group">
                
                <div className="input-wrap float-wrap">
                  <span className="input-icon"><svg viewBox="0 0 20 20" fill="none"><rect x="3" y="9" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M7 9V6a3 3 0 016 0v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></span>
                  <input type="password" id="reset-confirm" placeholder=" " required aria-label="Konfirmasi Kata Sandi" />
                  <label className="floating" htmlFor="reset-confirm">Konfirmasi Kata Sandi</label>
                  <button type="button" className="input-toggle-pw" data-target="reset-confirm" aria-label="Tampilkan">
                    <svg viewBox="0 0 20 20" fill="none"><path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" stroke="currentColor" strokeWidth="1.4"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4"/></svg>
                  </button>
                </div>
              </div>
              <button type="submit" className="btn-auth">
                <span className="btn-text">Simpan Kata Sandi Baru</span>
                <span className="btn-loader hidden"></span>
              </button>
            </form>
            <div className="auth-card-footer" style={{marginTop:'18px'}}>
              <a href="/login" className="auth-back-link">
                <svg viewBox="0 0 20 20" fill="none"><path d="M13 5l-5 5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Kembali masuk
              </a>
            </div>
          </div>
        </div>
                
        </div>
      </div>
    </div>
    </>
  );
}
