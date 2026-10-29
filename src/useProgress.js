import { useEffect, useRef, useState } from 'react'

/* Scroll progress of an element through the viewport, 0 → 1. rAF-throttled, no deps. */
export default function useProgress(ref, mode = 'section') {
  const [p, setP] = useState(0)
  const raf = useRef(false)

  useEffect(() => {
    const compute = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || 800
      let v
      if (mode === 'section') {
        // progress through a pinned section
        v = -r.top / Math.max(1, r.height - vh)
      } else {
        // progress from entering the viewport to reaching 45% of it
        v = (vh - r.top) / Math.max(1, vh * 0.55)
      }
      setP(Math.min(1, Math.max(0, v)))
    }
    const onScroll = () => {
      if (raf.current) return
      raf.current = true
      requestAnimationFrame(() => {
        compute()
        raf.current = false
      })
    }
    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref, mode])

  return p
}
