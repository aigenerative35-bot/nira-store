import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const KEY = 'nira_cookie_v1'

export default function CookieBar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try { if (!localStorage.getItem(KEY)) setTimeout(() => setShow(true), 1200) } catch {}
  }, [])

  const decide = (v) => {
    try { localStorage.setItem(KEY, v) } catch {}
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="cookiebar" role="dialog" aria-label="Cookie choice">
      <p>
        We only store what makes the shop work — your bag, wishlist and this choice.
        No ad trackers. <Link to="/privacy">Privacy</Link>
      </p>
      <div className="cookiebar__acts">
        <button className="cookiebar__no" onClick={() => decide('essential')}>Essential only</button>
        <button className="cookiebar__yes" onClick={() => decide('all')}>Okay</button>
      </div>
    </div>
  )
}
