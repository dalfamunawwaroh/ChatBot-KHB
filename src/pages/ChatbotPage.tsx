import { useState } from 'react';
import { PageHead, Panel, Field, Toggle, Icon } from '../components/ui/PageKit';
import { useToast } from '../components/Toast';

export default function ChatbotPage() {
  const notify = useToast();
  const [form, setForm] = useState({
    name: 'Asisten Halal KHB',
    greeting: "Assalamu'alaikum! Saya siap membantu pertanyaan seputar sertifikasi halal dan edukasi halal lainnya.",
    language: 'Bahasa Indonesia',
    tone: 'Ramah & ringkas',
    fallback: 'Eskalasi ke Pendamping PPH',
    showSource: true,
    autoEscalate: true,
    collectEmail: false,
  });

  const set = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [key]: event.target.value });
  const setBool = (key: 'showSource' | 'autoEscalate' | 'collectEmail') => (value: boolean) =>
    setForm({ ...form, [key]: value });

  return (
    <section className="view active" id="view-chatbot">
      <PageHead
        eyebrow="PENGATURAN ASISTEN"
        title="Chatbot"
        subtitle="Atur identitas, gaya jawaban, dan aturan eskalasi asisten halal."
      >
        <button className="btn btn-primary" onClick={() => notify('Pengaturan asisten disimpan')}>
          {Icon.check}
          Simpan Perubahan
        </button>
      </PageHead>

      <div className="grid-2-1">
        <Panel title="Identitas & gaya jawaban" subtitle="Dipakai pada semua kanal percakapan">
          <div className="form-grid">
            <Field label="Nama asisten">
              <input value={form.name} onChange={set('name')} />
            </Field>
            <Field label="Sapaan pembuka" hint="Tampil sebagai pesan pertama saat percakapan dimulai.">
              <textarea value={form.greeting} onChange={set('greeting')} />
            </Field>
            <div className="form-grid two">
              <Field label="Bahasa">
                <select value={form.language} onChange={set('language')}>
                  <option>Bahasa Indonesia</option>
                  <option>Bahasa Indonesia + istilah Arab</option>
                  <option>Bahasa Sunda (percakapan)</option>
                </select>
              </Field>
              <Field label="Gaya jawaban">
                <select value={form.tone} onChange={set('tone')}>
                  <option>Ramah &amp; ringkas</option>
                  <option>Formal &amp; rinci</option>
                  <option>Sangat ringkas (poin)</option>
                </select>
              </Field>
            </div>
            <Field label="Jika jawaban tidak ditemukan">
              <select value={form.fallback} onChange={set('fallback')}>
                <option>Eskalasi ke Pendamping PPH</option>
                <option>Kirim tautan SIHALAL</option>
                <option>Tawarkan hubungi WhatsApp</option>
              </select>
            </Field>
          </div>

          <div style={{ marginTop: 18 }}>
            <Toggle
              label="Selalu tampilkan sumber dokumen"
              desc="Setiap jawaban menyertakan nama dokumen dan halaman rujukan."
              checked={form.showSource}
              onChange={setBool('showSource')}
            />
            <Toggle
              label="Eskalasi otomatis"
              desc="Pertanyaan dengan keyakinan rendah langsung diteruskan ke agen."
              checked={form.autoEscalate}
              onChange={setBool('autoEscalate')}
            />
            <Toggle
              label="Minta kontak sebelum jawaban panjang"
              desc="Berguna untuk menindaklanjuti kasus yang butuh pendampingan."
              checked={form.collectEmail}
              onChange={setBool('collectEmail')}
            />
          </div>

          <div className="form-actions">
            <button className="btn btn-secondary" onClick={() => notify('Perubahan dibatalkan')}>
              Batal
            </button>
            <button className="btn btn-primary" onClick={() => notify('Pengaturan asisten disimpan')}>
              {Icon.check}
              Simpan
            </button>
          </div>
        </Panel>

        <div style={{ display: 'grid', gap: 16 }}>
          <Panel title="Pratinjau" subtitle="Tampilan pesan pertama">
            <div className="preview-box">
              <div className="preview-label">Widget · {form.name}</div>
              <div className="preview-bubble">{form.greeting}</div>
              <div style={{ marginTop: 8, fontSize: 11.5, color: 'var(--muted-2)' }}>
                Sumber ditampilkan: {form.showSource ? 'ya' : 'tidak'} · Eskalasi otomatis: {form.autoEscalate ? 'ya' : 'tidak'}
              </div>
            </div>
            <div style={{ marginTop: 14 }}>
              <div className="kv">
                <div className="kv-row"><span>Model</span><strong>RAG + JEV</strong></div>
                <div className="kv-row"><span>Dokumen rujukan</span><strong>38 aktif</strong></div>
                <div className="kv-row"><span>Rata-rata respons</span><strong>1,8 detik</strong></div>
              </div>
            </div>
          </Panel>

          <Panel title="Tips kualitas jawaban">
            <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--muted)', fontSize: 12.5, lineHeight: 1.8 }}>
              <li>Unggah dokumen terbaru setiap ada perubahan regulasi.</li>
              <li>Gunakan nada ringkas untuk kanal pesan instan.</li>
              <li>Aktifkan eskalasi untuk pertanyaan kasuistis.</li>
            </ul>
          </Panel>
        </div>
      </div>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Pengaturan chatbot <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
