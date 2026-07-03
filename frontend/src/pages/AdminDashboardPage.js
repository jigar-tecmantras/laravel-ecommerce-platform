import React from 'react';
import AdminPanelOverview from '../components/AdminPanelOverview';
import { adminMetrics } from '../data/mockData';

const AdminDashboardPage = () => (
  <div className='page'>
    <section className='section'>
      <AdminPanelOverview metrics={adminMetrics} />
      <div className='section-heading'>
        <h3>Reports</h3>
        <p className='muted'>Hook this view to /api/admin/reports/sales for order-level insights.</p>
      </div>
    </section>
  </div>
);

export default AdminDashboardPage;
