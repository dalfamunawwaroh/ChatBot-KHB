export default function RegisterPage() {
  return (
    <>
<div className="auth-pages" id="auth-pages">
<div className="auth-page active" id="page-register">
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
            <h2 className="auth-panel-tagline">Bergabunglah dengan ribuan pelaku UMKM halal</h2>
            <p className="auth-panel-desc">Akses knowledge base terlengkap tentang sertifikasi halal dan tanya jawab langsung dengan asisten AI kami.</p>
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
              <div><span className="auth-badge"><i></i>DAFTAR</span></div>
              <h1>Buat akun baru</h1>
              <p>Sudah punya akun? <a href="/login" id="go-login" className="auth-link">Masuk di sini</a></p>
            </div>
            <form className="auth-form" id="register-form" noValidate>
              <div className="form-row-two">
                <div className="form-group">
                  <div className="input-wrap float-wrap">
                  <span className="input-icon"><svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.4"/><path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></span>
                    <input type="text" id="reg-firstname" placeholder=" " required />
                  <label className="floating" htmlFor="reg-firstname">Nama Depan</label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-wrap float-wrap">
                  <span className="input-icon"><svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.4"/><path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></span>
                    <input type="text" id="reg-lastname" placeholder=" " required />
                  <label className="floating" htmlFor="reg-lastname">Nama Belakang</label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="input-wrap float-wrap">
                  <span className="input-icon"><svg viewBox="0 0 20 20" fill="none"><path d="M3 5h14a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4"/><path d="m2 6 8 6 8-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></span>
                  <input type="email" id="reg-email" placeholder=" " required />
                  <label className="floating" htmlFor="reg-email">Alamat Email</label>
                </div>
              </div>
              <div className="form-group">
                <div className="input-wrap float-wrap">
                  <span className="input-icon"><svg viewBox="0 0 20 20" fill="none"><rect x="4" y="2" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.4"/><circle cx="10" cy="15" r="1" fill="currentColor"/></svg></span>
                  <input type="tel" id="reg-phone" placeholder=" " />
                  <label className="floating" htmlFor="reg-phone">Nomor WhatsApp (opsional)</label>
                </div>
              </div>
              <div className="form-group">
                <div className="input-wrap float-wrap">
                  <span className="input-icon"><svg viewBox="0 0 20 20" fill="none"><rect x="3" y="9" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M7 9V6a3 3 0 016 0v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></span>
                  <input type="password" id="reg-password" placeholder=" " required />
                  <label className="floating" htmlFor="reg-password">Kata Sandi (min. 8)</label>
                  <button type="button" className="input-toggle-pw" aria-label="Tampilkan kata sandi" data-target="reg-password">
                    <svg viewBox="0 0 20 20" fill="none"><path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" stroke="currentColor" strokeWidth="1.4"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4"/></svg>
                  </button>
                </div>
                <div className="pw-strength" id="pw-strength"><div className="pw-bar"><span id="pw-bar-fill"></span></div><span id="pw-strength-label">Masukkan kata sandi</span></div>
              </div>
              <div className="form-group">
                <div className="input-wrap float-wrap">
                  <span className="input-icon"><svg viewBox="0 0 20 20" fill="none"><rect x="3" y="9" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M7 9V6a3 3 0 016 0v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></span>
                  <input type="password" id="reg-confirm" placeholder=" " required />
                  <label className="floating" htmlFor="reg-confirm">Konfirmasi Kata Sandi</label>
                  <button type="button" className="input-toggle-pw" aria-label="Tampilkan kata sandi" data-target="reg-confirm">
                    <svg viewBox="0 0 20 20" fill="none"><path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" stroke="currentColor" strokeWidth="1.4"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4"/></svg>
                  </button>
                </div>
              </div>
              <div className="form-checkbox-row">
                <label className="checkbox-label">
                  <input type="checkbox" id="reg-terms" required />
                  <span className="checkbox-custom"></span>
                  <span>Saya setuju dengan <a href="/syarat" className="auth-link">Syarat & Ketentuan</a> dan <a href="/privasi" className="auth-link">Kebijakan Privasi</a></span>
                </label>
              </div>
              <button type="submit" className="btn-auth" id="register-btn">
                <span className="btn-text">Buat Akun</span>
                <span className="btn-loader hidden"></span>
              </button>
            </form>
          </div>
        </div>
                
      </div>
    </div>

</div>{/*/auth-pages*/}
    </>
  );
}
