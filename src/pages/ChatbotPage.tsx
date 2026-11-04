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

  const save = () => notify('Pengaturan asisten disimpan');

  return (
    <section className="view active" id="view-chatbot">
      <PageHead
        eyebrow="PENGATURAN ASISTEN"
        title="Chatbot AI"
        subtitle="Atur identitas, gaya jawaban, dan aturan eskalasi asisten halal."
      >
        <button className="btn btn-primary" onClick={save}>
          {Icon.check}
          Simpan Perubahan
        </button>
      </PageHead>

      <div className="grid-2-1">
        <Panel title="Identitas & gaya jawaban" subtitle="Dipakai pada semua kanal percakapan">
          <Field label="Nama asisten">
            <input className="settings-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="Sapaan pembuka" hint="Tampil sebagai pesan pertama saat percakapan dimulai.">
            <textarea
              className="settings-textarea"
              value={form.greeting}
              onChange={(e) => setForm({ ...form, greeting: e.target.value })}
            />
          </Field>

          <div className="form-row-two">
            <Field label="Bahasa">
              <select className="settings-select" value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })}>
                <option>Bahasa Indonesia</option>
                <option>Bahasa Indonesia + istilah Arab</option>
                <option>Bahasa Sunda (percakapan)</option>
              </select>
            </Field>
            <Field label="Gaya jawaban">
              <select className="settings-select" value={form.tone} onChange={(e) => setForm({ ...form, tone: e.target.value })}>
                <option>Ramah &amp; ringkas</option>
                <option>Formal &amp; rinci</option>
                <option>Sangat ringkas (poin)</option>
              </select>
            </Field>
          </div>

          <Field label="Jika jawaban tidak ditemukan">
            <select className="settings-select" value={form.fallback} onChange={(e) => setForm({ ...form, fallback: e.target.value })}>
              <option>Eskalasi ke Pendamping PPH</option>
              <option>Kirim tautan SIHALAL</option>
              <option>Tawarkan hubungi WhatsApp</option>
            </select>
          </Field>

          <div style={{ marginTop: 6 }}>
            <Toggle
              label="Selalu tampilkan sumber dokumen"
              desc="Setiap jawaban menyertakan nama dokumen dan halaman rujukan."
              checked={form.showSource}
              onChange={(value) => setForm({ ...form, showSource: value })}
            />
            <Toggle
              label="Eskalasi otomatis"
              desc="Pertanyaan dengan keyakinan rendah langsung diteruskan ke agen."
              checked={form.autoEscalate}
              onChange={(value) => setForm({ ...form, autoEscalate: value })}
            />
            <Toggle
              label="Minta kontak sebelum jawaban panjang"
              desc="Berguna untuk menindaklanjuti kasus yang butuh pendampingan."
              checked={form.collectEmail}
              onChange={(value) => setForm({ ...form, collectEmail: value })}
            />
          </div>

          <div className="settings-actions">
            <button className="btn btn-secondary" type="button" onClick={() => notify('Perubahan dibatalkan')}>Batal</button>
            <button className="btn btn-primary" type="button" onClick={save}>{Icon.check} Simpan</button>
          </div>
        </Panel>

        <Panel title="Pratinjau pesan" subtitle={form.name}>
          <div className="public-msg bot" style={{ maxWidth: '100%' }}>{form.greeting}</div>
          <div className="kv" style={{ marginTop: 16 }}>
            <div className="kv-row"><span>Bahasa</span><strong>{form.language}</strong></div>
            <div className="kv-row"><span>Gaya jawaban</span><strong>{form.tone}</strong></div>
            <div className="kv-row"><span>Jika tidak ditemukan</span><strong>{form.fallback}</strong></div>
            <div className="kv-row"><span>Tampilkan sumber</span><strong>{form.showSource ? 'Ya' : 'Tidak'}</strong></div>
            <div className="kv-row"><span>Eskalasi otomatis</span><strong>{form.autoEscalate ? 'Ya' : 'Tidak'}</strong></div>
          </div>
          <p className="knowledge-note" style={{ marginTop: 14 }}>
            Model RAG + JEV · 38 dokumen rujukan aktif · rata-rata respons 1,8 detik.
          </p>
        </Panel>
      </div>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Pengaturan chatbot <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
