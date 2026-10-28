import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../ui'
import { useShop } from '../store'
import { money, products } from '../data'

const HINTS = ['vitamin c', 'tote', 'lipstick', 'heels', 'saree', 'body butter']

export default function SearchOverlay() {
  const { search, setSearch } = useShop()
  const [q, setQ] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (search) {
      setQ('')
      setTimeout(() => inputRef.current?.focus(), 80)
    }
  }, [search])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setSearch(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setSearch])

  const hits = useMemo(() => {
    const t = q.toLowerCase().trim()
    if (!t) return products.slice(0, 4)
    return products.filter((p) => `${p.name} ${p.catName} ${p.short}`.toLowerCase().includes(t)).slice(0, 7)
  }, [q])

  const go = (id) => {
    setSearch(false)
    navigate(`/product/${id}`)
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
            className="searchp"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          >
            <div className="container">
              <div className="srow">
                <Icon.search />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search serums, bags, heels…"
                  aria-label="Search"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && hits[0]) go(hits[0].id)
                  }}
                />
                <button className="icon-btn" onClick={() => setSearch(false)} aria-label="Close">
                  <Icon.close />
                </button>
              </div>
              <div className="shints">
                {HINTS.map((h) => (
                  <button key={h} onClick={() => setQ(h)}>{h}</button>
                ))}
              </div>
              <div className="sres">
                {hits.length === 0 && (
                  <div className="sitem" style={{ color: 'var(--muted)' }}>
                    No matches. Try “serum” or “tote”.
                  </div>
                )}
                {hits.map((p) => (
                  <div className="sitem" key={p.id} onClick={() => go(p.id)}>
                    <span>
                      {p.name} <small>{p.catName}</small>
                    </span>
                    <span className="num">{money(p.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
