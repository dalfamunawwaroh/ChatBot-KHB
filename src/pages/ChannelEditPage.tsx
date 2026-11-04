import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PageHead, Panel, Field, Badge, Icon } from '../components/ui/PageKit';
import { channels } from '../data/omni';
import { useToast } from '../components/Toast';

export default function ChannelEditPage() {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const notify = useToast();
  const channel = channels.find((item) => item.id === channelId) || channels[0];

  const [form, setForm] = useState({
    name: channel.name,
    account: channel.handle,
    autoReply: true,
    handoff: true,
  });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    notify('Perubahan kanal disimpan');
    navigate('/channels');
  };

  return (
    <section className="view active" id="view-channel-edit">
      <PageHead eyebrow="KANAL PERCAKAPAN" title={`Edit ${channel.platform}`} subtitle="Perbarui identitas dan perilaku kanal.">
        <Link className="btn btn-secondary" to="/channels">Kembali</Link>
      </PageHead>

      <div className="grid-2-1">
        <Panel title="Pengaturan kanal">
          <form onSubmit={submit}>
            <div className="form-grid">
              <Field label="Nama kanal">
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </Field>
              <Field label="Nomor / akun">
                <input value={form.account} onChange={(e) => setForm({ ...form, account: e.target.value })} />
              </Field>
              <Field label="Token akses" hint="Kosongkan jika tidak ingin mengubah token.">
                <input placeholder="••••••••••••" />
              </Field>
            </div>

            <div style={{ marginTop: 16 }}>
              <div className="switch-row">
                <div className="switch-copy"><strong>Balas otomatis</strong><span>Asisten menjawab pesan masuk.</span></div>
                <button type="button" className={`switch${form.autoReply ? ' on' : ''}`} role="switch" aria-checked={form.autoReply} onClick={() => setForm({ ...form, autoReply: !form.autoReply })} />
              </div>
              <div className="switch-row">
                <div className="switch-copy"><strong>Alih ke agen</strong><span>Teruskan percakapan sulit ke tim.</span></div>
                <button type="button" className={`switch${form.handoff ? ' on' : ''}`} role="switch" aria-checked={form.handoff} onClick={() => setForm({ ...form, handoff: !form.handoff })} />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-danger-outline" onClick={() => { notify('Kanal diputuskan'); navigate('/channels'); }}>
                Putuskan Kanal
              </button>
              <button type="submit" className="btn btn-primary">{Icon.check} Simpan</button>
            </div>
          </form>
        </Panel>

        <Panel title="Informasi kanal">
          <div className="kv">
            <div className="kv-row"><span>Platform</span><strong>{channel.platform}</strong></div>
            <div className="kv-row"><span>Status</span><strong><Badge tone={channel.status === 'Aktif' ? 'green' : 'slate'} dot>{channel.status}</Badge></strong></div>
            <div className="kv-row"><span>Sinkron terakhir</span><strong>{channel.lastSync}</strong></div>
            <div className="kv-row"><span>Pesan 30 hari</span><strong>{channel.messages}</strong></div>
          </div>
        </Panel>
      </div>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Edit kanal <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
