import React, { useEffect, useMemo, useState } from 'react';
import AdminPanelOverview from '../components/AdminPanelOverview';
import { fetchAdminOverview } from '../api/catalog';

const AdminDashboardPage = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    fetchAdminOverview()
      .then((response) => setMetrics(response.data))
      .catch(() => setError('Unable to reach the admin dashboard.'))
      .finally(() => setLoading(false));
  }, []);

  const overview = useMemo(() => {
    if (!metrics) {
      return [];
    }

    return [
      { label: 'Total orders', value: metrics.total_orders?.toLocaleString(), change: 'real-time' },
      { label: 'Pending orders', value: metrics.pending_orders?.toString(), change: 'needs attention' },
      { label: 'Revenue', value: `$${metrics.total_revenue?.toFixed(2)}`, change: 'auto-calculated' },
      { label: 'Low stock SKUs', value: metrics.low_stock_products?.length ?? 0, change: 'review inventory' },
    ];
  }, [metrics]);

  return (
    <div className='page'>
      <section className='section'>
        <div className='section-heading'>
          <h2>Admin dashboard</h2>
          <p className='muted'>Metrics sourced directly from Laravel.</p>
        </div>
        {loading && <p className='muted'>Loading overview…</p>}
        {error && <p className='form-error'>{error}</p>}
        {!loading && metrics && (
          <>
            <AdminPanelOverview metrics={overview} />
            <div className='section-heading'>
              <h3>Low stock products</h3>
            </div>
            <div className='cards-grid'>
              {metrics.low_stock_products?.map((product) => (
                <article key={product.id} className='admin-card'>
                  <h3>{product.name}</h3>
                  <p className='muted'>Stock: {product.stock}</p>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default AdminDashboardPage;
