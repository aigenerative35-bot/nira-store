import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useShop } from '../store'
import { categories } from '../data'

export default function Footer() {
  const { toast } = useShop()
  const [email, setEmail] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast('Enter a valid email')
    toast("You're in — check your inbox for the code")
    setEmail('')
  }

  return (
    <footer className="ftr">
      <div className="container">
        <div className="ftr__grid">
          <div>
            <Link className="logo" to="/">
              <span className="logo__mark">N</span>
              <span className="logo__txt">Nira</span>
            </Link>
            <p>Beauty and atelier — skincare, body, makeup, bags, suits and heels. Fewer, better things, made to be used daily.</p>
            <form className="nform" onSubmit={submit} style={{ margin: '20px 0 0' }}>
              <input
                type="email"
                placeholder="Email for ₹200 off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email"
              />
              <button type="submit">Join</button>
            </form>
          </div>
          <div>
            <h5>Shop</h5>
            <ul>
              {categories.map((c) => (
                <li key={c.id}><Link to={`/shop?cat=${c.id}`}>{c.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Help</h5>
            <ul>
              <li><Link to="/contact">Track order</Link></li>
              <li><Link to="/contact">Shipping</Link></li>
              <li><Link to="/contact">Returns</Link></li>
              <li><Link to="/contact">Shade match</Link></li>
              <li><Link to="/contact">Contact us</Link></li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><Link to="/about">The house</Link></li>
              <li><Link to="/lookbook">Lookbook</Link></li>
              <li><Link to="/journal">The journal</Link></li>
              <li><Link to="/stores">Stores</Link></li>
              <li><Link to="/contact">Client care</Link></li>
            </ul>
          </div>
          <div>
            <h5>Follow</h5>
            <ul>
              <li><a href="#instagram">Instagram</a></li>
              <li><a href="#youtube">YouTube</a></li>
              <li><a href="#whatsapp">WhatsApp</a></li>
              <li><a href="#pinterest">Pinterest</a></li>
            </ul>
          </div>
        </div>
        <div className="ftr__base">
          <span>© 2026 Nira — demo storefront built with React. Photography: Pexels free licence.</span>
          <div className="pay">
            <span>UPI</span><span>Visa</span><span>Mastercard</span><span>RuPay</span><span>Netbanking</span><span>COD</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
