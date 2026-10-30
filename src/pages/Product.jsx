import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Icon, Qty, Stars } from '../ui'
import ProductCard from '../components/ProductCard'
import SocialBar from '../components/SocialBar'
import Aplus from '../components/Aplus'
import { useShop } from '../store'
import { asset, getProduct, money, products, reviews } from '../data'

const FILM = {
  skincare: { src: 'video/film.mp4', poster: 'video/poster.jpg' },
  body: { src: 'video/film.mp4', poster: 'video/poster.jpg' },
  makeup: { src: 'video/hero.mp4', poster: 'video/hero-poster.jpg' },
  bags: { src: 'video/atelier.mp4', poster: 'video/atelier-poster.jpg' },
  heels: { src: 'video/atelier.mp4', poster: 'video/atelier-poster.jpg' },
  suits: { src: 'video/loom.mp4', poster: 'video/loom-poster.jpg' }
}

const ACC = [
  { key: 'desc', title: 'Description', body: (p) => p.desc },
  { key: 'use', title: 'How to use', body: (p) => p.use },
  { key: 'ing', title: 'Ingredients', body: (p) => p.ingredients },
  { key: 'ship', title: 'Shipping & returns', body: () => 'Dispatched within 24 hours. Free shipping above ₹1,499. 14-day returns on unopened products.' }
]

export default function Product() {
  const { id } = useParams()
  const p = getProduct(id)
  const { add, wish, toggleWish, toast, setDrawer } = useShop()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState(null)
  const [shade, setShade] = useState(null)
  const [idx, setIdx] = useState(0)
  const [open, setOpen] = useState('desc')
  const [pin, setPin] = useState('')
  const [pinMsg, setPinMsg] = useState({ text: '', ok: false })
  const [guide, setGuide] = useState(false)
  const [sticky, setSticky] = useState(false)
  const [myReview, setMyReview] = useState({ text: '', rating: 5, saved: false })

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 520)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setQty(1); setSize(null); setShade(null); setIdx(0); setOpen('desc'); setPinMsg({ text: '', ok: false })
    window.scrollTo({ top: 0 })
  }, [id])

  const gallery = useMemo(
    () => (p ? [p.img, p.img2, asset('img/lip-apply.webp'), asset('img/saree-jewel.webp'), asset('img/flatlay.webp')] : []),
    [p]
  )
  const related = useMemo(
    () => (p ? products.filter((x) => x.cat === p.cat && x.id !== p.id).concat(products.filter((x) => x.cat !== p.cat)).slice(0, 4) : []),
    [p]
  )

  if (!p) {
    return (
      <div className="container">
        <div className="empty">
          <h2>Piece not found</h2>
          <Link className="link-u" to="/shop" style={{ display: 'inline-block', marginTop: 16 }}>Back to the edit</Link>
        </div>
      </div>
    )
  }

  const chosenSize = size ?? p.sizes?.[0]
  const chosenShade = shade ?? p.shades?.[0]?.name
  const liked = wish.includes(p.id)

  const checkPin = () => {
    if (!/^\d{6}$/.test(pin)) return setPinMsg({ text: 'Enter a 6-digit pincode', ok: false })
    const days = 2 + (Number(pin.slice(-1)) % 4)
    const d = new Date(Date.now() + days * 864e5)
    setPinMsg({
      text: `Delivers by ${d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} · Free`,
      ok: true
    })
  }

  const buy = () => {
    add(p.id, qty, chosenSize, chosenShade)
    setDrawer(true)
  }

  const schema = {
    '@context': 'https://schema.org', '@type': 'Product',
    name: p.name, image: [p.img, p.img2], description: p.short || p.desc,
    sku: p.id, brand: { '@type': 'Brand', name: 'Nira' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: p.rating, reviewCount: p.reviews },
    offers: { '@type': 'Offer', priceCurrency: 'INR', price: p.price, availability: 'https://schema.org/InStock' }
  }

  return (
    <div className="pdp2">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link><span>/</span>
        <Link to={`/shop?cat=${p.cat}`}>{p.catName}</Link><span>/</span>
        <span>{p.name}</span>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {/* split hero */}
      <div className="pdp2__split">
        <div className="pdp2__pane">
          <img src={gallery[idx]} alt={p.name} />
        </div>
        <div className="pdp2__pane pdp2__pane--alt">
          <video
            key={p.id}
            src={asset((FILM[p.cat] || FILM.skincare).src)}
            poster={asset((FILM[p.cat] || FILM.skincare).poster)}
            autoPlay muted loop playsInline preload="metadata"
          />
          <span className="pdp2__film">Campaign film · {p.catName}</span>
        </div>

        {/* thumbnail rail */}
        <div className="pdp2__thumbs">
          {gallery.map((g, i) => (
            <button key={g + i} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)} aria-label={`Image ${i + 1}`}>
              <img src={g} alt="Nira — product imagery" />
            </button>
          ))}
        </div>

        <button className={`pdp2__heart ${liked ? 'on' : ''}`} onClick={() => toggleWish(p.id)} aria-label="Save to wishlist">
          <Icon.heart />
        </button>

        {/* floating info card */}
        <div className="pdp2__card">
          <div className="pdp2__row">
            <h1>{p.name}</h1>
            <span className="num">{money(p.price)}</span>
          </div>
          <p className="pdp2__vat">MRP inclusive of all taxes · {p.mrp > p.price ? `${Math.round((1 - p.price / p.mrp) * 100)}% off` : 'New in'}</p>

          {p.shades?.length > 0 && (
            <div className="pdp2__opt">
              <div className="pdp2__opt-h">
                <span>Colour</span>
                <em>{chosenShade}</em>
              </div>
              <div className="pdp2__swatches">
                {p.shades.map((s) => (
                  <button
                    key={s.name}
                    className={chosenShade === s.name ? 'on' : ''}
                    style={{ background: s.hex }}
                    onClick={() => setShade(s.name)}
                    aria-label={s.name}
                  />
                ))}
              </div>
            </div>
          )}

          {p.sizes?.length > 0 && (
            <div className="pdp2__opt">
              <div className="pdp2__opt-h">
                <span>Size</span>
                <button className="pdp2__guide" onClick={() => setGuide(true)}>Size guide</button>
              </div>
              <div className="pdp2__sizes">
                {p.sizes.map((s) => (
                  <button key={s} className={chosenSize === s ? 'on' : ''} onClick={() => setSize(s)}>{s}</button>
                ))}
              </div>
            </div>
          )}

          <div className="pdp2__qty">
            <Qty value={qty} onChange={setQty} />
            <div className="pdp2__pin">
              <input
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Pincode"
                aria-label="Pincode"
              />
              <button onClick={checkPin}>Check</button>
            </div>
          </div>
          {pinMsg.text && <p className={`pdp2__pinmsg ${pinMsg.ok ? 'ok' : ''}`}>{pinMsg.text}</p>}

          <button className="pdp2__add" onClick={buy}>
            Add to bag
          </button>
          <div className="pdp2__social">
            <SocialBar product={p} compact />
          </div>
        </div>
      </div>

      {guide && (
        <div className="modal" onClick={() => setGuide(false)}>
          <div className="modal__card" onClick={(e) => e.stopPropagation()}>
            <header><h3>Size guide</h3><button onClick={() => setGuide(false)}>✕</button></header>
            <table>
              <thead><tr><th>Size</th><th>Chest (in)</th><th>Waist (in)</th><th>Length (in)</th></tr></thead>
              <tbody>
                {[['XS', 32, 26, 38], ['S', 34, 28, 39], ['M', 36, 30, 40], ['L', 38, 32, 41], ['XL', 40, 34, 42], ['Free size', '—', '—', '—']].map((r) => (
                  <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>
                ))}
              </tbody>
            </table>
            <p className="modal__note">Measured flat, garment to garment. Between sizes? Take the larger — handloom settles after the first wash.</p>
          </div>
        </div>
      )}

      <div className={`stickybar ${sticky ? 'on' : ''}`}>
        <img src={p.img} alt={p.name} />
        <div><b>{p.name}</b><span className="num">{money(p.price)}</span></div>
        <button onClick={buy}>Add to bag</button>
      </div>

      {/* details */}
      <div className="container">
        <div className="pdp2__details">
          <div className="pdp2__acc">
            {ACC.map((a) => (
              <div className={`acc__item ${open === a.key ? 'open' : ''}`} key={a.key}>
                <button className="acc__head" onClick={() => setOpen(open === a.key ? '' : a.key)}>
                  <span>{a.title}</span>
                  <Icon.arrow style={{ transform: open === a.key ? 'rotate(90deg)' : 'none' }} />
                </button>
                {open === a.key && <div className="acc__body"><p>{a.body(p)}</p></div>}
              </div>
            ))}
          </div>

          <aside className="pdp2__aside">
            <div className="pdp2__rate">
              <Stars value={p.rating} />
              <b className="num">{p.rating}</b>
              <span>{p.reviews.toLocaleString('en-IN')} reviews</span>
            </div>
            <p>“{reviews[0].text}”</p>
            <span className="pdp2__who">{reviews[0].name} — verified buyer</span>

            <div className="rform">
              <b>Write a review</b>
              {myReview.saved ? (
                <p className="rform__ok">Thanks — your review is saved on this device.</p>
              ) : (
                <>
                  <div className="rform__stars">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} className={myReview.rating >= n ? 'on' : ''} onClick={() => setMyReview({ ...myReview, rating: n })} aria-label={`${n} stars`}>★</button>
                    ))}
                  </div>
                  <textarea
                    rows={3}
                    placeholder="How did it work for you?"
                    value={myReview.text}
                    onChange={(e) => setMyReview({ ...myReview, text: e.target.value })}
                  />
                  <button
                    className="rform__btn"
                    onClick={() => {
                      if (myReview.text.trim().length < 8) return toast('Write a little more')
                      try {
                        const all = JSON.parse(localStorage.getItem('nira_reviews_v1') || '[]')
                        all.unshift({ id: p.id, ...myReview, at: Date.now() })
                        localStorage.setItem('nira_reviews_v1', JSON.stringify(all.slice(0, 50)))
                      } catch {}
                      setMyReview({ ...myReview, saved: true })
                      toast('Review saved')
                    }}
                  >
                    Post review
                  </button>
                </>
              )}
            </div>
          </aside>
        </div>

        <Aplus p={p} />

        <section className="pdp2__rel">
          <div className="sec-head">
            <div>
              <h2>You may also like</h2>
              <p>Picked from the same world</p>
            </div>
            <Link className="link-arrow" to="/shop">View all <Icon.arrow /></Link>
          </div>
          <div className="pgrid pgrid--big">
            {related.map((r, i) => <ProductCard key={r.id} product={r} index={i} />)}
          </div>
        </section>
      </div>
    </div>
  )
}
