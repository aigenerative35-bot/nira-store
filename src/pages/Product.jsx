import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon, Qty, Reveal, Stars } from '../ui'
import ProductCard from '../components/ProductCard'
import { useShop } from '../store'
import { asset, getProduct, money, products, reviews } from '../data'

const ACC = [
  { key: 'desc', title: 'Description', body: (p) => p.desc },
  { key: 'use', title: 'How to use', body: (p) => p.use },
  { key: 'ing', title: 'Ingredients', body: (p) => p.ingredients },
  { key: 'ship', title: 'Shipping & returns', body: () => 'Dispatched within 24 hours. Free shipping above ₹1,499. 14-day returns on unopened products.' }
]

export default function Product() {
  const { id } = useParams()
  const p = getProduct(id)
  const { add, wish, toggleWish, toast } = useShop()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState(null)
  const [shade, setShade] = useState(null)
  const [img, setImg] = useState(null)
  const [open, setOpen] = useState('desc')
  const [pin, setPin] = useState('')
  const [pinMsg, setPinMsg] = useState({ text: '', ok: false })
  const [showBar, setShowBar] = useState(false)

  useEffect(() => {
    setQty(1); setSize(null); setShade(null); setImg(null); setOpen('desc'); setPinMsg({ text: '', ok: false })
  }, [id])

  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 640)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const gallery = useMemo(() => (p ? [p.img, p.img2, asset('img/lip-apply.jpg'), asset('img/flatlay.jpg')] : []), [p])
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
    if (!/^\d{6}$/.test(pin.trim())) return setPinMsg({ text: 'Enter a valid 6-digit pincode.', ok: false })
    const d = new Date()
    d.setDate(d.getDate() + 3)
    const when = d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
    setPinMsg({ text: `Delivers by ${when} · COD available · Free shipping`, ok: true })
  }

  return (
    <div className="container">
      <div className="crumb">
        <Link to="/">Home</Link><span>/</span>
        <Link to="/shop">Shop</Link><span>/</span>
        <Link to={`/shop?cat=${p.cat}`}>{p.catName}</Link><span>/</span>
        <span>{p.name}</span>
      </div>

      <div className="pdp">
        <div className="gal">
          <div className="gal__th">
            {gallery.map((g, i) => (
              <button key={i} className={img === g || (!img && i === 0) ? 'on' : ''} onClick={() => setImg(g)}>
                <img src={g} alt="" />
              </button>
            ))}
          </div>
          <div className="gal__main">
            <img src={img || p.img} alt={p.name} />
          </div>
        </div>

        <div>
          <p className="label label--maroon">{p.catName}</p>
          <h1>{p.name}</h1>
          <div className="pdp__rate">
            <Stars value={p.rating} size={12} />
            <span>{p.rating} · {p.reviews.toLocaleString('en-IN')} reviews</span>
            <span style={{ color: 'var(--muted-2)' }}>· 92% would repurchase</span>
          </div>

          <div className="pdp__price">
            <b className="num">{money(p.price)}</b>
            {p.mrp > p.price && <s className="num">{money(p.mrp)}</s>}
            {p.mrp > p.price && <em>Save {Math.round((1 - p.price / p.mrp) * 100)}%</em>}
          </div>
          <div className="pdp__emi num">
            or 3 interest-free EMIs of {money(Math.round(p.price / 3))} · Free shipping over ₹1,499
          </div>

          {p.sizes?.length > 0 && (
            <div className="opt">
              <div className="opt__lab"><span>Size</span><span style={{ textTransform: 'none', letterSpacing: 0 }}>{chosenSize} selected</span></div>
              <div className="pills">
                {p.sizes.map((s) => (
                  <button key={s} className={`pill ${chosenSize === s ? 'on' : ''}`} onClick={() => setSize(s)}>{s}</button>
                ))}
              </div>
            </div>
          )}

          {p.shades?.length > 0 && (
            <div className="opt">
              <div className="opt__lab"><span>Shade</span><span style={{ textTransform: 'none', letterSpacing: 0 }}>{chosenShade}</span></div>
              <div className="swatches">
                {p.shades.map((s) => (
                  <button
                    key={s.name}
                    className={`swatch ${chosenShade === s.name ? 'on' : ''}`}
                    style={{ background: s.hex }}
                    onClick={() => setShade(s.name)}
                    aria-label={s.name}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="buyrow">
            <Qty value={qty} onChange={setQty} />
            <button className="btn btn--block" onClick={() => add(p.id, qty, chosenSize, chosenShade)}>
              <span>Add to bag — {money(p.price * qty)}</span>
            </button>
          </div>
          <button className="btn btn--ghost btn--block" onClick={() => toggleWish(p.id)}>
            <span>{liked ? 'Saved to wishlist' : 'Save to wishlist'}</span>
          </button>

          <div className="pin">
            <input
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter pincode for delivery date"
              inputMode="numeric"
              aria-label="Pincode"
            />
            <button onClick={checkPin}>Check</button>
          </div>
          <div className={`pinmsg ${pinMsg.ok ? 'ok' : ''}`}>{pinMsg.text}</div>

          <div className="acc">
            {ACC.map((a) => (
              <div className="acc__item" key={a.key}>
                <button onClick={() => setOpen(open === a.key ? '' : a.key)}>
                  {a.title} <i>{open === a.key ? '–' : '+'}</i>
                </button>
                <AnimatePresence initial={false}>
                  {open === a.key && (
                    <motion.div
                      className="acc__body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 0.7, 0.2, 1] }}
                    >
                      <p>{a.body(p)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* reviews */}
      <section className="sec sec--tight">
        <Reveal>
          <div className="sec-head">
            <div>
              <p className="label label--maroon">Verified reviews</p>
              <h2>{p.rating} average · {p.reviews.toLocaleString('en-IN')} reviews</h2>
            </div>
          </div>
        </Reveal>
        <div className="rgrid">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.06}>
              <div className="review">
                <Stars value={r.rating} size={12} />
                <p>“{r.text}”</p>
                <footer>{r.name} · {r.city}</footer>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* related */}
      <section className="sec">
        <Reveal>
          <div className="sec-head">
            <div>
              <p className="label label--maroon">You may also like</p>
              <h2>Pairs well with this</h2>
            </div>
            <Link className="link-arrow" to="/shop">Shop all <Icon.arrow /></Link>
          </div>
        </Reveal>
        <div className="pgrid">
          {related.map((r, i) => (
            <ProductCard key={r.id} product={r} index={i} />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {showBar && (
          <motion.div
            className="stickybuy"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          >
            <div className="container stickybuy__in">
              <div>
                <b>{p.name}</b>
                <span className="num" style={{ display: 'block' }}>{money(p.price)}</span>
              </div>
              <button className="btn" onClick={() => add(p.id, qty, chosenSize, chosenShade)}>
                <span>Add to bag</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
