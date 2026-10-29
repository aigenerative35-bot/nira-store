import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Icon, Marquee } from '../ui'
import ProductCard from '../components/ProductCard'
import Carousel from '../components/Carousel'
import Ticker from '../components/Ticker'
import { useShop } from '../store'
import { asset, journal, products } from '../data'

const NOTES = ['Complimentary shipping over ₹1,499', 'The autumn handloom edit — now live', 'Private appointments, Bengaluru studio']

const COLLECTIONS = [
  { id: 'skincare', name: 'Skincare', line: 'Six formulas, one ritual', img: asset('img/serum.jpg') },
  { id: 'bags', name: 'The atelier', line: 'Bags, heels, small leathers', img: asset('img/bag-brown.jpg') },
  { id: 'suits', name: 'Handloom', line: 'Woven in Bhagalpur', img: asset('img/saree-jewel.jpg') }
]

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

const LOOKS = [
  { img: asset('img/saree-jewel.jpg'), cap: 'Look 01 — Emerald silk' },
  { img: asset('img/heels-out.jpg'), cap: 'Look 02 — Block heel' },
  { img: asset('img/bag-blue.jpg'), cap: 'Look 03 — Sling, linen' },
  { img: asset('img/hero-portrait.jpg'), cap: 'Look 04 — Evening skin' }
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
    if (v.paused) { v.play(); setFilmPaused(false) } else { v.pause(); setFilmPaused(true) }
  }

  return (
    <>
      {/* hero */}
      <section className="hero" ref={heroRef}>
        <motion.div className="hero__video" style={{ y: heroY }}>
          <video ref={videoRef} src={asset('video/hero.mp4')} poster={asset('video/hero-poster.jpg')} autoPlay muted loop playsInline preload="auto" />
        </motion.div>
        <div className="hero__scrim" />
        <div className="container hero__in">
          <div className="hero__eyebrow label rise" style={{ '--d': '0.15s' }}><i /> Autumn 2026 — the edit</div>
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
            <Link className="btn btn--onDark" to="/lookbook"><span>View the lookbook</span></Link>
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

      {/* statement */}
      <section className="statement">
        <div className="container">
          <span className="label label--maroon">The house — est. 2019</span>
          <p>
            We make <em>fewer things</em>, properly. Six formulas, one atelier of bags and heels, and a handloom
            practice with forty-one weavers. Nothing goes on the shelf unless it earns a second order.
          </p>
          <div className="statement__meta">
            <div><b className="num">16</b><span>Pieces in the edit</span></div>
            <div><b className="num">41</b><span>Weavers, two co-ops</span></div>
            <div><b className="num">2</b><span>Years, stitch warranty</span></div>
            <div><b className="num">26,000</b><span>Pincodes served</span></div>
          </div>
        </div>
      </section>

      {/* collections */}
      <section className="sec sec--tight">
        <div className="container">
          <div className="sec-head">
            <div>
              <p className="label label--maroon">Collections</p>
              <h2>Three houses under one roof</h2>
            </div>
            <Link className="link-arrow" to="/shop">All 16 pieces <Icon.arrow /></Link>
          </div>
          <div className="collections">
            {COLLECTIONS.map((c) => (
              <Link className="collection" to={`/shop?cat=${c.id}`} key={c.id}>
                <div className="collection__ph"><img src={c.img} alt={c.name} loading="lazy" /></div>
                <div className="collection__in">
                  <span>{c.line}</span>
                  <h3>{c.name}</h3>
                  <i>Discover</i>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* new arrivals */}
      <section className="sec">
        <div className="container">
          <div className="sec-head">
            <div>
              <p className="label label--maroon">New in</p>
              <h2>This week's arrivals</h2>
              <p>Ranked by what gets reordered, not by what we want to push.</p>
            </div>
            <Link className="link-arrow" to="/shop">View all <Icon.arrow /></Link>
          </div>
          <div className="pgrid">
            {products.slice(0, 4).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* runway carousel */}
      <section className="sec sec--tight">
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

      {/* atelier (dark) */}
      <section className="atelier">
        <div className="container atelier__grid">
          <div className="atelier__ph">
            <img src={asset('img/jar-silk.jpg')} alt="Atelier" loading="lazy" />
          </div>
          <div>
            <p className="label">The atelier</p>
            <h2>Formulated in-house, <em>never white-labelled.</em></h2>
            <p>
              Every formula is developed with our own lab partners and tested on Indian skin in Indian humidity.
              The handloom comes from two co-operatives we have worked with since 2019.
            </p>
            <ul className="atelier__list">
              <li><b>01</b> Amino-acid cleansers, THD vitamin C, ceramide barrier creams</li>
              <li><b>02</b> 120 pieces per handloom style — when it sells out, it sells out</li>
              <li><b>03</b> Vegan leather, hand-finished edges, two-year stitch warranty</li>
            </ul>
            <div style={{ marginTop: 30 }}>
              <Link className="btn btn--onDark" to="/about"><span>Read the house story</span></Link>
            </div>
          </div>
        </div>
      </section>

      {/* lookbook */}
      <section className="sec">
        <div className="container">
          <div className="sec-head">
            <div>
              <p className="label label--maroon">Lookbook</p>
              <h2>Autumn, shot on the street</h2>
            </div>
            <Link className="link-arrow" to="/lookbook">Open the lookbook <Icon.arrow /></Link>
          </div>
          <div className="lookbook">
            {LOOKS.map((l) => (
              <Link className="look" to="/lookbook" key={l.cap}>
                <div className="look__ph"><img src={l.img} alt={l.cap} loading="lazy" /></div>
                <figcaption>{l.cap}</figcaption>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* campaign ticker */}
      <Ticker items={CAMPAIGN} label="The campaign" to="/shop" cta="Shop the campaign" />

      {/* film */}
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

      {/* journal */}
      <section className="sec">
        <div className="container">
          <div className="sec-head">
            <div>
              <p className="label label--maroon">The journal</p>
              <h2>Read before you buy</h2>
            </div>
            <Link className="link-arrow" to="/journal">All entries <Icon.arrow /></Link>
          </div>
          <div className="jlist">
            {journal.map((j, i) => (
              <Link className="jrow" to="/journal" key={j.title}>
                <span className="jrow__num num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{j.title}</h3>
                  <p>{j.text}</p>
                </div>
                <span className="jrow__meta">{j.cat}</span>
                <div className="jrow__ph"><img src={j.img} alt="" loading="lazy" /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* services */}
      <section className="container">
        <div className="trust">
          <div className="trust__i"><Icon.truck /><div><b>Complimentary delivery</b><span>On orders above ₹1,499</span></div></div>
          <div className="trust__i"><Icon.check /><div><b>14-day returns</b><span>Unopened, no questions</span></div></div>
          <div className="trust__i"><Icon.heart /><div><b>Dermat-tested</b><span>Safe for Indian skin</span></div></div>
          <div className="trust__i"><Icon.sound /><div><b>Private appointments</b><span>Bengaluru studio</span></div></div>
        </div>
      </section>

      {/* newsletter */}
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
