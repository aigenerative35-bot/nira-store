import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/* Auto-advancing strip: shifts one card every 2s, loops forever, pauses on hover. */
export default function Ticker({ items, interval = 2000, label, cta = 'Shop the campaign', to = '/shop' }) {
  const vp = useRef(null)
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [noAnim, setNoAnim] = useState(false)
  const total = items.length

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setI((v) => v + 1), interval)
    return () => clearInterval(t)
  }, [paused, interval])

  useEffect(() => {
    if (i >= total) {
      const t = setTimeout(() => {
        setNoAnim(true)
        setI(0)
        setTimeout(() => setNoAnim(false), 60)
      }, 700)
      return () => clearTimeout(t)
    }
  }, [i, total])

  const cardW = () => {
    const el = vp.current
    const first = el?.querySelector('.tcard')
    if (!first) return 0
    const gap = parseFloat(getComputedStyle(el.querySelector('.ticker__track')).columnGap || '12')
    return first.offsetWidth + gap
  }

  return (
    <section className="ticker-sec">
      <div className="container ticker-head">
        <div>
          <p className="label label--maroon">{label || 'The campaign'}</p>
          <h2>Five worlds, one house</h2>
        </div>
        <div className="ticker-head__r">
          <span className="ticker-dot" aria-hidden="true" />
          <span className="label">Auto · every 2s</span>
          <Link className="link-arrow" to={to}>{cta}</Link>
        </div>
      </div>

      <div
        className="ticker"
        ref={vp}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="ticker__track"
          style={{
            transform: `translate3d(-${i * cardW()}px, 0, 0)`,
            transition: noAnim ? 'none' : 'transform 0.7s cubic-bezier(.22,.7,.2,1)'
          }}
        >
          {[...items, ...items].map((it, k) => (
            <Link className="tcard" to={it.to || '/shop'} key={`${it.title}-${k}`} aria-hidden={k >= total}>
              <img src={it.img} alt={it.title} loading="lazy" />
              <span className="tcard__badge">{it.badge || 'NIRA'}</span>
              <span className="tcard__name">{it.title}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="container ticker-foot">
        <div className="ticker-progress">
          <i style={{ width: `${((i % total) / total) * 100}%` }} />
        </div>
      </div>
    </section>
  )
}
