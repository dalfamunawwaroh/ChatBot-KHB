import { useRef, useState } from 'react';
import { useToast } from '../components/Toast';
import { useApp } from '../context/AppContext';

const MAX_BYTES = 2 * 1024 * 1024;
const ALLOWED = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];

/** Baca file gambar jadi data URL, sekaligus turunkan ukurannya agar muat localStorage. */
const fileToAvatar = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    if (!ALLOWED.includes(file.type)) {
      reject(new Error('Format harus JPG, PNG, WEBP, atau GIF'));
      return;
    }
    if (file.size > MAX_BYTES) {
      reject(new Error('Ukuran foto maksimal 2MB'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Gagal membaca file'));
    reader.onload = () => {
      const src = String(reader.result);
      // Perkecil ke 320×320 (cover) supaya data URL tidak membengkak.
      const img = new Image();
      img.onerror = () => reject(new Error('File bukan gambar yang valid'));
      img.onload = () => {
        const size = 320;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(src);
          return;
        }
        const scale = Math.max(size / img.width, size / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  });

export default function EditProfilePage() {
  const notify = useToast();
  const { user, saveUser, avatar, setAvatar } = useApp();
  const [form, setForm] = useState({
    first: user.firstName,
    last: user.lastName,
    email: user.email,
    phone: user.phone,
    org: user.org,
    bio: user.bio,
  });
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const set = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [key]: event.target.value });

  const fullName = `${form.first} ${form.last}`.trim();
  const initial = (form.first.charAt(0) || 'A').toUpperCase();

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    try {
      const dataUrl = await fileToAvatar(file);
      setAvatar(dataUrl);
      notify('Foto profil diperbarui');
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Gagal mengunggah foto');
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.first.trim() || !form.last.trim() || !form.email.trim()) {
      notify('Nama dan email wajib diisi');
      return;
    }
    saveUser({
      firstName: form.first.trim(),
      lastName: form.last.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      org: form.org.trim(),
      bio: form.bio.trim(),
      initials: initial,
    });
    notify('Profil berhasil disimpan');
  };

  const reset = () => {
    setForm({
      first: user.firstName,
      last: user.lastName,
      email: user.email,
      phone: user.phone,
      org: user.org,
      bio: user.bio,
    });
    notify('Perubahan dibatalkan');
  };

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
              <div
                className={`profile-avatar-large${dragging ? ' is-dragging' : ''}${avatar ? ' has-photo' : ''}`}
                id="profile-avatar-large"
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(event) => {
                  event.preventDefault();
                  setDragging(false);
                  void handleFile(event.dataTransfer.files?.[0]);
                }}
                aria-label="Foto profil"
              >
                {avatar ? <img src={avatar} alt={`Foto profil ${fullName}`} /> : initial}
              </div>
              <div className="profile-avatar-actions">
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  id="avatar-input"
                  className="visually-hidden"
                  onChange={(event) => void handleFile(event.target.files?.[0])}
                />
                <button
                  className="btn btn-secondary btn-sm"
                  id="change-avatar-btn"
                  type="button"
                  disabled={busy}
                  onClick={() => inputRef.current?.click()}
                >
                  <svg viewBox="0 0 20 20" fill="none"><path d="M4 14l4-4 3 3 4-5 4 5H4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="14" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="2" y="3" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" /></svg>
                  {busy ? 'Memproses…' : avatar ? 'Ganti Foto' : 'Ubah Foto'}
                </button>
                {avatar ? (
                  <button
                    className="btn btn-danger-outline btn-sm"
                    type="button"
                    onClick={() => {
                      setAvatar('');
                      notify('Foto profil dihapus');
                    }}
                  >
                    Hapus Foto
                  </button>
                ) : null}
                <p className="avatar-hint">JPG, PNG, WEBP maks. 2MB · bisa juga seret file ke foto</p>
              </div>
            </div>
            <div className="profile-info-summary">
              <strong id="profile-card-name">{fullName}</strong>
              <span id="profile-card-email">{form.email}</span>
              <span className="role-badge" id="profile-card-role">{user.role}</span>
            </div>
            <div className="profile-meta">
              <div className="profile-meta-item">
                <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4" /><path d="M10 6v4l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                <span>Bergabung Jan 2024</span>
              </div>
              <div className="profile-meta-item">
                <svg viewBox="0 0 20 20" fill="none"><path d="M10 2l7 3v6c0 4.8-3.2 7.6-7 9-3.8-1.4-7-4.2-7-9V5l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
                <span>Admin terverifikasi</span>
              </div>
            </div>
          </div>
          <div className="profile-form-card panel">
            <div className="settings-card-header"><h3>Informasi Pribadi</h3><p>Informasi ini ditampilkan di profil Anda</p></div>
            <form id="edit-profile-form" noValidate onSubmit={submit}>
              <div className="form-row-two">
                <div className="form-group">
                  <label htmlFor="ep-firstname">Nama Depan</label>
                  <div className="input-wrap">
                    <span className="input-icon"><svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg></span>
                    <input type="text" id="ep-firstname" value={form.first} onChange={set('first')} placeholder="Nama depan" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="ep-lastname">Nama Belakang</label>
                  <div className="input-wrap">
                    <span className="input-icon"><svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg></span>
                    <input type="text" id="ep-lastname" value={form.last} onChange={set('last')} placeholder="Nama belakang" />
                  </div>
                </div>
              </div>
              <div className="form-row-two">
                <div className="form-group">
                  <label htmlFor="ep-email">Alamat Email</label>
                  <div className="input-wrap">
                    <span className="input-icon"><svg viewBox="0 0 20 20" fill="none"><path d="M3 5h14a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4" /><path d="m2 6 8 6 8-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg></span>
                    <input type="email" id="ep-email" value={form.email} onChange={set('email')} placeholder="Email" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="ep-phone">Nomor WhatsApp</label>
                  <div className="input-wrap">
                    <span className="input-icon"><svg viewBox="0 0 20 20" fill="none"><rect x="4" y="2" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" /><circle cx="10" cy="15" r="1" fill="currentColor" /></svg></span>
                    <input type="tel" id="ep-phone" value={form.phone} onChange={set('phone')} placeholder="Nomor WhatsApp" />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="ep-org">Organisasi / Instansi</label>
                <div className="input-wrap">
                  <span className="input-icon"><svg viewBox="0 0 20 20" fill="none"><rect x="2" y="6" width="16" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><path d="M6 6V4a1 1 0 011-1h6a1 1 0 011 1v2" stroke="currentColor" strokeWidth="1.4" /><path d="M9 11h2M9 14h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg></span>
                  <input type="text" id="ep-org" value={form.org} onChange={set('org')} placeholder="Nama organisasi" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="ep-bio">Bio</label>
                <textarea id="ep-bio" rows={3} className="settings-textarea resize-y" placeholder="Ceritakan sedikit tentang Anda..." value={form.bio} onChange={set('bio')}></textarea>
              </div>
              <div className="settings-actions">
                <button type="button" className="btn btn-secondary btn-sm" onClick={reset}>Batal</button>
                <button type="submit" className="btn btn-primary btn-sm" id="save-profile-btn">
                  <svg viewBox="0 0 20 20" fill="none"><path d="M5 10l4 4 6-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
