import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../ui'
import ProductCard from '../components/ProductCard'
import Ticker from '../components/Ticker'
import { useShop } from '../store'
import { asset, categories, products } from '../data'

const BANNERS = [
  {
    img: asset('img/hero-portrait.jpg'),
    kicker: 'Autumn edit 2026',
    title: 'Skin that looks like you slept.',
    text: 'Clinical actives, light enough for Indian humidity. Up to 30% off the ritual.',
    to: '/shop?cat=skincare'
  },
  {
    img: asset('img/saree-jewel.jpg'),
    kicker: 'Festive handloom',
    title: 'Woven in Bhagalpur, made to last.',
    text: 'Small batch sarees and co-ords — 120 pieces per style.',
    to: '/shop?cat=suits'
  },
  {
    img: asset('img/bag-brown.jpg'),
    kicker: 'Atelier',
    title: 'Bags that survive the monsoon.',
    text: 'Full-grain vegan leather, two-year stitch warranty.',
    to: '/shop?cat=bags'
  }
]

const CAMPAIGN = [
  { title: 'La Nuit', img: asset('img/hero-portrait.jpg'), badge: 'N' },
  { title: 'Good Girl', img: asset('img/hero-bag.jpg'), badge: 'N' },
  { title: '212 Atelier', img: asset('img/bag-blue.jpg'), badge: 'N' },
  { title: 'Makeup Edit', img: asset('img/lips.jpg'), badge: 'N' },
  { title: 'Advent', img: asset('img/jar-flowers.jpg'), badge: 'N' }
]

/* ---------- drag-scroll rail ---------- */
function Rail({ items, render }) {
  const vp = useRef(null)
  const drag = useRef({ active: false, x: 0, left: 0, moved: false })
  const [grabbing, setGrabbing] = useState(false)

  const onDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    drag.current = { active: true, x: e.clientX, left: vp.current.scrollLeft, moved: false }
    setGrabbing(true)
    vp.current.setPointerCapture?.(e.pointerId)
  }
  const onMove = (e) => {
    if (!drag.current.active) return
    const dx = e.clientX - drag.current.x
    if (Math.abs(dx) > 5) drag.current.moved = true
    vp.current.scrollLeft = drag.current.left - dx
  }
  const onUp = (e) => {
    drag.current.active = false
    setGrabbing(false)
    vp.current.releasePointerCapture?.(e.pointerId)
  }
  const nudge = (dir) => vp.current.scrollBy({ left: dir * vp.current.clientWidth * 0.7, behavior: 'smooth' })

  return (
    <div className="rail">
      <div
        className={`rail__vp ${grabbing ? 'is-dragging' : ''}`}
        ref={vp}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerLeave={onUp}
      >
        {items.map((it, i) => (
          <div key={it.id || i} onClickCapture={(e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation() } }}>
            {render(it, i)}
          </div>
        ))}
      </div>
      <button className="rail__nav l" onClick={() => nudge(-1)} aria-label="Scroll left">
        <Icon.arrow style={{ transform: 'rotate(180deg)' }} />
      </button>
      <button className="rail__nav r" onClick={() => nudge(1)} aria-label="Scroll right">
        <Icon.arrow />
      </button>
    </div>
  )
}

function Countdown() {
  const [left, setLeft] = useState(6 * 3600 + 42 * 60)
  useEffect(() => {
    const t = setInterval(() => setLeft((v) => (v > 0 ? v - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [])
  const pad = (n) => String(n).padStart(2, '0')
  return (
    <span className="clock">
      Ends in&nbsp;
      <b>{pad(Math.floor(left / 3600))}</b>:<b>{pad(Math.floor((left % 3600) / 60))}</b>:<b>{pad(left % 60)}</b>
    </span>
  )
}

export default function Home() {
  const { toast } = useShop()
  const [slide, setSlide] = useState(0)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % BANNERS.length), 6000)
    return () => clearInterval(t)
  }, [])

  const deals = products.filter((p) => p.mrp > p.price).slice(0, 5)
  const skincare = products.filter((p) => p.cat === 'skincare' || p.cat === 'body')
  const atelier = products.filter((p) => p.cat === 'bags' || p.cat === 'heels' || p.cat === 'suits')

  return (
    <>
      {/* category rail */}
      <div className="container sec sec--tight">
        <div className="catrail">
          <div className="catrail__in">
            {categories.map((c) => (
              <Link className="ctile" to={`/shop?cat=${c.id}`} key={c.id}>
                <span className="ctile__ph"><img src={c.img} alt="" loading="lazy" /></span>
                <span>{c.name}<small>{c.note}</small></span>
              </Link>
            ))}
            <Link className="ctile" to="/shop?sort=low">
              <span className="ctile__ph"><img src={asset('img/flatlay.jpg')} alt="" loading="lazy" /></span>
              <span>Under ₹1,000<small>Best value</small></span>
            </Link>
            <Link className="ctile" to="/shop?sort=rating">
              <span className="ctile__ph"><img src={asset('img/lip-red.jpg')} alt="" loading="lazy" /></span>
              <span>Top rated<small>4.7+ only</small></span>
            </Link>
            <Link className="ctile" to="/shop">
              <span className="ctile__ph"><img src={asset('img/brushes.jpg')} alt="" loading="lazy" /></span>
              <span>All products<small>16 pieces</small></span>
            </Link>
            <Link className="ctile" to="/shop?wish=1">
              <span className="ctile__ph"><img src={asset('img/lips.jpg')} alt="" loading="lazy" /></span>
              <span>Wishlist<small>Saved</small></span>
            </Link>
          </div>
        </div>
      </div>

      {/* banner */}
      <div className="container sec sec--tight">
        <div className="banner">
          <div className="bmain">
            <div className="bmain__vp" style={{ transform: `translateX(-${slide * 100}%)` }}>
              {BANNERS.map((b) => (
                <div className="bslide" key={b.title}>
                  <img src={b.img} alt="" />
                  <div className="bslide__in">
                    <small>{b.kicker}</small>
                    <h1>{b.title}</h1>
                    <p>{b.text}</p>
                    <div>
                      <Link className="btn btn--light" to={b.to}><span>Shop now</span></Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="bnav l" onClick={() => setSlide((s) => (s - 1 + BANNERS.length) % BANNERS.length)} aria-label="Previous">
              <Icon.arrow style={{ transform: 'rotate(180deg)' }} />
            </button>
            <button className="bnav r" onClick={() => setSlide((s) => (s + 1) % BANNERS.length)} aria-label="Next">
              <Icon.arrow />
            </button>
            <div className="bdots">
              {BANNERS.map((b, i) => (
                <button key={b.title} className={i === slide ? 'on' : ''} onClick={() => setSlide(i)} aria-label={`Banner ${i + 1}`} />
              ))}
            </div>
          </div>

          <div className="bside">
            <Link className="bpromo" to="/shop?sort=low">
              <img src={asset('img/jar-silk.jpg')} alt="" />
              <div className="bpromo__in">
                <b>Body care from ₹649</b>
                <span>Shea, kokum, vetiver</span>
              </div>
            </Link>
            <Link className="bpromo" to="/shop?cat=heels">
              <img src={asset('img/heels-pink.jpg')} alt="" />
              <div className="bpromo__in">
                <b>Heels, 3 inch</b>
                <span>Cushioned · free size exchange</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* coupons */}
      <div className="container sec sec--tight">
        <div className="slab">
          <div className="sec-head" style={{ marginBottom: 8 }}>
            <div>
              <h2>Coupons for you</h2>
              <p>Collect now, they apply automatically at checkout</p>
            </div>
            <Link className="link-arrow" to="/shop">All offers <Icon.arrow /></Link>
          </div>
          <div className="coupons">
            <div className="coupon"><b>₹200</b><span>off on ₹1,999+<em>New users only</em></span><button onClick={() => toast('Coupon collected')}>Collect</button></div>
            <div className="coupon"><b>10%</b><span>off first order<em>Code NIRA10 · max ₹500</em></span><button onClick={() => toast('Coupon NIRA10 copied')}>Collect</button></div>
            <div className="coupon"><b>₹500</b><span>off on ₹4,999+<em>Bags &amp; sarees</em></span><button onClick={() => toast('Coupon collected')}>Collect</button></div>
            <div className="coupon"><b>Free</b><span>shipping<em>On every order today</em></span><button onClick={() => toast('Free shipping applied')}>Collect</button></div>
          </div>
        </div>
      </div>

      {/* flash sale */}
      <div className="container sec">
        <div className="flash">
          <div className="flash__head">
            <div className="flash__t">
              <h2>Flash sale</h2>
              <span>Up to 40% off · limited stock</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <Countdown />
              <Link className="btn btn--light btn--sm" to="/shop"><span>See all deals</span></Link>
            </div>
          </div>
          <div className="slab">
            <div className="pgrid">
              {deals.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* rail: skincare */}
      <div className="container sec">
        <div className="slab">
          <div className="sec-head">
            <div>
              <h2>Trending in skincare</h2>
              <p>Serums, mists and barrier creams</p>
            </div>
            <Link className="link-arrow" to="/shop?cat=skincare">View all <Icon.arrow /></Link>
          </div>
          <Rail
            items={skincare}
            render={(p, i) => <ProductCard product={p} index={i} />}
          />
        </div>
      </div>

      {/* campaign ticker */}
      <div className="container sec">
        <Ticker items={CAMPAIGN} label="The campaign" to="/shop" cta="Shop the campaign" />
      </div>

      {/* rail: atelier */}
      <div className="container sec">
        <div className="slab">
          <div className="sec-head">
            <div>
              <h2>Atelier — bags, suits, heels</h2>
              <p>Hand-finished, small batch</p>
            </div>
            <Link className="link-arrow" to="/shop?cat=bags">View all <Icon.arrow /></Link>
          </div>
          <Rail items={atelier} render={(p, i) => <ProductCard product={p} index={i} />} />
        </div>
      </div>

      {/* guess you like */}
      <div className="container sec">
        <div className="slab">
          <div className="sec-head">
            <div>
              <h2>Guess you like</h2>
              <p>Picked from what people browse after this</p>
            </div>
            <Link className="link-arrow" to="/shop">View all <Icon.arrow /></Link>
          </div>
          <div className="pgrid">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* trust */}
      <div className="container sec">
        <div className="trust">
          <div className="trust__i">
            <Icon.truck />
            <div><b>Free delivery</b><span>On orders above ₹1,499</span></div>
          </div>
          <div className="trust__i">
            <Icon.check />
            <div><b>14-day returns</b><span>Unopened, no questions</span></div>
          </div>
          <div className="trust__i">
            <Icon.heart />
            <div><b>Derm-tested</b><span>Safe for Indian skin</span></div>
          </div>
          <div className="trust__i">
            <Icon.sound />
            <div><b>COD available</b><span>Pan-India, no fee</span></div>
          </div>
        </div>
      </div>

      {/* newsletter */}
      <div className="container sec">
        <div className="news">
          <h2>₹200 off your first order</h2>
          <p>One email a week: new drops, restocks, and the occasional skincare note.</p>
          <form
            className="nform"
            onSubmit={(e) => {
              e.preventDefault()
              if (!/^\S+@\S+\.\S+$/.test(email)) return toast('Enter a valid email')
              toast("You're in — check your inbox")
              setEmail('')
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"
            />
            <button type="submit">Get code</button>
          </form>
        </div>
      </div>
    </>
  )
}
