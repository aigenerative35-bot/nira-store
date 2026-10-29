import { Link } from 'react-router-dom'
import { Icon } from '../ui'
import { asset } from '../data'

const STORES = [
  {
    city: 'Bengaluru',
    addr: 'Nira Studio, 4th floor, 12 Lavelle Road, Bengaluru 560001',
    hours: 'Mon–Sat, 11am – 8pm',
    phone: '+91 98860 00000',
    note: 'Flagship · skincare consultations and handloom fittings'
  },
  {
    city: 'Mumbai',
    addr: 'Unit 3, Kala Ghoda, 22 Rampart Row, Mumbai 400001',
    hours: 'Tue–Sun, 12pm – 8pm',
    phone: '+91 98860 00001',
    note: 'Atelier · bag repairs and monogramming'
  },
  {
    city: 'New Delhi',
    addr: 'The Chanakya, Chanakyapuri, New Delhi 110021',
    hours: 'Mon–Sun, 11am – 9pm',
    phone: '+91 98860 00002',
    note: 'Counter · full edit, private appointments'
  }
]

export default function Stores() {
  return (
    <div className="container">
      <div className="crumb"><Link to="/">Home</Link><span>/</span><span>Stores</span></div>

      <div className="phead">
        <h1>Stores &amp; appointments</h1>
        <p>Three rooms in India. Book a fifteen-minute shade match, a handloom fitting, or a repair for a bag you already own.</p>
      </div>

      <section className="sec sec--tight">
        <div className="stores">
          {STORES.map((s) => (
            <article className="store" key={s.city}>
              <h3>{s.city}</h3>
              <p>{s.addr}</p>
              <dl>
                <dt>Hours</dt><dd>{s.hours}</dd>
                <dt>Phone</dt><dd>{s.phone}</dd>
                <dt>Inside</dt><dd>{s.note}</dd>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="wideband" style={{ marginBottom: 'var(--sec)' }}>
        <img src={asset('img/hero-bag.jpg')} alt="" />
        <div className="container wideband__in">
          <p className="label">Private appointments</p>
          <h2>Fifteen minutes, <em>one room, no queue.</em></h2>
          <div style={{ marginTop: 26 }}>
            <Link className="btn btn--light" to="/contact"><span>Book a slot</span></Link>
          </div>
        </div>
      </section>

      <section className="sec sec--tight">
        <div className="trust">
          <div className="trust__i"><Icon.truck /><div><b>Same-day, Bengaluru</b><span>Order before 2pm</span></div></div>
          <div className="trust__i"><Icon.check /><div><b>Free alterations</b><span>Handloom and suits</span></div></div>
          <div className="trust__i"><Icon.heart /><div><b>Bag aftercare</b><span>Repairs, forever</span></div></div>
          <div className="trust__i"><Icon.sound /><div><b>Shade matching</b><span>Free, in-store or video</span></div></div>
        </div>
      </section>
    </div>
  )
}
