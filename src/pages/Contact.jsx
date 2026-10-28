import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from '../ui'
import { useShop } from '../store'

const FAQ = [
  ['Do you deliver across India?', 'Yes — 26,000+ pincodes. Metro orders arrive in 2–3 days, rest of India in 4–6.'],
  ['Is COD available?', 'COD up to ₹5,000 order value, no extra fee.'],
  ['What is the return policy?', '14 days on unopened skincare and unworn apparel with tags. Opened serums and makeup are non-returnable.'],
  ['Can I book a shade match?', 'Yes — a free 15-minute video call. Pick “Shade match” in the form and we will send a link.']
]

export default function Contact() {
  const { toast } = useShop()
  const [form, setForm] = useState({ name: '', email: '', subject: 'Order or delivery', msg: '' })
  const [sent, setSent] = useState(false)
  const [open, setOpen] = useState(0)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) return toast('Add your name and a valid email')
    setSent(true)
    toast('Message sent — we reply within a day')
    setForm({ name: '', email: '', subject: 'Order or delivery', msg: '' })
  }

  return (
    <div className="container">
      <div className="crumb"><Link to="/">Home</Link><span>/</span><span>Contact</span></div>
      <div className="phead">
        <h1>Talk to us</h1>
        <p>WhatsApp replies in about twenty minutes, 9am–9pm IST. Email within a day. Shade matching is a free 15-minute video call.</p>
      </div>

      <div className="cartwrap">
        <div>
          <form onSubmit={submit} style={{ paddingTop: 10 }}>
            <div className="frow">
              <div className="field">
                <label>Your name</label>
                <input value={form.name} onChange={set('name')} placeholder="Ananya Rao" />
              </div>
              <div className="field">
                <label>Email</label>
                <input value={form.email} onChange={set('email')} placeholder="you@email.com" />
              </div>
              <div className="field full">
                <label>What is this about</label>
                <select value={form.subject} onChange={set('subject')}>
                  <option>Order or delivery</option>
                  <option>Return or exchange</option>
                  <option>Shade match</option>
                  <option>Ingredients</option>
                  <option>Wholesale</option>
                </select>
              </div>
              <div className="field full">
                <label>Message</label>
                <textarea rows={5} value={form.msg} onChange={set('msg')} placeholder="Tell us what you need" />
              </div>
            </div>
            <button className="btn" type="submit"><span>Send message</span></button>
            <AnimatePresence>
              {sent && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ marginTop: 16, color: 'var(--maroon)', fontSize: '0.86rem' }}
                >
                  Message sent — we will reply within a day.
                </motion.p>
              )}
            </AnimatePresence>
          </form>

          <div className="acc" style={{ marginTop: 36 }}>
            {FAQ.map(([q, a], i) => (
              <div className="acc__item" key={q}>
                <button onClick={() => setOpen(open === i ? -1 : i)}>
                  {q} <i>{open === i ? '–' : '+'}</i>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      className="acc__body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        <aside className="summary">
          <h3>Studio</h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--muted)', lineHeight: 1.8 }}>
            Nira Studio<br />
            4th floor, 12 Lavelle Road<br />
            Bengaluru 560001, Karnataka<br />
            India
          </p>
          <div className="sline" style={{ borderTop: '1px solid var(--line)', marginTop: 16, paddingTop: 14 }}>
            <span>WhatsApp</span><span>+91 98860 00000</span>
          </div>
          <div className="sline"><span>Email</span><span>care@nira.studio</span></div>
          <div className="sline"><span>Hours</span><span>9am – 9pm IST</span></div>
          <div className="sline"><span>Returns</span><span>14 days</span></div>
          <Link className="btn btn--block" to="/shop" style={{ marginTop: 18 }}><span>Shop the edit</span></Link>
        </aside>
      </div>
    </div>
  )
}
