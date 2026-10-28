import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../ui'
import { money } from '../data'

/* Centre-stage slider — drag with mouse or finger, arrows, dots, keyboard. */
export default function Carousel({ items, eyebrow = 'Runway', cta = 'Shop now', viewAll = '/shop' }) {
  const vp = useRef(null)
  const [index, setIndex] = useState(0)
  const [dragging, setDragging] = useState(false)
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false })
  const raf = useRef(false)

  const nearest = useCallback(() => {
    const el = vp.current
    if (!el) return 0
    const centre = el.scrollLeft + el.clientWidth / 2
    let best = 0
    let dist = Infinity
    el.querySelectorAll('.cslide').forEach((s, i) => {
      const d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - centre)
      if (d < dist) {
        dist = d
        best = i
      }
    })
    return best
  }, [])

  const goTo = useCallback(
    (i, smooth = true) => {
      const el = vp.current
      if (!el) return
      const clamped = Math.max(0, Math.min(items.length - 1, i))
      const slide = el.querySelectorAll('.cslide')[clamped]
      if (!slide) return
      const left = slide.offsetLeft - (el.clientWidth - slide.offsetWidth) / 2
      el.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' })
      setIndex(clamped)
    },
    [items.length]
  )

  useEffect(() => {
    const t = setTimeout(() => goTo(0, false), 60)
    return () => clearTimeout(t)
  }, [goTo])

  /* ---- scroll → active index ---- */
  const onScroll = () => {
    if (raf.current || drag.current.active) return
    raf.current = true
    requestAnimationFrame(() => {
      setIndex(nearest())
      raf.current = false
    })
  }

  /* ---- mouse / touch drag ---- */
  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const el = vp.current
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false }
    setDragging(true)
    el.setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e) => {
    if (!drag.current.active) return
    const el = vp.current
    const dx = e.clientX - drag.current.startX
    if (Math.abs(dx) > 5) drag.current.moved = true
    el.scrollLeft = drag.current.startScroll - dx
  }

  const endDrag = (e) => {
    if (!drag.current.active) return
    const el = vp.current
    drag.current.active = false
    setDragging(false)
    el.releasePointerCapture?.(e.pointerId)
    goTo(nearest())
  }

  const onClickSlide = (i) => {
    if (drag.current.moved) {
      drag.current.moved = false
      return
    }
    if (i !== index) goTo(i)
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
      <div
        className={`carousel__vp ${dragging ? 'is-dragging' : ''}`}
        ref={vp}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        <div className="carousel__track">
          {items.map((it, i) => (
            <article
              key={`${it.title}-${i}`}
              className={`cslide ${i === index ? 'on' : ''}`}
              onClick={() => onClickSlide(i)}
              aria-current={i === index}
            >
              <div className="cslide__ph">
                <img src={it.img} alt={it.title} loading="lazy" draggable="false" />
              </div>
              <span className="cslide__idx num">{String(i + 1).padStart(2, '0')}</span>
              <span className="cslide__tag">{it.tag || eyebrow}</span>
            </article>
          ))}
        </div>
      </div>

      <div className="carousel__arrows">
        <button className="cbtn" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Previous">
          <Icon.arrow style={{ transform: 'rotate(180deg)' }} />
        </button>
        <button className="cbtn" onClick={() => goTo(index + 1)} disabled={index === items.length - 1} aria-label="Next">
          <Icon.arrow />
        </button>
      </div>

      <div className="carousel__meta">
        <p className="label label--maroon">{eyebrow}</p>
        <h3>{active.title}</h3>
        {active.price && <div className="carousel__price num">{money(active.price)}</div>}
        <div className="carousel__cta">
          <Link className="btn" to={active.to || viewAll}>
            <span>{cta}</span>
          </Link>
          <Link className="link-arrow" to={viewAll}>
            View all <Icon.arrow />
          </Link>
        </div>
      </div>

      <div className="carousel__dots">
        {items.map((_, i) => (
          <button key={i} className={i === index ? 'on' : ''} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} />
        ))}
        <span className="carousel__hint">Drag or use ← →</span>
      </div>
    </div>
  )
}
