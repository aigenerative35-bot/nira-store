import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '../ui'
import { useShop } from '../store'
import { categories, asset } from '../data'

const NOTES = [
  'Free shipping over ₹1,499',
  'Extra 10% off first order — NIRA10',
  'COD available pan-India · 14-day returns'
]

const CATLINKS = [
  { to: '/shop', label: 'All' },
  ...categories.map((c) => ({ to: `/shop?cat=${c.id}`, label: c.name })),
  { to: '/shop?sort=low', label: 'Under ₹1,000' },
  { to: '/about', label: 'Our story' }
]

export default function Header() {
  const { count, wish, setDrawer } = useShop()
  const [note, setNote] = useState(0)
  const [stuck, setStuck] = useState(false)
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('')
  const [mega, setMega] = useState(false)
  const [mnav, setMnav] = useState(false)
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const megaTimer = useRef(null)

  useEffect(() => {
    const t = setInterval(() => setNote((n) => (n + 1) % NOTES.length), 4200)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMnav(false)
    setMega(false)
  }, [pathname, search])

  const submit = (e) => {
    e.preventDefault()
    const p = new URLSearchParams()
    if (q.trim()) p.set('q', q.trim())
    if (cat) p.set('cat', cat)
    navigate('/shop' + (p.toString() ? '?' + p.toString() : ''))
  }

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
            <Link to="/contact">Track order</Link>
            <Link to="/contact">Help</Link>
            <Link to="/about">Sell on Nira</Link>
          </div>
        </div>
      </div>

      <header className={`hdr ${stuck ? 'stuck' : ''}`}>
        <div className="container hdr__in">
          <button className="icon-btn burger" onClick={() => setMnav(true)} aria-label="Menu">
            <Icon.menu />
          </button>

          <Link className="logo" to="/">
            <span className="logo__mark">N</span>
            <span className="logo__txt">Nira<span>beauty &amp; atelier</span></span>
          </Link>

          <form className="searchbar" onSubmit={submit} role="search">
            <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Category">
              <option value="">All</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for serums, tote bags, heels, sarees…"
              aria-label="Search products"
            />
            <button type="submit" aria-label="Search">
              <Icon.search />
            </button>
          </form>

          <div className="hdr__acts">
            <Link className="hact" to="/contact">
              <Icon.user />
              <span>Login</span>
            </Link>
            <Link className="hact" to="/shop?wish=1">
              <Icon.heart />
              <span>Wishlist</span>
              {wish.length > 0 && <em className="badge">{wish.length}</em>}
            </Link>
            <button className="hact" onClick={() => setDrawer(true)}>
              <Icon.bag />
              <span>Cart</span>
              {count > 0 && <em className="badge">{count}</em>}
            </button>
          </div>
        </div>
      </header>

      <div className="catnav">
        <div className="container catnav__in">
          {CATLINKS.map((l) => (
            <Link key={l.label} to={l.to} className={pathname + search === l.to ? 'on' : ''}>
              {l.label}
            </Link>
          ))}
          <div className="mega-wrap" onMouseEnter={() => setMega(true)} onMouseLeave={() => {
            megaTimer.current = setTimeout(() => setMega(false), 140)
          }}>
            <button
              style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--maroon)', padding: '12px 0' }}
              onMouseEnter={() => { clearTimeout(megaTimer.current); setMega(true) }}
            >
              More ▾
            </button>
            <AnimatePresence>
              {mega && (
                <motion.div
                  className="mega"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  style={{ left: 'auto', right: 0 }}
                >
                  <div>
                    <h5>Shop by category</h5>
                    <ul>
                      {categories.slice(0, 4).map((c) => (
                        <li key={c.id}><Link to={`/shop?cat=${c.id}`}>{c.name}</Link></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5>Atelier</h5>
                    <ul>
                      <li><Link to="/shop?cat=bags">Bags</Link></li>
                      <li><Link to="/shop?cat=suits">Suits</Link></li>
                      <li><Link to="/shop?cat=heels">Heels</Link></li>
                      <li><Link to="/shop?sort=rating">Top rated</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h5>Help</h5>
                    <ul>
                      <li><Link to="/contact">Track order</Link></li>
                      <li><Link to="/contact">Returns</Link></li>
                      <li><Link to="/contact">Shade match</Link></li>
                      <li><Link to="/about">Our story</Link></li>
                    </ul>
                  </div>
                  <Link className="mega__promo" to="/shop?cat=skincare">
                    <img src={asset('img/serum.jpg')} alt="" />
                    <b>The 3-step ritual</b>
                    <span>From ₹1,899</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

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
              <span className="logo"><span className="logo__mark" style={{ width: 26, height: 26, fontSize: 13 }}>N</span><span className="logo__txt" style={{ color: '#fff', fontSize: 15 }}>Nira</span></span>
              <button className="icon-btn" onClick={() => setMnav(false)} aria-label="Close">
                <Icon.close />
              </button>
            </div>
            <ul>
              <li><Link to="/shop">All products <span>16</span></Link></li>
              {categories.map((c) => (
                <li key={c.id}>
                  <Link to={`/shop?cat=${c.id}`}>{c.name} <span>{c.note}</span></Link>
                </li>
              ))}
              <li><Link to="/about">Our story <span>—</span></Link></li>
              <li><Link to="/contact">Contact <span>—</span></Link></li>
            </ul>
            <div className="mnav__f">
              <Link className="btn btn--block" to="/cart"><span>View cart</span></Link>
              <Link className="btn btn--ghost btn--block" to="/contact"><span>Book a shade match</span></Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
