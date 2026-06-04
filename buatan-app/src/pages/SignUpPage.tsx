import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

type AccountType = 'buyer' | 'maker'

export default function SignUpPage() {
  const [accountType, setAccountType] = useState<AccountType>('buyer')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name, account_type: accountType },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <Link to="/" className="auth-logo">bu<em>a</em>tan</Link>
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📬</div>
            <h2 className="auth-title">Check your email</h2>
            <p className="auth-sub">We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.</p>
            <Link to="/" className="btn-primary btn-large" style={{ display: 'inline-block', marginTop: '24px' }}>Back to home</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-logo">bu<em>a</em>tan</Link>
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-sub">Join Malaysia's handmade marketplace</p>

        <div className="account-type-toggle">
          <button
            type="button"
            className={accountType === 'buyer' ? 'active' : ''}
            onClick={() => setAccountType('buyer')}
          >
            🛍️ I'm a buyer
          </button>
          <button
            type="button"
            className={accountType === 'maker' ? 'active' : ''}
            onClick={() => setAccountType('maker')}
          >
            🏺 I'm a maker
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="auth-field">
            <label>{accountType === 'maker' ? 'Shop / studio name' : 'Full name'}</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={accountType === 'maker' ? 'e.g. Lilin Studio' : 'e.g. Siti Nora'}
              required
            />
          </div>

          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              minLength={8}
              required
            />
          </div>

          <button type="submit" className="btn-primary btn-large" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Creating account…' : accountType === 'maker' ? 'Start selling on Buatan' : 'Create account'}
          </button>

          <p className="auth-terms">
            By signing up you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </p>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
