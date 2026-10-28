import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Reveal } from '../ui'
import { asset } from '../data'

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  return (
    <>
      <section className="hero" ref={ref} style={{ height: 'clamp(420px,64vh,640px)' }}>
        <motion.div className="hero__video" style={{ y }}>
          <img src={asset('img/hero-saree.jpg')} alt="Nira campaign" />
        </motion.div>
        <div className="hero__scrim" />
        <div className="container hero__in" style={{ paddingBottom: 64 }}>
          <p className="label" style={{ color: 'rgba(255,255,255,.72)' }}>Our story</p>
          <h1 style={{ fontSize: 'clamp(2.2rem,5vw,4.2rem)' }}>
            Fewer things,<br /><em>made properly.</em>
          </h1>
          <p>Started in 2019 with one serum and a handloom co-operative in Bhagalpur. Still one house, still small batch.</p>
        </div>
      </section>

      <section className="sec">
        <div className="container split">
          <Reveal>
            <div className="split__ph"><img src={asset('img/jar-silk.jpg')} alt="Product on silk" loading="lazy" /></div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="label label--maroon">2019 — now</p>
            <h2>We make six things. That is deliberate.</h2>
            <p>
              Most beauty houses launch forty SKUs a year. We launch four. Every formula is developed with our own lab
              partners, tested on Indian skin in Indian humidity, and reformulated until it earns a second order.
            </p>
            <p style={{ marginTop: 14 }}>
              The atelier works the same way: 120 pieces per style with weaver co-operatives in Bhagalpur and Jaipur,
              and bags built to survive a Mumbai monsoon.
            </p>
            <div style={{ marginTop: 26 }}>
              <Link className="btn btn--ghost" to="/shop"><span>Shop the edit</span></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <Reveal>
            <p className="label">What we hold to</p>
            <h2>Three rules, <em>no exceptions.</em></h2>
          </Reveal>
          <div className="band__grid">
            <Reveal delay={0.05}><h4>Nothing white-labelled</h4><p>If it is in our catalogue, we developed it. No catalogue formulas with a new label.</p></Reveal>
            <Reveal delay={0.12}><h4>Small batch</h4><p>500 units per skincare run, 120 pieces per handloom style. When it sells out, it sells out.</p></Reveal>
            <Reveal delay={0.19}><h4>Cruelty-free, always</h4><p>PETA-certified. Vegan leather for every bag and shoe. No parabens, no sulphates.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <div>
                <p className="label label--maroon">The atelier</p>
                <h2>Made with weavers, not factories</h2>
                <p>Two co-operatives, forty-one weavers, paid per metre at above-market rates.</p>
              </div>
            </div>
          </Reveal>
          <div className="pgrid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            {['saree-jewel', 'saree-back', 'saree-street'].map((n, i) => (
              <Reveal key={n} delay={i * 0.07}>
                <div className="split__ph" style={{ aspectRatio: '4/5' }}>
                  <img src={asset(`img/${n}.jpg`)} alt="" loading="lazy" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="news">
        <div className="container">
          <Reveal>
            <p className="label label--maroon">The list</p>
            <h2>₹200 off, and first access</h2>
            <p>One email a week. New drops, restocks, and the occasional note from the lab.</p>
            <div style={{ marginTop: 26 }}>
              <Link className="btn" to="/shop"><span>Shop the edit</span></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
