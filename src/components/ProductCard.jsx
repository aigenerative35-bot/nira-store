import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon, Stars } from '../ui'
import { useShop } from '../store'
import { money } from '../data'

export default function ProductCard({ product: p, index = 0 }) {
  const { add, wish, toggleWish, setQuickView } = useShop()
  const liked = wish.includes(p.id)

  return (
    <motion.article
      className="pcard"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6%' }}
      transition={{ duration: 0.75, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 0.7, 0.2, 1] }}
    >
      <div className="pcard__media">
        <Link to={`/product/${p.id}`} aria-label={p.name}>
          <img className="main" src={p.img} alt={p.name} loading="lazy" />
          <img className="alt" src={p.img2} alt="" loading="lazy" />
        </Link>
        {p.tag && <span className="tag">{p.tag}</span>}
        <button
          className={`wish ${liked ? 'on' : ''}`}
          onClick={() => toggleWish(p.id)}
          aria-label={liked ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Icon.heart />
        </button>
        <div className="pcard__quick">
          <button className="btn" onClick={() => add(p.id)}>
            <span>Add to bag</span>
          </button>
          <button className="qv" onClick={() => setQuickView(p)} aria-label="Quick view">
            <Icon.eye />
          </button>
        </div>
      </div>
      <div className="pcard__info">
        <div>
          <Link to={`/product/${p.id}`}>
            <div className="pcard__name">{p.name}</div>
          </Link>
          <div className="pcard__cat">{p.catName}</div>
          <Stars value={p.rating} />
        </div>
        <div className="pcard__price num">
          {p.mrp > p.price && <s>{money(p.mrp)}</s>}
          {money(p.price)}
        </div>
      </div>
    </motion.article>
  )
}
