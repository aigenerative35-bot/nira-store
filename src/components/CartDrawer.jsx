import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Icon } from '../ui'
import { useShop } from '../store'
import { money } from '../data'

export default function CartDrawer() {
  const { drawer, setDrawer, cart, count, subtotal, setQty, remove, freeShip, total } = useShop()
  const progress = Math.min(100, (subtotal / freeShip) * 100)
  const left = Math.max(0, freeShip - subtotal)

  return (
    <AnimatePresence>
      {drawer && (
        <>
          <motion.div
            className="veil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawer(false)}
          />
          <motion.aside
            className="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            aria-label="Shopping bag"
          >
            <div className="drawer__h">
              <h3>Your bag ({count})</h3>
              <button className="icon-btn" onClick={() => setDrawer(false)} aria-label="Close">
                <Icon.close />
              </button>
            </div>

            <div className="drawer__b">
              <div className="ship">
                <p>{left > 0 ? `Add ${money(left)} more for free shipping` : 'Free shipping unlocked'}</p>
                <div className="ship__track"><i style={{ width: `${progress}%` }} /></div>
              </div>

              {cart.length === 0 ? (
                <div className="dempty">
                  <Icon.bag />
                  <p style={{ fontSize: '0.86rem' }}>Your bag is empty.</p>
                  <p style={{ fontSize: '0.76rem', marginTop: 6 }}>Bestsellers start at ₹599.</p>
                </div>
              ) : (
                cart.map((l) => (
                  <div className="dline" key={`${l.id}-${l.size}-${l.shade}`}>
                    <Link className="dline__ph" to={`/product/${l.id}`} onClick={() => setDrawer(false)}>
                      <img src={l.product.img} alt="" />
                    </Link>
                    <div>
                      <h5>{l.product.name}</h5>
                      <div className="dline__m">{[l.size, l.shade].filter(Boolean).join(' · ')}</div>
                      <div className="qty">
                        <button onClick={() => setQty(l.idx, -1)} aria-label="Decrease">–</button>
                        <span className="num">{l.qty}</span>
                        <button onClick={() => setQty(l.idx, 1)} aria-label="Increase">+</button>
                      </div>
                    </div>
                    <div>
                      <div className="dline__a num">{money(l.product.price * l.qty)}</div>
                      <button className="dline__rm" onClick={() => remove(l.idx)}>Remove</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="drawer__f">
              <div className="sline">
                <span>Subtotal</span>
                <b className="num">{money(total)}</b>
              </div>
              <p style={{ fontSize: '0.68rem', color: 'var(--muted)', margin: '4px 0 14px' }}>
                Taxes included. Shipping calculated at checkout.
              </p>
              <Link className="btn btn--block" to="/checkout" onClick={() => setDrawer(false)} style={{ marginBottom: 8 }}>
                <span>Checkout</span>
              </Link>
              <Link className="btn btn--ghost btn--block" to="/cart" onClick={() => setDrawer(false)}>
                <span>View bag</span>
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
