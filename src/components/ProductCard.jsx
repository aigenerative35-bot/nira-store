import { Link } from 'react-router-dom'
import { Icon, Stars } from '../ui'
import SocialBar from './SocialBar'
import { useShop } from '../store'
import { money } from '../data'

export default function ProductCard({ product: p, index = 0 }) {
  const { add, wish, toggleWish, setQuickView } = useShop()
  const liked = wish.includes(p.id)
  const off = p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0

  return (
    <article className="pcard rise" style={{ '--d': `${Math.min(index * 0.04, 0.24)}s` }}>
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
          <button className="btn" onClick={() => add(p.id)}><span>Add to cart</span></button>
          <button className="qv" onClick={() => setQuickView(p)} aria-label="Quick view">
            <Icon.eye />
          </button>
        </div>
      </div>

      <div className="pcard__info">
        <Link to={`/product/${p.id}`} className="pcard__row">
          <span className="pcard__name">{p.name}</span>
        </Link>

        <div className="pcard__row pcard__sub">
          <span className="pcard__rate">
            <span className="pill-rate">
              {p.rating} <Icon.star />
            </span>
            <span className="pcard__reviews num">({p.reviews.toLocaleString('en-IN')})</span>
          </span>
          <span className="pcard__cat">{p.catName}</span>
        </div>

        <div className="pcard__row">
          <span className="pcard__price num">
            {p.mrp > p.price && <s>{money(p.mrp)}</s>}
            {money(p.price)}
          </span>
          {off > 0 && <span className="pcard__off num">{off}% off</span>}
        </div>

        <span className="pcard__del">Free delivery · {p.short}</span>
      </div>

      <SocialBar product={p} />
    </article>
  )
}
