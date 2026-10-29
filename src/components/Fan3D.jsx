import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { money } from '../data'
import { Icon } from '../ui'

/* Fanned 3D cards — no absolute positioning, pointer-parallax on the stage */
const ARC = [
  { r: -13, y: 34, s: 0.9 },
  { r: -6, y: 12, s: 0.96 },
  { r: 0, y: 0, s: 1 },
  { r: 6, y: 12, s: 0.96 },
  { r: 13, y: 34, s: 0.9 }
]

export default function Fan3D({ items }) {
  const stage = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  const move = (e) => {
    const el = stage.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setTilt({ rx: -py * 6, ry: px * 8 })
  }

  return (
    <section className="fan3">
      <div className="fan3__head">
        <p className="label">The edit, in depth</p>
        <h2>Five pieces. <em>One frame.</em></h2>
      </div>

      <div
        className="fan3__stage"
        ref={stage}
        onPointerMove={move}
        onPointerLeave={() => setTilt({ rx: 0, ry: 0 })}
        style={{ transform: `perspective(1400px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      >
        {items.slice(0, 5).map((p, i) => {
          const a = ARC[i]
          return (
            <Link
              className="fan3__card"
              key={p.id}
              to={`/product/${p.id}`}
              style={{
                '--r': `${a.r}deg`,
                '--y': `${a.y}px`,
                '--s': a.s,
                zIndex: 10 - Math.abs(i - 2)
              }}
            >
              <img src={p.img} alt={p.name} loading="lazy" />
              <span className="fan3__cap">
                <b>{p.name}</b>
                <i className="num">{money(p.price)}</i>
              </span>
            </Link>
          )
        })}
      </div>

      <div className="fan3__foot">
        <Link className="btn btn--ghost" to="/shop"><span>Shop all pieces</span><Icon.arrow /></Link>
      </div>
    </section>
  )
}
