import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import SearchOverlay from './components/SearchOverlay'
import QuickView from './components/QuickView'
import Toasts from './components/Toasts'
import CommentSheet from './components/CommentSheet'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import About from './pages/About'
import Contact from './pages/Contact'
import Account from './pages/Account'
import Offers from './pages/Offers'
import Policy from './pages/Policy'
import Journal from './pages/Journal'
import CookieBar from './components/CookieBar'
import useAnalytics from './useAnalytics'
import NotFound from './pages/NotFound'
import { useShop } from './store'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}


function usePageMeta() {
  const loc = useLocation()
  useEffect(() => {
    const map = {
      '/': ['Nira — beauty & atelier', 'Skincare, handloom and leather, made in small batches in India.'],
      '/shop': ['Shop the edit — Nira', 'Sixteen pieces across skincare, makeup, body, bags, suits and heels.'],
      '/cart': ['Your bag — Nira', 'Review your bag and check out.'],
      '/checkout': ['Checkout — Nira', 'Secure checkout, free delivery above ₹1,499.'],
      '/about': ['The house — Nira', 'Two co-ops in Bhagalpur, forty-one weavers, one price list.'],
      '/contact': ['Contact — Nira', 'Questions about an order? Talk to one person, not a queue.']
    }
    const [title, desc] = map[loc.pathname] || (loc.pathname.startsWith('/product')
      ? ['Product — Nira', 'Made in small batches, finished by hand.']
      : ['Nira — beauty & atelier', 'Skincare, handloom and leather.'])
    document.title = title
    let m = document.querySelector('meta[name="description"]')
    if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'description'); document.head.appendChild(m) }
    m.setAttribute('content', desc)
  }, [loc.pathname])
}

export default function App() {
  const location = useLocation()
  usePageMeta()
  useAnalytics(location.pathname)
  const { drawer, search, quickView, commentFor } = useShop()
  const { scrollYProgress } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 })

  useEffect(() => {
    document.body.classList.toggle('lock', drawer || search || !!quickView || !!commentFor)
  }, [drawer, search, quickView, commentFor])

  return (
    <>
      <ScrollTop />
      <motion.div className="scroll-progress" style={{ scaleX: bar }} />

      <Header />
      <main key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/faq" element={<Policy />} />
          <Route path="/shipping" element={<Policy />} />
          <Route path="/privacy" element={<Policy />} />
          <Route path="/terms" element={<Policy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieBar />
      <CartDrawer />
      <SearchOverlay />
      <QuickView />
      <CommentSheet />
      <Toasts />
    </>
  )
}
