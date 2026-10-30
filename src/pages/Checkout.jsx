import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '../ui'
import { useShop } from '../store'
import { payWithRazorpay, isLivePayment } from '../pay'
import { money } from '../data'

const STATES = ['Karnataka', 'Maharashtra', 'Delhi', 'Tamil Nadu', 'Telangana', 'West Bengal', 'Gujarat', 'Rajasthan', 'Kerala', 'Uttar Pradesh']

const STEPS = ['Cart', 'Confirm order', 'Payment']

const PAY = [
  ['upi', 'UPI · GPay, PhonePe, Paytm', 'Instant'],
  ['card', 'Card · Visa, Mastercard, RuPay', 'Instant'],
  ['netbanking', 'Netbanking · 58 banks', 'Instant'],
  ['cod', 'Cash on delivery', 'Up to ₹5,000']
]

export default function Checkout() {
  const { cart, subtotal, discount, shipping, total, promo, applyPromo, clear, toast, placeOrder } = useShop()
  const [step, setStep] = useState(1)
  const [placed, setPlaced] = useState(null)
  const [paying, setPaying] = useState(false)
  const [pay, setPay] = useState('upi')
  const [code, setCode] = useState(promo)
  const [errs, setErrs] = useState({})
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', pincode: '', city: '', state: '', note: '' })
  const navigate = useNavigate()

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const validate = (fields) => {
    const e = {}
    fields.forEach((f) => {
      const v = (form[f] || '').trim()
      if (!v) e[f] = 'Required'
      if (f === 'email' && v && !/^\S+@\S+\.\S+$/.test(v)) e[f] = 'Enter a valid email'
      if (f === 'phone' && v && !/^\d{10}$/.test(v.replace(/\D/g, ''))) e[f] = '10 digits'
      if (f === 'pincode' && v && !/^\d{6}$/.test(v)) e[f] = '6 digits'
    })
    setErrs(e)
    return Object.keys(e).length === 0
  }

  const confirm = () => {
    if (!cart.length) return toast('Your cart is empty')
    if (!validate(['name', 'email', 'phone', 'address', 'pincode', 'city', 'state'])) {
      return toast('Please complete the address details')
    }
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const place = async () => {
    const id = 'NR' + Math.floor(100000 + Math.random() * 899999)
    setPaying(true)
    const res = await payWithRazorpay({ amount: total, name: form.name, email: form.email, phone: form.phone, orderId: id })
    setPaying(false)
    if (!res.ok) return toast('Payment cancelled')
    placeOrder({ id, total, pay, paymentId: res.paymentId })
    setPlaced({ id, total, name: form.name, pay })
    clear()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const savings = useMemo(() => discount + (shipping === 0 ? 79 : 0), [discount, shipping])

  if (placed) {
    return (
      <div className="container">
        <div className="crumb"><Link to="/">Home</Link><span>/</span><span>Order confirmed</span></div>
        <motion.div className="done" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <div className="done__tick"><Icon.check /></div>
          <h2>Order placed</h2>
          <p>
            Thank you{placed.name ? `, ${placed.name.split(' ')[0]}` : ''}. Order <b>{placed.id}</b> for{' '}
            <b className="num">{money(placed.total)}</b> is confirmed. We have emailed the receipt and will dispatch within 24 hours.
          </p>
          <div className="track">
            <div className="done"><b />Order placed</div>
            <div><b />Packed</div>
            <div><b />Shipped</div>
            <div><b />Delivered</div>
          </div>
          <div style={{ marginTop: 26, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link className="btn" to="/shop"><span>Keep shopping</span></Link>
            <Link className="btn btn--ghost" to="/contact"><span>Track order</span></Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="crumb">
        <Link to="/">Home</Link><span>/</span><Link to="/cart">Cart</Link><span>/</span><span>Checkout</span>
      </div>

      <div className="co-steps">
        {STEPS.map((s, i) => (
          <div key={s} className={i + 1 === step ? 'on' : i + 1 < step ? 'done' : ''}>
            <b>{i + 1 < step ? '✓' : i + 1}</b>{s}
            {i < STEPS.length - 1 && <i />}
          </div>
        ))}
      </div>

      <div className="co-grid">
        <div className="co-main">
          {/* address */}
          <section className="co-card">
            <h3><i>1</i> Shipping address</h3>
            {step === 2 ? (
              <div className="addr-empty">
                <Icon.check style={{ width: 18, height: 18, stroke: 'var(--green)' }} />
                <div>
                  <b>{form.name}</b> · {form.phone}
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                    {form.address}, {form.city}, {form.state} — {form.pincode}
                  </div>
                </div>
                <button className="link-u" style={{ marginLeft: 'auto' }} onClick={() => setStep(1)}>Change</button>
              </div>
            ) : (
              <>
                <div className="frow">
                  <div className="field">
                    <label>Full name</label>
                    <input value={form.name} onChange={set('name')} placeholder="Ananya Rao" autoComplete="name" />
                    <span className="err">{errs.name}</span>
                  </div>
                  <div className="field">
                    <label>Phone</label>
                    <input value={form.phone} onChange={set('phone')} placeholder="98765 43210" inputMode="numeric" autoComplete="tel" />
                    <span className="err">{errs.phone}</span>
                  </div>
                  <div className="field full">
                    <label>Address</label>
                    <input value={form.address} onChange={set('address')} placeholder="Flat, building, street, area" autoComplete="street-address" />
                    <span className="err">{errs.address}</span>
                  </div>
                  <div className="field">
                    <label>Pincode</label>
                    <input value={form.pincode} onChange={set('pincode')} placeholder="560001" inputMode="numeric" maxLength={6} />
                    <span className="err">{errs.pincode}</span>
                  </div>
                  <div className="field">
                    <label>City</label>
                    <input value={form.city} onChange={set('city')} placeholder="Bengaluru" />
                    <span className="err">{errs.city}</span>
                  </div>
                  <div className="field">
                    <label>State</label>
                    <select value={form.state} onChange={set('state')}>
                      <option value="">Select state</option>
                      {STATES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                    <span className="err">{errs.state}</span>
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <input value={form.email} onChange={set('email')} placeholder="you@email.com" autoComplete="email" />
                    <span className="err">{errs.email}</span>
                  </div>
                  <div className="field full">
                    <label>Delivery note (optional)</label>
                    <input value={form.note} onChange={set('note')} placeholder="Leave at reception" />
                  </div>
                </div>
              </>
            )}
          </section>

          {/* items */}
          <section className="co-card">
            <h3><i>2</i> Items in this order ({cart.length})</h3>
            <div className="co-items">
              {cart.length === 0 && <p style={{ fontSize: 13, color: 'var(--muted)' }}>Your cart is empty.</p>}
              {cart.map((l) => (
                <div className="co-item" key={`${l.id}-${l.size}-${l.shade}`}>
                  <Link className="co-item__ph" to={`/product/${l.id}`}>
                    <img src={l.product.img} alt="Nira — product imagery" />
                  </Link>
                  <div>
                    <h4>{l.product.name}</h4>
                    <div className="m">{[l.size, l.shade].filter(Boolean).join(' · ')} · Qty {l.qty}</div>
                    <div className="m">Free delivery · 14-day returns</div>
                  </div>
                  <div className="p num">{money(l.product.price * l.qty)}</div>
                </div>
              ))}
            </div>
          </section>

          {/* coupon */}
          <section className="co-card">
            <h3><i>3</i> Coupon &amp; payment</h3>
            <div className="coupons" style={{ marginBottom: 12 }}>
              <div className="coupon">
                <b>10%</b>
                <span>NIRA10 coupon<em>First order · max ₹500</em></span>
                <button onClick={() => { applyPromo('NIRA10'); setCode('NIRA10') }}>Use</button>
              </div>
              <div className="coupon">
                <b>₹200</b>
                <span>Above ₹1,999<em>Applied automatically</em></span>
                <button onClick={() => toast('This coupon applies automatically')}>Applied</button>
              </div>
            </div>

            <div className="payopt">
              {PAY.map(([k, label, note]) => (
                <label key={k} className={pay === k ? 'on' : ''} onClick={() => setPay(k)}>
                  <input type="radio" name="pay" checked={pay === k} readOnly /> {label}
                  <b>{note}</b>
                </label>
              ))}
            </div>
            <p style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 10 }}>
              Demo checkout — no payment is taken and no data leaves your browser.
            </p>
          </section>
        </div>

        {/* summary */}
        <aside className="co-side">
          <div className="summary">
            <h3>Order summary</h3>
            <div className="sline"><span>Items ({cart.reduce((n, l) => n + l.qty, 0)})</span><span className="num">{money(subtotal)}</span></div>
            {discount > 0 && (
              <div className="sline" style={{ color: 'var(--orange)' }}>
                <span>Coupon {promo}</span><span className="num">−{money(discount)}</span>
              </div>
            )}
            <div className="sline"><span>Shipping</span><span className="num">{shipping ? money(shipping) : 'Free'}</span></div>
            <div className="sline total"><span>Total payable</span><b className="num">{money(total)}</b></div>
            {savings > 0 && (
              <p style={{ fontSize: 12, color: 'var(--green)', marginTop: 6 }}>
                You save {money(savings)} on this order
              </p>
            )}

            <div className="promo">
              <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Promo code" aria-label="Promo code" />
              <button onClick={() => applyPromo(code)}>Apply</button>
            </div>
            <div className="promomsg">{promo ? `${promo} applied` : ''}</div>

            {step === 1 ? (
              <button className="btn btn--block" style={{ marginTop: 8 }} onClick={confirm}>
                <span>Confirm order</span>
              </button>
            ) : (
              <button className="btn btn--block" style={{ marginTop: 8 }} onClick={place} disabled={paying}>
                <span>Pay {money(total)}</span>
              </button>
            )}
            <button className="btn btn--ghost btn--block" style={{ marginTop: 8 }} onClick={() => navigate('/cart')}>
              <span>Back to cart</span>
            </button>
            <p style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 10, textAlign: 'center' }}>
              Secure payments · UPI, cards, netbanking, COD
            </p>
          </div>
        </aside>
      </div>

      <div className="co-bar">
        <div className="container co-bar__in">
          <span className="co-bar__sum">Total<b className="num">{money(total)}</b></span>
          {step === 1 ? (
            <button className="btn" onClick={confirm}><span>Confirm order</span></button>
          ) : (
            <button className="btn" onClick={place} disabled={paying}><span>{paying ? 'Processing…' : 'Place order'}</span></button>
          )}
        </div>
      </div>
    </div>
  )
}
