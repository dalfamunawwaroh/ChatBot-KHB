import { useEffect, useState } from 'react';
import { api, type FlowNodeRow } from '../services/api';
import { useResource } from '../hooks/useApi';
import { useToast } from '../components/Toast';

const KIND_LABEL: Record<FlowNodeRow['kind'], string> = {
  greeting: 'Sapaan',
  question: 'Pertanyaan',
  answer: 'Jawaban AI',
  escalation: 'Eskalasi',
};

export default function KnowledgeBuilderPage() {
  const notify = useToast();
  const { data, loading, error, reload } = useResource(() => api.flows.list(), []);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', description: '', kind: 'question' as FlowNodeRow['kind'] });
  const [saving, setSaving] = useState(false);

  const nodes = data ?? [];
  const selected = nodes.find((node) => node.id === selectedId) ?? null;

  useEffect(() => {
    if (selected) {
      setForm({ title: selected.title, description: selected.description, kind: selected.kind });
    }
  }, [selectedId, selected]);

  const save = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      await api.flows.update(selected.id, form);
      notify('Node alur disimpan ke database');
      await reload();
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Gagal menyimpan node');
    } finally {
      setSaving(false);
    }
  };

  const addNode = async () => {
    setSaving(true);
    try {
      const created = await api.flows.create({
        kind: 'question',
        title: 'Pertanyaan baru',
        description: 'Tulis pertanyaan pemulai di sini.',
        sortOrder: nodes.length,
      });
      notify('Node ditambahkan');
      await reload();
      setSelectedId(created.id);
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Gagal menambah node');
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!selected) return;
    if (!window.confirm(`Hapus node "${selected.title}"?`)) return;
    try {
      await api.flows.remove(selected.id);
      notify('Node dihapus');
      setSelectedId(null);
      await reload();
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Gagal menghapus node');
    }
  };

  return (
    <section className="view active" id="view-knowledge-builder">
      <div className="page-title-row">
        <div>
          <div className="eyebrow"><span className="eyebrow-dot"></span> PENGELOLAAN DATA AI</div>
          <h1>Flow Builder</h1>
          <p className="subheading">Pertanyaan pemulai dan node eskalasi yang tampil di widget publik.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary" onClick={() => void addNode()} disabled={saving}>Tambah Node</button>
          <button className="btn btn-primary" onClick={() => void save()} disabled={!selected || saving}>
            {saving ? 'Menyimpan…' : 'Simpan Node'}
          </button>
        </div>
      </div>

      <div className="grid-2-1">
        <div className="panel" style={{ padding: 22 }}>
          <div className="panel-heading">
            <div>
              <h2>Kanvas alur</h2>
              <p>Klik node untuk mengedit</p>
            </div>
          </div>
          {loading ? <p className="knowledge-note">Memuat alur…</p> : null}
          {error ? <p className="knowledge-note" style={{ color: '#b91c1c' }}>{error}</p> : null}
          <div className="flow-canvas">
            {nodes.map((node, index) => (
              <div key={node.id}>
                <button
                  type="button"
                  className={`flow-node${selectedId === node.id ? ' active' : ''}`}
                  onClick={() => setSelectedId(node.id)}
                >
                  <span className="flow-kind">{KIND_LABEL[node.kind]}</span>
                  <strong>{node.title}</strong>
                  <span>{node.description}</span>
                </button>
                {index < nodes.length - 1 ? <div className="flow-link"></div> : null}
              </div>
            ))}
            {!loading && nodes.length === 0 ? <div className="empty-state">Belum ada node alur.</div> : null}
          </div>
        </div>

        <div className="panel" style={{ padding: 22 }}>
          <div className="panel-heading">
            <div>
              <h2>Editor node</h2>
              <p>{selected ? KIND_LABEL[selected.kind] : 'Pilih node di kanvas'}</p>
            </div>
          </div>

          {selected ? (
            <>
              <div className="settings-field">
                <label htmlFor="node-title">Judul node</label>
                <input
                  id="node-title"
                  className="settings-input"
                  value={form.title}
                  onChange={(event) => setForm({ ...form, title: event.target.value })}
                />
              </div>
              <div className="settings-field">
                <label htmlFor="node-kind">Tipe node</label>
                <select
                  id="node-kind"
                  className="settings-select"
                  value={form.kind}
                  onChange={(event) => setForm({ ...form, kind: event.target.value as FlowNodeRow['kind'] })}
                >
                  {(Object.keys(KIND_LABEL) as Array<FlowNodeRow['kind']>).map((key) => (
                    <option key={key} value={key}>{KIND_LABEL[key]}</option>
                  ))}
                </select>
              </div>
              <div className="settings-field">
                <label htmlFor="node-desc">Deskripsi</label>
                <textarea
                  id="node-desc"
                  className="settings-textarea"
                  rows={4}
                  value={form.description}
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                />
              </div>
              <div className="settings-actions">
                <button className="btn btn-danger-outline" onClick={() => void remove()}>Hapus</button>
                <button className="btn btn-primary" onClick={() => void save()} disabled={saving}>Simpan</button>
              </div>
            </>
          ) : (
            <p className="knowledge-note">Node bertipe “Pertanyaan” otomatis muncul sebagai tombol topik di widget publik.</p>
          )}
        </div>
      </div>
    </section>
  );
}
