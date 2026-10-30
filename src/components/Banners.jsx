import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../ui'

/* ---------------- hero slider ---------------- */
export function BannerSlider({ items, interval = 6000 }) {
  const [i, setI] = useState(0)
  const [drag, setDrag] = useState(0)
  const start = useRef(null)
  const moved = useRef(false)
  const total = items.length

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % total), interval)
    return () => clearInterval(t)
  }, [total, interval])

  const go = (n) => setI((n + total) % total)

  const down = (e) => {
    start.current = e.clientX
    moved.current = false
  }
  const move = (e) => {
    if (start.current == null) return
    const dx = e.clientX - start.current
    if (Math.abs(dx) > 6) moved.current = true
    setDrag(dx)
  }
  const up = () => {
    if (start.current == null) return
    if (drag < -60) go(i + 1)
    else if (drag > 60) go(i - 1)
    start.current = null
    setDrag(0)
  }

  return (
    <div
      className="bs bs--hero"
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      onPointerLeave={up}
    >
      <div
        className={`bs__vp ${start.current != null ? 'dragging' : ''}`}
        style={{ transform: `translateX(calc(-${i * 100}% + ${drag}px))` }}
      >
        {items.map((b) => (
          <div className="bs__slide" key={b.title}>
            <img src={b.img} alt="Nira — product imagery" draggable="false" />
            <div className="bs__in">
              <span className="bs__kicker">{b.kicker}</span>
              <h1>{b.title}</h1>
              <p>{b.text}</p>
              <div>
                <Link className="btn btn--light" to={b.to} onClick={(e) => moved.current && e.preventDefault()}>
                  <span>{b.cta || 'View products'}</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="bs__nav l" onClick={() => go(i - 1)} aria-label="Previous"><Icon.arrow style={{ transform: 'rotate(180deg)' }} /></button>
      <button className="bs__nav r" onClick={() => go(i + 1)} aria-label="Next"><Icon.arrow /></button>

      <div className="bs__dots">
        {items.map((b, n) => (
          <button key={b.title} className={n === i ? 'on' : ''} onClick={() => go(n)} aria-label={`Slide ${n + 1}`} />
        ))}
      </div>
      <div className="bs__bar"><i style={{ width: `${((i + 1) / total) * 100}%` }} /></div>
    </div>
  )
}

/* ---------------- strip slider: 3 cards, shifts by one ---------------- */
export function StripSlider({ items, interval = 3600 }) {
  const [i, setI] = useState(0)
  const [noAnim, setNoAnim] = useState(false)
  const total = items.length

  useEffect(() => {
    const t = setInterval(() => setI((v) => v + 1), interval)
    return () => clearInterval(t)
  }, [interval])

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

  const list = [...items, ...items]

  return (
    <div className="bs bs--strip">
      <div className="bs-strip" style={{ display: 'block', overflow: 'hidden' }}>
        <div
          style={{
            display: 'flex',
            gap: 10,
            transform: `translateX(calc(-${i} * (100% / 3 + 3.4px)))`,
            transition: noAnim ? 'none' : 'transform 0.7s cubic-bezier(.22,.7,.2,1)'
          }}
        >
          {list.map((b, n) => (
            <Link
              className="bs-card"
              to={b.to}
              key={`${b.title}-${n}`}
              style={{ flex: '0 0 calc(33.333% - 7px)' }}
              aria-hidden={n >= total}
            >
              <img src={b.img} alt="Nira — product imagery" loading="lazy" />
              <div className="bs-card__in">
                <span>{b.kicker}</span>
                <b>{b.title}</b>
                <i>{b.text}</i>
                <em>{b.cta || 'Shop now'}</em>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="bs-ctrl">
        <button className="arrow" onClick={() => setI((v) => Math.max(0, v - 1))} aria-label="Previous"><Icon.arrow style={{ transform: 'rotate(180deg)' }} /></button>
        {items.map((b, n) => (
          <button key={b.title} className={`dot ${n === i % total ? 'on' : ''}`} onClick={() => setI(n)} aria-label={`Banner ${n + 1}`} />
        ))}
        <button className="arrow" onClick={() => setI((v) => v + 1)} aria-label="Next"><Icon.arrow /></button>
      </div>
    </div>
  )
}

/* ---------------- wide slider: 2 visible, arrows ---------------- */
export function WideSlider({ items }) {
  const [i, setI] = useState(0)
  const per = 2
  const max = Math.max(0, items.length - per)

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v >= max ? 0 : v + 1)), 5200)
    return () => clearInterval(t)
  }, [max])

  return (
    <div className="bs bs--wide">
      <div className="bs-wide-vp">
        <div className="bs-wide-track" style={{ transform: `translateX(calc(-${i} * (50% + 5px)))` }}>
          {items.map((b) => (
            <Link className={`bs-wide-item ${b.video ? 'is-video' : ''}`} to={b.to} key={b.title}>
              {b.video ? (
                <video src={b.video} poster={b.img} autoPlay muted loop playsInline preload="metadata" />
              ) : (
                <img src={b.img} alt="Nira — product imagery" loading="lazy" />
              )}
              <span className="bs-wide-grain" />
              <div className="bs-wide-in">
                <span>{b.kicker}</span>
                <b>{b.title}</b>
                <i>{b.text}</i>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="bs-ctrl">
        <button className="arrow" onClick={() => setI((v) => Math.max(0, v - 1))} aria-label="Previous"><Icon.arrow style={{ transform: 'rotate(180deg)' }} /></button>
        {Array.from({ length: max + 1 }).map((_, n) => (
          <button key={n} className={`dot ${n === i ? 'on' : ''}`} onClick={() => setI(n)} aria-label={`Page ${n + 1}`} />
        ))}
        <button className="arrow" onClick={() => setI((v) => Math.min(max, v + 1))} aria-label="Next"><Icon.arrow /></button>
      </div>
    </div>
  )
}
