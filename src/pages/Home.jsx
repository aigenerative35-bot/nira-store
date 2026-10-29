import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../ui'
import ProductCard from '../components/ProductCard'
import Ticker from '../components/Ticker'
import { BannerSlider, StripSlider, WideSlider } from '../components/Banners'
import { useShop } from '../store'
import { asset, categories, products } from '../data'

const BANNERS = [
  {
    img: asset('img/hero-portrait.jpg'),
    kicker: 'Autumn sourcing 2026',
    title: 'Clinical skincare, factory-direct',
    text: 'Six SKUs, MOQ from 2 pieces, private-label available from 500 units.',
    to: '/shop?cat=skincare'
  },
  {
    img: asset('img/saree-jewel.jpg'),
    kicker: 'Handloom co-operative',
    title: 'Bhagalpur silk, 120 pieces per style',
    text: 'Direct from two weaver co-ops. Sample yardage on request.',
    to: '/shop?cat=suits'
  },
  {
    img: asset('img/bag-brown.jpg'),
    kicker: 'Atelier line',
    title: 'Vegan leather bags, 2-year warranty',
    text: 'Full-grain finish, hand-edged, custom hardware from 100 units.',
    to: '/shop?cat=bags'
  }
]

const PROMOS = [
  { img: asset('img/jar-silk.jpg'), b: 'Body care', s: 'From ₹649 · MOQ 3' },
  { img: asset('img/heels-pink.jpg'), b: 'Heels', s: 'Sample pair available' }
]

const CAMPAIGN = [
  { title: 'La Nuit', img: asset('img/hero-portrait.jpg'), badge: 'N' },
  { title: 'Good Girl', img: asset('img/hero-bag.jpg'), badge: 'N' },
  { title: '212 Atelier', img: asset('img/bag-blue.jpg'), badge: 'N' },
  { title: 'Makeup Edit', img: asset('img/lips.jpg'), badge: 'N' },
  { title: 'Advent', img: asset('img/jar-flowers.jpg'), badge: 'N' }
]

const STRIPS = [
  { img: asset('img/serum.jpg'), kicker: 'Skincare', title: '3-step ritual kit', text: 'MOQ 2 · from ₹1,899', to: '/shop?cat=skincare' },
  { img: asset('img/saree-jewel.jpg'), kicker: 'Handloom', title: 'Silk saree, 120 pcs', text: 'Direct from Bhagalpur', to: '/shop?cat=suits' },
  { img: asset('img/bag-brown.jpg'), kicker: 'Atelier', title: 'Structured tote', text: 'Custom hardware 100+', to: '/shop?cat=bags' },
  { img: asset('img/heels-pink.jpg'), kicker: 'Heels', title: 'Block heel, 3 inch', text: 'Sample pair available', to: '/shop?cat=heels' },
  { img: asset('img/lip-apply.jpg'), kicker: 'Makeup', title: 'Matte lipstick', text: '12 shades · MOQ 6', to: '/shop?cat=makeup' },
  { img: asset('img/jar-flowers.jpg'), kicker: 'Body', title: 'Ceramide night cream', text: 'Private label from 500', to: '/shop?cat=body' }
]

const WIDES = [
  { img: asset('img/hero-portrait.jpg'), kicker: 'Private label', title: 'Your brand, our lab. From 500 units.', text: 'Formula, filling, packaging and testing — handled end to end.', to: '/contact' },
  { img: asset('img/hero-bag.jpg'), kicker: 'Wholesale', title: 'Bags at wholesale, samples first.', text: 'Order a sample pair before you commit to a run.', to: '/shop?cat=bags' },
  { img: asset('img/saree-street.jpg'), kicker: 'Co-operative', title: '41 weavers, two co-ops, one price list.', text: 'No middlemen. Every order paid within 7 days.', to: '/about' },
  { img: asset('img/brushes.jpg'), kicker: 'Tools', title: 'Brush sets with custom monogram.', text: 'MOQ 50 · 12-day lead time.', to: '/shop?cat=makeup' }
]

const SUPPLIERS = [
  { name: 'Nira Labs', cat: 'Skincare & body', years: 9, img: asset('img/serum.jpg') },
  { name: 'Nira Atelier', cat: 'Makeup & tools', years: 6, img: asset('img/lip-apply.jpg') },
  { name: 'Bhagalpur Handloom Co-op', cat: 'Handloom & suits', years: 12, img: asset('img/saree-jewel.jpg') },
  { name: 'Nira Leather Works', cat: 'Bags & heels', years: 7, img: asset('img/bag-brown.jpg') }
]

export default function Home() {
  const { toast } = useShop()
  const [email, setEmail] = useState('')

  const top = products.slice(0, 6)
  const rest = products.slice(6)

  return (
    <>
      {/* hero row: sidebar + carousel + promos */}
      <div className="container sec sec--tight">
        <div className="hero-row">
          <aside className="sidebar">
            <div className="sidebar__head">Source by category</div>
            {categories.map((c) => (
              <Link to={`/shop?cat=${c.id}`} key={c.id}>
                {c.name}<i>{c.note}</i>
              </Link>
            ))}
            <Link to="/shop?sort=low">Under ₹1,000<i>Best value</i></Link>
            <Link to="/shop?sort=rating">Top rated<i>4.7+</i></Link>
            <Link to="/shop">All products<i>16</i></Link>
          </aside>

          <BannerSlider items={BANNERS} />

          <div className="hero-side">
            {PROMOS.map((p) => (
              <Link className="hpromo" to="/shop" key={p.b}>
                <img src={p.img} alt="" />
                <div className="hpromo__in"><b>{p.b}</b><span>{p.s}</span></div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* coupons */}
      <div className="container sec sec--tight">
        <div className="slab" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <span className="label" style={{ color: 'var(--orange)' }}>Trade offers</span>
          <div className="coupons" style={{ flex: 1 }}>
            <div className="coupon"><b>₹200</b><span>off first order<em>Min. ₹1,999</em></span><button onClick={() => toast('Coupon collected')}>Collect</button></div>
            <div className="coupon"><b>10%</b><span>on 5+ pieces<em>Code NIRA10</em></span><button onClick={() => toast('Code NIRA10 copied')}>Collect</button></div>
            <div className="coupon"><b>Free</b><span>sample kit<em>On first enquiry</em></span><button onClick={() => toast('Sample kit added')}>Collect</button></div>
            <div className="coupon"><b>₹500</b><span>on ₹4,999+<em>Bags &amp; sarees</em></span><button onClick={() => toast('Coupon collected')}>Collect</button></div>
          </div>
        </div>
      </div>

      {/* banner strip slider */}
      <div className="container sec sec--tight">
        <StripSlider items={STRIPS} />
      </div>

      {/* top ranking */}
      <div className="container sec">
        <div className="slab">
          <div className="sec-head">
            <div>
              <h2>Top ranking products</h2>
              <p>Ranked by reorder rate and buyer ratings in the last 90 days</p>
            </div>
            <Link className="link-arrow" to="/shop">View all 16 <Icon.arrow /></Link>
          </div>
          <div className="pgrid">
            {top.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </div>

      {/* verified suppliers */}
      <div className="container sec">
        <div className="slab">
          <div className="sec-head">
            <div>
              <h2>Verified suppliers</h2>
              <p>Audited facilities, trade assurance, sample support</p>
            </div>
            <Link className="link-arrow" to="/about">How we audit <Icon.arrow /></Link>
          </div>
          <div className="pgrid">
            {SUPPLIERS.map((s, i) => (
              <Link className="pcard rise" to="/shop" key={s.name} style={{ '--d': `${i * 0.04}s` }}>
                <div className="pcard__media" style={{ aspectRatio: '4 / 3' }}>
                  <img src={s.img} alt={s.name} loading="lazy" />
                  <span className="tag">Verified</span>
                </div>
                <div className="pcard__info">
                  <div className="pcard__name" style={{ fontWeight: 600 }}>{s.name}</div>
                  <div className="pcard__moq">{s.cat}</div>
                  <div className="pcard__sup"><Icon.check style={{ width: 12, height: 12, stroke: 'var(--green)' }} /> {s.years} years on Nira</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ticker */}
      <div className="container sec">
        <Ticker items={CAMPAIGN} label="Campaign" to="/shop" cta="Shop the campaign" />
      </div>

      {/* wide banner slider */}
      <div className="container sec">
        <WideSlider items={WIDES} />
      </div>

      {/* recommended */}
      <div className="container sec">
        <div className="slab">
          <div className="sec-head">
            <div>
              <h2>Recommended for you</h2>
              <p>Based on categories you browse most</p>
            </div>
            <Link className="link-arrow" to="/shop">View all <Icon.arrow /></Link>
          </div>
          <div className="pgrid">
            {rest.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </div>

      {/* trade assurance */}
      <div className="container sec">
        <div className="trust">
          <div className="trust__i"><Icon.truck /><div><b>Trade assurance</b><span>Payment protected until delivery</span></div></div>
          <div className="trust__i"><Icon.check /><div><b>Sample first</b><span>Samples before bulk</span></div></div>
          <div className="trust__i"><Icon.heart /><div><b>Private label</b><span>From 500 units</span></div></div>
          <div className="trust__i"><Icon.sound /><div><b>Dedicated manager</b><span>One person, one account</span></div></div>
        </div>
      </div>

      {/* newsletter */}
      <div className="container sec">
        <div className="news">
          <h2>New arrivals, once a week</h2>
          <p>MOQ drops, restocks and factory updates. No more than one email a week.</p>
          <form
            className="nform"
            onSubmit={(e) => {
              e.preventDefault()
              if (!/^\S+@\S+\.\S+$/.test(email)) return toast('Enter a valid email')
              toast("You're in — check your inbox")
              setEmail('')
            }}
          >
            <input type="email" placeholder="Business email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </>
  )
}
