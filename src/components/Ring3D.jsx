import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { money } from '../data'

/* 3D ring carousel — items orbit on a cylinder; drag to spin, auto-rotates */
export default function Ring3D({ items, radius = 340, speed = 0.12 }) {
  const [angle, setAngle] = useState(0)
  const [paused, setPaused] = useState(false)
  const drag = useRef({ on: false, x: 0, a: 0 })
  const raf = useRef(0)

  useEffect(() => {
    if (paused) return
    let last = performance.now()
    const tick = (now) => {
      const dt = now - last
      last = now
      setAngle((a) => a + dt * speed * 0.02)
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [paused, speed])

  const down = (e) => {
    drag.current = { on: true, x: e.clientX, a: angle }
    setPaused(true)
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const move = (e) => {
    if (!drag.current.on) return
    setAngle(drag.current.a + (e.clientX - drag.current.x) * 0.28)
  }
  const up = (e) => {
    drag.current.on = false
    setPaused(false)
    e.currentTarget.releasePointerCapture?.(e.pointerId)
  }

  const step = 360 / items.length

  return (
    <div
      className="ring"
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { if (!drag.current.on) setPaused(false) }}
    >
      <div className="ring__stage" style={{ transform: `rotateY(${angle}deg)` }}>
        {items.map((p, i) => {
          const a = i * step
          const rad = (a * Math.PI) / 180
          const front = Math.cos((angle + a) * (Math.PI / 180)) > 0.55
          return (
            <Link
              to={`/product/${p.id}`}
              className={`ring__item ${front ? 'is-front' : ''}`}
              key={p.id}
              style={{
                transform: `rotateY(${a}deg) translateZ(${radius}px)`,
                opacity: front ? 1 : 0.55
              }}
            >
              <img src={p.img} alt={p.name} draggable="false" />
              <span className="ring__cap">
                <b>{p.name}</b>
                <i>{money(p.price)}</i>
              </span>
            </Link>
          )
        })}
      </div>
      <div className="ring__floor" />
      <div className="ring__hint">Drag to spin</div>
    </div>
  )
}
