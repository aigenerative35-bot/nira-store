import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../ui'
import { useShop } from '../store'
import { money } from '../data'

export default function Account() {
  const { user, signIn, signUp, signOut, orders } = useShop()
  const [mode, setMode] = useState('signin')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [err, setErr] = useState('')

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const res = mode === 'signin' ? signIn(form.email, form.password) : signUp(form.name, form.email, form.password)
    if (!res.ok) setErr(res.error)
    else { setErr(''); setForm({ name: '', email: '', password: '' }) }
  }

  if (user) {
    return (
      <div className="container acct">
        <div className="crumb"><Link to="/">Home</Link><span>/</span><span>Account</span></div>

        <div className="acct__head">
          <div className="acct__who">
            <span className="acct__av">{user.name.charAt(0).toUpperCase()}</span>
            <div>
              <h1>{user.name}</h1>
              <p>{user.email}</p>
            </div>
          </div>
          <button className="btn btn--ghost" onClick={signOut}><span>Sign out</span></button>
        </div>

        <h2 className="acct__h">Order history</h2>

        {orders.length === 0 ? (
          <div className="acct__empty">
            <p>No orders yet.</p>
            <Link className="btn" to="/shop"><span>Start with the edit</span><Icon.arrow /></Link>
          </div>
        ) : (
          <div className="orders">
            {orders.map((o) => (
              <article className="order" key={o.id}>
                <header className="order__h">
                  <div>
                    <b>Order {o.id}</b>
                    <span>{new Date(o.at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="order__amt">
                    <span className={`order__pill ${o.status === 'Placed' ? 'live' : ''}`}>{o.status}</span>
                    <b className="num">{money(o.total)}</b>
                  </div>
                </header>

                <div className="order__items">
                  {o.items.map((it, i) => (
                    <Link className="order__item" to={`/product/${it.id}`} key={`${it.id}-${i}`}>
                      <img src={it.img} alt={it.name} loading="lazy" />
                      <div>
                        <b>{it.name}</b>
                        <span>{it.size ? `${it.size} · ` : ''}{it.shade ? `${it.shade} · ` : ''}Qty {it.qty}</span>
                      </div>
                      <em className="num">{money(it.price * it.qty)}</em>
                    </Link>
                  ))}
                </div>

                <div className="order__track">
                  {['Placed', 'Packed', 'Shipped', 'Delivered'].map((s, i) => (
                    <span key={s} className={i === 0 ? 'on' : ''}>{s}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="container acct">
      <div className="crumb"><Link to="/">Home</Link><span>/</span><span>Account</span></div>

      <div className="auth">
        <div className="auth__card">
          <div className="auth__tabs">
            <button className={mode === 'signin' ? 'on' : ''} onClick={() => { setMode('signin'); setErr('') }}>Sign in</button>
            <button className={mode === 'signup' ? 'on' : ''} onClick={() => { setMode('signup'); setErr('') }}>Create account</button>
          </div>

          <h1>{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h1>
          <p className="auth__sub">
            {mode === 'signin'
              ? 'Sign in to see your orders and saved pieces.'
              : 'One account for orders, wishlist and early access to drops.'}
          </p>

          <form onSubmit={submit} className="auth__form">
            {mode === 'signup' && (
              <label>
                <span>Name</span>
                <input value={form.name} onChange={set('name')} placeholder="Your name" autoComplete="name" />
              </label>
            )}
            <label>
              <span>Email</span>
              <input value={form.email} onChange={set('email')} placeholder="you@email.com" type="email" autoComplete="email" />
            </label>
            <label>
              <span>Password</span>
              <input value={form.password} onChange={set('password')} placeholder="••••••" type="password" autoComplete="current-password" />
            </label>

            {err && <p className="auth__err">{err}</p>}

            <button className="pdp2__add" type="submit">
              {mode === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <p className="auth__note">
            Demo account — details stay in this browser only. No server, no password is sent anywhere.
          </p>
        </div>

        <aside className="auth__side">
          <h3>Why sign in</h3>
          <ul>
            <li>Order history and tracking in one place</li>
            <li>Wishlist synced across visits</li>
            <li>First access to the handloom drops</li>
            <li>₹200 off your first order</li>
          </ul>
        </aside>
      </div>
    </div>
  )
}
