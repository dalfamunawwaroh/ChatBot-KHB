import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHead, Panel, Badge, Icon } from '../components/ui/PageKit';
import { products } from '../data/omni';
import { useToast } from '../components/Toast';

const FILTERS = ['Semua', 'Tersertifikasi', 'Proses', 'Belum'];

export default function ProductListPage() {
  const navigate = useNavigate();
  const notify = useToast();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Semua');

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

      <div className="toolbar-row">
        <div className="toolbar-left">
          <div className="chip-row">
            {FILTERS.map((item) => (
              <button key={item} className={`chip${filter === item ? ' active' : ''}`} onClick={() => setFilter(item)}>{item}</button>
            ))}
          </div>
        </div>
        <div className="toolbar-right">
          <label className="search-box">
            {Icon.search}
            <input type="search" placeholder="Cari produk atau SKU..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
        </div>
      </div>

      <Panel title="Daftar produk" subtitle={`${rows.length} produk ditampilkan`}>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>PRODUK</th><th>KATEGORI</th><th>HARGA</th><th>STATUS HALAL</th><th>STATUS</th><th></th></tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <strong style={{ display: 'block', color: 'var(--ink)', fontSize: 12.5 }}>{row.name}</strong>
                    <span style={{ fontSize: 11.5 }}>{row.sku}</span>
                  </td>
                  <td>{row.category}</td>
                  <td>{row.price}</td>
                  <td><Badge tone={tone(row.halal)} dot>{row.halal}</Badge></td>
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
        </div>
      </Panel>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Katalog produk <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
