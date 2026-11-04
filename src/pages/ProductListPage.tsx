import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHead, Panel, Stat, StatsGrid, Badge, Icon, Empty } from '../components/ui/PageKit';
import { products } from '../data/omni';
import { useToast } from '../components/Toast';

const FILTERS = ['Semua', 'Tersertifikasi', 'Proses', 'Belum'] as const;

export default function ProductListPage() {
  const navigate = useNavigate();
  const notify = useToast();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('Semua');

  const rows = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products.filter((row) => {
      const matchFilter = filter === 'Semua' || row.halal === filter;
      const matchQuery = !term || row.name.toLowerCase().includes(term) || row.sku.toLowerCase().includes(term);
      return matchFilter && matchQuery;
    });
  }, [query, filter]);

  const tone = (value: string) => (value === 'Tersertifikasi' ? 'green' : value === 'Proses' ? 'amber' : 'slate');

  return (
    <section className="view active" id="view-products">
      <PageHead eyebrow="KATALOG UMKM" title="Produk" subtitle="Daftar produk yang diajukan sertifikasi halal melalui komunitas.">
        <Link className="btn btn-primary" to="/products/new">{Icon.plus} Tambah Produk</Link>
      </PageHead>

      <StatsGrid>
        <Stat label="Total produk" value={products.length} icon={Icon.store} tone="green" foot={<span>terdaftar di katalog</span>} />
        <Stat label="Tersertifikasi" value={products.filter((p) => p.halal === 'Tersertifikasi').length} icon={Icon.check} tone="green" foot={<span className="history-trend">↗ 2 bulan ini</span>} />
        <Stat label="Dalam proses" value={products.filter((p) => p.halal === 'Proses').length} icon={Icon.clock} tone="orange" foot={<span>menunggu BPJPH</span>} />
        <Stat label="Belum diajukan" value={products.filter((p) => p.halal === 'Belum').length} icon={Icon.doc} tone="purple" foot={<span>perlu pendampingan</span>} />
      </StatsGrid>

      <Panel padding={false}>
        <div className="history-toolbar">
          <div>
            <h2>Daftar produk</h2>
            <p>{rows.length} produk ditampilkan</p>
          </div>
          <div className="history-filters">
            <div className="filter-tabs" style={{ height: 36 }}>
              {FILTERS.map((item) => (
                <button key={item} className={`filter-tab${filter === item ? ' selected' : ''}`} onClick={() => setFilter(item)}>
                  {item}
                </button>
              ))}
            </div>
            <label className="search-box">
              {Icon.search}
              <input type="search" placeholder="Cari produk atau SKU..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </label>
          </div>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>PRODUK</th><th>KATEGORI</th><th>HARGA</th><th>STATUS HALAL</th><th>STATUS</th><th></th></tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="doc-name">
                      <span className="avatar avatar-soft-green" style={{ width: 30, height: 30, borderRadius: 8 }}>{Icon.store}</span>
                      <div>
                        <strong>{row.name}</strong>
                        <small>{row.sku}</small>
                      </div>
                    </div>
                  </td>
                  <td>{row.category}</td>
                  <td>{row.price}</td>
                  <td><Badge tone={tone(row.halal) as 'green' | 'amber' | 'slate'} dot>{row.halal}</Badge></td>
                  <td>{row.status}</td>
                  <td>
                    <div className="row-actions">
                      <button className="icon-action" aria-label="Edit produk" onClick={() => navigate(`/products/${row.id}/edit`)}>{Icon.edit}</button>
                      <button className="icon-action danger" aria-label="Hapus produk" onClick={() => notify('Produk dihapus (demo)')}>{Icon.trash}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 ? <Empty text="Tidak ada produk yang cocok." /> : null}
        </div>

        <div className="table-footer">
          <span>Menampilkan <strong>{rows.length}</strong> dari <strong>{products.length}</strong> produk</span>
          <div className="pagination"><button className="current-page" aria-current="page">1</button></div>
        </div>
      </Panel>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Katalog produk <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
