import { Link } from 'react-router-dom'
import { Icon } from '../ui'
import { asset, products } from '../data'

const LOOKS = [
  { img: asset('img/saree-jewel.jpg'), cap: 'Look 01 — Emerald silk', note: 'Silk saree, gold zari border', to: '/product/p9' },
  { img: asset('img/heels-out.jpg'), cap: 'Look 02 — Block heel', note: 'Three-inch block, cushioned', to: '/product/p6' },
  { img: asset('img/bag-blue.jpg'), cap: 'Look 03 — Sling, linen', note: 'Midnight clutch, detachable chain', to: '/product/p13' },
  { img: asset('img/hero-portrait.jpg'), cap: 'Look 04 — Evening skin', note: 'Vitamin C serum, rice mist', to: '/product/p1' },
  { img: asset('img/saree-street.jpg'), cap: 'Look 05 — City handloom', note: 'Indigo handloom saree', to: '/product/p16' },
  { img: asset('img/lips.jpg'), cap: 'Look 06 — Rosewood', note: 'Matte lipstick, transfer-proof', to: '/product/p3' },
  { img: asset('img/bag-brown.jpg'), cap: 'Look 07 — The tote', note: 'Structured tote, tan', to: '/product/p4' },
  { img: asset('img/jar-flowers.jpg'), cap: 'Look 08 — Night', note: 'Ceramide night cream', to: '/product/p11' }
]

export default function Lookbook() {
  return (
    <div className="container">
      <div className="crumb"><Link to="/">Home</Link><span>/</span><span>Lookbook</span></div>

      <div className="phead">
        <h1>Autumn 2026 — the lookbook</h1>
        <p>Eight looks, shot across Bengaluru and Jaipur. Every piece in the frame is in the edit — tap a look to shop it.</p>
      </div>

      <div className="lookbook" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(8px,1.6vw,18px)', paddingBottom: 'var(--sec)' }}>
        {LOOKS.map((l) => (
          <Link className="look" to={l.to} key={l.cap}>
            <div className="look__ph" style={{ aspectRatio: '4 / 5' }}>
              <img src={l.img} alt={l.cap} loading="lazy" />
            </div>
            <figcaption>
              {l.cap} · {l.note}
            </figcaption>
          </Link>
        ))}
      </div>

      <section className="sec sec--tight" style={{ paddingBottom: 'var(--sec)' }}>
        <div className="sec-head">
          <div>
            <p className="label label--maroon">Shop the story</p>
            <h2>Pieces from the lookbook</h2>
          </div>
          <Link className="link-arrow" to="/shop">All pieces <Icon.arrow /></Link>
        </div>
        <div className="pgrid">
          {products.slice(0, 4).map((p) => (
            <Link className="collection" to={`/product/${p.id}`} key={p.id}>
              <div className="collection__ph" style={{ aspectRatio: '4 / 5' }}>
                <img src={p.img} alt={p.name} loading="lazy" />
              </div>
              <div className="collection__in">
                <span>{p.catName}</span>
                <h3>{p.name}</h3>
                <i>Shop</i>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
