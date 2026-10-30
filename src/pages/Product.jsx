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

  useEffect(() => {
    setQty(1); setSize(null); setShade(null); setIdx(0); setOpen('desc'); setPinMsg({ text: '', ok: false })
    window.scrollTo({ top: 0 })
  }, [id])

  const gallery = useMemo(
    () => (p ? [p.img, p.img2, asset('img/lip-apply.jpg'), asset('img/saree-jewel.jpg'), asset('img/flatlay.jpg')] : []),
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

  return (
    <div className="pdp2">
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
              <img src={g} alt="" />
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
                <em>Size guide</em>
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
