import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '../ui'
import { useShop } from '../store'

export default function Toasts() {
  const { toasts } = useShop()
  return (
    <div className="toasts" aria-live="polite">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            className="toast"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.24 }}
          >
            <Icon.check />
            <span>{t.msg}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
