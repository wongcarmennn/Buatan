import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Nav() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav>
      <Link to="/" className="nav-logo">bu<em>a</em>tan</Link>

      <ul className="nav-links">
        <li><a href="/#how">How it works</a></li>
        <li><a href="/#occasions">Occasions</a></li>
        <li><a href="/#makers">For makers</a></li>
        <li><Link to="/brief">Custom request</Link></li>
        <li><Link to="/browse">Browse</Link></li>
      </ul>

      <div className="nav-cta">
        {user ? (
          <>
            <span className="nav-user-email">{user.email}</span>
            <button className="btn-ghost" onClick={handleSignOut}>Sign out</button>
          </>
        ) : (
          <>
            <Link to="/signin" className="btn-ghost">Sign in</Link>
            <Link to="/signup" className="btn-primary">Start selling</Link>
          </>
        )}
      </div>
    </nav>
  )
}
