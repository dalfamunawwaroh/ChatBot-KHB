export default function EditProfilePage() {
  return (
    <>
{/*─── EDIT PROFILE VIEW ───*/}
      <section className="view active" id="view-edit-profile">
        <div className="page-title-row">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot"></span> PROFIL SAYA</div>
            <h1>Edit Profil</h1>
            <p className="subheading">Perbarui informasi pribadi dan foto profil Anda.</p>
          </div>
        </div>
        <div className="profile-edit-layout">
          <div className="profile-avatar-card panel">
            <div className="profile-avatar-section">
              <div className="profile-avatar-large" id="profile-avatar-large">A</div>
              <div className="profile-avatar-actions">
                <button className="btn btn-secondary btn-sm" id="change-avatar-btn">
                  <svg viewBox="0 0 20 20" fill="none"><path d="M4 14l4-4 3 3 4-5 4 5H4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><circle cx="14" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="2" y="3" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/></svg>
                  Ubah Foto
                </button>
                <p className="avatar-hint">JPG, PNG maks. 2MB</p>
              </div>
            </div>
            <div className="profile-info-summary">
              <strong id="profile-card-name">Admin KHB</strong>
              <span id="profile-card-email">admin@khb.or.id</span>
              <span className="role-badge" id="profile-card-role">Administrator</span>
            </div>
            <div className="profile-meta">
              <div className="profile-meta-item">
                <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6v4l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                <span>Bergabung Jan 2024</span>
              </div>
              <div className="profile-meta-item">
                <svg viewBox="0 0 20 20" fill="none"><path d="M10 2l7 3v6c0 4.8-3.2 7.6-7 9-3.8-1.4-7-4.2-7-9V5l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                <span>Admin terverifikasi</span>
              </div>
            </div>
          </div>
          <div className="profile-form-card panel">
            <div className="settings-card-header"><h3>Informasi Pribadi</h3><p>Informasi ini ditampilkan di profil Anda</p></div>
            <form id="edit-profile-form" noValidate>
              <div className="form-row-two">
                <div className="form-group">
                  <label htmlFor="ep-firstname">Nama Depan</label>
                  <div className="input-wrap">
                    <span className="input-icon"><svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.4"/><path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></span>
                    <input type="text" id="ep-firstname" value="Admin" placeholder="Nama depan" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="ep-lastname">Nama Belakang</label>
                  <div className="input-wrap">
                    <span className="input-icon"><svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.4"/><path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></span>
                    <input type="text" id="ep-lastname" value="KHB" placeholder="Nama belakang" />
                  </div>
                </div>
              </div>
              <div className="form-row-two">
                <div className="form-group">
                  <label htmlFor="ep-email">Alamat Email</label>
                  <div className="input-wrap">
                    <span className="input-icon"><svg viewBox="0 0 20 20" fill="none"><path d="M3 5h14a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4"/><path d="m2 6 8 6 8-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></span>
                    <input type="email" id="ep-email" value="admin@khb.or.id" placeholder="Email" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="ep-phone">Nomor WhatsApp</label>
                  <div className="input-wrap">
                    <span className="input-icon"><svg viewBox="0 0 20 20" fill="none"><rect x="4" y="2" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.4"/><circle cx="10" cy="15" r="1" fill="currentColor"/></svg></span>
                    <input type="tel" id="ep-phone" value="+62 812-3456-7890" placeholder="Nomor WhatsApp" />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="ep-org">Organisasi / Instansi</label>
                <div className="input-wrap">
                  <span className="input-icon"><svg viewBox="0 0 20 20" fill="none"><rect x="2" y="6" width="16" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M6 6V4a1 1 0 011-1h6a1 1 0 011 1v2" stroke="currentColor" strokeWidth="1.4"/><path d="M9 11h2M9 14h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></span>
                  <input type="text" id="ep-org" value="Komunitas Halal Bandung" placeholder="Nama organisasi" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="ep-bio">Bio</label>
                <textarea id="ep-bio" rows="3" className="settings-textarea resize-y" placeholder="Ceritakan sedikit tentang Anda...">Administrator Komunitas Halal Bandung. Mendukung UMKM dalam proses sertifikasi halal.</textarea>
              </div>
              <div className="settings-actions">
                <button type="button" className="btn btn-secondary btn-sm">Batal</button>
                <button type="submit" className="btn btn-primary btn-sm" id="save-profile-btn">
                  <svg viewBox="0 0 20 20" fill="none"><path d="M5 10l4 4 6-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Simpan Profil
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

<footer className="page-footer"><span>© 2025 Komunitas Halal Bandung</span><span>Chatbot edukasi halal <i>●</i> 1 role: Admin</span></footer>
    </>
  );
}
