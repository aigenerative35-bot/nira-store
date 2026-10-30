import { Link } from 'react-router-dom'
import { Icon, Stars } from '../ui'
import { asset, money, products } from '../data'

const IMG = (k) => asset(`img/${k}.jpg`)
const PH = ['serum', 'jar-silk', 'lip-apply', 'saree-jewel', 'bag-brown', 'heels-pink', 'flatlay', 'brushes', 'jar-flowers', 'saree-street']

/* ---------------- 20 A+ modules ---------------- */
export const MODULES = [
  {
    id: 'logo', name: 'Brand logo band', group: 'Header',
    render: (p) => (
      <div className="ap ap--logo">
        <span className="ap__mono">N</span>
        <b>Nira</b>
        <em>beauty &amp; atelier</em>
      </div>
    )
  },
  {
    id: 'heroText', name: 'Image header with text', group: 'Header',
    render: (p) => (
      <section className="ap ap--banner">
        <img src={IMG('saree-jewel')} alt="" loading="lazy" />
        <div className="ap__bannerIn">
          <p className="label">The house</p>
          <h2>Made in small batches, finished by hand.</h2>
          <span>Since 2019 · Bengaluru</span>
        </div>
      </section>
    )
  },
  {
    id: 'heroOverlay', name: 'Hero image with overlay text', group: 'Header',
    render: (p) => (
      <section className="ap ap--overlay">
        <img src={IMG('hero-bag')} alt="" loading="lazy" />
        <div className="ap__overlayIn">
          <h3>Woven slowly, worn for years</h3>
          <Link className="ap__link" to="/shop">Shop the edit <Icon.arrow /></Link>
        </div>
      </section>
    )
  },
  {
    id: 'singleSide', name: 'Single image & sidebar', group: 'Image + text',
    render: (p) => (
      <section className="ap ap--split">
        <div className="ap__ph"><img src={p.img2} alt="" loading="lazy" /></div>
        <div className="ap__copy">
          <p className="label label--maroon">Why this piece</p>
          <h3>Built for daily use, not for the shelf.</h3>
          <p>Every piece is tested for six weeks before it goes live. If it does not survive a Bengaluru summer, it does not ship.</p>
        </div>
      </section>
    )
  },
  {
    id: 'singleHighlights', name: 'Single image & highlights', group: 'Image + text',
    render: (p) => (
      <section className="ap ap--split ap--rev">
        <div className="ap__copy">
          <h3>Three things we do not cut corners on</h3>
          <ul className="ap__list">
            <li><b>01</b><span>Materials traced to two co-ops and one lab.</span></li>
            <li><b>02</b><span>Hand-finished edges, checked twice before packing.</span></li>
            <li><b>03</b><span>Free repairs for two years on stitching.</span></li>
          </ul>
        </div>
        <div className="ap__ph"><img src={IMG('flatlay')} alt="" loading="lazy" /></div>
      </section>
    )
  },
  {
    id: 'textBlock', name: 'Standalone text block', group: 'Text',
    render: () => (
      <section className="ap ap--text">
        <h3>The short version</h3>
        <p>
          Nira is a small house: six formulas from our own lab, handloom from two co-operatives in
          Bhagalpur, and an atelier for bags and heels. We keep the range short so every piece can
          be checked by a person, not a spreadsheet.
        </p>
      </section>
    )
  },
  {
    id: 'threeText', name: 'Three image & text', group: 'Grids',
    render: () => (
      <section className="ap ap--three">
        {['Skincare', 'Handloom', 'Atelier'].map((t, i) => (
          <article key={t}>
            <div className="ap__ph"><img src={IMG(PH[i + 1])} alt="" loading="lazy" /></div>
            <h4>{t}</h4>
            <p>Small batch, tested, and made to be used rather than stored.</p>
          </article>
        ))}
      </section>
    )
  },
  {
    id: 'fourText', name: 'Four image & text', group: 'Grids',
    render: () => (
      <section className="ap ap--four">
        {['Serums', 'Bags', 'Sarees', 'Heels'].map((t, i) => (
          <article key={t}>
            <div className="ap__ph"><img src={IMG(PH[i + 4])} alt="" loading="lazy" /></div>
            <h4>{t}</h4>
          </article>
        ))}
      </section>
    )
  },
  {
    id: 'quadrant', name: 'Four-image quadrant', group: 'Grids',
    render: () => (
      <section className="ap ap--quad">
        {PH.slice(0, 4).map((k) => (
          <div className="ap__ph" key={k}><img src={IMG(k)} alt="" loading="lazy" /></div>
        ))}
      </section>
    )
  },
  {
    id: 'mosaic', name: 'Mosaic (1 large + 4 small)', group: 'Grids',
    render: () => (
      <section className="ap ap--mosaic">
        <div className="ap__ph ap__ph--big"><img src={IMG('hero-bag')} alt="" loading="lazy" /></div>
        {PH.slice(2, 6).map((k) => <div className="ap__ph" key={k}><img src={IMG(k)} alt="" loading="lazy" /></div>)}
      </section>
    )
  },
  {
    id: 'strip', name: 'Horizontal image strip', group: 'Grids',
    render: () => (
      <section className="ap ap--strip">
        {PH.map((k) => <div className="ap__ph" key={k}><img src={IMG(k)} alt="" loading="lazy" /></div>)}
      </section>
    )
  },
  {
    id: 'tiles3', name: 'Three feature tiles', group: 'Feature',
    render: () => (
      <section className="ap ap--tiles">
        {[
          ['Craft', 'Handloom from Bhagalpur', 'Forty-one weavers across two co-operatives, paid within seven days.'],
          ['Care', 'Repairs, not replacements', 'Two-year stitch warranty. Send it back, we mend it in ten days.'],
          ['Detail', 'One honest finish', 'No retouching on campaign imagery.']
        ].map(([k, t, d]) => (
          <article key={k}><span>{k}</span><h4>{t}</h4><p>{d}</p></article>
        ))}
      </section>
    )
  },
  {
    id: 'icons4', name: 'Four icon features', group: 'Feature',
    render: () => (
      <section className="ap ap--icons">
        {[['Delivery', 'Free above ₹1,499'], ['Returns', '14 days, unopened'], ['Warranty', '2 years on stitching'], ['Support', 'One person, one account']].map(([t, d]) => (
          <div key={t}><Icon.check /><b>{t}</b><span>{d}</span></div>
        ))}
      </section>
    )
  },
  {
    id: 'compare', name: 'Comparison chart', group: 'Data',
    render: (p) => (
      <section className="ap ap--compare">
        <h3>How it compares</h3>
        <table>
          <thead><tr><th /><th>This piece</th><th>Mass market</th></tr></thead>
          <tbody>
            {[['Material', 'Traced, small batch', 'Blended'], ['Finish', 'Hand-edged', 'Machine'], ['Warranty', '2 years', 'None'], ['Returns', '14 days', '7 days']].map((r) => (
              <tr key={r[0]}><td>{r[0]}</td><td className="yes">{r[1]}</td><td>{r[2]}</td></tr>
            ))}
          </tbody>
        </table>
      </section>
    )
  },
  {
    id: 'specs', name: 'Technical specifications', group: 'Data',
    render: (p) => (
      <section className="ap ap--specs">
        <div className="ap__ph"><img src={p.img} alt="" loading="lazy" /></div>
        <div>
          <h3>The details</h3>
          <dl>
            {[['Category', p.catName], ['Price', money(p.price)], ['MRP', money(p.mrp)], ['Rating', `${p.rating} / 5`], ['Delivery', '2–6 days'], ['Returns', '14 days'], ['Made in', 'India']].map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
      </section>
    )
  },
  {
    id: 'faq', name: 'FAQ accordion', group: 'Data',
    render: () => (
      <section className="ap ap--faq">
        <h3>Common questions</h3>
        {[['Is this made in India?', 'Yes — lab in Bengaluru, handloom in Bhagalpur, leather in Kanpur.'], ['Can I return an opened product?', 'Skincare must be unopened. Bags and apparel can be tried on.'], ['Do you repair?', 'Free stitching and hardware repairs for two years.']].map(([q, a]) => (
          <details key={q}><summary>{q}</summary><p>{a}</p></details>
        ))}
      </section>
    )
  },
  {
    id: 'quote', name: 'Brand quote band', group: 'Brand',
    render: () => (
      <section className="ap ap--quote">
        <p>“We would rather make sixteen things properly than six hundred things badly.”</p>
        <span>Nira Atelier — house note</span>
      </section>
    )
  },
  {
    id: 'story', name: 'Brand story (image + text)', group: 'Brand',
    render: () => (
      <section className="ap ap--split">
        <div className="ap__ph"><img src={IMG('saree-street')} alt="" loading="lazy" /></div>
        <div className="ap__copy">
          <p className="label label--maroon">The house</p>
          <h3>Forty-one weavers, two co-ops, one price list.</h3>
          <p>No middlemen. Every saree is paid for within seven days of leaving the loom, and the price list is the same for us as it is for you.</p>
          <Link className="ap__link" to="/about">Read the house story <Icon.arrow /></Link>
        </div>
      </section>
    )
  },
  {
    id: 'video', name: 'Video module', group: 'Media',
    render: () => (
      <section className="ap ap--video">
        <video src={asset('video/film.mp4')} poster={asset('video/poster.jpg')} autoPlay muted loop playsInline preload="metadata" />
        <div className="ap__videoCap">Campaign film · 2026</div>
      </section>
    )
  },
  {
    id: 'reviews', name: 'Review highlights', group: 'Social proof',
    render: (p) => (
      <section className="ap ap--reviews">
        <div className="ap__rate"><Stars value={p.rating} /><b className="num">{p.rating}</b><span>{p.reviews.toLocaleString('en-IN')} reviews</span></div>
        {[['Six weeks in, the pigmentation has visibly faded.', 'Ananya R.'], ['Holds a 14-inch laptop and still looks like a bag.', 'Meher K.']].map(([t, n]) => (
          <blockquote key={n}><p>“{t}”</p><span>{n} — verified buyer</span></blockquote>
        ))}
      </section>
    )
  },
  {
    id: 'cross', name: 'Cross-sell row', group: 'Commerce',
    render: (p) => (
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
    )
  }
]

export const DEFAULT_A = ['logo', 'heroText', 'singleSide', 'tiles3', 'specs', 'quote']

export default function Aplus({ p, enabled }) {
  const ids = enabled && enabled.length ? enabled : DEFAULT_A
  const list = ids.map((id) => MODULES.find((m) => m.id === id)).filter(Boolean)
  if (!list.length) return null
  return (
    <div className="aplus">
      {list.map((m) => (
        <div key={m.id} className="aplus__mod">{m.render(p)}</div>
      ))}
    </div>
  )
}
