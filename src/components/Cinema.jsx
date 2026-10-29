import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Icon } from '../ui'

/* Cinematic full-bleed video band: scroll-linked zoom, letter-spaced reveal */
export default function Cinema({ src, poster, label, lines = [], text, cta, to = '/shop' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1])
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const fade = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0.35, 1, 1, 0.4])

  return (
    <section className="cinema" ref={ref}>
      <motion.div className="cinema__media" style={{ scale, y }}>
        <video src={src} poster={poster} muted loop playsInline autoPlay preload="metadata" />
      </motion.div>
      <div className="cinema__scrim" />
      <motion.div className="container cinema__in" style={{ opacity: fade }}>
        <p className="label">{label}</p>
        <h2>
          {lines.map((l, i) => (
            <span key={l}>
              <b className="line" style={{ '--d': `${0.15 + i * 0.14}s` }}>{l}</b>
            </span>
          ))}
        </h2>
        <p className="cinema__text">{text}</p>
        <Link className="btn btn--light" to={to}>
          <span>{cta}</span>
          <Icon.arrow />
        </Link>
      </motion.div>
      <div className="cinema__grain" />
    </section>
  )
}
