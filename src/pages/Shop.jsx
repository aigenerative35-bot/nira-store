import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import { Icon, Reveal } from '../ui'
import { categories, products } from '../data'
import { useShop } from '../store'

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'low', label: 'Price: low to high' },
  { id: 'high', label: 'Price: high to low' },
  { id: 'rating', label: 'Top rated' }
]

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const { wish } = useShop()
  const cat = params.get('cat') || 'all'
  const q = (params.get('q') || '').toLowerCase().trim()
  const [sort, setSort] = useState(params.get('sort') || 'featured')
  const onlyWish = params.get('wish') === '1'
  const maxPrice = parseInt(params.get('max') || '0', 10) || 0
  const minRating = parseFloat(params.get('rating') || '0') || 0
  const PER_PAGE = 10
  const page = Math.max(1, parseInt(params.get('page') || '1', 10) || 1)

  const list = useMemo(() => {
    let out = products.filter((p) => cat === 'all' || p.cat === cat)
    if (q) out = out.filter((p) => `${p.name} ${p.catName} ${p.short}`.toLowerCase().includes(q))
    if (onlyWish) out = out.filter((p) => wish.includes(p.id))
    if (maxPrice) out = out.filter((p) => p.price <= maxPrice)
    if (minRating) out = out.filter((p) => p.rating >= minRating)
    if (sort === 'low') out = [...out].sort((a, b) => a.price - b.price)
    if (sort === 'high') out = [...out].sort((a, b) => b.price - a.price)
    if (sort === 'rating') out = [...out].sort((a, b) => b.rating - a.rating)
    return out
  }, [cat, sort, onlyWish, wish, q, maxPrice, minRating])

  const pageCount = Math.max(1, Math.ceil(list.length / PER_PAGE))
  const current = Math.min(page, pageCount)
  const shown = list.slice((current - 1) * PER_PAGE, current * PER_PAGE)

  const goPage = (n) => {
    const next = new URLSearchParams(params)
    if (n <= 1) next.delete('page')
    else next.set('page', String(n))
    setParams(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const setCat = (id) => {
    const next = new URLSearchParams(params)
    if (id === 'all') next.delete('cat')
    else next.set('cat', id)
    next.delete('wish')
    next.delete('page')
    setParams(next)
  }

  return (
    <div className="container">
      <div className="crumb">
        <Link to="/">Home</Link><span>/</span><span>{onlyWish ? 'Wishlist' : 'Shop'}</span>
      </div>

      <div className="phead">
        <h1>
          {onlyWish
            ? 'Your wishlist'
            : q
            ? `Results for “${params.get('q')}”`
            : cat === 'all'
            ? 'All products'
            : categories.find((c) => c.id === cat)?.name}
        </h1>
        <p>
          {onlyWish
            ? 'Everything you have saved. Move a piece to the bag when you are ready.'
            : 'Sixteen pieces across skincare, body, makeup, bags, suits and heels. Filter by category, sort by what matters.'}
        </p>
      </div>

      <div className="shopbar">
        <div className="shop-search">
            <Icon.search />
            <input
              value={q}
              onChange={(e) => setParams((prev) => { const n = new URLSearchParams(prev); if (e.target.value) n.set('q', e.target.value); else n.delete('q'); return n })}
              placeholder="Search products, categories…"
              aria-label="Search"
            />
          </div>
          <div className="chips">
          <button className={`chip ${cat === 'all' && !onlyWish ? 'on' : ''}`} onClick={() => setCat('all')}>All</button>
          {categories.map((c) => (
            <button key={c.id} className={`chip ${cat === c.id ? 'on' : ''}`} onClick={() => setCat(c.id)}>
              {c.name}
            </button>
          ))}
        </div>
        <div className="filters">
          <label className="filters__i">
            <span>Max price</span>
            <select
              value={maxPrice || ''}
              onChange={(e) => { const n = new URLSearchParams(params); if (e.target.value) n.set('max', e.target.value); else n.delete('max'); n.delete('page'); setParams(n) }}
            >
              <option value="">Any</option>
              {[999, 1499, 2499, 3999, 6499].map((v) => <option key={v} value={v}>Under ₹{v.toLocaleString('en-IN')}</option>)}
            </select>
          </label>
          <label className="filters__i">
            <span>Rating</span>
            <select
              value={minRating || ''}
              onChange={(e) => { const n = new URLSearchParams(params); if (e.target.value) n.set('rating', e.target.value); else n.delete('rating'); n.delete('page'); setParams(n) }}
            >
              <option value="">Any</option>
              <option value="4.5">4.5 &amp; up</option>
              <option value="4">4.0 &amp; up</option>
              <option value="3.5">3.5 &amp; up</option>
            </select>
          </label>
          {(maxPrice || minRating) && (
            <button className="chip" onClick={() => { const n = new URLSearchParams(params); n.delete('max'); n.delete('rating'); setParams(n) }}>
              Clear filters ✕
            </button>
          )}
        </div>
        <div className="sortbar">
          {q && (
            <button className="chip" onClick={() => { const n = new URLSearchParams(params); n.delete('q'); setParams(n) }}>
              “{params.get('q')}” ✕
            </button>
          )}
          <span className="num">{list.length} items</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {list.length === 0 ? (
        <Reveal>
          <div className="empty">
            {onlyWish ? (
              <>
                <p>Nothing saved yet.</p>
                <Link className="link-u" to="/shop" style={{ display: 'inline-block', marginTop: 14 }}>
                  Browse the edit
                </Link>
              </>
            ) : (
              <p>Nothing in this edit yet.</p>
            )}
          </div>
        </Reveal>
      ) : (
        <motion.div className="pgrid pgrid--big" layout style={{ padding: 'clamp(20px,3vw,40px) 0 var(--sec)' }}>
          {shown.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </motion.div>
      )}

      {pageCount > 1 && (
        <nav className="pager" aria-label="Pagination">
          <button onClick={() => goPage(current - 1)} disabled={current === 1} aria-label="Previous page">
            <Icon.arrow style={{ transform: 'rotate(180deg)' }} />
          </button>
          {Array.from({ length: pageCount }, (_, n) => (
            <button
              key={n}
              className={n + 1 === current ? 'on' : ''}
              onClick={() => goPage(n + 1)}
            >
              {n + 1}
            </button>
          ))}
          <button onClick={() => goPage(current + 1)} disabled={current === pageCount} aria-label="Next page">
            <Icon.arrow />
          </button>
        </nav>
      )}

      <div style={{ paddingBottom: 'var(--sec)', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link className="btn btn--ghost" to="/about"><span>Our story</span></Link>
        <Link className="btn btn--ghost" to="/contact"><span>Need a shade match?</span></Link>
        <span className="label" style={{ alignSelf: 'center', marginLeft: 'auto' }}>
          <Icon.truck style={{ display: 'inline', width: 16, height: 16, verticalAlign: '-3px', marginRight: 8 }} />
          Free shipping over ₹1,499
        </span>
      </div>
    </div>
  )
}
