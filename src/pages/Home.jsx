import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Icon, Marquee, Reveal, Stars } from '../ui'
import ProductCard from '../components/ProductCard'
import Carousel from '../components/Carousel'
import Ticker from '../components/Ticker'
import { useShop } from '../store'
import { asset, categories, journal, products, reviews } from '../data'

const words = ['Skin', 'that', 'looks', 'like']
const RUNWAY = [
  { title: 'Silk Saree — Emerald', img: asset('img/saree-jewel.jpg'), tag: 'Runway style', to: '/product/p9', price: 8499 },
  { title: 'Structured Tote — Tan', img: asset('img/bag-brown.jpg'), tag: 'Runway style', to: '/product/p4', price: 4499 },
  { title: 'Block Heels — Nude', img: asset('img/heels-pink.jpg'), tag: 'Runway style', to: '/product/p6', price: 3199 },
  { title: 'Handloom Saree — Indigo', img: asset('img/saree-street.jpg'), tag: 'Runway style', to: '/product/p16', price: 6499 },
  { title: 'Matte Lipstick — Rosewood', img: asset('img/lip-apply.jpg'), tag: 'Runway style', to: '/product/p3', price: 749 },
  { title: 'Cotton Co-ord — Sage', img: asset('img/saree-back.jpg'), tag: 'Runway style', to: '/product/p5', price: 2899 }
]

const CAMPAIGN = [
  { title: 'La Nuit', img: asset('img/hero-portrait.jpg'), badge: 'N' },
  { title: 'Good Girl', img: asset('img/hero-bag.jpg'), badge: 'N' },
  { title: '212 Atelier', img: asset('img/bag-blue.jpg'), badge: 'N' },
  { title: 'Makeup Edit', img: asset('img/lips.jpg'), badge: 'N' },
  { title: 'Advent', img: asset('img/jar-flowers.jpg'), badge: 'N' }
]

const NOTES = ['Clean formulas', 'Made in India', 'Cruelty-free', 'Dermat-tested', '26,000 pincodes', '14-day returns', 'Small batch']

export default function Home() {
  const heroRef = useRef(null)
  const filmRef = useRef(null)
  const videoRef = useRef(null)
  const filmVideo = useRef(null)
  const [muted, setMuted] = useState(true)
  const [filmPaused, setFilmPaused] = useState(false)
  const { toast } = useShop()
  const [email, setEmail] = useState('')

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
    const v = filmVideo.current
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
          <video ref={videoRef} src={asset('video/hero.mp4')} poster={asset('video/hero-poster.jpg')} autoPlay muted loop playsInline preload="auto" />
        </motion.div>
        <div className="hero__scrim" />

        <div className="container hero__in">
          <div className="hero__eyebrow label rise" style={{ '--d': '0.15s' }}>
            <i /> Autumn 2026 — the edit
          </div>

          <h1>
            {words.map((w, i) => (
              <span key={w} className="rise-word" style={{ '--d': `${0.24 + i * 0.07}s` }}>
                {w}
              </span>
            ))}
            <em className="rise-word" style={{ '--d': '0.52s' }}>you slept.</em>
          </h1>

          <p className="rise" style={{ '--d': '0.62s' }}>
            Clinical actives in a formula light enough for Indian humidity. Dermat-tested, fragrance-light,
            built for a three-step routine you will actually finish.
          </p>

          <div className="hero__cta rise" style={{ '--d': '0.74s' }}>
            <Link className="btn btn--light" to="/shop"><span>Shop the edit</span></Link>
            <Link className="btn btn--onDark" to="/shop?cat=skincare"><span>Explore skincare</span></Link>
          </div>

          <div className="hero__stats rise" style={{ '--d': '0.86s' }}>
            <div><b className="num">4.8</b><span>avg rating</span></div>
            <div><b className="num">12,400</b><span>reviews</span></div>
            <div><b className="num">1.2 lakh</b><span>orders shipped</span></div>
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
      <section className="sec">
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <div>
                <p className="label label--maroon">Shop by category</p>
                <h2>Six edits, one wardrobe</h2>
              </div>
              <Link className="link-arrow" to="/shop">
                All products <Icon.arrow />
              </Link>
            </div>
          </Reveal>
          <div className="cats">
            {categories.map((c, i) => (
              <motion.div
                className="catwrap"
                key={c.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-6%' }}
                transition={{ duration: 0.8, delay: i * 0.06 }}
              >
                <Link className="cat" to={`/shop?cat=${c.id}`}>
                  <img src={c.img} alt={c.name} loading="lazy" />
                  <span className="cat__in">
                    <b>{c.name}</b>
                    <span>{c.note}</span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- new in ---------------- */}
      <section className="sec sec--paper">
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <div>
                <p className="label label--maroon">New in</p>
                <h2>This week's arrivals</h2>
                <p>Ranked by what gets reordered, not by what we want to push.</p>
              </div>
              <Link className="link-arrow" to="/shop">
                View all {products.length} products <Icon.arrow />
              </Link>
            </div>
          </Reveal>
          <div className="pgrid">
            {products.slice(0, 8).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- runway carousel (slide one by one) ---------------- */}
      <section className="sec sec--tight">
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <div>
                <p className="label label--maroon">Runway</p>
                <h2>Walk the edit, one look at a time</h2>
                <p>Slide with the arrows, the dots, your keyboard or a drag — the stage follows you.</p>
              </div>
            </div>
          </Reveal>
          <Carousel items={RUNWAY} viewAll="/shop" cta="Shop now" />
        </div>
      </section>

      {/* ---------------- auto campaign ticker ---------------- */}
      <Ticker items={CAMPAIGN} label="The campaign" to="/shop" cta="Shop the campaign" />

      {/* ---------------- editorial ---------------- */}
      <section className="sec">
        <div className="container split">
          <Reveal>
            <div className="split__ph">
              <img src={asset('img/lip-apply.jpg')} alt="Applying makeup" loading="lazy" />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
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
          </Reveal>
        </div>
      </section>

      {/* ---------------- film ---------------- */}
      <section className="film" ref={filmRef}>
        <video ref={filmVideo} src={asset('video/film.mp4')} poster={asset('video/poster.jpg')} muted loop playsInline autoPlay preload="metadata" />
        <div className="film__scrim" />
        <div className="container film__in">
          <Reveal>
            <p className="label">Campaign film · 2026</p>
            <h2>Four drops. <em>Thirty seconds.</em></h2>
            <p>
              Shot in one take at our Bengaluru studio — the whole ritual, no filters, no retouching.
              This is what week four actually looks like.
            </p>
            <div className="film__ctl">
              <button className="btn btn--onDark btn--sm" onClick={toggleFilm}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  {filmPaused ? <Icon.play width="12" height="12" /> : <Icon.pause width="12" height="12" />}
                  {filmPaused ? 'Play film' : 'Pause film'}
                </span>
              </button>
              <Link className="btn btn--onDark btn--sm" to="/shop"><span>Shop the film</span></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- brand band ---------------- */}
      <section className="band">
        <div className="container">
          <Reveal>
            <p className="label">The house</p>
            <h2>Built like a house, <em>not a shop.</em></h2>
            <p>
              One palette, one typeface, one rule: nothing goes on the shelf unless it earns a second order.
              That is the whole brand.
            </p>
          </Reveal>
          <div className="band__grid">
            <Reveal delay={0.05}>
              <h4>Formulated in-house</h4>
              <p>Every formula is developed with our own lab partners, never white-labelled from a catalogue.</p>
            </Reveal>
            <Reveal delay={0.12}>
              <h4>Small batch, always</h4>
              <p>120 pieces per style for handloom, 500 units per run for skincare. No dead stock.</p>
            </Reveal>
            <Reveal delay={0.19}>
              <h4>Maroon as a signature</h4>
              <p>Oxblood and gold on ivory. You will find it on the seal of every box.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- reviews ---------------- */}
      <section className="sec">
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <div>
                <p className="label label--maroon">Verified reviews</p>
                <h2>12,400 reviews, 4.8 average</h2>
              </div>
              <Link className="link-arrow" to="/shop?sort=rating">
                Shop bestsellers <Icon.arrow />
              </Link>
            </div>
          </Reveal>
          <div className="rgrid">
            {reviews.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.07}>
                <div className="review">
                  <Stars value={r.rating} size={12} />
                  <p>“{r.text}”</p>
                  <footer>{r.name} · {r.city}</footer>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- journal ---------------- */}
      <section className="sec sec--paper">
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <div>
                <p className="label label--maroon">The journal</p>
                <h2>Read before you buy</h2>
              </div>
              <Link className="link-arrow" to="/about">Our story <Icon.arrow /></Link>
            </div>
          </Reveal>
          <div className="jgrid">
            {journal.map((j, i) => (
              <Reveal key={j.title} delay={i * 0.07}>
                <article className="jcard">
                  <div className="jcard__ph"><img src={j.img} alt="" loading="lazy" /></div>
                  <span className="label">{j.cat}</span>
                  <h4>{j.title}</h4>
                  <p>{j.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- newsletter ---------------- */}
      <section className="news">
        <div className="container">
          <Reveal>
            <p className="label label--maroon">The list</p>
            <h2>₹200 off, and first access</h2>
            <p>One email a week: new drops, restocks and the occasional skincare note. Unsubscribe in one click.</p>
            <form
              className="nform"
              onSubmit={(e) => {
                e.preventDefault()
                if (!/^\S+@\S+\.\S+$/.test(email)) return toast('Enter a valid email')
                toast("You're in — check your inbox for the code")
                setEmail('')
              }}
            >
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <button type="submit">Join</button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}
