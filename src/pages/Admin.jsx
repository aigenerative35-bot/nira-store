import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../ui'
import { MODULES, DEFAULT_A } from '../components/Aplus'
import { getProduct } from '../data'

const KEY = 'nira_aplus_v1'

export default function Admin() {
  const [on, setOn] = useState(() => {
    try {
      const v = JSON.parse(localStorage.getItem(KEY))
      return Array.isArray(v) ? v : DEFAULT_A
    } catch {
      return DEFAULT_A
    }
  })
  const [preview, setPreview] = useState(true)
  const demo = getProduct('p1')

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(on)) } catch {}
  }, [on])

  const toggle = (id) =>
    setOn((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const move = (id, dir) =>
    setOn((prev) => {
      const i = prev.indexOf(id)
      const j = i + dir
      if (i < 0 || j < 0 || j >= prev.length) return prev
      const next = [...prev]
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })

  const groups = [...new Set(MODULES.map((m) => m.group))]

  return (
    <div className="container admin">
      <div className="crumb"><Link to="/">Home</Link><span>/</span><span>Admin · A+ content</span></div>

      <header className="admin__head">
        <div>
          <h1>A+ content builder</h1>
          <p>Pick the modules that appear under every product page. 20 layouts — turn on as many as you like, in any order.</p>
        </div>
        <div className="admin__acts">
          <span className="num">{on.length} selected</span>
          <button className="btn btn--ghost" onClick={() => setOn(DEFAULT_A)}><span>Reset</span></button>
          <button className="btn btn--ghost" onClick={() => setOn([])}><span>Clear all</span></button>
          <Link className="btn" to="/product/p1"><span>Preview</span><Icon.arrow /></Link>
        </div>
      </header>

      <div className="admin__grid">
        <div className="admin__lib">
          {groups.map((g) => (
            <section key={g} className="admin__group">
              <h2>{g}</h2>
              <div className="admin__items">
                {MODULES.filter((m) => m.group === g).map((m) => {
                  const active = on.includes(m.id)
                  return (
                    <button
                      key={m.id}
                      className={`admin__item ${active ? 'on' : ''}`}
                      onClick={() => toggle(m.id)}
                    >
                      <span className="admin__tick">{active ? <Icon.check /> : null}</span>
                      <span className="admin__name">{m.name}</span>
                      <span className="admin__id">{m.id}</span>
                    </button>
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        <aside className="admin__order">
          <h2>Order on the page</h2>
          {on.length === 0 && <p className="admin__empty">Nothing selected — the PDP will show no A+ block.</p>}
          <ol>
            {on.map((id) => {
              const m = MODULES.find((x) => x.id === id)
              return (
                <li key={id}>
                  <span>{m?.name || id}</span>
                  <button onClick={() => move(id, -1)} aria-label="Up"><Icon.arrow style={{ transform: 'rotate(-90deg)' }} /></button>
                  <button onClick={() => move(id, 1)} aria-label="Down"><Icon.arrow style={{ transform: 'rotate(90deg)' }} /></button>
                  <button onClick={() => toggle(id)} aria-label="Remove">✕</button>
                </li>
              )
            })}
          </ol>

          <button className="btn btn--ghost admin__toggle" onClick={() => setPreview((v) => !v)}>
            <span>{preview ? 'Hide' : 'Show'} live preview</span>
          </button>
        </aside>
      </div>

      {preview && on.length > 0 && (
        <section className="admin__preview">
          <h2>Live preview — on a product page</h2>
          {on.map((id) => {
            const m = MODULES.find((x) => x.id === id)
            return m ? <div className="aplus__mod" key={id}>{m.render(demo)}</div> : null
          })}
        </section>
      )}
    </div>
  )
}
