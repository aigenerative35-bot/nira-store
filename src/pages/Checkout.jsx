import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '../ui'
import { useShop } from '../store'
import { money } from '../data'

const STATES = ['Karnataka', 'Maharashtra', 'Delhi', 'Tamil Nadu', 'Telangana', 'West Bengal', 'Gujarat', 'Rajasthan', 'Kerala', 'Uttar Pradesh']

const STEPS = ['Contact', 'Address', 'Payment']

export default function Checkout() {
  const { cart, subtotal, discount, shipping, total, clear, toast } = useShop()
  const [step, setStep] = useState(0)
  const [placed, setPlaced] = useState(null)
  const [pay, setPay] = useState('upi')
  const [errs, setErrs] = useState({})
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', pincode: '', city: '', state: '', note: ''
  })
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

  const next = () => {
    if (step === 0 && !validate(['name', 'email', 'phone'])) return toast('Please complete the contact fields')
    if (step === 1 && !validate(['address', 'pincode', 'city', 'state'])) return toast('Please complete the address fields')
    setStep((s) => Math.min(2, s + 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const place = () => {
    if (!cart.length) return toast('Your bag is empty')
    const id = 'NR' + Math.floor(100000 + Math.random() * 899999)
    setPlaced({ id, total, name: form.name })
    clear()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (placed) {
    return (
      <div className="container">
        <motion.div className="done" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="done__tick"><Icon.check /></div>
          <h2>Order placed</h2>
          <p>
            Thank you{placed.name ? `, ${placed.name.split(' ')[0]}` : ''}. Order <b>{placed.id}</b> for{' '}
            <b className="num">{money(placed.total)}</b> is confirmed — we have emailed the receipt and will dispatch within 24 hours.
          </p>
          <div style={{ marginTop: 28, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link className="btn" to="/shop"><span>Keep shopping</span></Link>
            <Link className="btn btn--ghost" to="/"><span>Back home</span></Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="crumb">
        <Link to="/">Home</Link><span>/</span><Link to="/cart">Bag</Link><span>/</span><span>Checkout</span>
      </div>
      <div className="phead">
        <h1>Checkout</h1>
        <p>Three short steps. No account needed — we email the receipt.</p>
      </div>

      <div className="stepsbar">
        {STEPS.map((s, i) => (
          <div key={s} className={i === step ? 'on' : ''}>
            <b>{i + 1}</b>{s}
            {i < STEPS.length - 1 && <i />}
          </div>
        ))}
      </div>

      <div className="cowrap">
        <div>
          {step === 0 && (
            <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}>
              <div className="fsec">
                <h3>Contact</h3>
                <div className="frow">
                  <div className="field">
                    <label>Full name</label>
                    <input value={form.name} onChange={set('name')} placeholder="Ananya Rao" autoComplete="name" />
                    <span className="err">{errs.name}</span>
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <input value={form.email} onChange={set('email')} placeholder="you@email.com" autoComplete="email" />
                    <span className="err">{errs.email}</span>
                  </div>
                  <div className="field">
                    <label>Phone</label>
                    <input value={form.phone} onChange={set('phone')} placeholder="98765 43210" inputMode="numeric" autoComplete="tel" />
                    <span className="err">{errs.phone}</span>
                  </div>
                  <div className="field">
                    <label>Delivery note (optional)</label>
                    <input value={form.note} onChange={set('note')} placeholder="Leave at reception" />
                    <span className="err" />
                  </div>
                </div>
              </div>
              <button className="btn" onClick={next}><span>Continue to address</span></button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}>
              <div className="fsec">
                <h3>Shipping address</h3>
                <div className="frow">
                  <div className="field full">
                    <label>Address</label>
                    <input value={form.address} onChange={set('address')} placeholder="Flat, building, street" autoComplete="street-address" />
                    <span className="err">{errs.address}</span>
                  </div>
                  <div className="field">
                    <label>Pincode</label>
                    <input value={form.pincode} onChange={set('pincode')} placeholder="560001" inputMode="numeric" maxLength={6} autoComplete="postal-code" />
                    <span className="err">{errs.pincode}</span>
                  </div>
                  <div className="field">
                    <label>City</label>
                    <input value={form.city} onChange={set('city')} placeholder="Bengaluru" autoComplete="address-level2" />
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
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button className="btn btn--ghost" onClick={() => setStep(0)}><span>Back</span></button>
                <button className="btn" onClick={next}><span>Continue to payment</span></button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}>
              <div className="fsec" style={{ borderBottom: 0 }}>
                <h3>Payment</h3>
                <div className="payopt">
                  {[
                    ['upi', 'UPI · GPay, PhonePe, Paytm'],
                    ['card', 'Card · Visa, Mastercard, RuPay'],
                    ['cod', 'Cash on delivery · up to ₹5,000']
                  ].map(([k, label]) => (
                    <label key={k} className={pay === k ? 'on' : ''} onClick={() => setPay(k)}>
                      <input type="radio" name="pay" checked={pay === k} readOnly /> {label}
                    </label>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button className="btn btn--ghost" onClick={() => setStep(1)}><span>Back</span></button>
                <button className="btn" onClick={place}><span>Place order — {money(total)}</span></button>
              </div>
              <p style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: 14 }}>
                Demo checkout — no payment is taken and no data leaves your browser.
              </p>
            </motion.div>
          )}
        </div>

        <aside className="summary">
          <h3>Order summary</h3>
          {cart.map((l) => (
            <div className="sline" key={`${l.id}-${l.size}-${l.shade}`}>
              <span>{l.product.name} × {l.qty}</span>
              <span className="num">{money(l.product.price * l.qty)}</span>
            </div>
          ))}
          <div className="sline" style={{ borderTop: '1px solid var(--line)', marginTop: 8, paddingTop: 12 }}>
            <span>Subtotal</span><span className="num">{money(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="sline" style={{ color: 'var(--maroon)' }}>
              <span>Discount</span><span className="num">−{money(discount)}</span>
            </div>
          )}
          <div className="sline"><span>Shipping</span><span className="num">{shipping ? money(shipping) : 'Free'}</span></div>
          <div className="sline total"><span>Total</span><b className="num">{money(total)}</b></div>
          <button className="btn btn--ghost btn--block" style={{ marginTop: 14 }} onClick={() => navigate('/cart')}>
            <span>Edit bag</span>
          </button>
        </aside>
      </div>
    </div>
  )
}
