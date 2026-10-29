import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '../ui'
import { useShop } from '../store'
import { categories, asset } from '../data'

const NOTES = [
  'Complimentary shipping over ₹1,499',
  'Extra 10% off the first order — code NIRA10',
  'Cash on delivery available pan-India'
]

const NAV = [
  { to: '/shop', label: 'Shop all' },
  { to: '/shop?cat=skincare', label: 'Skincare' },
  { to: '/shop?cat=makeup', label: 'Makeup' },
  { to: '/shop?cat=bags', label: 'Bags' },
  { to: '/shop?cat=suits', label: 'Suits' },
  { to: '/about', label: 'The house' }
]

export default function Header() {
  const { count, wish, setDrawer, setSearch } = useShop()
  const { pathname, search } = useLocation()
  const [note, setNote] = useState(0)
  const [stuck, setStuck] = useState(false)
  const [over, setOver] = useState(false)
  const [mega, setMega] = useState(false)
  const [mnav, setMnav] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    const t = setInterval(() => setNote((n) => (n + 1) % NOTES.length), 4600)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const isHome = pathname === '/'
    const onScroll = () => {
      const y = window.scrollY
      setStuck(y > 6)
      setOver(isHome && y < 90)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  useEffect(() => {
    setMnav(false)
    setMega(false)
  }, [pathname, search])

  return (
    <>
      <div className="util">
        <div className="container util__in">
          <div className="util__rot">
            {NOTES.map((n, i) => (
              <span key={n} className={i === note ? 'on' : ''}>{n}</span>
            ))}
          </div>
          <div className="util__links">
            <Link to="/contact">Client care</Link>
            <Link to="/about">The house</Link>
            <span>₹ INR</span>
          </div>
        </div>
      </div>

      <header className={`hdr ${stuck ? 'stuck' : ''} ${over ? 'over' : ''}`}>
        <div className="container hdr__in">
          <button className="icon-btn burger" onClick={() => setMnav(true)} aria-label="Menu">
            <Icon.menu />
          </button>

          <nav className="nav">
            {NAV.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                className={pathname + search === n.to ? 'on' : ''}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <Link className="logo" to="/">
            <span className="logo__mark">N</span>
            <span className="logo__txt">Nira<span>beauty &amp; atelier</span></span>
          </Link>

          <div className="hdr__acts">
            <button className="hact" onClick={() => setSearch(true)} aria-label="Search">
              <Icon.search />
            </button>
            <Link className="hact" to="/shop?wish=1" aria-label="Wishlist">
              <Icon.heart />
              {wish.length > 0 && <span className="badge">{wish.length}</span>}
            </Link>
            <button className="hact" onClick={() => setDrawer(true)} aria-label="Bag">
              <Icon.bag />
              {count > 0 && <span className="badge">{count}</span>}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mnav && (
          <motion.nav
            className="mnav"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
          >
            <div className="mnav__h">
              <span className="logo">
                <span className="logo__mark" style={{ width: 28, height: 28, fontSize: 13 }}>N</span>
                <span className="logo__txt" style={{ fontSize: 15 }}>Nira</span>
              </span>
              <button className="icon-btn" onClick={() => setMnav(false)} aria-label="Close">
                <Icon.close />
              </button>
            </div>
            <ul>
              <li><Link to="/shop">Shop all <span>16</span></Link></li>
              {categories.map((c) => (
                <li key={c.id}><Link to={`/shop?cat=${c.id}`}>{c.name} <span>{c.note}</span></Link></li>
              ))}
              <li><Link to="/about">The house <span>—</span></Link></li>
              <li><Link to="/contact">Client care <span>—</span></Link></li>
            </ul>
            <div className="mnav__f">
              <Link className="btn btn--block" to="/cart"><span>View bag</span></Link>
              <Link className="btn btn--ghost btn--block" to="/contact"><span>Book an appointment</span></Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
