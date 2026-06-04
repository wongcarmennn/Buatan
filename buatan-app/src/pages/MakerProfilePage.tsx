import { useParams, Link, useNavigate } from 'react-router-dom'

interface Product {
  id: string
  name: string
  emoji: string
  price: string
  minQty?: string
}

interface MakerData {
  name: string
  location: string
  bio: string
  categories: string[]
  rating: number
  order_count: number
  lead_time_weeks: number
  verified: boolean
  story: string
  products: Product[]
  reviews: { author: string; role: string; text: string; rating: number }[]
}

const MAKERS: Record<string, MakerData> = {
  'lilin-studio': {
    name: 'Lilin Studio',
    location: 'Cheras, Kuala Lumpur',
    bio: 'Handcrafted batik-inspired candles made with natural soy wax.',
    categories: ['Candles', 'Door gifts', 'Wedding'],
    rating: 4.9,
    order_count: 847,
    lead_time_weeks: 3,
    verified: true,
    story: "We started Lilin Studio in 2020 from a small apartment in Cheras. What began as a pandemic hobby turned into a full-time craft business. Every candle is hand-poured using natural soy wax and scented with essential oils sourced from local botanicals. Our batik-inspired designs draw from Malaysian textile heritage.",
    products: [
      { id: '1', emoji: '🕯️', name: 'Batik wax candle set (3-pc)', price: 'RM 38 / set', minQty: 'Min. 10 sets' },
      { id: '2', emoji: '🕯️', name: 'Personalised wedding candle', price: 'RM 12 / pc', minQty: 'Min. 30 pcs' },
      { id: '3', emoji: '🎁', name: 'Raya gift box candle set', price: 'RM 55 / box', minQty: 'Min. 5 boxes' },
      { id: '4', emoji: '🕯️', name: 'Reed diffuser (100ml)', price: 'RM 68', minQty: undefined },
    ],
    reviews: [
      { author: 'Siti Nora', role: 'Wedding customer', text: "Ordered 200 personalised candles for my wedding. They were perfect — exactly the design we wanted and delivered a week early.", rating: 5 },
      { author: 'Aisha Tan', role: 'Corporate buyer', text: "We ordered 500 branded candles for our company's Raya gifts. The quality was outstanding and the team was very communicative throughout.", rating: 5 },
      { author: 'Nurul Hidayah', role: 'Regular buyer', text: "The reed diffusers smell absolutely amazing. I've ordered three times now and the scent lasts for months.", rating: 5 },
    ],
  },
  'tanah-studio': {
    name: 'Tanah Studio',
    location: 'Petaling Jaya, Selangor',
    bio: 'Wheel-thrown and hand-built ceramics inspired by Malaysian earth tones.',
    categories: ['Ceramics', 'Housewarming', 'Corporate'],
    rating: 4.8,
    order_count: 412,
    lead_time_weeks: 4,
    verified: true,
    story: "Tanah Studio was born from a love of clay and Malaysian landscapes. Every piece is wheel-thrown or hand-built in our Petaling Jaya studio, inspired by the earth tones of the Malaysian highlands. We use locally sourced clay and natural glazes.",
    products: [
      { id: '1', emoji: '🏺', name: 'Speckled ceramic vase (small)', price: 'RM 85', minQty: undefined },
      { id: '2', emoji: '🏺', name: 'Ceramic mug set (2-pc)', price: 'RM 120 / set', minQty: undefined },
      { id: '3', emoji: '🍽️', name: 'Dinner plate (hand-built)', price: 'RM 95', minQty: undefined },
      { id: '4', emoji: '🏺', name: 'Corporate gift ceramics (custom)', price: 'From RM 65/pc', minQty: 'Min. 20 pcs' },
    ],
    reviews: [
      { author: 'Rashid Hamdan', role: 'Corporate buyer', text: "Ordered 50 custom mugs with our logo for corporate gifts. The quality was exceptional and they worked with us on the exact glaze colour.", rating: 5 },
      { author: 'Mei Ling', role: 'Regular buyer', text: "My vase from Tanah Studio is the most beautiful thing in my home. The speckled glaze is so tactile and unique.", rating: 5 },
    ],
  },
  'anyam-co': {
    name: 'Anyam Co',
    location: 'George Town, Penang',
    bio: 'Traditional Malay weaving reimagined for modern gifting.',
    categories: ['Hampers', 'Raya', 'Corporate'],
    rating: 4.9,
    order_count: 623,
    lead_time_weeks: 2,
    verified: true,
    story: "Anyam Co was founded to preserve the traditional Malay art of anyaman (weaving) while making it relevant for today. Our weavers are trained artisans from Kelantan and Terengganu. Every basket is handwoven using sustainable rattan.",
    products: [
      { id: '1', emoji: '🧺', name: 'Raya rattan hamper (medium)', price: 'RM 38 / set', minQty: 'Min. 20 sets' },
      { id: '2', emoji: '🧺', name: 'Corporate hamper basket (large)', price: 'RM 85 / basket', minQty: 'Min. 10 baskets' },
      { id: '3', emoji: '🎀', name: 'Wedding door gift basket', price: 'RM 15 / pc', minQty: 'Min. 50 pcs' },
    ],
    reviews: [
      { author: 'Farhana Aziz', role: 'Event planner', text: "Used Anyam Co for 300 Raya corporate hampers. The baskets are stunning and their team handled the entire order flawlessly.", rating: 5 },
    ],
  },
  'logam-works': {
    name: 'Logam Works',
    location: 'Johor Bahru, Johor',
    bio: 'Contemporary Malaysian jewellery in silver and brass.',
    categories: ['Jewellery', 'Wedding', 'Graduation'],
    rating: 4.7,
    order_count: 289,
    lead_time_weeks: 3,
    verified: true,
    story: "Logam Works creates contemporary Malaysian jewellery in sterling silver and brass. Our designs draw inspiration from traditional Malay, Chinese, and Indian metalwork traditions.",
    products: [
      { id: '1', emoji: '💍', name: 'Silver wire stacking ring', price: 'RM 68', minQty: undefined },
      { id: '2', emoji: '📿', name: 'Brass batik pendant necklace', price: 'RM 88', minQty: undefined },
      { id: '3', emoji: '💍', name: 'Custom engraved ring (pair)', price: 'RM 180 / pair', minQty: undefined },
    ],
    reviews: [
      { author: 'Liyana Rosli', role: 'Bride', text: "Ordered custom wedding bands from Logam Works. The engraving was perfect and the silver quality is beautiful.", rating: 5 },
    ],
  },
  'bunga-raya-soap': {
    name: 'Bunga Raya Soap',
    location: 'Shah Alam, Selangor',
    bio: 'Handmade botanical soaps using local herbs and flowers.',
    categories: ['Baby shower', 'Hampers', 'Wedding'],
    rating: 4.8,
    order_count: 531,
    lead_time_weeks: 2,
    verified: true,
    story: "Bunga Raya Soap was started by a pharmacist who wanted to create truly natural skincare. Every bar is cold-pressed with locally sourced herbs, flowers, and botanicals.",
    products: [
      { id: '1', emoji: '🧼', name: 'Botanical soap bar (100g)', price: 'RM 18 / bar', minQty: 'Min. 30 bars' },
      { id: '2', emoji: '🎁', name: 'Baby shower soap favour set', price: 'RM 12 / set', minQty: 'Min. 20 sets' },
      { id: '3', emoji: '🛁', name: 'Luxury soap gift box (5-pc)', price: 'RM 75 / box', minQty: undefined },
    ],
    reviews: [
      { author: 'Nadia Rahman', role: 'New mum', text: "Ordered 100 soap favour sets for my baby shower. Every guest loved them and they smelled absolutely wonderful.", rating: 5 },
    ],
  },
  'batik-baru': {
    name: 'Batik Baru',
    location: 'Kota Bharu, Kelantan',
    bio: 'Hand-drawn and hand-stamped batik with traditional Kelantanese motifs.',
    categories: ['Batik', 'Wedding', 'Corporate'],
    rating: 4.9,
    order_count: 374,
    lead_time_weeks: 5,
    verified: true,
    story: "Batik Baru was founded to bring traditional Kelantanese batik to a new generation. We work with master batik artisans who have practiced the craft for decades, combining their expertise with fresh contemporary designs.",
    products: [
      { id: '1', emoji: '👘', name: 'Batik silk scarf (hand-drawn)', price: 'RM 180', minQty: undefined },
      { id: '2', emoji: '👚', name: 'Batik cotton tote bag', price: 'RM 45', minQty: 'Min. 20 pcs' },
      { id: '3', emoji: '🎁', name: 'Corporate batik gift set', price: 'From RM 95 / set', minQty: 'Min. 10 sets' },
    ],
    reviews: [
      { author: 'Dato Ahmad', role: 'Corporate buyer', text: "Ordered 200 batik tote bags for our conference. The quality and design were exceptional — our guests were very impressed.", rating: 5 },
    ],
  },
}

export default function MakerProfilePage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const maker = slug ? MAKERS[slug] : null

  if (!maker) {
    return (
      <div className="section" style={{ textAlign: 'center', padding: '120px 24px' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
        <h2>Maker not found</h2>
        <p style={{ marginTop: '8px', color: 'var(--ink-muted)' }}>This maker profile doesn't exist yet.</p>
        <Link to="/browse" className="btn-primary btn-large" style={{ display: 'inline-block', marginTop: '24px' }}>Browse all makers</Link>
      </div>
    )
  }

  const initials = maker.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="maker-profile-page">
      <div className="profile-hero">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <div className="profile-hero-inner">
          <div className="profile-avatar-lg">{initials}</div>
          <div>
            <div className="profile-name">{maker.name}</div>
            <div className="profile-loc">📍 {maker.location}</div>
            {maker.verified && <div className="profile-verified">✓ Verified handmade</div>}
            <div className="profile-cats">
              {maker.categories.map(c => <span key={c} className="mbc-tag">{c}</span>)}
            </div>
          </div>
          <div className="profile-metrics">
            <div className="profile-metric"><div className="n">{maker.rating}★</div><div className="l">rating</div></div>
            <div className="profile-metric"><div className="n">{maker.order_count}+</div><div className="l">orders</div></div>
            <div className="profile-metric"><div className="n">{maker.lead_time_weeks}wk</div><div className="l">lead time</div></div>
          </div>
        </div>
      </div>

      <div className="profile-body">
        <div className="profile-main">
          <section className="profile-section">
            <h2>Our story</h2>
            <p>{maker.story}</p>
          </section>

          <section className="profile-section">
            <h2>Products</h2>
            <div className="profile-products">
              {maker.products.map(p => (
                <div key={p.id} className="profile-product-card">
                  <div className="pp-emoji">{p.emoji}</div>
                  <div className="pp-info">
                    <div className="pp-name">{p.name}</div>
                    <div className="pp-price">{p.price}</div>
                    {p.minQty && <div className="pp-min">{p.minQty}</div>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="profile-section">
            <h2>Reviews ({maker.reviews.length})</h2>
            <div className="profile-reviews">
              {maker.reviews.map((r, i) => (
                <div key={i} className="profile-review">
                  <div className="pr-top">
                    <div className="pr-stars">{'★'.repeat(r.rating)}</div>
                    <div className="pr-author">{r.author} · <span>{r.role}</span></div>
                  </div>
                  <p className="pr-text">"{r.text}"</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="profile-sidebar">
          <div className="profile-cta-card">
            <h3>Get a custom quote</h3>
            <p>Send {maker.name} a brief for your event or project.</p>
            <Link
              to={`/brief?maker=${slug}`}
              className="btn-primary btn-large"
              style={{ display: 'block', textAlign: 'center', marginTop: '16px' }}
            >
              Send a brief →
            </Link>
            <div className="profile-cta-meta">
              <span>🕐 Typically responds within 24h</span>
              <span>🔒 Buyer protection on all orders</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
