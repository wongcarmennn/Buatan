import { useState } from 'react'

const BRIEFS = [
  { id: 'b1', name: 'Hafizah Roslan', occasion: 'Wedding door gifts', qty: 200, budgetMin: 8, budgetMax: 12, description: 'Personalised candles in dusty rose and gold. Names and date on each. Needs to be ready by 20 Aug 2026.', eventDate: '20 Aug 2026', posted: '3 Jun 2026', status: 'new' },
  { id: 'b2', name: 'TechMalaysia Sdn Bhd', occasion: 'Corporate gifting', qty: 500, budgetMin: 15, budgetMax: 25, description: 'Branded candle sets for our annual conference. Company logo on packaging. Earthy, professional scents preferred.', eventDate: '1 Sep 2026', posted: '2 Jun 2026', status: 'new' },
  { id: 'b3', name: 'Nadia Rahman', occasion: 'Baby shower favours', qty: 80, budgetMin: 10, budgetMax: 15, description: 'Soft pastel colours, gender-neutral. Small candle tins with "Baby Rahman" label. Need samples first.', eventDate: '15 Jul 2026', posted: '1 Jun 2026', status: 'new' },
  { id: 'b4', name: 'Syarikat Zamani', occasion: 'Raya hampers', qty: 120, budgetMin: 20, budgetMax: 35, description: 'Candles as part of larger Raya hampers. 3 candles per hamper, festive packaging, warm amber and oud scents.', eventDate: '15 Mar 2027', posted: '28 May 2026', status: 'responded' },
  { id: 'b5', name: 'Priya Menon', occasion: 'Housewarming', qty: 1, budgetMin: 80, budgetMax: 150, description: 'One premium custom candle set as a housewarming gift for a close friend. Personalised message card included.', eventDate: '30 Jun 2026', posted: '25 May 2026', status: 'responded' },
]

type Brief = typeof BRIEFS[0]

export default function DashboardBriefs() {
  const [selected, setSelected] = useState<Brief | null>(null)
  const [reply, setReply] = useState('')
  const [filter, setFilter] = useState<'all' | 'new' | 'responded'>('all')

  const filtered = filter === 'all' ? BRIEFS : BRIEFS.filter(b => b.status === filter)
  const newCount = BRIEFS.filter(b => b.status === 'new').length

  return (
    <div className="dash-page">
      <div className="dash-page-header">
        <h1 className="dash-page-title">Brief inbox</h1>
        <p className="dash-page-sub">{newCount} new brief{newCount !== 1 ? 's' : ''} waiting for your response</p>
      </div>

      <div className="dash-filter-row">
        {(['all', 'new', 'responded'] as const).map(f => (
          <button
            key={f}
            className={`dash-filter-btn${filter === f ? ' active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : f === 'new' ? `New (${newCount})` : 'Responded'}
          </button>
        ))}
      </div>

      <div className="dash-briefs-layout">
        <div className="briefs-list">
          {filtered.map(b => (
            <div
              key={b.id}
              className={`brief-card${selected?.id === b.id ? ' selected' : ''}${b.status === 'new' ? ' brief-new' : ''}`}
              onClick={() => setSelected(b)}
            >
              <div className="bc-top">
                <div>
                  <div className="bc-name">{b.name}</div>
                  <div className="bc-occasion">{b.occasion}</div>
                </div>
                <div className="bc-right">
                  {b.status === 'new' && <div className="bc-badge">New</div>}
                  <div className="bc-date">{b.posted}</div>
                </div>
              </div>
              <div className="bc-meta">
                <span>×{b.qty} pcs</span>
                <span>RM {b.budgetMin}–{b.budgetMax}/pc</span>
                <span>📅 {b.eventDate}</span>
              </div>
              <p className="bc-preview">{b.description.slice(0, 100)}…</p>
            </div>
          ))}
        </div>

        {selected ? (
          <div className="brief-detail">
            <div className="dod-header">
              <div>
                <div className="dod-id">{selected.occasion}</div>
                <div style={{ fontSize: '13px', color: 'var(--ink-muted)', marginTop: '2px' }}>from {selected.name}</div>
              </div>
              <button className="dod-close" onClick={() => setSelected(null)}>✕</button>
            </div>

            <div className="brief-detail-grid">
              <div className="dod-section"><div className="dod-label">Quantity</div><div className="dod-value">{selected.qty} pcs</div></div>
              <div className="dod-section"><div className="dod-label">Budget</div><div className="dod-value">RM {selected.budgetMin}–{selected.budgetMax}/pc</div></div>
              <div className="dod-section"><div className="dod-label">Event date</div><div className="dod-value">{selected.eventDate}</div></div>
              <div className="dod-section"><div className="dod-label">Posted</div><div className="dod-value">{selected.posted}</div></div>
            </div>

            <div className="dod-section">
              <div className="dod-label">Brief</div>
              <div className="dod-notes">{selected.description}</div>
            </div>

            <div className="brief-reply">
              <div className="dod-label" style={{ marginBottom: '8px' }}>Your response</div>
              <textarea
                className="brief-reply-input"
                placeholder="Introduce yourself, confirm you can fulfil this order, your price per piece, and estimated lead time..."
                rows={5}
                value={reply}
                onChange={e => setReply(e.target.value)}
              />
              <div className="brief-reply-actions">
                <button className="btn-primary" disabled={!reply.trim()}>Send response →</button>
                <button className="btn-ghost">Decline</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="brief-empty-state">
            <div style={{ fontSize: '40px' }}>✉️</div>
            <p>Select a brief to view details and respond</p>
          </div>
        )}
      </div>
    </div>
  )
}
