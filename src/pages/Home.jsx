import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Stars } from '../ui'
import ProductCard from '../components/ProductCard'
import Ticker from '../components/Ticker'
import { BannerSlider, StripSlider, WideSlider } from '../components/Banners'
import Cinema from '../components/Cinema'
import RunwaySlider from '../components/RunwaySlider'
import CubeSlider from '../components/CubeSlider'
import Depth from '../components/Depth'
import TiltCard from '../components/TiltCard'
import { useShop } from '../store'
import { asset, categories, products } from '../data'

const BANNERS = [
  {
    img: asset('img/hero-bag.jpg'),
    kicker: 'Autumn 2026 — the edit',
    title: 'Skin that looks like you slept.',
    text: 'Six formulas, dermat-tested for Indian humidity. The three-step ritual, from ₹1,899.',
    to: '/shop?cat=skincare'
  },
  {
    img: asset('img/saree-jewel.jpg'),
    kicker: 'The handloom edit',
    title: 'Woven in Bhagalpur, made to last.',
    text: 'Small batch sarees and co-ords — 120 pieces per style, then gone.',
    to: '/shop?cat=suits'
  },
  {
    img: asset('img/bag-brown.jpg'),
    kicker: 'The atelier',
    title: 'Bags that survive the monsoon.',
    text: 'Full-grain vegan leather, hand-edged, two-year stitch warranty.',
    to: '/shop?cat=bags'
  }
]

const PROMOS = [
  { img: asset('img/jar-silk.jpg'), b: 'Body care', s: 'Shea & kokum, from ₹649' },
  { img: asset('img/heels-pink.jpg'), b: 'Heels', s: 'Cushioned, free size swap' }
]

const CAMPAIGN = [
  { title: 'La Nuit', img: asset('img/hero-portrait.jpg'), badge: 'N' },
  { title: 'Good Girl', img: asset('img/hero-bag.jpg'), badge: 'N' },
  { title: '212 Atelier', img: asset('img/bag-blue.jpg'), badge: 'N' },
  { title: 'Makeup Edit', img: asset('img/lips.jpg'), badge: 'N' },
  { title: 'Advent', img: asset('img/jar-flowers.jpg'), badge: 'N' }
]

const STRIPS = [
  { img: asset('img/serum.jpg'), kicker: 'Skincare', title: '3-step ritual kit', text: 'The ritual, from ₹1,899', to: '/shop?cat=skincare' },
  { img: asset('img/saree-jewel.jpg'), kicker: 'Handloom', title: 'Silk saree', text: 'Woven in Bhagalpur', to: '/shop?cat=suits' },
  { img: asset('img/bag-brown.jpg'), kicker: 'Atelier', title: 'The structured tote', text: 'Hand-edged, tan', to: '/shop?cat=bags' },
  { img: asset('img/heels-pink.jpg'), kicker: 'Heels', title: 'Block heel', text: 'Three-inch, cushioned', to: '/shop?cat=heels' },
  { img: asset('img/lip-apply.jpg'), kicker: 'Makeup', title: 'Matte lipstick', text: 'Twelve shades', to: '/shop?cat=makeup' },
  { img: asset('img/jar-flowers.jpg'), kicker: 'Body', title: 'Ceramide night cream', text: 'Barrier repair, nightly', to: '/shop?cat=body' }
]

const WIDES = [
  { img: asset('img/hero-portrait.jpg'), kicker: 'The ritual', title: 'Three steps, twice a day. Nothing more.', text: 'A cleanser, a serum, a barrier cream — and the skin that follows.', to: '/shop?cat=skincare' },
  { img: asset('img/hero-bag.jpg'), kicker: 'The atelier', title: 'Bags, heels and small leathers.', text: 'Hand-finished, two-year stitch warranty, free size exchange.', to: '/shop?cat=bags' },
  { img: asset('img/saree-street.jpg'), kicker: 'Handloom', title: 'Forty-one weavers, two co-ops.', text: 'Every saree paid for within seven days of weaving.', to: '/about' },
  { img: asset('img/brushes.jpg'), kicker: 'Makeup', title: 'Twelve shades. One honest finish.', text: 'Buildable, transfer-proof, tested on Indian skin tones.', to: '/shop?cat=makeup' }
]

const SUPPLIERS = [
  { name: 'The skincare lab', cat: 'Six formulas, in-house', years: 7, img: asset('img/serum.jpg') },
  { name: 'The makeup studio', cat: 'Twelve shades, tested', years: 5, img: asset('img/lip-apply.jpg') },
  { name: 'The handloom co-op', cat: 'Bhagalpur, 41 weavers', years: 7, img: asset('img/saree-jewel.jpg') },
  { name: 'The leather atelier', cat: 'Bags, heels, smalls', years: 4, img: asset('img/bag-brown.jpg') }
]

export default function Home() {
  const { toast } = useShop()
  const [email, setEmail] = useState('')

  const top = products.slice(0, 6)
  const rest = products.slice(6)

  return (
    <>
      {/* hero: full-bleed banner with a floating category panel */}
      <div className="hero-bleed">
        <div className="hero-row">
          <aside className="sidebar">
            <div className="sidebar__head">Shop by category</div>
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

        </div>

        <div className="hero-strip">
          <div className="container hero-strip__in">
            <span>Complimentary delivery over ₹1,499</span>
            <span>14-day returns</span>
            <span>Dermat-tested in Indian humidity</span>
            <span>Cash on delivery pan-India</span>
          </div>
        </div>
      </div>

      {/* editorial marquee */}
      <div className="editorial-strip">
        <div className="editorial-strip__track">
          {[...Array(2)].map((_, k) => (
            <span key={k}>
              Fewer things, made properly <i />
              Handloom from Bhagalpur <i />
              Dermat-tested formulas <i />
              Two-year stitch warranty <i />
              Made in India <i />
              Since 2019 <i />
            </span>
          ))}
        </div>
      </div>

      {/* coupons */}
      <div className="container sec sec--tight">
        <div className="slab" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <span className="label" style={{ color: 'var(--orange)' }}>Offers for you</span>
          <div className="coupons" style={{ flex: 1 }}>
            <div className="coupon"><b>₹200</b><span>off your first order<em>On ₹1,999+</em></span><button onClick={() => toast('Coupon collected')}>Collect</button></div>
            <div className="coupon"><b>10%</b><span>off with NIRA10<em>First order · max ₹500</em></span><button onClick={() => toast('Code NIRA10 copied')}>Collect</button></div>
            <div className="coupon"><b>Free</b><span>delivery<em>On every order today</em></span><button onClick={() => toast('Sample kit added')}>Collect</button></div>
            <div className="coupon"><b>₹500</b><span>off on ₹4,999+<em>Bags &amp; sarees</em></span><button onClick={() => toast('Coupon collected')}>Collect</button></div>
          </div>
        </div>
      </div>

      {/* banner strip slider */}
      <div className="container sec sec--tight">
        <StripSlider items={STRIPS} />
      </div>

      {/* top ranking */}
      {/* depth-wrapped below */}
      <div className="container sec">
        <div className="slab">
          <div className="sec-head">
            <div>
              <h2>Bestsellers this week</h2>
              <p>Ranked by what gets reordered, not by what we want to push</p>
            </div>
            <Link className="link-arrow" to="/shop">View all 16 <Icon.arrow /></Link>
          </div>
          <div className="pgrid">
            {top.map((p, i) => <TiltCard key={p.id}><ProductCard product={p} index={i} /></TiltCard>)}
          </div>
        </div>
      </div>

      {/* the house */}
      <div className="container sec">
        <div className="slab">
          <div className="sec-head">
            <div>
              <h2>Three worlds, one house</h2>
              <p>Skincare from our lab, handloom from Bhagalpur, leather from our atelier</p>
            </div>
            <Link className="link-arrow" to="/about">Read the house story <Icon.arrow /></Link>
          </div>
          <div className="pgrid">
            {SUPPLIERS.map((s, i) => (
              <Link className="world rise" to="/shop" key={s.name} style={{ '--d': `${i * 0.05}s` }}>
                <div className="world__ph">
                  <img src={s.img} alt={s.name} loading="lazy" />
                </div>
                <div className="world__in">
                  <span>{s.cat}</span>
                  <b>{s.name}</b>
                  <i>Explore</i>
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

      {/* cinematic band */}
      <Cinema
        src={asset('video/film.mp4')}
        poster={asset('video/poster.jpg')}
        label="Campaign film · 2026"
        lines={['Four drops.', 'Thirty seconds.']}
        text="Shot in one take at our Bengaluru studio — the whole ritual, no filters, no retouching."
        cta="Shop the film"
        to="/shop"
      />

      {/* runway — full bleed */}
      <section className="rw-sec">
        <div className="container">
          <div className="sec-head">
            <div>
              <h2>Runway — autumn 2026</h2>
              <p>Slides on its own, or drag it yourself — click a side look to bring it centre</p>
            </div>
            <Link className="link-arrow" to="/shop">View all <Icon.arrow /></Link>
          </div>
        </div>
        <RunwaySlider items={products.slice(0, 6)} tag="Runway style" />
      </section>

      {/* 3D cube slider */}
      <div className="container sec">
        <CubeSlider
          items={[
            { img: asset('img/bag-brown.jpg'), kicker: 'The atelier', title: 'Bags that survive the monsoon', text: 'Full-grain vegan leather, hand-edged, two-year stitch warranty.', to: '/shop?cat=bags' },
            { img: asset('img/saree-jewel.jpg'), kicker: 'Handloom', title: 'Woven in Bhagalpur', text: '120 pieces per style, from two weaver co-ops.', to: '/shop?cat=suits' },
            { img: asset('img/serum.jpg'), kicker: 'The lab', title: 'Six formulas, nothing else', text: 'Dermat-tested for Indian humidity. The ritual from ₹1,899.', to: '/shop?cat=skincare' }
          ]}
        />
      </div>

      {/* the house band */}
      <div className="container sec">
        <section className="house">
          <div>
            <p className="label label--maroon">The house</p>
            <h2>Fewer things, <em>made properly.</em></h2>
            <p>
              Six formulas from our own lab, handloom from two co-ops in Bhagalpur, and an atelier
              for bags and heels. Nothing goes on the shelf unless it earns a second order.
            </p>
            <div className="house__stats">
              <div><b className="num">16</b><span>Pieces in the edit</span></div>
              <div><b className="num">41</b><span>Weavers, two co-ops</span></div>
              <div><b className="num">2 yr</b><span>Stitch warranty</span></div>
              <div><b className="num">26k</b><span>Pincodes served</span></div>
            </div>
          </div>
          <div className="house__ph">
            <img src={asset('img/jar-silk.jpg')} alt="The house" loading="lazy" />
            <span>Bengaluru studio, 2026</span>
          </div>
        </section>
      </div>

      {/* reviews */}
      <div className="container sec">
        <div className="slab">
          <div className="sec-head">
            <div>
              <h2>12,400 reviews, 4.8 average</h2>
              <p>Verified buyers only — we do not filter the bad ones out</p>
            </div>
            <Link className="link-arrow" to="/shop">Shop bestsellers <Icon.arrow /></Link>
          </div>
          <div className="revstrip">
            {[
              ['Six weeks in, the pigmentation on my cheeks has visibly faded. Does not pill under sunscreen.', 'Ananya R.', 'Vitamin C serum'],
              ['The tote holds a 14-inch laptop and still looks like a bag, not a briefcase.', 'Meher K.', 'Structured tote'],
              ['Rosewood is the first lipstick that does not turn brown on my skin tone.', 'Sana', 'Matte lipstick']
            ].map(([t, n, p]) => (
              <article className="revcard" key={n}>
                <Stars value={5} />
                <p>“{t}”</p>
                <footer><span>{n}</span><span>{p}</span></footer>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* wide banner slider */}
      <div className="container sec">
        <WideSlider items={WIDES} />
      </div>

      <Depth>
      {/* recommended */}
      <div className="container sec">
        <div className="slab">
          <div className="sec-head">
            <div>
              <h2>You may also like</h2>
              <p>Picked from what people browse after this</p>
            </div>
            <Link className="link-arrow" to="/shop">View all <Icon.arrow /></Link>
          </div>
          <div className="pgrid">
            {rest.map((p, i) => <TiltCard key={p.id}><ProductCard product={p} index={i} /></TiltCard>)}
          </div>
        </div>
      </div>

      </Depth>

      {/* service promises */}
      <div className="container sec">
        <div className="trust">
          <div className="trust__i"><Icon.truck /><div><b>Free delivery</b><span>On orders above ₹1,499</span></div></div>
          <div className="trust__i"><Icon.check /><div><b>14-day returns</b><span>Unopened, no questions</span></div></div>
          <div className="trust__i"><Icon.heart /><div><b>Dermat-tested</b><span>Safe for Indian skin</span></div></div>
          <div className="trust__i"><Icon.sound /><div><b>Private appointments</b><span>Bengaluru studio</span></div></div>
        </div>
      </div>

      {/* newsletter */}
      <div className="container sec">
        <div className="news">
          <h2>₹200 off, and first access</h2>
          <p>One email a week: new drops, restocks and the occasional skincare note.</p>
          <form
            className="nform"
            onSubmit={(e) => {
              e.preventDefault()
              if (!/^\S+@\S+\.\S+$/.test(email)) return toast('Enter a valid email')
              toast("You're in — check your inbox")
              setEmail('')
            }}
          >
            <input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </>
  )
}
