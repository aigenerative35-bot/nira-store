import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../ui'
import { MODULES, DEFAULT_A } from '../components/Aplus'
import { categories, products } from '../data'

const KEY = 'nira_aplus_v2'
const CFG = 'nira_aplus_cfg_v1'

const readSets = () => {
  try {
    const raw = localStorage.getItem(KEY) || localStorage.getItem('nira_aplus_v1')
    const v = JSON.parse(raw)
    if (Array.isArray(v)) return { all: v }
    if (v && typeof v === 'object') return v
  } catch {}
  return { all: DEFAULT_A }
}
const readCfg = () => {
  try { return JSON.parse(localStorage.getItem(CFG)) || {} } catch { return {} }
}

/* compress an uploaded photo so localStorage survives */
function fileToImage(file, max = 1400) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onerror = reject
    fr.onload = () => {
      const img = new Image()
      img.onerror = reject
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height))
        const c = document.createElement('canvas')
        c.width = Math.round(img.width * scale)
        c.height = Math.round(img.height * scale)
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height)
        resolve(c.toDataURL('image/jpeg', 0.82))
      }
      img.src = fr.result
    }
    fr.readAsDataURL(file)
  })
}

const FIELD_LABEL = { img: 'Photo', sub: 'Eyebrow / small label', title: 'Heading', text: 'Body text' }

export default function Admin() {
  const [sets, setSets] = useState(readSets)
  const [cfg, setCfg] = useState(readCfg)
  const [scope, setScope] = useState('all')
  const [editing, setEditing] = useState(null)
  const [dragId, setDragId] = useState(null)
  const [overId, setOverId] = useState(null)
  const previewRef = useRef(null)

  const demo = products.find((x) => (scope === 'all' ? true : x.cat === scope)) || products[0]
  const list = sets[scope] ?? sets.all ?? []
  const setList = (next) => setSets((prev) => ({ ...prev, [scope]: next }))

  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(sets)) } catch {} }, [sets])
  useEffect(() => { try { localStorage.setItem(CFG, JSON.stringify(cfg)) } catch {} }, [cfg])

  const toggle = (id) => setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id])
  const remove = (id) => setList(list.filter((x) => x !== id))
  const move = (id, dir) => {
    const i = list.indexOf(id); const j = i + dir
    if (i < 0 || j < 0 || j >= list.length) return
    const next = [...list];[next[i], next[j]] = [next[j], next[i]]
    setList(next)
  }
  const onDrop = (targetId) => {
    if (!dragId || dragId === targetId) return setDragId(null)
    const next = list.filter((x) => x !== dragId)
    const at = targetId === '__end' ? next.length : next.indexOf(targetId)
    next.splice(at < 0 ? next.length : at, 0, dragId)
    setList(next); setDragId(null); setOverId(null)
  }

  const setField = (id, key, value) =>
    setCfg((prev) => ({ ...prev, [id]: { ...(prev[id] || {}), [key]: value } }))

  const upload = async (id, file) => {
    if (!file) return
    const data = await fileToImage(file)
    setField(id, 'img', data)
  }

  const groups = [...new Set(MODULES.map((m) => m.group))]
  const scopes = [{ id: 'all', name: 'All products' }, ...categories.map((c) => ({ id: c.id, name: c.name }))]
  const active = editing ? MODULES.find((m) => m.id === editing) : null

  return (
    <div className="container admin">
      <div className="crumb"><Link to="/">Home</Link><span>/</span><span>Admin · A+ content</span></div>

      <header className="admin__head">
        <div>
          <h1>A+ content builder</h1>
          <p>{MODULES.length} modules · drag to reorder · upload photos and edit copy — preview updates live on the right.</p>
        </div>
        <div className="admin__acts">
          <span className="num">{list.length} in {scopes.find((s) => s.id === scope)?.name}</span>
          <button className="btn btn--ghost" onClick={() => setList(DEFAULT_A)}><span>Reset</span></button>
          <button className="btn btn--ghost" onClick={() => setList([])}><span>Clear</span></button>
          <Link className="btn" to={`/product/${demo.id}`}><span>Open product</span><Icon.arrow /></Link>
        </div>
      </header>

      <div className="admin__scopes">
        {scopes.map((s) => (
          <button key={s.id} className={scope === s.id ? 'on' : ''} onClick={() => setScope(s.id)}>
            {s.name}<i>{s.id === 'all' ? (sets.all?.length ?? 0) : (sets[s.id]?.length ?? 0)}</i>
          </button>
        ))}
      </div>

      <div className="admin__cols">
        {/* library */}
        <div className="admin__lib">
          {groups.map((g) => (
            <section key={g} className="admin__group">
              <h2>{g}</h2>
              <div className="admin__items">
                {MODULES.filter((m) => m.group === g).map((m) => {
                  const on = list.includes(m.id)
                  return (
                    <div key={m.id} className={`admin__item ${on ? 'on' : ''}`} draggable onDragStart={() => setDragId(m.id)}>
                      <button className="admin__tick" onClick={() => toggle(m.id)} aria-label="Toggle">
                        {on ? <Icon.check /> : null}
                      </button>
                      <span className="admin__name" onClick={() => toggle(m.id)}>{m.name}</span>
                      <button className="admin__edit" onClick={() => setEditing(m.id)} aria-label="Edit">
                        Edit
                      </button>
                    </div>
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        {/* order */}
        <aside className="admin__order">
          <h2>Order — drag to reorder</h2>
          {list.length === 0 && <p className="admin__empty">Nothing selected.</p>}
          <ol onDragOver={(e) => e.preventDefault()} onDrop={() => onDrop('__end')}>
            {list.map((id) => {
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
                  <span onClick={() => setEditing(id)}>{m?.name || id}</span>
                  <button onClick={() => move(id, -1)} aria-label="Up"><Icon.arrow style={{ transform: 'rotate(-90deg)' }} /></button>
                  <button onClick={() => move(id, 1)} aria-label="Down"><Icon.arrow style={{ transform: 'rotate(90deg)' }} /></button>
                  <button onClick={() => remove(id)} aria-label="Remove">✕</button>
                </li>
              )
            })}
          </ol>
          <p className="admin__drop">Drop here to move to the end</p>
        </aside>

        {/* live preview — always visible */}
        <section className="admin__preview" ref={previewRef}>
          <h2>Live preview · {scopes.find((s) => s.id === scope)?.name}</h2>
          <div className="admin__frame">
            {list.length === 0 && <p className="admin__empty">Turn a module on to see it here.</p>}
            {list.map((id) => {
              const m = MODULES.find((x) => x.id === id)
              return m ? (
                <div className="aplus__mod admin__pv" key={id} onClick={() => setEditing(id)}>
                  {m.render(demo, cfg[id] || {})}
                  <span className="admin__pvTag">{m.name} · click to edit</span>
                </div>
              ) : null
            })}
          </div>
        </section>
      </div>

      {/* editor */}
      {active && (
        <div className="admin__editor">
          <header>
            <div>
              <span className="label">Editing</span>
              <h3>{active.name}</h3>
            </div>
            <button className="admin__close" onClick={() => setEditing(null)}>✕</button>
          </header>

          <div className="admin__editorGrid">
            <div className="admin__editorForm">
              {active.fields?.length === 0 && <p className="admin__empty">This module has no editable fields — it pulls live data.</p>}

              {active.fields?.includes('img') && (
                <label className="admin__field">
                  <span>Photo</span>
                  <div className="admin__upload">
                    {(cfg[active.id]?.img) ? (
                      <img src={cfg[active.id].img} alt="" />
                    ) : (
                      <div className="admin__uploadEmpty">No photo yet</div>
                    )}
                    <div className="admin__uploadActions">
                      <label className="btn btn--ghost">
                        <span>Upload photo</span>
                        <input type="file" accept="image/*" hidden onChange={(e) => upload(active.id, e.target.files?.[0])} />
                      </label>
                      {cfg[active.id]?.img && (
                        <button className="btn btn--ghost" onClick={() => setField(active.id, 'img', '')}>
                          <span>Remove</span>
                        </button>
                      )}
                    </div>
                    <p className="admin__hint">JPG or PNG. Auto-resized to 1400px and stored in this browser.</p>
                  </div>
                </label>
              )}

              {['sub', 'title', 'text'].filter((f) => active.fields?.includes(f)).map((f) => (
                <label className="admin__field" key={f}>
                  <span>{FIELD_LABEL[f]}</span>
                  {f === 'text' ? (
                    <textarea
                      rows={4}
                      value={cfg[active.id]?.[f] ?? ''}
                      placeholder="Leave empty to use the default copy"
                      onChange={(e) => setField(active.id, f, e.target.value)}
                    />
                  ) : (
                    <input
                      value={cfg[active.id]?.[f] ?? ''}
                      placeholder="Leave empty to use the default copy"
                      onChange={(e) => setField(active.id, f, e.target.value)}
                    />
                  )}
                </label>
              ))}
            </div>

            <div className="admin__editorPv">
              <span className="label">Preview</span>
              <div className="admin__frame">{active.render(demo, cfg[active.id] || {})}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
