import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '../ui'
import { useShop } from '../store'
import { categories, asset } from '../data'

const NOTES = [
  'Free shipping over ₹1,499',
  'Extra 10% off first order — code NIRA10',
  'COD available pan-India · 14-day returns'
]

const NAV = [
  { to: '/shop', label: 'Shop all', mega: true },
  { to: '/shop?cat=skincare', label: 'Skincare' },
  { to: '/shop?cat=makeup', label: 'Makeup' },
  { to: '/shop?cat=bags', label: 'Bags' },
  { to: '/shop?cat=suits', label: 'Suits' },
  { to: '/about', label: 'About' }
]

export default function Header() {
  const { count, wish, setDrawer, setSearch } = useShop()
  const [note, setNote] = useState(0)
  const [stuck, setStuck] = useState(false)
  const [over, setOver] = useState(false)
  const [mega, setMega] = useState(false)
  const [mnav, setMnav] = useState(false)
  const { pathname, search } = useLocation()
  const isHome = pathname === '/'
  const megaTimer = useRef(null)

  useEffect(() => {
    const t = setInterval(() => setNote((n) => (n + 1) % NOTES.length), 4200)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setStuck(y > 8)
      if (isHome) setOver(y < 80)
      else setOver(false)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => {
    setMnav(false)
    setMega(false)
  }, [pathname, search])

  const openMega = () => {
    clearTimeout(megaTimer.current)
    setMega(true)
  }
  const closeMega = () => {
    megaTimer.current = setTimeout(() => setMega(false), 140)
  }

  return (
    <>
      <div className="util">
        <div className="container util__in">
          <div className="util__rot">
            {NOTES.map((n, i) => (
              <span key={n} className={i === note ? 'on' : ''}>
                {n}
              </span>
            ))}
          </div>
          <div className="util__links">
            <Link to="/contact">Track order</Link>
            <Link to="/about">Our story</Link>
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
            {NAV.map((item) =>
              item.mega ? (
                <div key={item.label} className="mega-wrap" onMouseEnter={openMega} onMouseLeave={closeMega}>
                  <NavLink to={item.to} className={({ isActive }) => (isActive && pathname === '/shop' ? 'on' : '')}>
                    {item.label}
                  </NavLink>
                  <AnimatePresence>
                    {mega && (
                      <motion.div
                        className="mega"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.22 }}
                        onMouseEnter={openMega}
                        onMouseLeave={closeMega}
                      >
                        <div>
                          <h5>Categories</h5>
                          <ul>
                            {categories.slice(0, 4).map((c) => (
                              <li key={c.id}>
                                <Link to={`/shop?cat=${c.id}`}>{c.name}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5>Atelier</h5>
                          <ul>
                            <li><Link to="/shop?cat=bags">Bags</Link></li>
                            <li><Link to="/shop?cat=suits">Suits</Link></li>
                            <li><Link to="/shop?cat=heels">Heels</Link></li>
                            <li><Link to="/shop?sort=low">Under ₹1,000</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h5>Discover</h5>
                          <ul>
                            <li><Link to="/shop?sort=rating">Top rated</Link></li>
                            <li><Link to="/shop">All 16 pieces</Link></li>
                            <li><Link to="/about">The house</Link></li>
                            <li><Link to="/contact">Shade match</Link></li>
                          </ul>
                        </div>
                        <Link className="mega__promo" to="/shop?cat=skincare">
                          <img src={asset('img/serum.jpg')} alt="" />
                          <b>The 3-step ritual</b>
                          <span>Cleanse · Treat · Seal — from ₹1,899</span>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) => (isActive && search.includes(item.to.split('?')[1] || '') ? 'on' : '')}
                >
                  {item.label}
                </NavLink>
              )
            )}
          </nav>

          <Link className="logo" to="/">
            Nira
          </Link>

          <div className="hdr__r">
            <button className="icon-btn" onClick={() => setSearch(true)} aria-label="Search">
              <Icon.search />
            </button>
            <Link className="icon-btn" to="/contact" aria-label="Account">
              <Icon.user />
            </Link>
            <Link className="icon-btn" to="/shop?wish=1" aria-label="Wishlist">
              <Icon.heart />
              {wish.length > 0 && <span className="badge">{wish.length}</span>}
            </Link>
            <button className="icon-btn" onClick={() => setDrawer(true)} aria-label="Bag">
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
              <span className="logo" style={{ fontSize: '1.1rem' }}>Nira</span>
              <button className="icon-btn" onClick={() => setMnav(false)} aria-label="Close">
                <Icon.close />
              </button>
            </div>
            <ul>
              <li><Link to="/shop">Shop all <span>16</span></Link></li>
              {categories.map((c) => (
                <li key={c.id}>
                  <Link to={`/shop?cat=${c.id}`}>{c.name} <span>{c.note}</span></Link>
                </li>
              ))}
              <li><Link to="/about">About <span>—</span></Link></li>
              <li><Link to="/contact">Contact <span>—</span></Link></li>
            </ul>
            <div className="mnav__f">
              <Link className="btn btn--block" to="/cart"><span>View bag</span></Link>
              <Link className="btn btn--ghost btn--block" to="/contact"><span>Book a shade match</span></Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
