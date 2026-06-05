import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const NAV = [
  { to: '/dashboard', label: 'Overview', icon: '📊', end: true },
  { to: '/dashboard/orders', label: 'Orders', icon: '📦', end: false },
  { to: '/dashboard/briefs', label: 'Brief inbox', icon: '✉️', end: false },
  { to: '/dashboard/shop', label: 'My shop', icon: '🏪', end: false },
]

export default function DashboardLayout() {
  const { loading, signOut } = useAuth()

  if (loading) return <div className="dash-loading">Loading…</div>
  // Auth gate disabled until Supabase is connected
  // if (!user) return <Navigate to="/signin?next=/dashboard" replace />

  return (
    <div className="dash-shell">
      <aside className="dash-sidebar">
        <div className="dash-sidebar-top">
          <NavLink to="/" className="dash-logo">bu<em>a</em>tan</NavLink>
          <nav className="dash-nav">
            {NAV.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `dash-nav-item${isActive ? ' active' : ''}`}
              >
                <span className="dash-nav-icon">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="dash-sidebar-bottom">
          <div className="dash-maker-info">
            <div className="dash-maker-avatar">LS</div>
            <div>
              <div className="dash-maker-name">Lilin Studio</div>
              <div className="dash-maker-badge">✓ Verified maker</div>
            </div>
          </div>
          <NavLink to="/" className="dash-nav-item">← Back to marketplace</NavLink>
          <button className="dash-nav-item dash-signout" onClick={signOut}>Sign out</button>
        </div>
      </aside>

      <main className="dash-main">
        <Outlet />
      </main>
    </div>
  )
}
