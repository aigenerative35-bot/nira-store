import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Icon, Stars } from '../ui'
import { useShop } from '../store'
import { money } from '../data'

export default function CommentSheet() {
  const { commentFor: p, setCommentFor, comments, addComment, likes, toggleLike, share } = useShop()
  const [text, setText] = useState('')

  useEffect(() => {
    setText('')
    const onKey = (e) => e.key === 'Escape' && setCommentFor(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [p, setCommentFor])

  const list = p ? comments[p.id] || [] : []
  const liked = p ? likes.includes(p.id) : false

  return (
    <AnimatePresence>
      {p && (
        <>
          <motion.div
            className="veil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCommentFor(null)}
          />
          <motion.aside
            className="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 32 }}
            role="dialog"
            aria-label={`Comments on ${p.name}`}
          >
            <div className="sheet__h">
              <div>
                <p className="label label--maroon">Comments</p>
                <h3>{p.name}</h3>
              </div>
              <button className="icon-btn" onClick={() => setCommentFor(null)} aria-label="Close">
                <Icon.close />
              </button>
            </div>

            <div className="sheet__product">
              <Link to={`/product/${p.id}`} className="sheet__ph" onClick={() => setCommentFor(null)}>
                <img src={p.img} alt="" />
              </Link>
              <div>
                <div className="pcard__cat">{p.catName}</div>
                <div className="num" style={{ fontSize: '0.95rem', marginTop: 4 }}>{money(p.price)}</div>
                <Stars value={p.rating} size={11} />
              </div>
              <div className="sheet__acts">
                <button className={`social__btn ${liked ? 'on' : ''}`} onClick={() => toggleLike(p.id)} aria-label="Like">
                  <Icon.heart />
                </button>
                <button className="social__btn" onClick={() => share(p)} aria-label="Share">
                  <Icon.share />
                </button>
              </div>
            </div>

            <div className="sheet__list">
              {list.length === 0 && (
                <p className="sheet__empty">No comments yet. Ask about the shade, the fit, the texture — we answer every one.</p>
              )}
              {list.map((c, i) => (
                <motion.div
                  className="citem"
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <div className="citem__av">{c.name.slice(0, 1).toUpperCase()}</div>
                  <div>
                    <div className="citem__top">
                      <b>{c.name}</b>
                      <span>{c.at}</span>
                    </div>
                    <p>{c.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <form
              className="sheet__form"
              onSubmit={(e) => {
                e.preventDefault()
                addComment(p.id, text)
                setText('')
              }}
            >
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ask a question or leave a note…"
                aria-label="Write a comment"
              />
              <button className="btn btn--sm" type="submit" disabled={!text.trim()}>
                <span>Post</span>
              </button>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
