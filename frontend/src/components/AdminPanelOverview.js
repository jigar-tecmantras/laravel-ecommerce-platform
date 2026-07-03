import React from 'react';

const AdminPanelOverview = ({ metrics }) => (
  <section>
    <h2>Admin snapshot</h2>
    <div className='admin-grid'>
      {metrics.map((metric) => (
        <article key={metric.label} className='admin-card'>
          <p className='eyebrow'>{metric.label}</p>
          <h3>{metric.value}</h3>
          <p className='muted'>{metric.change}</p>
        </article>
      ))}
    </div>
  </section>
);

export default AdminPanelOverview;
