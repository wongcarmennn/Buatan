import { useState } from 'react'

const ALL_ORDERS = [
  { id: '1042', item: '150× batik wax candles', buyer: 'Siti Nora', email: 'siti@example.com', amount: 1800, qty: 150, status: 'production', date: '2 Jun 2026', occasion: 'Wedding', notes: 'Gold ribbon, personalised tags with "Siti & Adam 15.08.2026"' },
  { id: '1039', item: 'Custom Raya gift set (×50)', buyer: 'Rashid Hamdan', email: 'rashid@corp.com', amount: 2750, qty: 50, status: 'ready', date: '30 May 2026', occasion: 'Corporate', notes: 'Co-branded packaging with Axiata logo' },
  { id: '1035', item: '30× personalised wedding candles', buyer: 'Aisha Tan', email: 'aisha@example.com', amount: 360, qty: 30, status: 'shipped', date: '27 May 2026', occasion: 'Wedding', notes: 'Dusty rose colour, names engraved on base' },
  { id: '1031', item: 'Reed diffuser × 5', buyer: 'Nurul Hidayah', email: 'nurul@example.com', amount: 340, qty: 5, status: 'delivered', date: '22 May 2026', occasion: 'Personal', notes: '' },
  { id: '1028', item: '100× baby shower soap favours', buyer: 'Lim Wei Ling', email: 'weiling@example.com', amount: 900, qty: 100, status: 'delivered', date: '18 May 2026', occasion: 'Baby shower', notes: 'Pastel pink, "Baby Mia" label' },
  { id: '1024', item: '20× housewarming candle sets', buyer: 'Ahmad Fauzi', email: 'fauzi@example.com', amount: 760, qty: 20, status: 'delivered', date: '10 May 2026', occasion: 'Housewarming', notes: '' },
]

const STATUSES = ['All', 'In production', 'Ready to ship', 'Shipped', 'Delivered']

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  production: { label: 'In production', cls: 'status-prod' },
  ready:      { label: 'Ready to ship', cls: 'status-ready' },
  shipped:    { label: 'Shipped', cls: 'status-shipped' },
  delivered:  { label: 'Delivered', cls: 'status-done' },
}

const STATUS_KEYS: Record<string, string> = {
  'In production': 'production',
  'Ready to ship': 'ready',
  'Shipped': 'shipped',
  'Delivered': 'delivered',
}

export default function DashboardOrders() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = filter === 'All'
    ? ALL_ORDERS
    : ALL_ORDERS.filter(o => o.status === STATUS_KEYS[filter])

  const order = ALL_ORDERS.find(o => o.id === selected)

  return (
    <div className="dash-page">
      <div className="dash-page-header">
        <h1 className="dash-page-title">Orders</h1>
        <p className="dash-page-sub">{ALL_ORDERS.length} total orders</p>
      </div>

      <div className="dash-filter-row">
        {STATUSES.map(s => (
          <button
            key={s}
            className={`dash-filter-btn${filter === s ? ' active' : ''}`}
            onClick={() => setFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="dash-orders-layout">
        <div className="dash-card" style={{ flex: 1 }}>
          <table className="dash-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Buyer</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr
                  key={o.id}
                  className={`dash-table-row${selected === o.id ? ' selected' : ''}`}
                  onClick={() => setSelected(selected === o.id ? null : o.id)}
                >
                  <td><span className="order-id">#{o.id}</span> {o.item}</td>
                  <td>{o.buyer}</td>
                  <td>{o.qty}</td>
                  <td>RM {o.amount.toLocaleString()}</td>
                  <td><span className={`order-status ${STATUS_MAP[o.status].cls}`}>{STATUS_MAP[o.status].label}</span></td>
                  <td>{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {order && (
          <div className="dash-order-detail">
            <div className="dod-header">
              <div>
                <div className="dod-id">Order #{order.id}</div>
                <span className={`order-status ${STATUS_MAP[order.status].cls}`}>{STATUS_MAP[order.status].label}</span>
              </div>
              <button className="dod-close" onClick={() => setSelected(null)}>✕</button>
            </div>

            <div className="dod-section">
              <div className="dod-label">Item</div>
              <div className="dod-value">{order.item}</div>
            </div>
            <div className="dod-section">
              <div className="dod-label">Occasion</div>
              <div className="dod-value">{order.occasion}</div>
            </div>
            <div className="dod-section">
              <div className="dod-label">Buyer</div>
              <div className="dod-value">{order.buyer}<br /><span style={{ color: 'var(--ink-muted)', fontSize: '12px' }}>{order.email}</span></div>
            </div>
            <div className="dod-section">
              <div className="dod-label">Amount</div>
              <div className="dod-value" style={{ color: 'var(--terra)', fontWeight: 500 }}>RM {order.amount.toLocaleString()}</div>
            </div>
            {order.notes && (
              <div className="dod-section">
                <div className="dod-label">Customisation notes</div>
                <div className="dod-value dod-notes">{order.notes}</div>
              </div>
            )}

            <div className="dod-actions">
              <div className="dod-label" style={{ marginBottom: '8px' }}>Update status</div>
              {['production', 'ready', 'shipped'].map(s => (
                <button
                  key={s}
                  className={`dash-filter-btn${order.status === s ? ' active' : ''}`}
                  style={{ marginBottom: '6px', width: '100%', textAlign: 'left' }}
                >
                  {STATUS_MAP[s].label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
