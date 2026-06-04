import { useState, useEffect } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

const OCCASIONS = [
  'Wedding door gifts', 'Raya hampers', 'Baby shower favours', 'Corporate gifting',
  'Graduation gifts', 'Housewarming', 'Birthday', 'Farewell gifts', 'Other',
]

export default function BriefPage() {
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    occasion: '',
    quantity: '',
    budget_min: '',
    budget_max: '',
    description: '',
    event_date: '',
    contact_email: user?.email || '',
    contact_name: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const preselectedMaker = searchParams.get('maker')

  useEffect(() => {
    if (user?.email) setForm(f => ({ ...f, contact_email: user.email! }))
  }, [user])

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!user) {
      // Store intent and redirect to sign up
      sessionStorage.setItem('pending_brief', JSON.stringify(form))
      navigate('/signup?next=/brief')
      return
    }

    const { error: dbError } = await supabase.from('briefs').insert({
      user_id: user.id,
      occasion: form.occasion,
      quantity: parseInt(form.quantity) || null,
      budget_min: parseFloat(form.budget_min) || null,
      budget_max: parseFloat(form.budget_max) || null,
      description: form.description,
      event_date: form.event_date || null,
      contact_email: form.contact_email,
      contact_name: form.contact_name,
      target_maker_slug: preselectedMaker || null,
      status: 'open',
    })

    if (dbError) {
      setError(dbError.message)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="brief-page">
        <div className="brief-success">
          <div style={{ fontSize: '64px' }}>🎉</div>
          <h2>Brief posted!</h2>
          <p>Your brief has been shared with verified makers. You'll start receiving responses within 24–48 hours.</p>
          <div className="brief-success-actions">
            <Link to="/browse" className="btn-primary btn-large">Browse makers</Link>
            <Link to="/" className="btn-ghost btn-large">Back to home</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="brief-page">
      <div className="brief-header">
        <div className="section-tag">Custom order board</div>
        <h1 className="section-title">Post your <em>custom brief</em></h1>
        <p className="section-sub">Describe what you need and let verified Malaysian makers pitch to you. Free to post — no commitment until you say yes.</p>
      </div>

      <div className="brief-layout">
        <form className="brief-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}

          {preselectedMaker && (
            <div className="brief-maker-notice">
              Sending brief directly to <strong>{preselectedMaker.replace(/-/g, ' ')}</strong>
              {' · '}<Link to="/brief">Remove</Link>
            </div>
          )}

          <div className="auth-field">
            <label>Occasion *</label>
            <select value={form.occasion} onChange={set('occasion')} required>
              <option value="">Select an occasion</option>
              {OCCASIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div className="form-row2">
            <div className="auth-field">
              <label>Quantity *</label>
              <input type="number" value={form.quantity} onChange={set('quantity')} placeholder="e.g. 150" min="1" required />
            </div>
            <div className="auth-field">
              <label>Budget range (RM / pc)</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input type="number" value={form.budget_min} onChange={set('budget_min')} placeholder="Min" min="0" style={{ flex: 1 }} />
                <span style={{ color: 'var(--ink-muted)' }}>–</span>
                <input type="number" value={form.budget_max} onChange={set('budget_max')} placeholder="Max" min="0" style={{ flex: 1 }} />
              </div>
            </div>
          </div>

          <div className="auth-field">
            <label>What do you need? *</label>
            <textarea
              value={form.description}
              onChange={set('description')}
              placeholder="Describe the product, customisation (names, colours, packaging), any special requirements..."
              rows={5}
              required
            />
          </div>

          <div className="auth-field">
            <label>Event date</label>
            <input type="date" value={form.event_date} onChange={set('event_date')} />
          </div>

          <div className="form-row2">
            <div className="auth-field">
              <label>Your name *</label>
              <input type="text" value={form.contact_name} onChange={set('contact_name')} placeholder="e.g. Siti Nora" required />
            </div>
            <div className="auth-field">
              <label>Contact email *</label>
              <input type="email" value={form.contact_email} onChange={set('contact_email')} placeholder="you@example.com" required />
            </div>
          </div>

          <button type="submit" className="btn-primary btn-large" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Posting brief…' : user ? 'Post brief to makers →' : 'Sign up to post brief →'}
          </button>

          {!user && (
            <p style={{ fontSize: '13px', color: 'var(--ink-muted)', textAlign: 'center', marginTop: '8px' }}>
              You'll need a free account. Already have one? <Link to="/signin">Sign in</Link>
            </p>
          )}
        </form>

        <aside className="brief-sidebar">
          <div className="brief-how-card">
            <h3>How it works</h3>
            <div className="bhc-steps">
              {[
                { n: '1', t: 'Post your brief', b: 'Describe what you need — occasion, quantity, budget, and customisation.' },
                { n: '2', t: 'Makers respond', b: 'Verified makers will pitch their proposals within 24–48 hours.' },
                { n: '3', t: 'Choose your maker', b: 'Review proposals, chat, and choose the maker you want to work with.' },
                { n: '4', t: 'Secure payment', b: 'Pay through Buatan — funds are held and released on delivery confirmation.' },
              ].map(s => (
                <div key={s.n} className="bhc-step">
                  <div className="bhc-num">{s.n}</div>
                  <div>
                    <div className="bhc-title">{s.t}</div>
                    <div className="bhc-body">{s.b}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bhc-trust">
              <div>✓ Free to post</div>
              <div>✓ No commitment until you say yes</div>
              <div>✓ All makers are verified handmade</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
