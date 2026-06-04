import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <div className="logo">bu<em>a</em>tan</div>
          <p>Malaysia's handmade marketplace. Connecting local makers with buyers who care about craft, community, and quality.</p>
        </div>
        <div className="footer-col">
          <h4>For buyers</h4>
          <ul>
            <li><Link to="/browse">Browse all makers</Link></li>
            <li><Link to="/brief">Post a custom brief</Link></li>
            <li><Link to="/browse?occasion=wedding">Wedding door gifts</Link></li>
            <li><Link to="/browse?occasion=raya">Raya hampers</Link></li>
            <li><Link to="/browse?occasion=corporate">Corporate gifting</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>For makers</h4>
          <ul>
            <li><Link to="/signup">Start selling</Link></li>
            <li><a href="#">Maker Pro</a></li>
            <li><a href="#">Dashboard tour</a></li>
            <li><a href="#">Shipping integration</a></li>
            <li><a href="#">Maker community</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Buatan</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Terms &amp; privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Kar Mun Wong Sdn Bhd · Made in Malaysia 🇲🇾</span>
        <span>buatan.my</span>
      </div>
    </footer>
  )
}
