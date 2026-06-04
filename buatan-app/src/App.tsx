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
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
