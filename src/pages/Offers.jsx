import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../ui'
import { useShop } from '../store'
import { money, products } from '../data'

const OFFERS = [
  { code: 'NIRA10', value: '10%', title: 'First order', text: '10% off, up to ₹500, on your first order above ₹1,999.', to: '/shop' },
  { code: 'WELCOME200', value: '₹200', title: 'Welcome credit', text: 'Flat ₹200 off the moment you create an account.', to: '/account' },
  { code: 'HANDLOOM', value: '15%', title: 'Handloom edit', text: '15% off every saree and co-ord in the handloom edit.', to: '/shop?cat=suits' },
  { code: 'ATELIER', value: '₹500', title: 'Atelier bags', text: '₹500 off bags and heels above ₹4,999.', to: '/shop?cat=bags' },
  { code: 'RITUAL', value: '20%', title: 'Three-step ritual', text: 'Buy the cleanser, serum and cream together — 20% off.', to: '/shop?cat=skincare' },
  { code: 'FREESHIP', value: 'Free', title: 'Delivery', text: 'Free delivery on every order today, no minimum.', to: '/shop' }
]

export default function Offers() {
  const { toast } = useShop()
  const stage = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const move = (e) => {
    const el = stage.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setTilt({
      x: ((e.clientY - r.top) / r.height - 0.5) * -10,
      y: ((e.clientX - r.left) / r.width - 0.5) * 12
    })
  }

  const copy = (code) => {
    try {
      navigator.clipboard?.writeText(code)
      toast(`Code ${code} copied`)
    } catch {
      toast(`Use code ${code}`)
    }
  }

  return (
    <div className="offers">
      <div className="offers__head">
        <p className="label label--maroon">Offers</p>
        <h1>Every offer, one place</h1>
        <p>Six ways to shop the house this month. Copy a code, or tap through to the edit.</p>
      </div>

      <div
        className="offers__stage"
        ref={stage}
        onPointerMove={move}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        style={{ transform: `perspective(1400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        {OFFERS.map((o, i) => (
          <article
            className="offer3d"
            key={o.code}
            style={{ '--i': i, '--d': `${i * 0.07}s` }}
          >
            <div className="offer3d__face">
              <span className="offer3d__value num">{o.value}</span>
              <h3>{o.title}</h3>
              <p>{o.text}</p>
              <div className="offer3d__foot">
                <button onClick={() => copy(o.code)} className="offer3d__code">{o.code}</button>
                <Link className="offer3d__go" to={o.to}>Shop <Icon.arrow /></Link>
              </div>
            </div>
            <div className="offer3d__glare" />
          </article>
        ))}
      </div>

      <div className="offers__note">
        <p>Codes apply at checkout. One code per order. Cannot be combined with sale pieces.</p>
        <Link className="btn" to="/shop"><span>Shop the collection</span><Icon.arrow /></Link>
      </div>
    </div>
  )
}
