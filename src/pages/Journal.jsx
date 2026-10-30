import { Link } from 'react-router-dom'
import { Icon } from '../ui'
import { asset } from '../data'

const POSTS = [
  {
    slug: 'why-sixteen',
    kicker: 'The house',
    title: 'Why we keep the edit at sixteen pieces',
    date: '12 Oct 2026',
    img: 'img/flatlay.webp',
    text: 'A longer shelf does not make a better house. Every piece we add has to replace something, or explain why it deserves to stay. Sixteen is the number where we can still check every batch ourselves — the lab, the loom and the atelier all run on the same short list.',
    body: [
      'When we started, the plan was thirty products. It lasted one season. The moment a range grows past what one person can inspect, quality stops being a decision and starts being a statistic.',
      'Sixteen pieces means we can hold every batch in our hands before it ships. It also means the person who answers your email knows which co-op wove your saree.',
      'This is not minimalism as an aesthetic. It is a limit we set so that we never have to guess.'
    ]
  },
  {
    slug: 'bhagalpur-notes',
    kicker: 'Handloom',
    title: 'Three days in Bhagalpur',
    date: '28 Sep 2026',
    img: 'img/saree-street.webp',
    text: 'Forty-one weavers across two co-operatives. We went to watch the loom run, and came back with a price list we could actually publish.',
    body: [
      'The loom does not hurry. A saree takes four to nine days depending on the weave, and the monsoon changes how the silk behaves.',
      'What surprised us was how much of the cost was invisible: the dye, the loom upkeep, the days the power cuts.',
      'We pay within seven days of the saree leaving the loom. That single rule changed which co-ops wanted to work with us.'
    ]
  },
  {
    slug: 'monsoon-leather',
    kicker: 'Atelier',
    title: 'Leather that survives a Mumbai monsoon',
    date: '05 Sep 2026',
    img: 'img/bag-brown.webp',
    text: 'Full-grain vegan leather, hand-edged, two-year stitch warranty. Here is what we actually test before a bag goes live.',
    body: [
      'Every bag spends six weeks in rotation before launch — carried, rained on, stuffed into a scooter box.',
      'The failure point is never the leather. It is the stitch at the handle base, which is why we double-lock it and warranty it for two years.',
      'If it does not survive the test, it does not go on the shelf. That is the whole process.'
    ]
  }
]

export default function Journal() {
  return (
    <div className="container journal">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link><span>/</span><span>Journal</span>
      </nav>

      <header className="journal__head">
        <p className="label label--maroon">The journal</p>
        <h1>Notes from the house</h1>
        <p>Loom visits, lab notes and the occasional argument about hemlines.</p>
      </header>

      {POSTS.map((p) => (
        <article className="post" key={p.slug} id={p.slug}>
          <div className="post__ph"><img src={asset(p.img)} alt="" loading="lazy" /></div>
          <div className="post__body">
            <p className="label">{p.kicker} · {p.date}</p>
            <h2>{p.title}</h2>
            <p className="post__lede">{p.text}</p>
            {p.body.map((t) => <p key={t}>{t}</p>)}
            <Link className="link-arrow" to="/shop">Shop the edit <Icon.arrow /></Link>
          </div>
        </article>
      ))}
    </div>
  )
}
