import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Reveal } from '../ui'
import { useShop } from '../store'
import { money } from '../data'

export default function Cart() {
  const { cart, setQty, remove, subtotal, discount, shipping, total, promo, applyPromo } = useShop()
  const [code, setCode] = useState(promo)

  return (
    <div className="container">
      <div className="crumb">
        <Link to="/">Home</Link><span>/</span><span>Bag</span>
      </div>
      <div className="phead">
        <h1>Your bag</h1>
        <p>Free shipping over ₹1,499. COD available pan-India. Promo code NIRA10 gives 10% off.</p>
      </div>

      <div className="cartwrap">
        <div>
          {cart.length === 0 ? (
            <Reveal>
              <div className="empty">
                <p>Your bag is empty.</p>
                <Link className="btn" to="/shop" style={{ marginTop: 18, display: 'inline-flex' }}>
                  <span>Shop the edit</span>
                </Link>
              </div>
            </Reveal>
          ) : (
            cart.map((l, i) => (
              <motion.div
                className="crow"
                key={`${l.id}-${l.size}-${l.shade}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
              >
                <Link className="crow__ph" to={`/product/${l.id}`}>
                  <img src={l.product.img} alt="Nira — product imagery" />
                </Link>
                <div>
                  <Link to={`/product/${l.id}`}><h4>{l.product.name}</h4></Link>
                  <div className="crow__meta">{[l.size, l.shade].filter(Boolean).join(' · ')}</div>
                  <div className="crow__ctl">
                    <div className="qty">
                      <button onClick={() => setQty(l.idx, -1)} aria-label="Decrease">–</button>
                      <span className="num">{l.qty}</span>
                      <button onClick={() => setQty(l.idx, 1)} aria-label="Increase">+</button>
                    </div>
                    <button className="rm" onClick={() => remove(l.idx)}>Remove</button>
                  </div>
                </div>
                <div className="crow__amt num">{money(l.product.price * l.qty)}</div>
              </motion.div>
            ))
          )}
        </div>

        <aside className="summary">
          <h3>Order summary</h3>
          <div className="sline"><span>Subtotal</span><span className="num">{money(subtotal)}</span></div>
          {discount > 0 && (
            <div className="sline" style={{ color: 'var(--maroon)' }}>
              <span>Discount (NIRA10)</span><span className="num">−{money(discount)}</span>
            </div>
          )}
          <div className="sline"><span>Shipping</span><span className="num">{shipping ? money(shipping) : 'Free'}</span></div>
          <div className="sline total"><span>Total</span><b className="num">{money(total)}</b></div>

          <div className="promo">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Promo code"
              aria-label="Promo code"
            />
            <button onClick={() => applyPromo(code)}>Apply</button>
          </div>
          <div className="promomsg">{promo ? `${promo} applied — 10% off` : ''}</div>

          <Link className="btn btn--block" to="/checkout" style={{ marginTop: 12 }}>
            <span>Proceed to checkout</span>
          </Link>
          <Link className="btn btn--ghost btn--block" to="/shop" style={{ marginTop: 8 }}>
            <span>Continue shopping</span>
          </Link>
        </aside>
      </div>
    </div>
  )
}
