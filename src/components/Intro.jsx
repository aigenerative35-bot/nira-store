import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/* Cinematic curtain — plays once per session, never blocks the page */
export default function Intro() {
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem('nira_intro')
    } catch {
      return false
    }
  })

  useEffect(() => {
    if (!show) return
    try {
      sessionStorage.setItem('nira_intro', '1')
    } catch {}
    const t = setTimeout(() => setShow(false), 2100)
    return () => clearTimeout(t)
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 0.7, 0.2, 1] }}
        >
          <motion.div
            className="intro__bars"
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="intro__mark"
            initial={{ opacity: 0, y: 16, letterSpacing: '0.6em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.34em' }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 1.2, ease: [0.22, 0.7, 0.2, 1] }}
          >
            NIRA
            <span>beauty &amp; atelier</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
