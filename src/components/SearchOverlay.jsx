import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../ui'
import { useShop } from '../store'
import { categories, money, products } from '../data'

const HINTS = ['vitamin c', 'tote', 'lipstick', 'heels', 'saree', 'body butter']
const RECENT = 'nira_recent_search_v1'

const readRecent = () => {
  try { return JSON.parse(localStorage.getItem(RECENT)) || [] } catch { return [] }
}

export default function SearchOverlay() {
  const { search, setSearch } = useShop()
  const [q, setQ] = useState('')
  const [recent, setRecent] = useState(readRecent)
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (search) {
      setQ('')
      setActive(0)
      setRecent(readRecent())
      setTimeout(() => inputRef.current?.focus(), 80)
    }
  }, [search])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setSearch(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setSearch])

  const term = q.toLowerCase().trim()

  const hits = useMemo(() => {
    if (!term) return products.slice(0, 4)
    return products
      .filter((p) => `${p.name} ${p.catName} ${p.short}`.toLowerCase().includes(term))
      .slice(0, 7)
  }, [term])

  const cats = useMemo(
    () => (term ? categories.filter((c) => c.name.toLowerCase().includes(term)).slice(0, 3) : []),
    [term]
  )

  const remember = (t) => {
    if (!t) return
    try {
      const next = [t, ...readRecent().filter((x) => x !== t)].slice(0, 6)
      localStorage.setItem(RECENT, JSON.stringify(next))
      setRecent(next)
    } catch {}
  }

  const go = (id) => {
    remember(term || q)
    setSearch(false)
    navigate(`/product/${id}`)
  }

  const goCat = (id) => {
    remember(term || q)
    setSearch(false)
    navigate(`/shop?cat=${id}`)
  }

  const submit = (e) => {
    e?.preventDefault()
    if (hits[active]) return go(hits[active].id)
    if (term) {
      remember(term)
      setSearch(false)
      navigate(`/shop?q=${encodeURIComponent(term)}`)
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => Math.min(i + 1, hits.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)) }
    if (e.key === 'Enter') submit(e)
  }

  return (
    <AnimatePresence>
      {search && (
        <>
          <motion.div
            className="veil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearch(false)}
          />

          <motion.div
            className="soverlay"
            role="dialog"
            aria-label="Search"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.22 }}
          >
            <form className="soverlay__bar" onSubmit={submit}>
              <Icon.search />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => { setQ(e.target.value); setActive(0) }}
                onKeyDown={onKeyDown}
                placeholder="Search serums, totes, sarees, heels…"
                aria-label="Search products"
                autoComplete="off"
              />
              <button type="button" onClick={() => setSearch(false)} aria-label="Close">✕</button>
            </form>

            {!term && recent.length > 0 && (
              <div className="soverlay__block">
                <p className="soverlay__label">Recent searches</p>
                <div className="soverlay__chips">
                  {recent.map((r) => (
                    <button key={r} onClick={() => setQ(r)}>{r}</button>
                  ))}
                </div>
              </div>
            )}

            {!term && (
              <div className="soverlay__block">
                <p className="soverlay__label">Popular right now</p>
                <div className="soverlay__chips">
                  {HINTS.map((h) => (
                    <button key={h} onClick={() => setQ(h)}>{h}</button>
                  ))}
                </div>
              </div>
            )}

            {cats.length > 0 && (
              <div className="soverlay__block">
                <p className="soverlay__label">Categories</p>
                <div className="soverlay__chips">
                  {cats.map((c) => (
                    <button key={c.id} onClick={() => goCat(c.id)}>{c.name}</button>
                  ))}
                </div>
              </div>
            )}

            <p className="soverlay__label">
              {term ? `${hits.length} result${hits.length === 1 ? '' : 's'}` : 'Bestsellers'}
            </p>

            <ul className="soverlay__list">
              {hits.map((p, i) => (
                <li key={p.id}>
                  <button className={i === active ? 'on' : ''} onClick={() => go(p.id)} onMouseEnter={() => setActive(i)}>
                    <img src={p.img} alt="" loading="lazy" />
                    <span>
                      <b>{p.name}</b>
                      <em>{p.catName}{p.stock === 0 ? ' · Sold out' : p.stock <= 5 ? ` · ${p.stock} left` : ''}</em>
                    </span>
                    <i className="num">{money(p.price)}</i>
                  </button>
                </li>
              ))}
            </ul>

            {term && hits.length === 0 && (
              <div className="soverlay__empty">
                <p>Nothing matched “{q}”.</p>
                <button onClick={() => { setSearch(false); navigate('/shop') }}>Browse the whole edit</button>
              </div>
            )}

            <p className="soverlay__foot">
              <kbd>↑</kbd><kbd>↓</kbd> to move · <kbd>Enter</kbd> to open · <kbd>Esc</kbd> to close
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
