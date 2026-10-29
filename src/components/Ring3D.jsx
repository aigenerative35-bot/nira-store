import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { money } from '../data'
import { Icon } from '../ui'

/* 3D coverflow ring — billboarded cards on a cylinder, inertia drag, magnetic snap */
export default function Ring3D({ items, radius = 300, autoSpeed = 9 }) {
  const stage = useRef(null)
  const state = useRef({ rot: 0, vel: 0, dragging: false, x: 0, rot0: 0, lastT: 0, target: null })
  const [, force] = useState(0)
  const [hover, setHover] = useState(false)
  const [active, setActive] = useState(0)

  const step = 360 / items.length

  /* rAF loop: auto-spin, inertia, snap */
  useEffect(() => {
    let raf
    const tick = (t) => {
      const s = state.current
      const dt = Math.min(48, t - (s.lastT || t)) / 1000
      s.lastT = t

      if (s.target != null) {
        s.rot += (s.target - s.rot) * Math.min(1, dt * 9)
        if (Math.abs(s.target - s.rot) < 0.05) {
          s.rot = s.target
          s.target = null
          s.vel = 0
        }
      } else if (!s.dragging) {
        if (Math.abs(s.vel) > 0.5) {
          s.rot += s.vel * dt
          s.vel *= 0.94
        } else if (!hover) {
          s.rot += autoSpeed * dt
        }
      }

      if (stage.current) {
        const nodes = stage.current.children
        for (let i = 0; i < nodes.length; i++) {
          const el = nodes[i]
          if (!el.dataset.a) continue
          const a = parseFloat(el.dataset.a)
          const rel = ((a + s.rot) % 360 + 540) % 360 - 180
          const rad = (rel * Math.PI) / 180
          const cos = Math.cos(rad)
          const dip = Math.abs(Math.sin(rad)) * 16
          el.style.transform = `translateY(${dip}px) rotateY(${rel}deg) translateZ(${radius}px) rotateY(${-rel}deg) scale(${0.64 + 0.36 * Math.max(0, cos)})`
          el.style.opacity = String(0.16 + 0.84 * Math.max(0, (cos + 0.35) / 1.35))
          el.style.zIndex = String(Math.round(cos * 100) + 100)
          el.style.filter = `brightness(${0.55 + 0.45 * Math.max(0, cos)}) saturate(${0.7 + 0.3 * Math.max(0, cos)})`
          el.style.pointerEvents = cos > 0.35 ? 'auto' : 'none'
        }
        const front = Math.round(((-s.rot % 360) + 360) % 360 / step) % items.length
        setActive((prev) => (prev === front ? prev : front))
      }
      force((n) => (n + 1) % 1000000)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [radius, autoSpeed, hover, items.length, step])

  const down = (e) => {
    const s = state.current
    s.dragging = true
    s.x = e.clientX
    s.rot0 = s.rot
    s.vel = 0
    s.target = null
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const move = (e) => {
    const s = state.current
    if (!s.dragging) return
    const dx = e.clientX - s.x
    s.rot = s.rot0 + dx * 0.32
    s.vel = dx * 6
    s.x = e.clientX
    s.rot0 = s.rot - dx * 0.32 + dx * 0.32
    s.rot0 = s.rot
  }
  const up = (e) => {
    const s = state.current
    s.dragging = false
    s.target = Math.round(s.rot / step) * step
    e.currentTarget.releasePointerCapture?.(e.pointerId)
  }

  const nudge = (dir) => {
    const s = state.current
    s.target = Math.round(s.rot / step) * step + dir * step
  }

  const current = useMemo(() => items[active] || items[0], [items, active])

  return (
    <div className="ring3d">
      <div
        className="ring3d__stage"
        ref={stage}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {items.map((p, i) => (
          <Link className="ring3d__card" to={`/product/${p.id}`} key={p.id} data-a={i * step}>
            <img src={p.img} alt={p.name} draggable="false" />
            <span className="ring3d__shine" />
            <span className="ring3d__ref" style={{ backgroundImage: `url(${p.img})` }} />
          </Link>
        ))}
      </div>

      <div className="ring3d__floor" />

      <div className="ring3d__meta">
        <p className="label">In focus</p>
        <h3>{current?.name}</h3>
        <span className="ring3d__price num">{current ? money(current.price) : ''}</span>
      </div>

      <div className="ring3d__ctrl">
        <button onClick={() => nudge(-1)} aria-label="Previous"><Icon.arrow style={{ transform: 'rotate(180deg)' }} /></button>
        <div className="ring3d__dots">
          {items.map((p, i) => (
            <button
              key={p.id}
              className={i === active ? 'on' : ''}
              onClick={() => { state.current.target = Math.round(state.current.rot / step) * step - i * step + (Math.round(state.current.rot / step) * step % 360) }}
              aria-label={p.name}
            />
          ))}
        </div>
        <button onClick={() => nudge(1)} aria-label="Next"><Icon.arrow /></button>
      </div>

      <span className="ring3d__hint">Drag to spin · hover to pause</span>
    </div>
  )
}
