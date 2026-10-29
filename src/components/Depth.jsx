import { useRef } from 'react'
import useProgress from '../useProgress'

/* Cinematic depth: sections tilt out of perspective as they enter */
export default function Depth({ children, amount = 6, className = '' }) {
  const ref = useRef(null)
  const p = useProgress(ref, 'enter')
  const e = Math.min(1, p)
  const rotateX = amount * (1 - e)
  const y = 70 * (1 - e)
  const opacity = 0.35 + 0.65 * Math.min(1, e * 1.6)
  const scale = 0.965 + 0.035 * e

  return (
    <div className={`depth ${className}`} ref={ref} style={{ perspective: 1200 }}>
      <div style={{ transform: `rotateX(${rotateX}deg) translateY(${y}px) scale(${scale})`, opacity, transformOrigin: '50% 0%', willChange: 'transform' }}>
        {children}
      </div>
    </div>
  )
}
