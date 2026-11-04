import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PageHead, Panel, Field, Badge, Icon } from '../components/ui/PageKit';
import { products } from '../data/omni';
import { useToast } from '../components/Toast';

export default function ProductFormPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const notify = useToast();
  const existing = products.find((item) => item.id === productId);
  const isEdit = Boolean(existing);

  const [form, setForm] = useState({
    name: existing?.name || '',
    sku: existing?.sku || '',
    category: existing?.category || 'Makanan Ringan',
    price: existing?.price || '',
    halal: existing?.halal || 'Belum',
    description: '',
  });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    notify(isEdit ? 'Produk diperbarui' : 'Produk ditambahkan');
    navigate('/products');
  };

  return (
    <section className="view active" id="view-product-form">
      <PageHead
        eyebrow="KATALOG UMKM"
        title={isEdit ? 'Edit produk' : 'Tambah produk'}
        subtitle="Data produk dipakai sebagai konteks jawaban asisten."
      >
        <Link className="btn btn-secondary" to="/products">Kembali</Link>
      </PageHead>

      <div className="grid-2-1">
        <Panel title="Informasi produk" subtitle="Lengkapi data agar asisten bisa menjawab pertanyaan produk">
          <form onSubmit={submit}>
            <Field label="Nama produk">
              <input
                className="settings-input"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Contoh: Kopi Arabika Preanger 200g"
              />
            </Field>

            <div className="form-row-two">
              <Field label="SKU">
                <input className="settings-input" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} placeholder="KHB-KOP-01" />
              </Field>
              <Field label="Kategori">
                <select className="settings-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  <option>Makanan Ringan</option>
                  <option>Minuman</option>
                  <option>Bumbu</option>
                  <option>Madu</option>
                  <option>Katering</option>
                </select>
              </Field>
            </div>

            <div className="form-row-two">
              <Field label="Harga">
                <input className="settings-input" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Rp45.000" />
              </Field>
              <Field label="Status halal">
                <select
                  className="settings-select"
                  value={form.halal}
                  onChange={(e) => setForm({ ...form, halal: e.target.value as typeof form.halal })}
                >
                  <option>Tersertifikasi</option>
                  <option>Proses</option>
                  <option>Belum</option>
                </select>
              </Field>
            </div>

            <Field label="Deskripsi" hint="Bahan utama dan proses produksi membantu asisten menjawab pertanyaan.">
              <textarea
                className="settings-textarea"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Bahan: kopi arabika, tanpa tambahan gula..."
              />
            </Field>

            <div className="settings-actions">
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/products')}>Batal</button>
              <button type="submit" className="btn btn-primary">{Icon.check} {isEdit ? 'Simpan Perubahan' : 'Tambah Produk'}</button>
            </div>
          </form>
        </Panel>

        <Panel title="Ringkasan" subtitle="Pratinjau data produk">
          <div className="kv">
            <div className="kv-row"><span>Nama</span><strong>{form.name || '—'}</strong></div>
            <div className="kv-row"><span>SKU</span><strong>{form.sku || '—'}</strong></div>
            <div className="kv-row"><span>Kategori</span><strong>{form.category}</strong></div>
            <div className="kv-row"><span>Harga</span><strong>{form.price || '—'}</strong></div>
            <div className="kv-row"><span>Status halal</span><strong><Badge tone={form.halal === 'Tersertifikasi' ? 'green' : form.halal === 'Proses' ? 'amber' : 'slate'} dot>{form.halal}</Badge></strong></div>
          </div>
          <p className="knowledge-note">
            Produk berstatus “Tersertifikasi” akan ditandai pada halaman publik dan katalog UMKM.
          </p>
        </Panel>
      </div>

      <footer className="page-footer">
        <span>© 2025 Komunitas Halal Bandung</span>
        <span>Form produk <i>●</i> Prototipe PKM</span>
      </footer>
    </section>
  );
}
