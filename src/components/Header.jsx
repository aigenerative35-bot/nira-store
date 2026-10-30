import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '../ui'
import { useShop } from '../store'
import { categories, asset } from '../data'

const NOTES = [
  'Complimentary shipping over ₹1,499',
  'New: the autumn handloom edit',
  'Private appointments, Bengaluru studio'
]

export default function Header() {
  const { count, wish, setDrawer } = useShop()
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const [note, setNote] = useState(0)
  const [stuck, setStuck] = useState(false)
  const [mnav, setMnav] = useState(false)
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('')

  useEffect(() => {
    const t = setInterval(() => setNote((n) => (n + 1) % NOTES.length), 4400)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMnav(false), [pathname, search])

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
            <Link to="/contact">Help centre</Link>
            <Link to="/offers">Offers</Link>
            <Link to="/account">Track order</Link>
            <Link to="/about">Our story</Link>
            <span>IN / INR</span>
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
            <select
              value={cat}
              onChange={(e) => {
                const v = e.target.value
                setCat(v)
                const p = new URLSearchParams()
                if (v) p.set('cat', v)
                if (q.trim()) p.set('q', q.trim())
                navigate('/shop' + (p.toString() ? '?' + p.toString() : ''))
              }}
              aria-label="Category"
            >
              <option value="">All categories</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for serums, tote bags, sarees, heels…"
              aria-label="Search products"
            />
            <button type="submit" aria-label="Search"><Icon.search /></button>
          </form>

          <div className="hdr__acts">
            <Link className="hact" to="/account"><Icon.user /><span>Account</span></Link>
            <Link className="hact" to="/shop?wish=1">
              <Icon.heart /><span>Wishlist</span>
              {wish.length > 0 && <span className="badge">{wish.length}</span>}
            </Link>
            <button className="hact" onClick={() => setDrawer(true)}>
              <Icon.bag /><span>Bag</span>
              {count > 0 && <span className="badge">{count}</span>}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mnav && (
          <motion.nav className="mnav" initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', stiffness: 320, damping: 34 }}>
            <div className="mnav__h">
              <span className="logo"><span className="logo__mark" style={{ width: 26, height: 26, fontSize: 13 }}>N</span><span className="logo__txt" style={{ color: '#fff', fontSize: 15 }}>Nira</span></span>
              <button className="icon-btn" onClick={() => setMnav(false)} aria-label="Close"><Icon.close /></button>
            </div>
            <ul>
              <li><Link to="/shop">All products <span>16</span></Link></li>
              {categories.map((c) => <li key={c.id}><Link to={`/shop?cat=${c.id}`}>{c.name} <span>{c.note}</span></Link></li>)}
              <li><Link to="/about">The house <span>—</span></Link></li>
              <li><Link to="/contact">Contact <span>—</span></Link></li>
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
