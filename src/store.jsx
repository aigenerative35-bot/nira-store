import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { products, getProduct, FREE_SHIP, SHIP_FEE, PROMO_CODE, money } from './data'

const KEY = 'nira_cart_v2'
const WISH = 'nira_wish_v2'
const PROMO = 'nira_promo_v2'
const USER = 'nira_user_v1'
const ORDERS = 'nira_orders_v1'
const LIKES = 'nira_likes_v2'
const COMMENTS = 'nira_comments_v2'

const read = (k, fallback) => {
  try {
    const v = JSON.parse(localStorage.getItem(k))
    return v ?? fallback
  } catch {
    return fallback
  }
}
const write = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v))
  } catch {}
}

const SEED_COMMENTS = {
  p1: [
    { name: 'Ananya R.', text: 'Six weeks in, pigmentation has visibly faded. Does not pill under sunscreen.', at: '2 days ago' },
    { name: 'Ritika M.', text: 'Does this layer with retinol at night?', at: '1 day ago' }
  ],
  p4: [{ name: 'Meher K.', text: 'Hardware feels like a ₹12,000 bag. Fits my 14" laptop easily.', at: '4 days ago' }],
  p3: [{ name: 'Sana', text: 'Rosewood is perfect for Indian skin tones, not too brown.', at: '6 days ago' }]
}

const ShopContext = createContext(null)
export const useShop = () => useContext(ShopContext)

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => read(KEY, []))
  const [wish, setWish] = useState(() => read(WISH, []))
  const [promo, setPromo] = useState(() => read(PROMO, ''))
  const [likes, setLikes] = useState(() => read(LIKES, []))
  const [comments, setComments] = useState(() => read(COMMENTS, SEED_COMMENTS))
  const [commentFor, setCommentFor] = useState(null)
  const [drawer, setDrawer] = useState(false)
  const [search, setSearch] = useState(false)
  const [quickView, setQuickView] = useState(null)
  const [toasts, setToasts] = useState([])
  const [user, setUser] = useState(() => read(USER, null))
  const [orders, setOrders] = useState(() => read(ORDERS, []))
  const idRef = useRef(0)

  useEffect(() => write(KEY, cart), [cart])
  useEffect(() => write(WISH, wish), [wish])
  useEffect(() => write(PROMO, promo), [promo])
  useEffect(() => write(LIKES, likes), [likes])
  useEffect(() => write(COMMENTS, comments), [comments])

  const toast = (msg) => {
    const id = ++idRef.current
    setToasts((t) => [...t, { id, msg }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2400)
  }

  const add = (id, qty = 1, size, shade) => {
    const p = getProduct(id)
    if (!p) return
    const s = size ?? p.sizes?.[0] ?? ''
    const sh = shade ?? p.shades?.[0]?.name ?? ''
    setCart((c) => {
      const i = c.findIndex((l) => l.id === id && l.size === s && l.shade === sh)
      if (i > -1) {
        const next = [...c]
        next[i] = { ...next[i], qty: next[i].qty + qty }
        return next
      }
      return [...c, { id, qty, size: s, shade: sh }]
    })
    toast(`${p.name} added to bag`)
    setDrawer(true)
  }

  const setQty = (idx, delta) =>
    setCart((c) => {
      const next = [...c]
      if (!next[idx]) return c
      next[idx] = { ...next[idx], qty: next[idx].qty + delta }
      return next.filter((l) => l.qty > 0)
    })

  const remove = (idx) => setCart((c) => c.filter((_, i) => i !== idx))
  const clear = () => setCart([])

  const toggleWish = (id) => {
    setWish((w) => {
      const has = w.includes(id)
      toast(has ? 'Removed from wishlist' : 'Saved to wishlist')
      return has ? w.filter((x) => x !== id) : [...w, id]
    })
  }

  /* ---- social layer: likes, comments, share ---- */
  const toggleLike = (id) => {
    setLikes((l) => {
      const has = l.includes(id)
      if (!has) toast('Liked')
      return has ? l.filter((x) => x !== id) : [...l, id]
    })
  }
  const likeCount = (id) => (comments[id]?.length || 0) * 7 + (likes.includes(id) ? 1 : 0) + 24

  const addComment = (id, text, name = 'You') => {
    if (!text.trim()) return
    setComments((c) => ({
      ...c,
      [id]: [{ name, text: text.trim(), at: 'just now' }, ...(c[id] || [])]
    }))
    toast('Comment posted')
  }

  const share = async (p) => {
    const url = `${window.location.origin}${window.location.pathname}#/product/${p.id}`
    const data = { title: `NIRA — ${p.name}`, text: `${p.name} · ${money(p.price)}`, url }
    try {
      if (navigator.share) {
        await navigator.share(data)
        return
      }
      await navigator.clipboard.writeText(url)
      toast('Link copied — paste it anywhere')
    } catch {
      toast('Could not share — copy the link from the address bar')
    }
  }

  const applyPromo = (code) => {
    const c = (code || '').trim().toUpperCase()
    if (c === PROMO_CODE) {
      setPromo(c)
      toast(`${c} applied — 10% off`)
      return true
    }
    if (!c) {
      setPromo('')
      return true
    }
    toast('That code is not valid')
    return false
  }

  const lines = useMemo(
    () => cart.map((l, idx) => ({ ...l, idx, product: getProduct(l.id) })).filter((l) => l.product),
    [cart]
  )
  const count = lines.reduce((n, l) => n + l.qty, 0)
  const subtotal = lines.reduce((n, l) => n + l.product.price * l.qty, 0)
  const discount = promo ? Math.round(subtotal * 0.1) : 0
  const shipping = subtotal - discount >= FREE_SHIP || subtotal === 0 ? 0 : SHIP_FEE
  const total = Math.max(0, subtotal - discount + shipping)

  /* ---------- account ---------- */
  const signUp = (name, email, password) => {
    if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email) || password.length < 4) {
      return { ok: false, error: 'Enter a name, a valid email and a 4+ character password.' }
    }
    const u = { name: name.trim(), email: email.trim().toLowerCase(), joined: new Date().toISOString() }
    setUser(u)
    write(USER, u)
    toast(`Welcome, ${u.name.split(' ')[0]}`)
    return { ok: true }
  }

  const signIn = (email, password) => {
    if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 4) {
      return { ok: false, error: 'Check your email and password.' }
    }
    const existing = read(USER, null)
    const u = existing && existing.email === email.trim().toLowerCase()
      ? existing
      : { name: email.split('@')[0], email: email.trim().toLowerCase(), joined: new Date().toISOString() }
    setUser(u)
    write(USER, u)
    toast('Signed in')
    return { ok: true }
  }

  const signOut = () => {
    setUser(null)
    try { localStorage.removeItem(USER) } catch {}
    toast('Signed out')
  }

  /* ---------- orders ---------- */
  const placeOrder = (order) => {
    const full = {
      id: order.id,
      at: new Date().toISOString(),
      total: order.total,
      items: lines.map((l) => ({ id: l.id, name: l.name, img: l.img, qty: l.qty, price: l.price, size: l.size, shade: l.shade })),
      pay: order.pay,
      status: 'Placed'
    }
    const next = [full, ...orders].slice(0, 20)
    setOrders(next)
    write(ORDERS, next)
    return full
  }

  const value = {
    products,
    cart: lines,
    count,
    subtotal,
    discount,
    shipping,
    total,
    promo,
    wish,
    likes,
    comments,
    commentFor,
    drawer,
    search,
    quickView,
    toasts,
    add,
    setQty,
    remove,
    clear,
    toggleWish,
    toggleLike,
    likeCount,
    addComment,
    share,
    setCommentFor,
    applyPromo,
    setDrawer,
    setSearch,
    setQuickView,
    user,
    orders,
    signIn,
    signUp,
    signOut,
    placeOrder,
    toast,
    freeShip: FREE_SHIP
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
