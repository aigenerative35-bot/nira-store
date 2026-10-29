import { Link } from 'react-router-dom'
import { Icon } from '../ui'
import SocialBar from './SocialBar'
import { useShop } from '../store'
import { money } from '../data'

export default function ProductCard({ product: p, index = 0 }) {
  const { add, wish, toggleWish, setQuickView } = useShop()
  const liked = wish.includes(p.id)

  return (
    <article className="pcard rise" style={{ '--d': `${Math.min(index * 0.03, 0.2)}s` }}>
      <div className="pcard__media">
        <Link to={`/product/${p.id}`} aria-label={p.name}>
          <img className="main" src={p.img} alt={p.name} loading="lazy" />
          <img className="alt" src={p.img2} alt="" loading="lazy" />
        </Link>
        {p.tag && <span className="tag">{p.tag}</span>}
        <button className={`wish ${liked ? 'on' : ''}`} onClick={() => toggleWish(p.id)} aria-label="Save">
          <Icon.heart />
        </button>
        <div className="pcard__quick">
          <button className="btn" onClick={() => add(p.id, p.moq || 1)}><span>Add to enquiry</span></button>
          <button className="qv" onClick={() => setQuickView(p)} aria-label="Quick view"><Icon.eye /></button>
        </div>
      </div>

      <div className="pcard__info">
        <div className="pcard__price num">
          {money(p.price)} – {money(p.priceMax)}
        </div>
        <div className="pcard__moq">Min. order: {p.moq} {p.moq > 1 ? 'pieces' : 'piece'}</div>

        <Link to={`/product/${p.id}`} className="pcard__name">{p.name}</Link>

        <div className="pcard__rate">
          <span className="pill-rate">{p.rating} <Icon.star /></span>
          <span className="pcard__reviews num">({p.reviews.toLocaleString('en-IN')})</span>
          <span className="pcard__off">· {p.lead}-day lead</span>
        </div>

        <div className="pcard__sup">
          {p.verified && (
            <span className="verified">
              <Icon.check /> Verified
            </span>
          )}
          <b>{p.supplier}</b>
        </div>
      </div>

      <SocialBar product={p} />
    </article>
  )
}
