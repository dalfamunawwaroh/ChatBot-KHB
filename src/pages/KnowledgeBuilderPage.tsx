import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { api, type FlowEdgeRow, type FlowNodeRow } from '../services/api';
import { useResource } from '../hooks/useApi';
import { useToast } from '../components/Toast';

/**
 * Flow Builder — kanvas interaktif seperti omnicare.
 *
 * Interaksi:
 * - Tarik kartu untuk memindahkan (posisi disimpan ke database).
 * - Tarik dari titik di sisi kanan kartu ke kartu lain untuk membuat garis.
 * - Tarik area kosong untuk menggeser kanvas; Ctrl+gulir untuk zoom.
 * - Klik dua kali kanvas untuk menambah kartu di titik tersebut.
 * - Delete/Backspace menghapus kartu atau garis yang sedang dipilih.
 */

const NODE_W = 244;
const NODE_H = 116;
const MIN_SCALE = 0.45;
const MAX_SCALE = 1.8;

/** Jarak antar kartu untuk tombol "Rapikan" (auto-layout). */
const GRID_X = 288;
const GRID_Y = 160;
const GRID_COLS = 2;
const GRID_PAD = 32;

/** Posisi grid: 2 kolom agar muat di kanvas tanpa harus zoom out. */
function gridSlot(index: number): Position {
  return {
    x: GRID_PAD + (index % GRID_COLS) * GRID_X,
    y: GRID_PAD + Math.floor(index / GRID_COLS) * GRID_Y,
  };
}

const KIND_LABEL: Record<FlowNodeRow['kind'], string> = {
  greeting: 'Sapaan',
  question: 'Pertanyaan',
  answer: 'Jawaban AI',
  escalation: 'Eskalasi',
};

const KIND_TONE: Record<FlowNodeRow['kind'], string> = {
  greeting: 'green',
  question: 'navy',
  answer: 'teal',
  escalation: 'amber',
};

interface Position {
  x: number;
  y: number;
}

interface Viewport {
  x: number;
  y: number;
  scale: number;
}

type DragState =
  | { mode: 'node'; id: string; startWorld: Position; origin: Position; moved: boolean }
  | { mode: 'pan'; startClient: Position; origin: Viewport }
  | { mode: 'connect'; sourceId: string; cursor: Position }
  | null;

/** Posisi awal bila node belum pernah dipindahkan (semua di 0,0). */
function defaultPositions(nodes: FlowNodeRow[]): Record<string, Position> {
  const map: Record<string, Position> = {};
  nodes.forEach((node, index) => {
    const placed = node.positionX !== 0 || node.positionY !== 0;
    map[node.id] = placed
      ? { x: node.positionX, y: node.positionY }
      : gridSlot(index);
  });
  return map;
}

/** Susun ulang semua kartu jadi grid rapi. */
function gridLayout(nodes: FlowNodeRow[]): Record<string, Position> {
  const map: Record<string, Position> = {};
  nodes.forEach((node, index) => {
    map[node.id] = gridSlot(index);
  });
  return map;
}

/** Sudut membulat untuk sambungan siku. */
function elbow(points: Position[], radius = 10): string {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length - 1; i += 1) {
    const prev = points[i - 1];
    const cur = points[i];
    const next = points[i + 1];
    const inLen = Math.hypot(cur.x - prev.x, cur.y - prev.y);
    const outLen = Math.hypot(next.x - cur.x, next.y - cur.y);
    const r = Math.min(radius, inLen / 2, outLen / 2);
    if (r < 1) {
      d += ` L ${cur.x} ${cur.y}`;
      continue;
    }
    const ux = (cur.x - prev.x) / (inLen || 1);
    const uy = (cur.y - prev.y) / (inLen || 1);
    const vx = (next.x - cur.x) / (outLen || 1);
    const vy = (next.y - cur.y) / (outLen || 1);
    d += ` L ${cur.x - ux * r} ${cur.y - uy * r}`;
    d += ` Q ${cur.x} ${cur.y} ${cur.x + vx * r} ${cur.y + vy * r}`;
  }
  const last = points[points.length - 1];
  return `${d} L ${last.x} ${last.y}`;
}

/**
 * Titik-titik rute ortogonal antara dua kartu.
 * Satu sumber kebenaran: dipakai untuk menggambar garis dan menaruh pegangan.
 */
function edgePoints(from: Position, to: Position): Position[] {
  const fromCx = from.x + NODE_W / 2;
  const fromCy = from.y + NODE_H / 2;
  const toCx = to.x + NODE_W / 2;
  const toCy = to.y + NODE_H / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const clamp = (value: number) => Math.max(20, Math.min(72, value));

  // Sebaris & target di kanan: garis lurus.
  if (dx >= NODE_W + 8 && Math.abs(dy) < 24) {
    return [{ x: from.x + NODE_W, y: fromCy }, { x: to.x, y: toCy }];
  }

  // Target cukup jauh di kanan: keluar kanan → lane vertikal → masuk kiri.
  if (dx >= NODE_W + 40) {
    const laneX = from.x + NODE_W + clamp(dx / 2);
    return [
      { x: from.x + NODE_W, y: fromCy },
      { x: laneX, y: fromCy },
      { x: laneX, y: toCy },
      { x: to.x, y: toCy },
    ];
  }

  // Target di kiri (alur mundur): keluar kiri → lane → masuk kanan.
  if (to.x + NODE_W + 40 <= from.x) {
    const laneX = from.x - clamp((from.x - to.x - NODE_W) / 2);
    return [
      { x: from.x, y: fromCy },
      { x: laneX, y: fromCy },
      { x: laneX, y: toCy },
      { x: to.x + NODE_W, y: toCy },
    ];
  }

  // Menumpuk vertikal: target di bawah → keluar bawah, masuk atas.
  if (toCy > fromCy) {
    // Segaris vertikal: cukup garis lurus, tanpa siku buatan.
    if (Math.abs(toCx - fromCx) < 1) {
      return [{ x: fromCx, y: from.y + NODE_H }, { x: toCx, y: to.y }];
    }
    const laneY = from.y + NODE_H + clamp((to.y - (from.y + NODE_H)) / 2);
    return [
      { x: fromCx, y: from.y + NODE_H },
      { x: fromCx, y: laneY },
      { x: toCx, y: laneY },
      { x: toCx, y: to.y },
    ];
  }

  // Target di atas → keluar atas, masuk bawah.
  if (Math.abs(toCx - fromCx) < 1) {
    return [{ x: fromCx, y: from.y }, { x: toCx, y: to.y + NODE_H }];
  }
  const laneY = from.y - clamp((from.y - (to.y + NODE_H)) / 2);
  return [
    { x: fromCx, y: from.y },
    { x: fromCx, y: laneY },
    { x: toCx, y: laneY },
    { x: toCx, y: to.y + NODE_H },
  ];
}

/** Buang titik berimpit agar tidak ada segmen panjang nol. */
function dedupe(points: Position[]): Position[] {
  return points.filter((point, index) => {
    if (index === 0) return true;
    const prev = points[index - 1];
    return Math.abs(point.x - prev.x) > 0.5 || Math.abs(point.y - prev.y) > 0.5;
  });
}

function edgePath(from: Position, to: Position): string {
  const points = dedupe(edgePoints(from, to));
  return points.length < 2 ? '' : elbow(points);
}

/** Titik tengah jalur, untuk pegangan hapus garis. */
function edgeMid(from: Position, to: Position): Position {
  const points = dedupe(edgePoints(from, to));
  if (points.length === 0) return { x: from.x, y: from.y };
  const mid = points[Math.floor(points.length / 2)];
  return mid;
}

export default function KnowledgeBuilderPage() {
  const notify = useToast();
  const { data, loading, error, reload } = useResource(
    async () => {
      const [nodes, edges] = await Promise.all([api.flows.list(), api.flows.edges.list()]);
      return { nodes, edges };
    },
    [],
  );

  const nodes = data?.nodes ?? [];
  const edges = data?.edges ?? [];

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<DragState>(null);

  const [positions, setPositions] = useState<Record<string, Position>>({});
  const positionsRef = useRef(positions);
  positionsRef.current = positions;

  const [view, setView] = useState<Viewport>({ x: 0, y: 0, scale: 1 });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', description: '', kind: 'question' as FlowNodeRow['kind'] });
  const [saving, setSaving] = useState(false);
  const [connecting, setConnecting] = useState<{ sourceId: string; cursor: Position } | null>(null);
  const [panning, setPanning] = useState(false);

  // Sinkronkan posisi lokal saat data datang / berubah.
  useEffect(() => {
    if (nodes.length === 0) return;

    const layout = defaultPositions(nodes);
    const unplaced = nodes.filter((node) => node.positionX === 0 && node.positionY === 0);

    setPositions((prev) => {
      const next = { ...prev };
      nodes.forEach((node) => {
        if (unplaced.some((item) => item.id === node.id)) {
          next[node.id] = layout[node.id] ?? { x: node.positionX, y: node.positionY };
        } else if (!next[node.id]) {
          next[node.id] = { x: node.positionX, y: node.positionY };
        }
      });
      return next;
    });

    // Simpan tata letak awal agar stabil antar sesi.
    if (unplaced.length > 0) {
      void Promise.all(
        unplaced.map((node) =>
          api.flows
            .update(node.id, {
              positionX: Math.round(layout[node.id]?.x ?? 0),
              positionY: Math.round(layout[node.id]?.y ?? 0),
            })
            .catch(() => null),
        ),
      );
    }
  }, [nodes, reload]);

  const selected = nodes.find((node) => node.id === selectedId) ?? null;
  const selectedEdge = edges.find((edge) => edge.id === selectedEdgeId) ?? null;

  useEffect(() => {
    if (selected) {
      setForm({ title: selected.title, description: selected.description, kind: selected.kind });
    }
  }, [selectedId, selected]);

  /** Konversi koordinat layar → koordinat kanvas (world). */
  const toWorld = useCallback(
    (clientX: number, clientY: number): Position => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };
      return { x: (clientX - rect.left - view.x) / view.scale, y: (clientY - rect.top - view.y) / view.scale };
    },
    [view],
  );

  // ── Interaksi pointer ─────────────────────────────────────────
  const startNodeDrag = (event: React.PointerEvent, node: FlowNodeRow) => {
    if (event.button !== 0) return;
    event.stopPropagation();
    setSelectedId(node.id);
    setSelectedEdgeId(null);
    const origin = positions[node.id] ?? { x: node.positionX, y: node.positionY };
    dragRef.current = { mode: 'node', id: node.id, startWorld: toWorld(event.clientX, event.clientY), origin, moved: false };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const startConnect = (event: React.PointerEvent, node: FlowNodeRow) => {
    event.stopPropagation();
    event.preventDefault();
    const cursor = toWorld(event.clientX, event.clientY);
    dragRef.current = { mode: 'connect', sourceId: node.id, cursor };
    setConnecting({ sourceId: node.id, cursor });
  };

  const startPan = (event: React.PointerEvent) => {
    if (event.button !== 0) return;
    dragRef.current = { mode: 'pan', startClient: { x: event.clientX, y: event.clientY }, origin: view };
    setPanning(true);
  };

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;

      if (drag.mode === 'node') {
        const world = toWorld(event.clientX, event.clientY);
        const dx = world.x - drag.startWorld.x;
        const dy = world.y - drag.startWorld.y;
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) drag.moved = true;
        setPositions((prev) => ({ ...prev, [drag.id]: { x: drag.origin.x + dx, y: drag.origin.y + dy } }));
      } else if (drag.mode === 'pan') {
        setView({
          ...drag.origin,
          x: drag.origin.x + (event.clientX - drag.startClient.x),
          y: drag.origin.y + (event.clientY - drag.startClient.y),
        });
      } else if (drag.mode === 'connect') {
        const cursor = toWorld(event.clientX, event.clientY);
        drag.cursor = cursor;
        setConnecting({ sourceId: drag.sourceId, cursor });
      }
    };

    const onUp = (event: PointerEvent) => {
      const drag = dragRef.current;
      dragRef.current = null;
      setPanning(false);

      if (drag?.mode === 'node' && drag.moved) {
        const position = positionsRef.current[drag.id];
        if (position) {
          void api.flows
            .update(drag.id, { positionX: Math.round(position.x), positionY: Math.round(position.y) })
            .catch(() => notify('Posisi kartu gagal disimpan'));
        }
      }

      if (drag?.mode === 'connect') {
        const target = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-node-id]');
        const targetId = target?.getAttribute('data-node-id') ?? null;
        setConnecting(null);
        if (targetId && targetId !== drag.sourceId) {
          void api.flows.edges
            .create({ sourceId: drag.sourceId, targetId })
            .then(() => reload())
            .catch((err) => notify(err instanceof Error ? err.message : 'Gagal menghubungkan kartu'));
        }
      }
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [notify, reload, toWorld]);

  const onWheel = (event: React.WheelEvent) => {
    if (!event.ctrlKey && !event.metaKey) return;
    event.preventDefault();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nextScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, view.scale * (event.deltaY < 0 ? 1.08 : 0.92)));
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    setView({
      scale: nextScale,
      x: px - ((px - view.x) * nextScale) / view.scale,
      y: py - ((py - view.y) * nextScale) / view.scale,
    });
  };

  /** Skala & geser kanvas agar seluruh kartu masuk layar. */
  const fitToView = useCallback(() => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || nodes.length === 0) return;
    const points = Object.values(positionsRef.current);
    if (points.length === 0) return;

    const minX = Math.min(...points.map((p) => p.x));
    const minY = Math.min(...points.map((p) => p.y));
    const maxX = Math.max(...points.map((p) => p.x)) + NODE_W;
    const maxY = Math.max(...points.map((p) => p.y)) + NODE_H;
    const pad = 40;
    const scale = Math.min(
      1,
      Math.max(MIN_SCALE, Math.min((rect.width - pad * 2) / (maxX - minX), (rect.height - pad * 2) / (maxY - minY))),
    );
    setView({
      scale,
      x: (rect.width - (maxX - minX) * scale) / 2 - minX * scale,
      y: (rect.height - (maxY - minY) * scale) / 2 - minY * scale,
    });
  }, [nodes.length]);

  // Sekali saja: setelah posisi tersedia, muat semua kartu ke dalam kanvas.
  const didFit = useRef(false);
  useEffect(() => {
    if (didFit.current || nodes.length === 0) return;
    if (Object.keys(positions).length < nodes.length) return;
    didFit.current = true;
    fitToView();
  }, [fitToView, nodes.length, positions]);

  // ── CRUD ──────────────────────────────────────────────────────
  const save = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      await api.flows.update(selected.id, form);
      notify('Kartu alur disimpan');
      await reload();
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Gagal menyimpan kartu');
    } finally {
      setSaving(false);
    }
  };

  const addNode = async (at?: Position) => {
    setSaving(true);
    try {
      const position = at ?? { x: 60 - view.x / view.scale, y: 60 - view.y / view.scale };
      const created = await api.flows.create({
        kind: 'question',
        title: 'Pertanyaan baru',
        description: 'Tulis pertanyaan pemulai di sini.',
        sortOrder: nodes.length,
        positionX: Math.round(position.x),
        positionY: Math.round(position.y),
      });
      notify('Kartu ditambahkan');
      await reload();
      setSelectedId(created.id);
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Gagal menambah kartu');
    } finally {
      setSaving(false);
    }
  };

  const remove = useCallback(async () => {
    const node = nodes.find((item) => item.id === selectedId);
    if (!node) return;
    if (!window.confirm(`Hapus kartu "${node.title}"?`)) return;
    try {
      await api.flows.remove(node.id);
      notify('Kartu dihapus');
      setSelectedId(null);
      await reload();
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Gagal menghapus kartu');
    }
  }, [nodes, notify, reload, selectedId]);

  const removeEdge = useCallback(async () => {
    const edge = edges.find((item) => item.id === selectedEdgeId);
    if (!edge) return;
    try {
      await api.flows.edges.remove(edge.id);
      notify('Garis dihapus');
      setSelectedEdgeId(null);
      await reload();
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Gagal menghapus garis');
    }
  }, [edges, notify, reload, selectedEdgeId]);

  /** Rapikan semua kartu ke grid, lalu simpan posisi barunya. */
  const tidy = async () => {
    if (nodes.length === 0) return;
    const layout = gridLayout(nodes);
    setPositions(layout);
    setView({ x: 0, y: 0, scale: 1 });
    try {
      await Promise.all(
        nodes.map((node) =>
          api.flows.update(node.id, {
            positionX: Math.round(layout[node.id].x),
            positionY: Math.round(layout[node.id].y),
          }),
        ),
      );
      notify('Tata letak dirapikan');
      await reload();
    } catch {
      notify('Sebagian posisi gagal disimpan');
    }
  };

  // Delete / Backspace menghapus pilihan, kecuali sedang mengetik.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Delete' && event.key !== 'Backspace') return;
      const el = event.target as HTMLElement | null;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable)) return;
      if (selectedEdgeId) {
        event.preventDefault();
        void removeEdge();
      } else if (selectedId) {
        event.preventDefault();
        void remove();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [remove, removeEdge, selectedEdgeId, selectedId]);

  const edgeGeometry = useMemo(
    () =>
      edges
        .map((edge: FlowEdgeRow) => {
          const from = positions[edge.sourceId];
          const to = positions[edge.targetId];
          if (!from || !to) return null;
          return { edge, d: edgePath(from, to), mid: edgeMid(from, to) };
        })
        .filter((item): item is { edge: FlowEdgeRow; d: string; mid: Position } => item !== null),
    [edges, positions],
  );

  const ghostPath = useMemo(() => {
    if (!connecting) return null;
    const from = positions[connecting.sourceId];
    if (!from) return null;
    // Kursor diperlakukan sebagai kartu semu agar rutenya konsisten.
    return edgePath(from, { x: connecting.cursor.x, y: connecting.cursor.y - NODE_H / 2 });
  }, [connecting, positions]);

  const selectedNodeLabel = selected ? KIND_LABEL[selected.kind] : null;

  return (
    <section className="view active" id="view-knowledge-builder">
      <div className="page-title-row">
        <div>
          <div className="eyebrow"><span className="eyebrow-dot"></span> PENGELOLAAN DATA AI</div>
          <h1>Flow Builder</h1>
          <p className="subheading">
            Tarik kartu untuk menata, tarik titik di sisi kanan kartu ke kartu lain untuk membuat garis.
          </p>
        </div>
        <div className="fb-head-actions">
          <button className="btn btn-secondary" onClick={() => void tidy()} disabled={nodes.length === 0 || saving}>
            Rapikan
          </button>
          <button className="btn btn-secondary" onClick={() => void addNode()} disabled={saving}>
            Tambah Kartu
          </button>
          <button className="btn btn-primary" onClick={() => void save()} disabled={!selected || saving}>
            {saving ? 'Menyimpan…' : 'Simpan Kartu'}
          </button>
        </div>
      </div>

      <div className="fb-layout">
        <div className="panel fb-panel">
          <div className="fb-toolbar">
            <div className="fb-toolbar-info">
              <strong>{nodes.length} kartu</strong>
              <span>{edges.length} garis</span>
            </div>
            <div className="fb-zoom">
              <button type="button" onClick={() => setView((v) => ({ ...v, scale: Math.max(MIN_SCALE, v.scale - 0.1) }))} aria-label="Perkecil">−</button>
              <span>{Math.round(view.scale * 100)}%</span>
              <button type="button" onClick={() => setView((v) => ({ ...v, scale: Math.min(MAX_SCALE, v.scale + 0.1) }))} aria-label="Perbesar">+</button>
              <button type="button" className="fb-reset" onClick={fitToView}>Muat semua</button>
              <button type="button" className="fb-reset" onClick={() => setView({ x: 0, y: 0, scale: 1 })}>Reset</button>
            </div>
          </div>

          {loading ? <p className="knowledge-note" style={{ padding: '0 16px' }}>Memuat alur…</p> : null}
          {error ? <p className="knowledge-note" style={{ color: '#b91c1c', padding: '0 16px' }}>{error}</p> : null}

          <div
            ref={canvasRef}
            className={`fb-canvas${panning ? ' is-panning' : ''}`}
            onPointerDown={startPan}
            onWheel={onWheel}
            onDoubleClick={(event) => {
              const rect = canvasRef.current?.getBoundingClientRect();
              if (!rect) return;
              if ((event.target as HTMLElement).closest('[data-node-id]')) return;
              void addNode(toWorld(event.clientX, event.clientY));
            }}
          >
            <div
              className="fb-world"
              style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}
            >
              <svg className="fb-edge-layer" width="6000" height="4000" aria-hidden="true">
                <defs>
                  <marker id="fb-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#9aa2bb" />
                  </marker>
                  <marker id="fb-arrow-active" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#16a34a" />
                  </marker>
                </defs>
                {edgeGeometry.map(({ edge, d, mid }) => {
                  const active = selectedEdgeId === edge.id;
                  return (
                    <g key={edge.id}>
                      <path
                        d={d}
                        className="fb-edge-hit"
                        onPointerDown={(event) => {
                          event.stopPropagation();
                          setSelectedEdgeId(edge.id);
                          setSelectedId(null);
                        }}
                      />
                      <path
                        d={d}
                        className={`fb-edge${active ? ' is-active' : ''}`}
                        markerEnd={`url(#fb-arrow${active ? '-active' : ''})`}
                      />
                      {active ? (
                        <>
                          <circle cx={mid.x} cy={mid.y} r={9} className="fb-edge-handle" />
                          <path
                            d={`M ${mid.x - 3.4} ${mid.y - 3.4} L ${mid.x + 3.4} ${mid.y + 3.4} M ${mid.x + 3.4} ${mid.y - 3.4} L ${mid.x - 3.4} ${mid.y + 3.4}`}
                            className="fb-edge-x"
                          />
                        </>
                      ) : null}
                    </g>
                  );
                })}
                {ghostPath ? <path d={ghostPath} className="fb-ghost" /> : null}
              </svg>

              {nodes.map((node) => {
                const pos = positions[node.id] ?? { x: node.positionX, y: node.positionY };
                const isSelected = selectedId === node.id;
                return (
                  <div
                    key={node.id}
                    data-node-id={node.id}
                    className={`fb-node${isSelected ? ' is-selected' : ''}`}
                    style={{ left: pos.x, top: pos.y, width: NODE_W, height: NODE_H, zIndex: isSelected ? 3 : 1 }}
                    onPointerDown={(event) => startNodeDrag(event, node)}
                    title={`${node.title}${node.description ? ` — ${node.description}` : ''}`}
                  >
                    <div className="fb-node-head">
                      <span className={`fb-kind ${KIND_TONE[node.kind]}`}>{KIND_LABEL[node.kind]}</span>
                      {!node.isActive ? <span className="fb-off">nonaktif</span> : null}
                    </div>
                    <strong className="fb-node-title">{node.title}</strong>
                    <span className="fb-node-desc">{node.description || '—'}</span>

                    <button
                      type="button"
                      className="fb-port"
                      aria-label={`Hubungkan dari ${node.title}`}
                      title="Tarik ke kartu lain untuk membuat garis"
                      onPointerDown={(event) => startConnect(event, node)}
                    />
                  </div>
                );
              })}
            </div>

            {!loading && nodes.length === 0 ? (
              <div className="fb-empty">Belum ada kartu. Klik dua kali kanvas atau tombol “Tambah Kartu”.</div>
            ) : null}
          </div>

          <p className="fb-hint">
            Tarik kartu untuk menata · Tarik titik kanan ke kartu lain untuk garis · Klik garis lalu Delete untuk menghapus ·
            Ctrl + gulir untuk zoom
          </p>
        </div>

        <aside className="panel fb-editor">
          <div className="fb-editor-head">
            <h2>{selectedEdge ? 'Garis alur' : 'Editor kartu'}</h2>
            <p>{selectedEdge ? 'Menghubungkan dua kartu' : selectedNodeLabel ?? 'Pilih kartu di kanvas'}</p>
          </div>

          <div className="fb-editor-body">
            {selectedEdge ? (
              <>
                <div className="settings-field">
                  <label>Dari</label>
                  <p className="fb-edge-text">{nodes.find((node) => node.id === selectedEdge.sourceId)?.title ?? '—'}</p>
                </div>
                <div className="settings-field">
                  <label>Ke</label>
                  <p className="fb-edge-text">{nodes.find((node) => node.id === selectedEdge.targetId)?.title ?? '—'}</p>
                </div>
                <div className="settings-actions">
                  <button className="btn btn-danger-outline" onClick={() => void removeEdge()}>Hapus garis</button>
                </div>
              </>
            ) : selected ? (
              <>
                <div className="settings-field">
                  <label htmlFor="node-title">Judul kartu</label>
                  <input
                    id="node-title"
                    className="settings-input"
                    value={form.title}
                    onChange={(event) => setForm({ ...form, title: event.target.value })}
                  />
                </div>
                <div className="settings-field">
                  <label htmlFor="node-kind">Tipe kartu</label>
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
              <div className="fb-editor-empty">
                <strong>Belum ada yang dipilih</strong>
                <p>Klik kartu di kanvas untuk mengubah judul, tipe, dan deskripsinya. Klik garis untuk menghapus sambungan.</p>
                <p className="knowledge-note">Kartu bertipe “Pertanyaan” otomatis muncul sebagai tombol topik di widget publik.</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
