import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../ui'

/* Cube slider — slides rotate in on a Y axis like panels of a cube */
export default function CubeSlider({ items, auto = 5600 }) {
  const [i, setI] = useState(0)
  const total = items.length

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % total), auto)
    return () => clearInterval(t)
  }, [total, auto])

  const go = (n) => setI(((n % total) + total) % total)

  return (
    <div className="cube">
      <div className="cube__stage">
        {items.map((b, idx) => {
          let off = idx - i
          if (off > total / 2) off -= total
          if (off < -total / 2) off += total
          const isActive = off === 0
          const isPrev = off === -1
          const isNext = off === 1
          return (
            <div
              key={b.title}
              className={`cube__face ${isActive ? 'is-active' : ''}`}
              style={{
                transform: `translateX(${off * 56}%) rotateY(${off * -52}deg) translateZ(${isActive ? 0 : -260}px)`,
                opacity: isActive ? 1 : isPrev || isNext ? 0.35 : 0,
                zIndex: isActive ? 10 : 5,
                pointerEvents: isActive ? 'auto' : 'none'
              }}
              aria-hidden={!isActive}
            >
              <img src={b.img} alt="Nira — product imagery" loading="lazy" />
              <div className="cube__scrim" />
              <div className="cube__in">
                <span className="cube__kicker">{b.kicker}</span>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
                <Link className="btn btn--light btn--sm" to={b.to}><span>{b.cta || 'Discover'}</span></Link>
              </div>
            </div>
          )
        })}
      </div>

      <button className="cube__nav l" onClick={() => go(i - 1)} aria-label="Previous"><Icon.arrow style={{ transform: 'rotate(180deg)' }} /></button>
      <button className="cube__nav r" onClick={() => go(i + 1)} aria-label="Next"><Icon.arrow /></button>

      <div className="cube__dots">
        {items.map((b, n) => (
          <button key={b.title} className={n === i ? 'on' : ''} onClick={() => go(n)} aria-label={b.title} />
        ))}
      </div>
    </div>
  )
}
