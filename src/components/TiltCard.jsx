import { useRef, useState } from 'react'

/* 3D tilt wrapper — pointer-driven perspective with a moving glare */
export default function TiltCard({ children, max = 9, className = '' }) {
  const ref = useRef(null)
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, on: false })

  const move = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    setT({
      rx: (0.5 - py) * max * 2,
      ry: (px - 0.5) * max * 2,
      gx: px * 100,
      gy: py * 100,
      on: true
    })
  }

  const leave = () => setT({ rx: 0, ry: 0, gx: 50, gy: 50, on: false })

  return (
    <div
      ref={ref}
      className={`tilt ${className}`}
      onPointerMove={move}
      onPointerLeave={leave}
      style={{
        transform: `perspective(900px) rotateX(${t.rx}deg) rotateY(${t.ry}deg) scale(${t.on ? 1.015 : 1})`,
        transition: t.on ? 'transform 80ms linear' : 'transform 500ms cubic-bezier(.22,.7,.2,1)'
      }}
    >
      {children}
      <span
        className="tilt__glare"
        style={{ opacity: t.on ? 1 : 0, background: `radial-gradient(320px circle at ${t.gx}% ${t.gy}%, rgba(255,255,255,.42), transparent 60%)` }}
      />
    </div>
  )
}
