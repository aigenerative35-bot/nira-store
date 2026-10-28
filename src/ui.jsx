import { motion } from 'framer-motion'

/* ---------- icons ---------- */
const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.2, strokeLinecap: 'round', strokeLinejoin: 'round' }
export const Icon = {
  search: (p) => (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="M16.5 16.5 21 21" />
    </svg>
  ),
  heart: (p) => (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M12 20s-7-4.4-7-9.3A4 4 0 0 1 12 8a4 4 0 0 1 7 2.7C19 15.6 12 20 12 20z" />
    </svg>
  ),
  bag: (p) => (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M5 8h14l-1.2 12H6.2z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  ),
  user: (p) => (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
    </svg>
  ),
  menu: (p) => (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  close: (p) => (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  eye: (p) => (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  ),
  arrow: (p) => (
    <svg viewBox="0 0 24 24" {...s} {...p} width="14" height="14">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  ),
  check: (p) => (
    <svg viewBox="0 0 24 24" {...s} {...p} strokeWidth={2}>
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  ),
  star: (p) => (
    <svg viewBox="0 0 24 24" {...p}>
      <path d="M12 3l2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 16.9 6.4 20.1l1.4-6.3L3 9.5l6.4-.6z" />
    </svg>
  ),
  play: (p) => (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M8 5l11 7-11 7z" />
    </svg>
  ),
  pause: (p) => (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M9 5v14M15 5v14" />
    </svg>
  ),
  mute: (p) => (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M4 9h4l5-4v14l-5-4H4z" />
      <path d="M17 9l4 6M21 9l-4 6" />
    </svg>
  ),
  sound: (p) => (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M4 9h4l5-4v14l-5-4H4z" />
      <path d="M17 9a4 4 0 0 1 0 6" />
    </svg>
  ),
  chat: (p) => (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M21 12a8 8 0 0 1-8 8H8l-4 3v-5.6A8 8 0 0 1 13 4a8 8 0 0 1 8 8z" />
    </svg>
  ),
  share: (p) => (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M12 15V3M8 7l4-4 4 4" />
      <path d="M4 13v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
    </svg>
  ),
  truck: (p) => (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M2 7h11v9H2zM13 10h5l3 3v3h-8z" />
      <circle cx="6" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </svg>
  )
}

/* ---------- stars ---------- */
export function Stars({ value = 5, size = 10 }) {
  return (
    <div className="stars" aria-label={`${value} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon.star key={i} width={size} height={size} style={{ opacity: i < Math.round(value) ? 1 : 0.26 }} />
      ))}
    </div>
  )
}

/* ---------- scroll reveal ---------- */
export function Reveal({ children, delay = 0, y = 26, className = '', once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-8% 0px -6% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- marquee ---------- */
export function Marquee({ items }) {
  const row = (
    <span>
      {items.map((t, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 22 }}>
          {t}
          <i />
        </span>
      ))}
    </span>
  )
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row}
        {row}
      </div>
    </div>
  )
}

/* ---------- qty stepper ---------- */
export function Qty({ value, onChange, min = 1, max = 9 }) {
  return (
    <div className="qty">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} aria-label="Decrease">
        –
      </button>
      <span className="num">{value}</span>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} aria-label="Increase">
        +
      </button>
    </div>
  )
}
