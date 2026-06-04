import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Nav from './components/Nav'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import BrowsePage from './pages/BrowsePage'
import MakerProfilePage from './pages/MakerProfilePage'
import BriefPage from './pages/BriefPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import DashboardLayout from './pages/dashboard/DashboardLayout'
import DashboardOverview from './pages/dashboard/DashboardOverview'
import DashboardOrders from './pages/dashboard/DashboardOrders'
import DashboardBriefs from './pages/dashboard/DashboardBriefs'
import DashboardShop from './pages/dashboard/DashboardShop'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '64px' }}>{children}</main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<Layout><LandingPage /></Layout>} />
          <Route path="/browse" element={<Layout><BrowsePage /></Layout>} />
          <Route path="/makers/:slug" element={<Layout><MakerProfilePage /></Layout>} />
          <Route path="/brief" element={<Layout><BriefPage /></Layout>} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="orders" element={<DashboardOrders />} />
            <Route path="briefs" element={<DashboardBriefs />} />
            <Route path="shop" element={<DashboardShop />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
