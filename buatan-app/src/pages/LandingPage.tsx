import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }) },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchRef.current?.value.trim()
    if (q) navigate(`/browse?q=${encodeURIComponent(q)}`)
    else navigate('/browse')
  }

  const handleTagSearch = (tag: string) => {
    navigate(`/browse?q=${encodeURIComponent(tag)}`)
  }

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-tag">Malaysia's handmade marketplace</div>
          <h1 className="hero-headline">
            Find the perfect<br />
            <em>handmade gift,</em><br />
            made locally
          </h1>
          <p className="hero-sub">
            Discover hundreds of Malaysian makers selling candles, pottery, batik, jewellery,
            and more — all verified handmade. Perfect for weddings, Raya, baby showers,
            and corporate gifting.
          </p>

          <form className="hero-search" onSubmit={handleSearch}>
            <input ref={searchRef} type="text" placeholder="Wedding door gifts, Raya hampers, custom candles..." />
            <button type="submit" className="search-btn">Search</button>
          </form>

          <div className="search-tags">
            {['Candles', 'Hampers', 'Jewellery', 'Ceramics', 'Door gifts'].map(tag => (
              <button key={tag} className="search-tag" onClick={() => handleTagSearch(tag)}>
                {tag === 'Candles' ? '🕯️' : tag === 'Hampers' ? '🧺' : tag === 'Jewellery' ? '💍' : tag === 'Ceramics' ? '🪴' : '🎀'} {tag}
              </button>
            ))}
          </div>

          <div className="hero-stats">
            <div className="hero-stat"><div className="n">380+</div><div className="l">Verified makers</div></div>
            <div className="hero-stat"><div className="n">12,000+</div><div className="l">Handmade products</div></div>
            <div className="hero-stat"><div className="n">4.9★</div><div className="l">Avg. rating</div></div>
          </div>
        </div>

        <div className="hero-right">
          <div className="mosaic">
            {[
              { emoji: '🕯️', name: 'Batik wax candle set', maker: 'Lilin Studio · KL', price: 'RM 12 / pc · min 30' },
              { emoji: '🪴', name: 'Speckled ceramic vase', maker: 'Tanah Studio · PJ', price: 'RM 85' },
              { emoji: '🧺', name: 'Raya rattan hamper', maker: 'Anyam Co · Penang', price: 'RM 38 / set' },
              { emoji: '💍', name: 'Silver wire ring', maker: 'Logam Works · JB', price: 'RM 68' },
            ].map((item, i) => (
              <div key={i} className="mosaic-card">
                <div className="mosaic-img">{item.emoji}</div>
                <div className="mosaic-info">
                  <div className="mosaic-badge">✓ Handmade</div>
                  <div className="mname">{item.name}</div>
                  <div className="mmake">{item.maker}</div>
                  <div className="mprice">{item.price}</div>
                </div>
              </div>
            ))}
            <div className="mosaic-card">
              <div className="mosaic-img">🎀</div>
              <div className="mosaic-info">
                <div className="mname">Wedding door gift sets · from RM 8/pc</div>
                <div className="mmake">Browse 120+ options for your big day</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="trust-item"><strong>✓ Verified handmade</strong> — no resellers</div>
        <div className="trust-item"><strong>FPX &amp; DuitNow</strong> accepted</div>
        <div className="trust-item"><strong>J&amp;T, Pos Laju, Ninja Van</strong> integrated</div>
        <div className="trust-item"><strong>Buyer protection</strong> on all orders</div>
        <div className="trust-item"><strong>Custom orders</strong> handled in-app</div>
      </div>

      {/* OCCASION STRIP */}
      <div className="occasion-strip">
        <div className="occasion-label">Shop by occasion</div>
        <div className="occasion-items">
          {[
            { label: '💍 Wedding door gifts', slug: 'wedding' },
            { label: '🌙 Raya hampers', slug: 'raya' },
            { label: '👶 Baby shower', slug: 'baby-shower' },
            { label: '🎓 Graduation', slug: 'graduation' },
            { label: '🏢 Corporate gifting', slug: 'corporate' },
            { label: '🎂 Birthday', slug: 'birthday' },
            { label: '🏠 Housewarming', slug: 'housewarming' },
            { label: '💼 Farewell gifts', slug: 'farewell' },
          ].map(({ label, slug }) => (
            <Link key={slug} to={`/browse?occasion=${slug}`} className="occasion-chip">{label}</Link>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <div className="section-tag">How it works</div>
        <h2 className="section-title">From browse to delivered — <em>simple.</em></h2>
        <p className="section-sub">No more scrolling through Instagram hoping to find the right maker. Buatan puts every Malaysian handmade seller in one place.</p>
        <div className="steps">
          {[
            { num: '01', icon: '🔍', title: 'Search by occasion', body: 'Filter by wedding door gifts, Raya hampers, baby shower, and more — or search by product type, location, or price.' },
            { num: '02', icon: '🏪', title: 'Browse maker profiles', body: "See the maker's story, their process photos, reviews, and response time. Every maker is verified — no resellers." },
            { num: '03', icon: '✏️', title: 'Order or customise', body: 'Buy ready-made, or send a custom brief directly in the app. Agree on quantity, budget, and timeline — no WhatsApp chaos.' },
            { num: '04', icon: '📦', title: 'Track & receive', body: 'Follow your order from production to doorstep. Payment is protected — final amount released only when you confirm delivery.' },
          ].map((step, i) => (
            <div key={i} className={`step reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}>
              <div className="step-num">{step.num}</div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OCCASIONS */}
      <section className="section section-alt" id="occasions">
        <div className="section-tag">Popular occasions</div>
        <h2 className="section-title">Every occasion, <em>covered.</em></h2>
        <p className="section-sub">Buatan makers specialise in all the gifting moments that matter most in Malaysian life.</p>
        <div className="occasions-grid">
          {[
            { icon: '💍', title: 'Wedding door gifts', body: 'Personalised candles, batik sachets, mini ceramics, soap sets — all customisable with your names and date.', count: '120+ makers → from RM 6/pc', slug: 'wedding' },
            { icon: '🌙', title: 'Raya hampers', body: 'Handwoven baskets, kuih tins, artisan dates, scented goods — local and meaningful for family and clients.', count: '85+ makers → from RM 28/set', slug: 'raya' },
            { icon: '👶', title: 'Baby shower favours', body: "Pastel soap bars, name tags, soft plush, and more — sweet, handmade, and nothing like what you'd find at a mall.", count: '64+ makers → from RM 8/pc', slug: 'baby-shower' },
            { icon: '🏢', title: 'Corporate gifting', body: 'Branded hampers, co-branded packaging, large bulk orders — support local while impressing your clients.', count: '40+ makers · bulk pricing available', slug: 'corporate' },
            { icon: '🎓', title: 'Graduation gifts', body: 'Meaningful, lasting gifts that go beyond a generic card. Personalised and made by hand, just for them.', count: '50+ makers → from RM 25', slug: 'graduation' },
            { icon: '🏠', title: 'Housewarming', body: 'Handthrown pottery, woven textiles, artisan candles — beautiful gifts that make a house feel like home.', count: '72+ makers → from RM 35', slug: 'housewarming' },
          ].map((oc, i) => (
            <Link key={oc.slug} to={`/browse?occasion=${oc.slug}`} className={`occasion-card reveal${i % 3 !== 0 ? ` reveal-delay-${i % 3}` : ''}`}>
              <div className="oc-icon">{oc.icon}</div>
              <h3>{oc.title}</h3>
              <p>{oc.body}</p>
              <div className="oc-count">{oc.count}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOR MAKERS */}
      <section className="split" id="makers">
        <div className="split-visual">
          <div className="maker-card">
            <div className="maker-card-head">
              <div className="maker-avatar">LS</div>
              <div>
                <div className="maker-card-name">Lilin Studio</div>
                <div className="maker-card-loc">Cheras, Kuala Lumpur</div>
                <div className="maker-verified">Verified handmade</div>
              </div>
            </div>
            <div className="maker-metrics">
              <div className="maker-metric"><div className="n">847</div><div className="l">orders</div></div>
              <div className="maker-metric"><div className="n">4.9★</div><div className="l">rating</div></div>
              <div className="maker-metric"><div className="n">3 wk</div><div className="l">lead time</div></div>
            </div>
            <div className="maker-earnings">
              <div>
                <div className="earnings-label">This month's earnings</div>
                <div className="earnings-value">RM 4,320</div>
              </div>
              <div className="earnings-delta">↑ 18% vs last month</div>
            </div>
            <div className="maker-orders">
              <div className="maker-order-row">
                <div className="mor-name">#1042 · 150× batik candles</div>
                <div className="mor-status prod">In production</div>
              </div>
              <div className="maker-order-row">
                <div className="mor-name">#1039 · Custom Raya set</div>
                <div className="mor-status ready">Ready to ship</div>
              </div>
            </div>
          </div>
        </div>

        <div className="split-content section">
          <div className="section-tag">For makers</div>
          <h2 className="section-title">Your craft deserves more than an Instagram post.</h2>
          <p className="section-sub">Buatan gives Malaysian makers a proper home — with tools to manage orders, grow your reach, and get paid reliably.</p>
          <div className="features-list">
            {[
              { title: 'A shop that works while you make', body: 'Your Buatan profile is Google-indexed and searchable. New customers find you without you posting every day.' },
              { title: 'Custom order management, built in', body: 'Accept briefs, agree on specs, set your lead time — all in one place. No more juggling WhatsApp threads.' },
              { title: 'Analytics that actually help', body: 'See which occasions drive your sales, your busiest months, and what to make more of — so you plan smarter.' },
              { title: 'Integrated shipping at lower rates', body: 'Print J&T, Pos Laju, and Ninja Van labels directly from your dashboard. Volume rates — no more per-parcel counters.' },
            ].map((f, i) => (
              <div key={i} className={`feature-item reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}>
                <div className="feature-dot"></div>
                <div><h4>{f.title}</h4><p>{f.body}</p></div>
              </div>
            ))}
          </div>
          <Link to="/signup" className="btn-primary btn-large btn-inline">Start selling on Buatan →</Link>
        </div>
      </section>

      {/* CUSTOM REQUEST CTA */}
      <div className="custom-cta-section" id="request">
        <div>
          <div className="section-tag section-tag-light">Custom order board</div>
          <h2 className="section-title section-title-light">Can't find exactly what you want?<br /><em>Post a brief.</em></h2>
          <p className="section-sub section-sub-light">Describe what you need — quantity, occasion, budget, and any customisation — and let makers pitch to you. No commitment until you say yes.</p>
          <div className="cta-trust-row">
            <div className="cta-trust-item"><strong>Free to post</strong> a brief</div>
            <div className="cta-trust-item"><strong>Multiple makers</strong> will respond</div>
            <div className="cta-trust-item"><strong>You choose</strong> who to work with</div>
          </div>
        </div>

        <div className="request-form-preview">
          <div className="rform-title">Post your custom brief</div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
            Fill in the full form to connect with makers →{' '}
            <Link to="/brief" style={{ color: 'var(--terra-light)' }}>Post a brief</Link>
          </p>
          <div className="rform-field">
            <label className="rform-label">Occasion</label>
            <input className="rform-input" type="text" placeholder="e.g. Wedding door gift" readOnly onClick={() => navigate('/brief')} />
          </div>
          <div className="rform-field rform-row2">
            <div>
              <label className="rform-label">Quantity</label>
              <input className="rform-input" type="text" placeholder="e.g. 150 pcs" readOnly onClick={() => navigate('/brief')} />
            </div>
            <div>
              <label className="rform-label">Budget / pc</label>
              <input className="rform-input" type="text" placeholder="e.g. RM 8–12" readOnly onClick={() => navigate('/brief')} />
            </div>
          </div>
          <Link to="/brief" className="rform-btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', marginTop: '8px' }}>
            Post brief to makers →
          </Link>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="section-tag">What people say</div>
        <h2 className="section-title">Real buyers, real <em>makers.</em></h2>
        <p className="section-sub testimonial-sub">From the first purchase to the hundredth custom order.</p>
        <div className="testimonials">
          {[
            { text: 'I needed 200 personalised candles for my wedding in 6 weeks. Found Lilin Studio on Buatan, sent a brief, and they delivered perfectly — on time and exactly as described.', name: 'Siti Nora', role: 'Bride · Kuala Lumpur', initials: 'SN', color: 'terra' },
            { text: "Before Buatan, I was getting all my orders through DM and it was a mess. Now I have a proper dashboard, I can track everything, and I'm reaching customers who would never have found me on Instagram.", name: 'Farhana Aziz', role: 'Maker · Anyam Co · Penang', initials: 'FA', color: 'sage' },
            { text: "Our company needed 300 Raya hampers with co-branded packaging on a tight timeline. The corporate gifting request feature connected us with three great makers in 24 hours.", name: 'Rashid Hamdan', role: 'Marketing Manager · Selangor', initials: 'RH', color: 'gold' },
          ].map((t, i) => (
            <div key={i} className={`testi-card reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}>
              <div className="testi-quote">"</div>
              <p className="testi-text">{t.text}</p>
              <div className="testi-author">
                <div className={`testi-avatar testi-avatar-${t.color}`}>{t.initials}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
