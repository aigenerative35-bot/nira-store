import { Link } from 'react-router-dom'
import { Icon } from '../ui'
import { asset, money } from '../data'

/* Amazon A+ style content modules — five premium layouts */
export default function Aplus({ p }) {
  const img = p.img
  const alt = p.img2

  return (
    <div className="aplus">
      {/* 1 — full-bleed banner */}
      <section className="aplus__banner">
        <img src={asset('img/saree-jewel.jpg')} alt="" loading="lazy" />
        <div className="aplus__banner-in">
          <p className="label">The house</p>
          <h2>Made in small batches,<br />finished by hand.</h2>
          <span>Since 2019 · Bengaluru</span>
        </div>
      </section>

      {/* 2 — image + copy */}
      <section className="aplus__split">
        <div className="aplus__ph">
          <img src={alt} alt="" loading="lazy" />
        </div>
        <div className="aplus__copy">
          <p className="label label--maroon">Why this piece</p>
          <h3>Built for daily use, not for the shelf.</h3>
          <p>
            Every piece in the edit is tested for six weeks before it goes live. If it does not
            survive a Bengaluru summer and a Mumbai monsoon, it does not ship.
          </p>
          <ul className="aplus__list">
            <li><b>01</b><span>Materials traced to two co-ops and one lab.</span></li>
            <li><b>02</b><span>Hand-finished edges, checked twice before packing.</span></li>
            <li><b>03</b><span>Repairs free for two years on stitching and hardware.</span></li>
          </ul>
        </div>
      </section>

      {/* 3 — three feature tiles */}
      <section className="aplus__tiles">
        {[
          ['Craft', 'Handloom from Bhagalpur', 'Forty-one weavers across two co-operatives, paid within seven days of weaving.'],
          ['Care', 'Repairs, not replacements', 'Two-year stitch warranty. Send it back, we mend it and return it in ten days.'],
          ['Detail', 'One honest finish', 'No retouching on campaign imagery. What you see is what arrives.']
        ].map(([k, t, d]) => (
          <article key={k} className="aplus__tile">
            <span>{k}</span>
            <h4>{t}</h4>
            <p>{d}</p>
          </article>
        ))}
      </section>

      {/* 4 — spec table */}
      <section className="aplus__specs">
        <div className="aplus__specs-ph">
          <img src={img} alt="" loading="lazy" />
        </div>
        <div className="aplus__specs-body">
          <h3>The details</h3>
          <dl>
            {[
              ['Category', p.catName],
              ['Price', money(p.price)],
              ['MRP', money(p.mrp)],
              ['Rating', `${p.rating} / 5 · ${p.reviews.toLocaleString('en-IN')} reviews`],
              ['Delivery', 'Free above ₹1,499 · 2–6 days'],
              ['Returns', '14 days, unopened'],
              ['Made in', 'India']
            ].map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      {/* 5 — quote band */}
      <section className="aplus__quote">
        <p>“We would rather make sixteen things properly than six hundred things badly.”</p>
        <span>Nira Atelier — house note</span>
        <Link className="btn btn--ghost" to="/shop"><span>Shop the collection</span><Icon.arrow /></Link>
      </section>
    </div>
  )
}
