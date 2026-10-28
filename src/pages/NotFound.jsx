import { Link } from 'react-router-dom'
import { Reveal } from '../ui'

export default function NotFound() {
  return (
    <div className="container">
      <div className="empty" style={{ padding: '120px 20px' }}>
        <Reveal>
          <p className="label label--maroon">404</p>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.4rem)', margin: '14px 0 12px' }}>This page has sold out.</h1>
          <p style={{ color: 'var(--muted)', maxWidth: '40ch', margin: '0 auto 26px' }}>
            The link may be old, or the piece has moved to the archive.
          </p>
          <Link className="btn" to="/"><span>Back to the store</span></Link>
        </Reveal>
      </div>
    </div>
  )
}
