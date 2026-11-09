import { useState } from 'react';
import { api } from '../services/api';
import { formatDateTime, initials, useResource } from '../hooks/useApi';
import { Icon, PageHead, Stat, StatsGrid } from '../components/ui/PageKit';

export default function CustomersPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');

  const { data, loading, error, reload } = useResource(
    async () => {
      const [list, summary] = await Promise.all([
        api.customers.list({ q: query || undefined, status: status || undefined, perPage: 50 }),
        api.dashboard.summary(),
      ]);
      return { ...list, stats: summary.stats };
    },
    [query, status],
  );

  const rows = data?.rows ?? [];
  const stats = data?.stats;

  return (
    <section className="view active" id="view-customers">
      <PageHead
        eyebrow="DATA UMKM"
        title="Pelanggan"
        subtitle="Pelaku usaha yang berinteraksi dengan asisten halal (dari tabel customers)."
      >
        <button className="btn btn-secondary" onClick={() => void reload()}>Muat ulang</button>
      </PageHead>

      <StatsGrid>
        <Stat label="Total UMKM" value={stats?.customers ?? 0} icon={Icon.store} tone="green" foot={<span className="stat-muted">tercatat dari percakapan</span>} />
        <Stat
          label="Percakapan 30 hari"
          value={(stats?.conversations30d ?? 0).toLocaleString('id-ID')}
          icon={Icon.chat}
          tone="blue"
          foot={<span className="stat-muted">{stats?.messages30d ?? 0} pesan</span>}
        />
        <Stat
          label="Dijawab dari dokumen"
          value={stats?.accuracy ?? 0}
          unit="%"
          icon={Icon.check}
          tone="orange"
          foot={<span className="stat-muted">sisanya jawaban umum</span>}
        />
        <Stat
          label="Produk terdaftar"
          value={stats?.products ?? 0}
          icon={Icon.doc}
          tone="purple"
          foot={<span className="stat-muted">{stats?.productsCertified ?? 0} tersertifikasi</span>}
        />
      </StatsGrid>

      <div className="panel" style={{ padding: 0 }}>
        <div className="history-toolbar">
          <div>
            <h2>Daftar pelanggan</h2>
            <p>{rows.length} dari {data?.total ?? 0} UMKM</p>
          </div>
          <div className="history-filters">
            <select className="settings-select compact" value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="">Semua status</option>
              <option value="Aktif">Aktif</option>
              <option value="Baru">Baru</option>
            </select>
            <label className="search-box">
              <svg viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5"/><path d="M15 15l-2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <input type="search" placeholder="Cari nama atau usaha..." value={query} onChange={(event) => setQuery(event.target.value)} />
            </label>
          </div>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>NAMA</th><th>USAHA</th><th>KOTA</th><th>PERCAKAPAN</th><th>TERAKHIR AKTIF</th><th>STATUS</th></tr></thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="user-cell">
                      <span className="avatar avatar-soft-green">{initials(row.name)}</span>
                      <div>
                        <strong>{row.name}</strong>
                        <small>{row.business ?? '—'}</small>
                      </div>
                    </div>
                  </td>
                  <td>{row.business ?? '—'}</td>
                  <td>{row.city ?? '—'}</td>
                  <td>{row.chats}</td>
                  <td>{formatDateTime(row.lastSeenAt)}</td>
                  <td>
                    <span className={`badge-pill ${row.status === 'Baru' ? 'badge-blue' : 'badge-green'}`}>
                      <i></i>{row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading ? <p className="knowledge-note" style={{ padding: '0 18px' }}>Memuat pelanggan…</p> : null}
          {error ? (
            <div style={{ padding: '0 18px', color: '#b91c1c' }} className="knowledge-note">
              {error}{' '}
              <button className="btn btn-secondary btn-sm" style={{ marginLeft: 8 }} onClick={() => void reload()}>
                Coba lagi
              </button>
            </div>
          ) : null}
          {!loading && !error && rows.length === 0 ? <div className="empty-state">Belum ada data pelanggan.</div> : null}
        </div>

        <div className="table-footer">
          <span>Menampilkan <strong>{rows.length}</strong> dari <strong>{data?.total ?? 0}</strong> UMKM</span>
        </div>
      </div>
    </section>
  );
}
