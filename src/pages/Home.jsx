import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Icon, Marquee } from '../ui'
import ProductCard from '../components/ProductCard'
import Carousel from '../components/Carousel'
import Ticker from '../components/Ticker'
import { useShop } from '../store'
import { asset, categories, products } from '../data'

const NOTES = ['Complimentary shipping over ₹1,499', 'New: the autumn handloom edit', 'Private appointments, Bengaluru studio']

const RUNWAY = [
  { title: 'Silk Saree — Emerald', img: asset('img/saree-jewel.jpg'), tag: 'Runway', to: '/product/p9', price: 8499 },
  { title: 'Structured Tote — Tan', img: asset('img/bag-brown.jpg'), tag: 'Runway', to: '/product/p4', price: 4499 },
  { title: 'Block Heels — Nude', img: asset('img/heels-pink.jpg'), tag: 'Runway', to: '/product/p6', price: 3199 },
  { title: 'Handloom Saree — Indigo', img: asset('img/saree-street.jpg'), tag: 'Runway', to: '/product/p16', price: 6499 },
  { title: 'Matte Lipstick — Rosewood', img: asset('img/lip-apply.jpg'), tag: 'Runway', to: '/product/p3', price: 749 }
]

const CAMPAIGN = [
  { title: 'La Nuit', img: asset('img/hero-portrait.jpg'), badge: 'N' },
  { title: 'Good Girl', img: asset('img/hero-bag.jpg'), badge: 'N' },
  { title: '212 Atelier', img: asset('img/bag-blue.jpg'), badge: 'N' },
  { title: 'Makeup Edit', img: asset('img/lips.jpg'), badge: 'N' },
  { title: 'Advent', img: asset('img/jar-flowers.jpg'), badge: 'N' }
]

export default function Home() {
  const { toast } = useShop()
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const filmRef = useRef(null)
  const [muted, setMuted] = useState(true)
  const [email, setEmail] = useState('')
  const [filmPaused, setFilmPaused] = useState(false)

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])

  const toggleSound = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    if (!v.muted && v.paused) v.play()
    setMuted(v.muted)
  }

  const toggleFilm = () => {
    const v = filmRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setFilmPaused(false)
    } else {
      v.pause()
      setFilmPaused(true)
    }
  }

  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="hero" ref={heroRef}>
        <motion.div className="hero__video" style={{ y: heroY }}>
          <video
            ref={videoRef}
            src={asset('video/hero.mp4')}
            poster={asset('video/hero-poster.jpg')}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </motion.div>
        <div className="hero__scrim" />
        <div className="container hero__in">
          <div className="hero__eyebrow label rise" style={{ '--d': '0.15s' }}>
            <i /> Autumn 2026 — the edit
          </div>
          <h1>
            <span className="rise" style={{ '--d': '0.24s', display: 'inline-block' }}>Skin that looks</span>{' '}
            <em className="rise" style={{ '--d': '0.36s', display: 'inline-block' }}>like you slept.</em>
          </h1>
          <p className="rise" style={{ '--d': '0.5s' }}>
            Clinical actives in a formula light enough for Indian humidity. Dermat-tested, fragrance-light,
            built for a three-step routine you will actually finish.
          </p>
          <div className="hero__cta rise" style={{ '--d': '0.62s' }}>
            <Link className="btn btn--light" to="/shop"><span>Shop the edit</span></Link>
            <Link className="btn btn--onDark" to="/shop?cat=skincare"><span>Explore skincare</span></Link>
          </div>
          <div className="hero__stats rise" style={{ '--d': '0.74s' }}>
            <div><b className="num">4.8</b><span>Average rating</span></div>
            <div><b className="num">12,400</b><span>Reviews</span></div>
            <div><b className="num">1.2 lakh</b><span>Orders shipped</span></div>
          </div>
        </div>
        <div className="container hero__foot">
          <span className="hero__scroll"><i /> Scroll</span>
          <button className="sound-btn" onClick={toggleSound} aria-label="Toggle sound">
            {muted ? <Icon.mute /> : <Icon.sound />}
            <span>{muted ? 'Sound off' : 'Sound on'}</span>
          </button>
        </div>
      </section>

      <Marquee items={NOTES} />

      {/* ---------------- categories ---------------- */}
      <section className="catrail">
        <div className="container">
          <div className="catrail__in">
            {categories.map((c) => (
              <Link className="ctile" to={`/shop?cat=${c.id}`} key={c.id}>
                <span className="ctile__ph"><img src={c.img} alt="" loading="lazy" /></span>
                <span>{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- new in ---------------- */}
      <section className="sec">
        <div className="container">
          <div className="sec-head">
            <div>
              <p className="label label--maroon">New in</p>
              <h2>This week's arrivals</h2>
              <p>Ranked by what gets reordered, not by what we want to push.</p>
            </div>
            <Link className="link-arrow" to="/shop">View all 16 pieces <Icon.arrow /></Link>
          </div>
          <div className="pgrid">
            {products.slice(0, 8).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- editorial ---------------- */}
      <section className="sec sec--tight">
        <div className="container split">
          <div className="split__ph">
            <img src={asset('img/lip-apply.jpg')} alt="Applying makeup" loading="lazy" />
          </div>
          <div>
            <p className="label label--maroon">The ritual</p>
            <h2>Three steps, twice a day. Nothing more.</h2>
            <p>
              We build short routines because long ones get abandoned. Every formula in this edit is
              fragrance-light, non-comedogenic and tested in Indian humidity.
            </p>
            <ol className="steps">
              <li><b>01</b><div><strong>Cleanse</strong><span>Amino-acid face wash that does not strip.</span></div></li>
              <li><b>02</b><div><strong>Treat</strong><span>Vitamin C in the morning, retinol twice a week.</span></div></li>
              <li><b>03</b><div><strong>Seal</strong><span>Shea body butter on damp skin, always.</span></div></li>
            </ol>
            <div style={{ marginTop: 28 }}>
              <Link className="btn btn--ghost" to="/shop?cat=skincare"><span>Shop the ritual</span></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- runway carousel ---------------- */}
      <section className="sec">
        <div className="container">
          <div className="sec-head">
            <div>
              <p className="label label--maroon">Runway</p>
              <h2>Walk the edit, one look at a time</h2>
            </div>
          </div>
          <Carousel items={RUNWAY} eyebrow="Runway" viewAll="/shop" cta="Shop now" />
        </div>
      </section>

      {/* ---------------- film ---------------- */}
      <section className="film">
        <video ref={filmRef} src={asset('video/film.mp4')} poster={asset('video/poster.jpg')} muted loop playsInline autoPlay preload="metadata" />
        <div className="film__scrim" />
        <div className="container film__in">
          <p className="label">Campaign film · 2026</p>
          <h2>Four drops. <em>Thirty seconds.</em></h2>
          <p>Shot in one take at our Bengaluru studio — the whole ritual, no filters, no retouching.</p>
          <div className="film__ctl">
            <button className="btn btn--onDark btn--sm" onClick={toggleFilm}>
              <span>{filmPaused ? 'Play film' : 'Pause film'}</span>
            </button>
            <Link className="btn btn--onDark btn--sm" to="/shop"><span>Shop the film</span></Link>
          </div>
        </div>
      </section>

      {/* ---------------- ticker ---------------- */}
      <Ticker items={CAMPAIGN} label="The campaign" to="/shop" cta="Shop the campaign" />

      {/* ---------------- band ---------------- */}
      <section className="band">
        <div className="container">
          <p className="label">The house</p>
          <h2>Built like a house, <em>not a shop.</em></h2>
          <p>
            One palette, one typeface, one rule: nothing goes on the shelf unless it earns a second order.
            That is the whole brand.
          </p>
          <div className="band__grid">
            <div><h4>Formulated in-house</h4><p>Every formula is developed with our own lab partners, never white-labelled.</p></div>
            <div><h4>Small batch, always</h4><p>120 pieces per style for handloom, 500 units per run for skincare.</p></div>
            <div><h4>Maroon as a signature</h4><p>Oxblood and gold on ivory. You will find it on the seal of every box.</p></div>
          </div>
        </div>
      </section>

      {/* ---------------- the edit ---------------- */}
      <section className="sec">
        <div className="container">
          <div className="sec-head">
            <div>
              <p className="label label--maroon">The edit</p>
              <h2>Everything, in one place</h2>
            </div>
            <Link className="link-arrow" to="/shop">Shop all <Icon.arrow /></Link>
          </div>
          <div className="pgrid">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- trust ---------------- */}
      <section className="container">
        <div className="trust">
          <div className="trust__i"><Icon.truck /><div><b>Complimentary delivery</b><span>On orders above ₹1,499</span></div></div>
          <div className="trust__i"><Icon.check /><div><b>14-day returns</b><span>Unopened, no questions</span></div></div>
          <div className="trust__i"><Icon.heart /><div><b>Dermat-tested</b><span>Safe for Indian skin</span></div></div>
          <div className="trust__i"><Icon.sound /><div><b>Private appointments</b><span>Bengaluru studio</span></div></div>
        </div>
      </section>

      {/* ---------------- newsletter ---------------- */}
      <section className="news">
        <div className="container">
          <p className="label label--maroon">The list</p>
          <h2>₹200 off, and first access</h2>
          <p>One email a week: new drops, restocks and the occasional skincare note.</p>
          <form
            className="nform"
            onSubmit={(e) => {
              e.preventDefault()
              if (!/^\S+@\S+\.\S+$/.test(email)) return toast('Enter a valid email')
              toast("You're in — check your inbox for the code")
              setEmail('')
            }}
          >
            <input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
            <button type="submit">Join</button>
          </form>
        </div>
      </section>
    </>
  )
}
