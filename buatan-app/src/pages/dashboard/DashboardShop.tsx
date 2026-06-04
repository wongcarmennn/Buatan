import { useState } from 'react'

interface Listing {
  id: string
  emoji: string
  name: string
  price: number
  minQty: number | null
  category: string
  active: boolean
  orders: number
}

const INITIAL_LISTINGS: Listing[] = [
  { id: '1', emoji: '🕯️', name: 'Batik wax candle set (3-pc)', price: 38, minQty: 10, category: 'Candle sets', active: true, orders: 312 },
  { id: '2', emoji: '🕯️', name: 'Personalised wedding candle', price: 12, minQty: 30, category: 'Wedding', active: true, orders: 428 },
  { id: '3', emoji: '🎁', name: 'Raya gift box candle set', price: 55, minQty: 5, category: 'Hampers', active: true, orders: 85 },
  { id: '4', emoji: '🕯️', name: 'Reed diffuser (100ml)', price: 68, minQty: null, category: 'Home', active: true, orders: 22 },
]

const EMPTY: Listing = { id: '', emoji: '🕯️', name: '', price: 0, minQty: null, category: '', active: true, orders: 0 }

export default function DashboardShop() {
  const [listings, setListings] = useState(INITIAL_LISTINGS)
  const [editing, setEditing] = useState<Listing | null>(null)
  const [isNew, setIsNew] = useState(false)

  const openNew = () => { setEditing({ ...EMPTY, id: Date.now().toString() }); setIsNew(true) }
  const openEdit = (l: Listing) => { setEditing({ ...l }); setIsNew(false) }

  const save = () => {
    if (!editing) return
    if (isNew) setListings(ls => [...ls, editing])
    else setListings(ls => ls.map(l => l.id === editing.id ? editing : l))
    setEditing(null)
  }

  const toggle = (id: string) => setListings(ls => ls.map(l => l.id === id ? { ...l, active: !l.active } : l))
  const remove = (id: string) => { setListings(ls => ls.filter(l => l.id !== id)); if (editing?.id === id) setEditing(null) }

  const set = (field: keyof Listing) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editing) return
    const val = field === 'price' || field === 'minQty' ? (e.target.value === '' ? null : Number(e.target.value)) : e.target.value
    setEditing(ev => ev ? { ...ev, [field]: val } : ev)
  }

  return (
    <div className="dash-page">
      <div className="dash-page-header">
        <div>
          <h1 className="dash-page-title">My shop</h1>
          <p className="dash-page-sub">{listings.filter(l => l.active).length} active listings</p>
        </div>
        <button className="btn-primary" onClick={openNew}>+ Add listing</button>
      </div>

      <div className="dash-shop-layout">
        <div className="dash-card" style={{ flex: 1 }}>
          <div className="dash-card-header">
            <h2>Listings</h2>
          </div>
          <div className="shop-listings">
            {listings.map(l => (
              <div key={l.id} className={`shop-listing${!l.active ? ' inactive' : ''}${editing?.id === l.id ? ' selected' : ''}`}>
                <div className="sl-emoji">{l.emoji}</div>
                <div className="sl-info">
                  <div className="sl-name">{l.name}</div>
                  <div className="sl-meta">
                    <span>RM {l.price}</span>
                    {l.minQty && <span>Min. {l.minQty} pcs</span>}
                    <span>{l.category}</span>
                    <span>{l.orders} orders</span>
                  </div>
                </div>
                <div className="sl-actions">
                  <button
                    className={`sl-toggle${l.active ? ' active' : ''}`}
                    onClick={() => toggle(l.id)}
                    title={l.active ? 'Deactivate' : 'Activate'}
                  >
                    {l.active ? 'Live' : 'Off'}
                  </button>
                  <button className="sl-edit" onClick={() => openEdit(l)}>Edit</button>
                  <button className="sl-delete" onClick={() => remove(l.id)}>✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {editing && (
          <div className="dash-order-detail">
            <div className="dod-header">
              <div className="dod-id">{isNew ? 'New listing' : 'Edit listing'}</div>
              <button className="dod-close" onClick={() => setEditing(null)}>✕</button>
            </div>

            <div className="auth-field">
              <label>Emoji / icon</label>
              <input type="text" value={editing.emoji} onChange={set('emoji')} maxLength={2} />
            </div>
            <div className="auth-field" style={{ marginTop: '12px' }}>
              <label>Product name *</label>
              <input type="text" value={editing.name} onChange={set('name')} placeholder="e.g. Batik wax candle set" />
            </div>
            <div className="form-row2" style={{ marginTop: '12px' }}>
              <div className="auth-field">
                <label>Price (RM)</label>
                <input type="number" value={editing.price || ''} onChange={set('price')} min={0} placeholder="0" />
              </div>
              <div className="auth-field">
                <label>Min. quantity</label>
                <input type="number" value={editing.minQty ?? ''} onChange={set('minQty')} min={1} placeholder="None" />
              </div>
            </div>
            <div className="auth-field" style={{ marginTop: '12px' }}>
              <label>Category</label>
              <input type="text" value={editing.category} onChange={set('category')} placeholder="e.g. Wedding, Hampers, Home" />
            </div>

            <button
              className="btn-primary btn-large"
              style={{ width: '100%', marginTop: '20px' }}
              onClick={save}
              disabled={!editing.name || !editing.price}
            >
              {isNew ? 'Add listing' : 'Save changes'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
