import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../ui'

/* Centre-mode slider — one slide at a time, by arrow, dot, drag or keyboard. */
export default function Carousel({ items, eyebrow = 'Runway style', cta = 'Shop now', viewAll = '/shop' }) {
  const vp = useRef(null)
  const [index, setIndex] = useState(0)
  const lock = useRef(false)

  const goTo = useCallback(
    (i) => {
      const el = vp.current
      if (!el) return
      const clamped = Math.max(0, Math.min(items.length - 1, i))
      const slide = el.querySelectorAll('.cslide')[clamped]
      if (!slide) return
      const left = slide.offsetLeft - (el.clientWidth - slide.offsetWidth) / 2
      el.scrollTo({ left, behavior: 'smooth' })
      setIndex(clamped)
    },
    [items.length]
  )

  useEffect(() => {
    goTo(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onScroll = () => {
    if (lock.current) return
    lock.current = true
    requestAnimationFrame(() => {
      const el = vp.current
      if (!el) return
      const slides = Array.from(el.querySelectorAll('.cslide'))
      const centre = el.scrollLeft + el.clientWidth / 2
      let best = 0
      let dist = Infinity
      slides.forEach((s, i) => {
        const d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - centre)
        if (d < dist) {
          dist = d
          best = i
        }
      })
      setIndex(best)
      lock.current = false
    })
  }

  const onKey = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      goTo(index + 1)
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goTo(index - 1)
    }
  }

  const active = items[index] || items[0]

  return (
    <div className="carousel" tabIndex={0} onKeyDown={onKey} aria-roledescription="carousel">
      <div className="carousel__vp" ref={vp} onScroll={onScroll}>
        <div className="carousel__track">
          {items.map((it, i) => (
            <article
              key={`${it.title}-${i}`}
              className={`cslide ${i === index ? 'on' : ''}`}
              onClick={() => (i === index ? null : goTo(i))}
              aria-current={i === index}
            >
              <div className="cslide__ph">
                <img src={it.img} alt={it.title} loading="lazy" />
              </div>
              <span className="cslide__tag">{it.tag || eyebrow}</span>
            </article>
          ))}
        </div>
      </div>

      <div className="carousel__meta">
        <h3>{active.title}</h3>
        <div className="carousel__cta">
          <Link className="btn" to={active.to || viewAll}>
            <span>{cta}</span>
          </Link>
          <Link className="link-arrow" to={viewAll}>
            View all <Icon.arrow />
          </Link>
        </div>
      </div>

      <div className="carousel__nav">
        <button className="cbtn" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Previous">
          <Icon.arrow style={{ transform: 'rotate(180deg)' }} />
        </button>
        <div className="cdots">
          {items.map((_, i) => (
            <button
              key={i}
              className={i === index ? 'on' : ''}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button className="cbtn" onClick={() => goTo(index + 1)} disabled={index === items.length - 1} aria-label="Next">
          <Icon.arrow />
        </button>
      </div>
    </div>
  )
}
