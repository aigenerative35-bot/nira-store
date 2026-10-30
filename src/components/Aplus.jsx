import { Link } from 'react-router-dom'
import { Icon, Stars } from '../ui'
import { asset, money, products } from '../data'

const IMG = (k) => asset(`img/${k}.jpg`)

/* Premium A+ content — five distinct layouts, shown under every product */
export default function Aplus({ p }) {
  return (
    <div className="aplus">
      {/* 01 — full-bleed campaign banner */}
      <section className="ap ap--banner">
        <img src={IMG('saree-jewel')} alt="" loading="lazy" />
        <div className="ap__bannerIn">
          <p className="label">The house</p>
          <h2>Made in small batches,<br />finished by hand.</h2>
          <span>Since 2019 · Bengaluru</span>
        </div>
      </section>

      {/* 02 — image + copy with numbered highlights */}
      <section className="ap ap--split">
        <div className="ap__ph"><img src={p.img2} alt="" loading="lazy" /></div>
        <div className="ap__copy">
          <p className="label label--maroon">Why this piece</p>
          <h3>Built for daily use, not for the shelf.</h3>
          <p>
            Every piece in the edit is tested for six weeks before it goes live. If it does not
            survive a Bengaluru summer and a Mumbai monsoon, it does not ship.
          </p>
          <ul className="ap__list">
            <li><b>01</b><span>Materials traced to two co-ops and one lab.</span></li>
            <li><b>02</b><span>Hand-finished edges, checked twice before packing.</span></li>
            <li><b>03</b><span>Free repairs for two years on stitching and hardware.</span></li>
          </ul>
        </div>
      </section>

      {/* 03 — three feature tiles */}
      <section className="ap ap--tiles">
        {[
          ['Craft', 'Handloom from Bhagalpur', 'Forty-one weavers across two co-operatives, paid within seven days of weaving.'],
          ['Care', 'Repairs, not replacements', 'Two-year stitch warranty. Send it back, we mend it and return it in ten days.'],
          ['Detail', 'One honest finish', 'No retouching on campaign imagery. What you see is what arrives.']
        ].map(([k, t, d]) => (
          <article key={k}><span>{k}</span><h4>{t}</h4><p>{d}</p></article>
        ))}
      </section>

      {/* 04 — spec sheet with portrait image */}
      <section className="ap ap--specs">
        <div className="ap__ph"><img src={p.img} alt="" loading="lazy" /></div>
        <div>
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

      {/* 05 — comparison table */}
      <section className="ap ap--compare">
        <h3>How it compares</h3>
        <table>
          <thead><tr><th /><th>This piece</th><th>Mass market</th></tr></thead>
          <tbody>
            {[['Material', 'Traced, small batch', 'Blended'], ['Finish', 'Hand-edged', 'Machine'],
              ['Warranty', '2 years', 'None'], ['Returns', '14 days', '7 days']].map((r) => (
              <tr key={r[0]}><td>{r[0]}</td><td className="yes">{r[1]}</td><td>{r[2]}</td></tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 06 — quote band */}
      <section className="ap ap--quote">
        <p>“We would rather make sixteen things properly than six hundred things badly.”</p>
        <span>Nira Atelier — house note</span>
      </section>

      {/* 07 — review highlights */}
      <section className="ap ap--reviews">
        <div className="ap__rate">
          <Stars value={p.rating} /><b className="num">{p.rating}</b>
          <span>{p.reviews.toLocaleString('en-IN')} verified reviews</span>
        </div>
        {[['Six weeks in, the pigmentation on my cheeks has visibly faded.', 'Ananya R.'],
          ['The tote holds a 14-inch laptop and still looks like a bag.', 'Meher K.']].map(([t, n]) => (
          <blockquote key={n}><p>“{t}”</p><span>{n} — verified buyer</span></blockquote>
        ))}
      </section>

      {/* 08 — cross-sell */}
      <section className="ap ap--cross">
        <h3>Pairs well with</h3>
        <div className="ap__crossRow">
          {products.filter((x) => x.id !== p.id).slice(0, 4).map((x) => (
            <Link key={x.id} to={`/product/${x.id}`} className="ap__crossItem">
              <img src={x.img} alt={x.name} loading="lazy" />
              <b>{x.name}</b>
              <span className="num">{money(x.price)}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
