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
import NotFound from './pages/NotFound'
import { useShop } from './store'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <QuickView />
      <CommentSheet />
      <Toasts />
    </>
  )
}
