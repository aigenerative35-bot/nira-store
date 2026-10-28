import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Qty, Stars } from '../ui'
import { useShop } from '../store'
import { money } from '../data'

export default function QuickView() {
  const { quickView: p, setQuickView, add } = useShop()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState(null)
  const [shade, setShade] = useState(null)

  const close = () => {
    setQuickView(null)
    setQty(1)
    setSize(null)
    setShade(null)
  }

  return (
    <AnimatePresence>
      {p && (
        <>
          <motion.div
            className="veil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.div
            className="modal"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease: [0.22, 0.7, 0.2, 1] }}
            role="dialog"
            aria-label={p.name}
          >
            <div className="modal__grid">
              <div className="modal__ph">
                <img src={p.img} alt={p.name} />
              </div>
              <div className="modal__b">
                <button className="modal__x" onClick={close} aria-label="Close">
                  <Icon.close />
                </button>
                <p className="label label--maroon">{p.catName}</p>
                <h3>{p.name}</h3>
                <div className="pdp__rate">
                  <Stars value={p.rating} size={12} />
                  <span>{p.rating} · {p.reviews.toLocaleString('en-IN')} reviews</span>
                </div>
                <div className="pdp__price">
                  <b className="num">{money(p.price)}</b>
                  {p.mrp > p.price && <s className="num">{money(p.mrp)}</s>}
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--muted)', margin: '10px 0 16px' }}>{p.short}</p>

                {p.sizes?.length > 0 && (
                  <div className="opt">
                    <div className="opt__lab"><span>Size</span></div>
                    <div className="pills">
                      {p.sizes.map((s) => (
                        <button key={s} className={`pill ${(size ?? p.sizes[0]) === s ? 'on' : ''}`} onClick={() => setSize(s)}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {p.shades?.length > 0 && (
                  <div className="opt">
                    <div className="opt__lab"><span>Shade</span></div>
                    <div className="swatches">
                      {p.shades.map((s) => (
                        <button
                          key={s.name}
                          className={`swatch ${(shade ?? p.shades[0].name) === s.name ? 'on' : ''}`}
                          style={{ background: s.hex }}
                          onClick={() => setShade(s.name)}
                          aria-label={s.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="buyrow" style={{ marginTop: 18 }}>
                  <Qty value={qty} onChange={setQty} />
                  <button
                    className="btn btn--block"
                    onClick={() => {
                      add(p.id, qty, size ?? p.sizes?.[0], shade ?? p.shades?.[0]?.name)
                      close()
                    }}
                  >
                    <span>Add to bag</span>
                  </button>
                </div>
                <Link className="link-u" to={`/product/${p.id}`} onClick={close}>
                  Full product page
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
