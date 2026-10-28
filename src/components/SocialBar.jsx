import { Icon } from '../ui'
import { useShop } from '../store'

/* Social actions under every card: like · comment · share */
export default function SocialBar({ product, compact = false }) {
  const { likes, toggleLike, likeCount, comments, setCommentFor, share } = useShop()
  const liked = likes.includes(product.id)
  const cCount = (comments[product.id] || []).length

  return (
    <div className={`social ${compact ? 'social--compact' : ''}`}>
      <button
        className={`social__btn ${liked ? 'on' : ''}`}
        onClick={() => toggleLike(product.id)}
        aria-label={liked ? 'Unlike' : 'Like'}
        aria-pressed={liked}
      >
        <Icon.heart />
        <span className="num">{likeCount(product.id)}</span>
      </button>

      <button className="social__btn" onClick={() => setCommentFor(product)} aria-label="Comments">
        <Icon.chat />
        <span className="num">{cCount || 'Add'}</span>
      </button>

      <button className="social__btn social__btn--share" onClick={() => share(product)} aria-label="Share">
        <Icon.share />
        <span>Share</span>
      </button>
    </div>
  )
}
