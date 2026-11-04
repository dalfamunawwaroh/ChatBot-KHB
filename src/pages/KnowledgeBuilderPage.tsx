import { useState } from 'react';
import { PageHead, Panel, Field, Badge, Icon } from '../components/ui/PageKit';
import { useToast } from '../components/Toast';

const NODES = [
  { id: 'n1', kind: 'Sapaan', title: 'Pesan pembuka', desc: "Assalamu'alaikum! Ada yang bisa dibantu soal sertifikasi halal?" },
  { id: 'n2', kind: 'Pertanyaan', title: 'Topik apa yang ingin ditanyakan?', desc: 'Self declare · Dokumen · Biaya · Status pengajuan' },
  { id: 'n3', kind: 'Jawaban AI', title: 'Jawab dari basis pengetahuan', desc: 'Cari di 38 dokumen BPJPH & panduan KHB.' },
  { id: 'n4', kind: 'Eskalasi', title: 'Teruskan ke Pendamping PPH', desc: 'Jika keyakinan < 70% atau topik bahan kritis.' },
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
        title="Flow Builder"
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
              <div key={node.id}>
                <button
                  type="button"
                  className={`flow-node${selected === node.id ? ' active' : ''}`}
                  onClick={() => { setSelected(node.id); setLabel(node.title); }}
                >
                  <span className="flow-kind">{node.kind}</span>
                  <strong>{node.title}</strong>
                  <span>{node.desc}</span>
                </button>
                {index < nodes.length - 1 ? <div className="flow-link"></div> : null}
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Editor node" subtitle={activeNode.kind}>
          <Field label="Judul node">
            <input className="settings-input" value={label} onChange={(event) => setLabel(event.target.value)} />
          </Field>
          <Field label="Tipe node">
            <select className="settings-select" defaultValue={activeNode.kind}>
              <option>Sapaan</option>
              <option>Pertanyaan</option>
              <option>Jawaban AI</option>
              <option>Eskalasi</option>
            </select>
          </Field>
          <Field label="Deskripsi">
            <textarea className="settings-textarea" defaultValue={activeNode.desc} />
          </Field>

          <div className="kv" style={{ marginTop: 4 }}>
            <div className="kv-row"><span>Status alur</span><strong><Badge tone="amber" dot>Draf</Badge></strong></div>
            <div className="kv-row"><span>Node aktif</span><strong>{activeNode.title}</strong></div>
            <div className="kv-row"><span>Terakhir diubah</span><strong>Hari ini, 09:42</strong></div>
          </div>

          <div className="settings-actions">
            <button className="btn btn-secondary" onClick={() => setLabel(activeNode.title)}>Reset</button>
            <button className="btn btn-primary" onClick={save}>{Icon.check} Simpan Node</button>
          </div>
        </Panel>
      </div>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Flow builder <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
