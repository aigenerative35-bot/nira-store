import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { money } from '../data'
import { Icon } from '../ui'

/* Runway slider — centre card large, neighbours stepped back; auto + manual */
export default function RunwaySlider({ items, auto = 4200, tag = 'Runway style' }) {
  const [i, setI] = useState(0)
  const [drag, setDrag] = useState(0)
  const [hover, setHover] = useState(false)
  const start = useRef(null)
  const moved = useRef(false)
  const total = items.length

  useEffect(() => {
    if (hover || start.current != null) return
    const t = setInterval(() => setI((v) => (v + 1) % total), auto)
    return () => clearInterval(t)
  }, [total, auto, hover])

  const go = (n) => setI(((n % total) + total) % total)

  const down = (e) => { start.current = e.clientX; moved.current = false }
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

  const onKey = (e) => {
    if (e.key === 'ArrowRight') go(i + 1)
    if (e.key === 'ArrowLeft') go(i - 1)
  }

  const active = items[i]

  return (
    <div
      className="rw"
      tabIndex={0}
      onKeyDown={onKey}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); up() }}
    >
      <div
        className="rw__stage"
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
      >
        {items.map((p, idx) => {
          let off = idx - i
          if (off > total / 2) off -= total
          if (off < -total / 2) off += total
          const abs = Math.abs(off)
          return (
            <button
              key={p.id}
              className={`rw__card ${off === 0 ? 'is-on' : ''}`}
              onClick={() => {
                if (moved.current) return
                if (off !== 0) go(idx)
              }}
              style={{
                transform: `translateX(calc(${off} * 22.5vw + ${drag}px)) scale(${off === 0 ? 1.02 : 0.84})`,
                opacity: abs > 2 ? 0 : abs === 0 ? 1 : abs === 1 ? 0.92 : 0.55,
                zIndex: 10 - abs,
                pointerEvents: abs > 2 ? 'none' : 'auto'
              }}
              aria-label={p.name}
            >
              <img src={p.img} alt={p.name} draggable="false" loading="lazy" />
              <span className="rw__tag">{tag}</span>
            </button>
          )
        })}
      </div>

      <div className="rw__meta">
        <p className="rw__kicker">
          Look {String(i + 1).padStart(2, '0')} — {active.catName}
        </p>
        <h3>{active.name}</h3>
        <div className="rw__price num">{money(active.price)}</div>
        <Link className="btn rw__cta" to={`/product/${active.id}`}>
          <span>Shop now</span>
          <Icon.arrow />
        </Link>
        <Link className="rw__all" to={`/shop?cat=${active.cat}`}>View all {active.catName}</Link>
      </div>

      <div className="rw__ctrl">
        <button onClick={() => go(i - 1)} aria-label="Previous"><Icon.arrow style={{ transform: 'rotate(180deg)' }} /></button>
        <button onClick={() => go(i + 1)} aria-label="Next"><Icon.arrow /></button>
      </div>

      <div className="rw__foot">
        <div className="rw__dots">
          {items.map((p, n) => (
            <button key={p.id} className={n === i ? 'on' : ''} onClick={() => go(n)} aria-label={p.name} />
          ))}
        </div>
        <span className="rw__prog" aria-hidden="true">
          <i key={i} style={{ animationDuration: `${auto}ms`, animationPlayState: hover ? 'paused' : 'running' }} />
        </span>
      </div>
    </div>
  )
}
