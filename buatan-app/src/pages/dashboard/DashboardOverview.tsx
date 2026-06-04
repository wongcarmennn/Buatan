import { Link } from 'react-router-dom'

const RECENT_ORDERS = [
  { id: '1042', item: '150× batik wax candles', buyer: 'Siti Nora', amount: 1800, status: 'production', date: '2 Jun' },
  { id: '1039', item: 'Custom Raya gift set (×50)', buyer: 'Rashid Hamdan', amount: 2750, status: 'ready', date: '30 May' },
  { id: '1035', item: '30× personalised wedding candles', buyer: 'Aisha Tan', amount: 360, status: 'shipped', date: '27 May' },
  { id: '1031', item: 'Reed diffuser × 5', buyer: 'Nurul H.', amount: 340, status: 'delivered', date: '22 May' },
]

const STATUS_LABEL: Record<string, { label: string; cls: string }> = {
  production: { label: 'In production', cls: 'status-prod' },
  ready:      { label: 'Ready to ship', cls: 'status-ready' },
  shipped:    { label: 'Shipped', cls: 'status-shipped' },
  delivered:  { label: 'Delivered', cls: 'status-done' },
}

export default function DashboardOverview() {
  return (
    <div className="dash-page">
      <div className="dash-page-header">
        <h1 className="dash-page-title">Overview</h1>
        <p className="dash-page-sub">Good afternoon, Lilin Studio 👋</p>
      </div>

      {/* STATS */}
      <div className="dash-stats">
        <div className="dash-stat-card">
          <div className="dsc-label">This month's earnings</div>
          <div className="dsc-value">RM 4,320</div>
          <div className="dsc-delta positive">↑ 18% vs last month</div>
        </div>
        <div className="dash-stat-card">
          <div className="dsc-label">Active orders</div>
          <div className="dsc-value">7</div>
          <div className="dsc-delta">2 need attention</div>
        </div>
        <div className="dash-stat-card">
          <div className="dsc-label">New briefs</div>
          <div className="dsc-value">3</div>
          <div className="dsc-delta">Awaiting your response</div>
        </div>
        <div className="dash-stat-card">
          <div className="dsc-label">Shop rating</div>
          <div className="dsc-value">4.9 ★</div>
          <div className="dsc-delta">Based on 847 orders</div>
        </div>
      </div>

      {/* EARNINGS CHART (placeholder) */}
      <div className="dash-card">
        <div className="dash-card-header">
          <h2>Earnings — last 6 months</h2>
        </div>
        <div className="dash-chart">
          {[
            { month: 'Jan', amount: 2100 },
            { month: 'Feb', amount: 2800 },
            { month: 'Mar', amount: 3200 },
            { month: 'Apr', amount: 2900 },
            { month: 'May', amount: 3660 },
            { month: 'Jun', amount: 4320 },
          ].map(({ month, amount }) => {
            const max = 4320
            const pct = (amount / max) * 100
            return (
              <div key={month} className="dash-bar-col">
                <div className="dash-bar-amount">RM {amount.toLocaleString()}</div>
                <div className="dash-bar-wrap">
                  <div className="dash-bar" style={{ height: `${pct}%` }} />
                </div>
                <div className="dash-bar-label">{month}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* RECENT ORDERS */}
      <div className="dash-card">
        <div className="dash-card-header">
          <h2>Recent orders</h2>
          <Link to="/dashboard/orders" className="dash-card-link">View all →</Link>
        </div>
        <table className="dash-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Buyer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {RECENT_ORDERS.map(o => (
              <tr key={o.id}>
                <td><span className="order-id">#{o.id}</span> {o.item}</td>
                <td>{o.buyer}</td>
                <td>RM {o.amount.toLocaleString()}</td>
                <td><span className={`order-status ${STATUS_LABEL[o.status].cls}`}>{STATUS_LABEL[o.status].label}</span></td>
                <td>{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
