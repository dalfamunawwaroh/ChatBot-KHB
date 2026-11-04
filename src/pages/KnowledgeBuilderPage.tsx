import { useState } from 'react';
import { PageHead, Panel, Badge, Icon, Field } from '../components/ui/PageKit';
import { useToast } from '../components/Toast';

const NODES = [
  { id: 'n1', kind: 'Sapaan', title: 'Pesan pembuka', desc: 'Assalamu\'alaikum! Ada yang bisa dibantu soal sertifikasi halal?', active: true },
  { id: 'n2', kind: 'Pertanyaan', title: 'Topik apa yang ingin ditanyakan?', desc: 'Self declare · Dokumen · Biaya · Status pengajuan', active: false },
  { id: 'n3', kind: 'Jawaban AI', title: 'Jawab dari basis pengetahuan', desc: 'Cari di 38 dokumen BPJPH & panduan KHB.', active: false },
  { id: 'n4', kind: 'Eskalasi', title: 'Teruskan ke Pendamping PPH', desc: 'Jika keyakinan < 70% atau topik bahan kritis.', active: false },
];

export default function KnowledgeBuilderPage() {
  const notify = useToast();
  const [nodes, setNodes] = useState(NODES);
  const [selected, setSelected] = useState(NODES[0].id);
  const [label, setLabel] = useState(NODES[0].title);

  const activeNode = nodes.find((node) => node.id === selected) || nodes[0];

  const save = () => {
    setNodes((prev) => prev.map((node) => (node.id === selected ? { ...node, title: label } : node)));
    notify('Alur percakapan disimpan');
  };

  return (
    <section className="view active" id="view-knowledge-builder">
      <PageHead
        eyebrow="PENGELOLAAN DATA AI"
        title="Alur Percakapan"
        subtitle="Susun alur sapaan, pertanyaan umum, dan eskalasi asisten."
      >
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary" onClick={() => notify('Pratinjau alur dibuka (demo)')}>Pratinjau</button>
          <button className="btn btn-primary" onClick={() => notify('Alur dipublikasikan')}>{Icon.check} Publikasikan</button>
        </div>
      </PageHead>

      <div className="grid-2-1">
        <Panel title="Kanvas alur" subtitle="Klik node untuk mengedit">
          <div className="flow-canvas">
            {nodes.map((node, index) => (
              <div key={node.id} style={{ position: 'relative' }}>
                <button
                  type="button"
                  className={`flow-node${selected === node.id ? ' active' : ''}`}
                  style={{ textAlign: 'left', cursor: 'pointer' }}
                  onClick={() => { setSelected(node.id); setLabel(node.title); }}
                >
                  <span className="flow-kind">{node.kind}</span>
                  <strong>{node.title}</strong>
                  <span>{node.desc}</span>
                </button>
                {index < nodes.length - 1 ? (
                  <div style={{ width: 2, height: 14, background: 'var(--line)', marginLeft: 26, marginBottom: 14 }}></div>
                ) : null}
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Editor node" subtitle={activeNode.kind}>
          <div className="form-grid">
            <Field label="Judul node">
              <input value={label} onChange={(event) => setLabel(event.target.value)} />
            </Field>
            <Field label="Tipe node">
              <select defaultValue={activeNode.kind}>
                <option>Sapaan</option><option>Pertanyaan</option><option>Jawaban AI</option><option>Eskalasi</option>
              </select>
            </Field>
            <Field label="Deskripsi">
              <textarea defaultValue={activeNode.desc} />
            </Field>
          </div>
          <div className="preview-box" style={{ marginTop: 14 }}>
            <div className="preview-label">Status</div>
            <Badge tone="amber" dot>Draf · belum dipublikasikan</Badge>
          </div>
          <div className="form-actions">
            <button className="btn btn-secondary" onClick={() => setLabel(activeNode.title)}>Reset</button>
            <button className="btn btn-primary" onClick={save}>{Icon.check} Simpan Node</button>
          </div>
        </Panel>
      </div>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Alur percakapan <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
