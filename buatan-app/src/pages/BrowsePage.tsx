import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'

interface Maker {
  id: string
  name: string
  location: string
  categories: string[]
  rating: number
  order_count: number
  lead_time_weeks: number
  bio: string
  verified: boolean
  slug: string
}

const MOCK_MAKERS: Maker[] = [
  { id: '1', name: 'Lilin Studio', location: 'Cheras, KL', categories: ['Candles', 'Door gifts', 'Wedding'], rating: 4.9, order_count: 847, lead_time_weeks: 3, bio: 'Handcrafted batik-inspired candles made with natural soy wax.', verified: true, slug: 'lilin-studio' },
  { id: '2', name: 'Tanah Studio', location: 'Petaling Jaya', categories: ['Ceramics', 'Housewarming', 'Corporate'], rating: 4.8, order_count: 412, lead_time_weeks: 4, bio: 'Wheel-thrown and hand-built ceramics inspired by Malaysian earth tones.', verified: true, slug: 'tanah-studio' },
  { id: '3', name: 'Anyam Co', location: 'Penang', categories: ['Hampers', 'Raya', 'Corporate'], rating: 4.9, order_count: 623, lead_time_weeks: 2, bio: 'Traditional Malay weaving reimagined for modern gifting.', verified: true, slug: 'anyam-co' },
  { id: '4', name: 'Logam Works', location: 'Johor Bahru', categories: ['Jewellery', 'Wedding', 'Graduation'], rating: 4.7, order_count: 289, lead_time_weeks: 3, bio: 'Contemporary Malaysian jewellery in silver and brass.', verified: true, slug: 'logam-works' },
  { id: '5', name: 'Bunga Raya Soap', location: 'Shah Alam', categories: ['Baby shower', 'Hampers', 'Wedding'], rating: 4.8, order_count: 531, lead_time_weeks: 2, bio: 'Handmade botanical soaps using local herbs and flowers.', verified: true, slug: 'bunga-raya-soap' },
  { id: '6', name: 'Batik Baru', location: 'Kota Bharu, Kelantan', categories: ['Batik', 'Wedding', 'Corporate'], rating: 4.9, order_count: 374, lead_time_weeks: 5, bio: 'Hand-drawn and hand-stamped batik with traditional Kelantanese motifs.', verified: true, slug: 'batik-baru' },
]

const OCCASIONS = ['All', 'Wedding', 'Raya', 'Baby shower', 'Corporate', 'Graduation', 'Housewarming', 'Birthday', 'Farewell']
const CATEGORIES = ['All', 'Candles', 'Ceramics', 'Hampers', 'Jewellery', 'Batik', 'Soap', 'Door gifts']

function MakerCard({ maker }: { maker: Maker }) {
  const initials = maker.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <Link to={`/makers/${maker.slug}`} className="maker-browse-card">
      <div className="mbc-head">
        <div className="mbc-avatar">{initials}</div>
        <div>
          <div className="mbc-name">{maker.name}</div>
          <div className="mbc-loc">📍 {maker.location}</div>
          {maker.verified && <div className="mbc-verified">✓ Verified handmade</div>}
        </div>
      </div>
      <p className="mbc-bio">{maker.bio}</p>
      <div className="mbc-tags">
        {maker.categories.slice(0, 3).map(c => <span key={c} className="mbc-tag">{c}</span>)}
      </div>
      <div className="mbc-stats">
        <span>⭐ {maker.rating}</span>
        <span>{maker.order_count}+ orders</span>
        <span>~{maker.lead_time_weeks}wk lead</span>
      </div>
    </Link>
  )
}

export default function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [makers, setMakers] = useState<Maker[]>(MOCK_MAKERS)
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [occasion, setOccasion] = useState(searchParams.get('occasion') || 'All')
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const q = searchParams.get('q') || ''
    const occ = searchParams.get('occasion') || 'All'
    setQuery(q)
    setOccasion(occ.charAt(0).toUpperCase() + occ.slice(1).replace('-', ' '))
  }, [searchParams])

  useEffect(() => {
    setLoading(true)
    // Filter mock data; real app would query Supabase
    let filtered = MOCK_MAKERS
    if (query) {
      const q = query.toLowerCase()
      filtered = filtered.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.bio.toLowerCase().includes(q) ||
        m.categories.some(c => c.toLowerCase().includes(q)) ||
        m.location.toLowerCase().includes(q)
      )
    }
    if (occasion && occasion !== 'All') {
      filtered = filtered.filter(m =>
        m.categories.some(c => c.toLowerCase().includes(occasion.toLowerCase()))
      )
    }
    if (category !== 'All') {
      filtered = filtered.filter(m => m.categories.includes(category))
    }
    setMakers(filtered)
    setLoading(false)
  }, [query, occasion, category])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchParams(query ? { q: query } : {})
  }

  return (
    <div className="browse-page">
      <div className="browse-header">
        <h1 className="browse-title">Browse <em>Malaysian makers</em></h1>
        <p className="browse-sub">Every seller is verified handmade — no resellers, no drop-shippers.</p>

        <form className="browse-search" onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search makers, products, occasions..."
          />
          <button type="submit" className="search-btn">Search</button>
        </form>
      </div>

      <div className="browse-layout">
        <aside className="browse-filters">
          <div className="filter-group">
            <div className="filter-label">Occasion</div>
            {OCCASIONS.map(occ => (
              <button
                key={occ}
                className={`filter-option${occasion === occ ? ' active' : ''}`}
                onClick={() => setOccasion(occ)}
              >
                {occ}
              </button>
            ))}
          </div>
          <div className="filter-group">
            <div className="filter-label">Category</div>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`filter-option${category === cat ? ' active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        <main className="browse-results">
          <div className="browse-count">
            {loading ? 'Loading...' : `${makers.length} maker${makers.length !== 1 ? 's' : ''} found`}
          </div>
          {makers.length === 0 ? (
            <div className="browse-empty">
              <div style={{ fontSize: '48px' }}>🔍</div>
              <p>No makers found for "{query}". Try a different search or remove filters.</p>
            </div>
          ) : (
            <div className="makers-grid">
              {makers.map(maker => <MakerCard key={maker.id} maker={maker} />)}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
