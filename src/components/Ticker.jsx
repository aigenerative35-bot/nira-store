import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/* Auto strip: shifts one card every 2s, loops, drag to move it yourself. */
export default function Ticker({ items, interval = 2000, label, cta = 'Shop the campaign', to = '/shop' }) {
  const vp = useRef(null)
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [noAnim, setNoAnim] = useState(false)
  const [offset, setOffset] = useState(0)
  const [grabbing, setGrabbing] = useState(false)
  const drag = useRef({ active: false, startX: 0, moved: false })
  const total = items.length

  useEffect(() => {
    if (paused || grabbing) return
    const t = setInterval(() => setI((v) => v + 1), interval)
    return () => clearInterval(t)
  }, [paused, grabbing, interval])

  useEffect(() => {
    if (i >= total) {
      const t = setTimeout(() => {
        setNoAnim(true)
        setI(0)
        setTimeout(() => setNoAnim(false), 60)
      }, 720)
      return () => clearTimeout(t)
    }
  }, [i, total])

  const step = () => {
    const el = vp.current
    const first = el?.querySelector('.tcard')
    if (!first) return 0
    const track = el.querySelector('.ticker__track')
    const gap = parseFloat(getComputedStyle(track).columnGap || '12') || 12
    return first.offsetWidth + gap
  }

  const onDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    drag.current = { active: true, startX: e.clientX, moved: false }
    setGrabbing(true)
    vp.current?.setPointerCapture?.(e.pointerId)
  }
  const onMove = (e) => {
    if (!drag.current.active) return
    const dx = e.clientX - drag.current.startX
    if (Math.abs(dx) > 5) drag.current.moved = true
    setOffset(dx)
  }
  const onUp = (e) => {
    if (!drag.current.active) return
    const dx = offset
    drag.current.active = false
    setGrabbing(false)
    setOffset(0)
    vp.current?.releasePointerCapture?.(e.pointerId)
    if (dx < -45) setI((v) => v + 1)
    else if (dx > 45) setI((v) => Math.max(0, v - 1))
  }

  const shift = -(i * step() - offset)

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
        className={`ticker ${grabbing ? 'is-dragging' : ''}`}
        ref={vp}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <div
          className="ticker__track"
          style={{
            transform: `translate3d(${shift}px, 0, 0)`,
            transition: noAnim || grabbing ? 'none' : 'transform 0.72s cubic-bezier(.22,.7,.2,1)'
          }}
        >
          {[...items, ...items].map((it, k) => (
            <Link
              className="tcard"
              to={it.to || '/shop'}
              key={`${it.title}-${k}`}
              aria-hidden={k >= total}
              draggable="false"
              onClick={(e) => {
                if (drag.current.moved) e.preventDefault()
              }}
            >
              <img src={it.img} alt={it.title} loading="lazy" draggable="false" />
              <span className="tcard__badge">{it.badge || 'N'}</span>
              <span className="tcard__name">{it.title}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="container ticker-foot">
        <div className="ticker-progress">
          <i style={{ width: `${(((i - 1 + total) % total) / total) * 100}%` }} />
        </div>
      </div>
    </section>
  )
}
