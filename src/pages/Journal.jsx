import { Link } from 'react-router-dom'
import { Icon } from '../ui'
import { asset, journal } from '../data'

const EXTRA = [
  { title: 'Why we stopped making a foaming cleanser', cat: 'Formulation · 5 min', img: asset('img/jar-black.jpg'), text: 'Foam feels like clean. It is usually just sulphates stripping the barrier.' },
  { title: 'A note on maroon: colour as a signature', cat: 'The house · 3 min', img: asset('img/lip-red.jpg'), text: 'Why oxblood and gold sit on every seal, and nowhere else.' },
  { title: 'The monsoon test: three bags, one season', cat: 'Atelier · 7 min', img: asset('img/bag-white.jpg'), text: 'What six weeks of Bengaluru rain did to vegan leather, and what held.' }
]

export default function Journal() {
  const all = [...journal, ...EXTRA]
  return (
    <div className="container">
      <div className="crumb"><Link to="/">Home</Link><span>/</span><span>The journal</span></div>

      <div className="phead">
        <h1>The journal</h1>
        <p>Formulation notes, atelier diaries and the occasional argument about handloom care. Written by the people who make the pieces.</p>
      </div>

      <div className="jlist" style={{ paddingBottom: 'var(--sec)' }}>
        {all.map((j, i) => (
          <article className="jrow" key={j.title}>
            <span className="jrow__num num">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3>{j.title}</h3>
              <p>{j.text}</p>
            </div>
            <span className="jrow__meta">{j.cat}</span>
            <div className="jrow__ph"><img src={j.img} alt="" loading="lazy" /></div>
          </article>
        ))}
      </div>

      <section className="sec sec--tight">
        <div className="news">
          <p className="label label--maroon">The list</p>
          <h2>One letter a week</h2>
          <p>New entries, restocks and the occasional note from the lab.</p>
          <div style={{ marginTop: 24 }}>
            <Link className="btn" to="/shop"><span>Shop the edit</span></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
