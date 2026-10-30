import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../ui'
import { MODULES, DEFAULT_A } from '../components/Aplus'
import { categories, getProduct } from '../data'

const KEY = 'nira_aplus_v2'

const read = () => {
  try {
    const raw = localStorage.getItem(KEY) || localStorage.getItem('nira_aplus_v1')
    const v = JSON.parse(raw)
    if (Array.isArray(v)) return { all: v }            // migrate v1
    if (v && typeof v === 'object') return v
  } catch {}
  return { all: DEFAULT_A }
}

export default function Admin() {
  const [sets, setSets] = useState(read)
  const [scope, setScope] = useState('all')
  const [dragId, setDragId] = useState(null)
  const [overId, setOverId] = useState(null)
  const [preview, setPreview] = useState(true)

  const demo = getProduct(scope === 'all' ? 'p1' : (categories.find((c) => c.id === scope) ? 'p1' : 'p1'))
  const list = sets[scope] ?? sets.all ?? []
  const setList = (next) => setSets((prev) => ({ ...prev, [scope]: next }))

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(sets)) } catch {}
  }, [sets])

  const toggle = (id) => setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id])
  const remove = (id) => setList(list.filter((x) => x !== id))

  const move = (id, dir) => {
    const i = list.indexOf(id)
    const j = i + dir
    if (i < 0 || j < 0 || j >= list.length) return
    const next = [...list]
    ;[next[i], next[j]] = [next[j], next[i]]
    setList(next)
  }

  /* ---- drag & drop ---- */
  const onDrop = (targetId) => {
    if (!dragId || dragId === targetId) return setDragId(null)
    const next = list.filter((x) => x !== dragId)
    const at = targetId === '__end' ? next.length : next.indexOf(targetId)
    next.splice(at < 0 ? next.length : at, 0, dragId)
    setList(next)
    setDragId(null)
    setOverId(null)
  }

  const groups = [...new Set(MODULES.map((m) => m.group))]
  const scopes = [{ id: 'all', name: 'All products' }, ...categories.map((c) => ({ id: c.id, name: c.name }))]

  return (
    <div className="container admin">
      <div className="crumb"><Link to="/">Home</Link><span>/</span><span>Admin · A+ content</span></div>

      <header className="admin__head">
        <div>
          <h1>A+ content builder</h1>
          <p>
            {MODULES.length} modules. Turn them on, drag to reorder — and set a different A+ block
            for each category if you want.
          </p>
        </div>
        <div className="admin__acts">
          <span className="num">{list.length} in {scopes.find((s) => s.id === scope)?.name}</span>
          <button className="btn btn--ghost" onClick={() => setList(DEFAULT_A)}><span>Reset</span></button>
          <button className="btn btn--ghost" onClick={() => setList([])}><span>Clear</span></button>
          <Link className="btn" to={`/product/${demo?.id || 'p1'}`}><span>Preview</span><Icon.arrow /></Link>
        </div>
      </header>

      {/* scope tabs */}
      <div className="admin__scopes">
        {scopes.map((s) => (
          <button
            key={s.id}
            className={scope === s.id ? 'on' : ''}
            onClick={() => setScope(s.id)}
          >
            {s.name}
            <i>{s.id === 'all' ? (sets.all?.length ?? 0) : (sets[s.id]?.length ?? 0)}</i>
          </button>
        ))}
      </div>
      {scope !== 'all' && !sets[scope] && (
        <p className="admin__hint">This category has no own set yet — it is using “All products”. Turn a module on to start one.</p>
      )}

      <div className="admin__grid">
        <div className="admin__lib">
          {groups.map((g) => (
            <section key={g} className="admin__group">
              <h2>{g}</h2>
              <div className="admin__items">
                {MODULES.filter((m) => m.group === g).map((m) => {
                  const active = list.includes(m.id)
                  return (
                    <button
                      key={m.id}
                      className={`admin__item ${active ? 'on' : ''}`}
                      onClick={() => toggle(m.id)}
                      draggable
                      onDragStart={() => setDragId(m.id)}
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
          <h2>Order on the page — drag to reorder</h2>
          {list.length === 0 && <p className="admin__empty">Nothing selected — no A+ block will show.</p>}

          <ol
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop('__end')}
          >
            {list.map((id, i) => {
              const m = MODULES.find((x) => x.id === id)
              return (
                <li
                  key={id}
                  className={`${dragId === id ? 'dragging' : ''} ${overId === id ? 'over' : ''}`}
                  draggable
                  onDragStart={() => setDragId(id)}
                  onDragEnd={() => { setDragId(null); setOverId(null) }}
                  onDragOver={(e) => { e.preventDefault(); setOverId(id) }}
                  onDrop={(e) => { e.stopPropagation(); onDrop(id) }}
                >
                  <span className="admin__grip">⋮⋮</span>
                  <span>{m?.name || id}</span>
                  <button onClick={() => move(id, -1)} aria-label="Up"><Icon.arrow style={{ transform: 'rotate(-90deg)' }} /></button>
                  <button onClick={() => move(id, 1)} aria-label="Down"><Icon.arrow style={{ transform: 'rotate(90deg)' }} /></button>
                  <button onClick={() => remove(id)} aria-label="Remove">✕</button>
                </li>
              )
            })}
          </ol>

          <p className="admin__drop">Drop here to move to the end</p>

          <button className="btn btn--ghost admin__toggle" onClick={() => setPreview((v) => !v)}>
            <span>{preview ? 'Hide' : 'Show'} live preview</span>
          </button>
        </aside>
      </div>

      {preview && list.length > 0 && (
        <section className="admin__preview">
          <h2>Live preview — {scopes.find((s) => s.id === scope)?.name}</h2>
          {list.map((id) => {
            const m = MODULES.find((x) => x.id === id)
            return m ? <div className="aplus__mod" key={id}>{m.render(demo)}</div> : null
          })}
        </section>
      )}
    </div>
  )
}
