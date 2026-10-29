import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { money } from '../data'
import { Icon } from '../ui'

/* Coverflow 3D — centre card flat, neighbours rotated back in depth */
export default function Coverflow3D({ items, auto = 4200 }) {
  const [i, setI] = useState(0)
  const [drag, setDrag] = useState(0)
  const start = useRef(null)
  const moved = useRef(false)
  const total = items.length

  useEffect(() => {
    if (start.current != null) return
    const t = setInterval(() => setI((v) => (v + 1) % total), auto)
    return () => clearInterval(t)
  }, [total, auto])

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
    if (drag < -55) go(i + 1)
    else if (drag > 55) go(i - 1)
    start.current = null
    setDrag(0)
  }

  const active = items[i]

  return (
    <div className="cf">
      <div
        className="cf__stage"
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onPointerLeave={up}
      >
        {items.map((p, idx) => {
          let off = idx - i
          if (off > total / 2) off -= total
          if (off < -total / 2) off += total
          const abs = Math.abs(off)
          const hidden = abs > 2
          return (
            <Link
              className="cf__card"
              key={p.id}
              to={`/product/${p.id}`}
              onClick={(e) => moved.current && e.preventDefault()}
              style={{
                transform: `translateX(${off * 190 + drag}px) translateZ(${-abs * 150}px) rotateY(${off * -26}deg) scale(${1 - abs * 0.05})`,
                opacity: hidden ? 0 : 1 - abs * 0.18,
                zIndex: 20 - abs,
                pointerEvents: abs <= 1 ? 'auto' : 'none'
              }}
            >
              <img src={p.img} alt={p.name} draggable="false" loading="lazy" />
              <span className="cf__shine" />
            </Link>
          )
        })}
      </div>

      <div className="cf__meta">
        <p className="label">In focus</p>
        <h3>{active.name}</h3>
        <div className="cf__row">
          <span className="cf__price num">{money(active.price)}</span>
          <span className="cf__cat">{active.catName}</span>
        </div>
      </div>

      <div className="cf__ctrl">
        <button onClick={() => go(i - 1)} aria-label="Previous"><Icon.arrow style={{ transform: 'rotate(180deg)' }} /></button>
        <div className="cf__dots">
          {items.map((p, n) => (
            <button key={p.id} className={n === i ? 'on' : ''} onClick={() => go(n)} aria-label={p.name} />
          ))}
        </div>
        <button onClick={() => go(i + 1)} aria-label="Next"><Icon.arrow /></button>
      </div>
    </div>
  )
}
