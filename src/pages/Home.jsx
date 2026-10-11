import { useMemo, useState } from 'react'
import Art from '../components/Art.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { PRODUCTS, CATEGORIES, STORE, money } from '../data.js'

const MOSAIC = ['tote', 'mug', 'hoodie', 'bottle'].map((k) => PRODUCTS.find((p) => p.kind === k))
const SORTS = { featured: 'Featured', low: 'Price: low to high', high: 'Price: high to low', name: 'Name' }

export default function Home() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')
  const [sort, setSort] = useState('featured')

  const items = useMemo(() => {
    const list = PRODUCTS.filter((p) => (cat === 'All' || p.cat === cat) && p.name.toLowerCase().includes(q.trim().toLowerCase()))
    if (sort === 'low') list.sort((a, b) => a.price - b.price)
    if (sort === 'high') list.sort((a, b) => b.price - a.price)
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [q, cat, sort])

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>Everyday goods, made to last.</h1>
          <p>Bags, apparel, and home pieces in honest materials. Simple to use, built to stay in rotation for years.</p>
          <div className="actions">
            <a className="btn" href="#shop">Shop all</a>
            <a className="btn ghost" href={`#/product/${PRODUCTS[0].id}`}>Best seller: {PRODUCTS[0].name}</a>
          </div>
        </div>
        <div className="mosaic" aria-hidden="true">
          {MOSAIC.map((p) => (
            <div key={p.id} className="mtile" style={{ background: p.bg }}><Art kind={p.kind} color={p.colors[0].hex} /></div>
          ))}
        </div>
      </section>

      <section className="shop" id="shop">
        <div className="toolbar">
          <div className="chips" role="group" aria-label="Filter by category">
            {CATEGORIES.map((c) => (
              <button key={c} className={c === cat ? 'chip on' : 'chip'} aria-pressed={c === cat} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
          <div className="tools">
            <input type="search" placeholder="Search products" aria-label="Search products" value={q} onChange={(e) => setQ(e.target.value)} />
            <select aria-label="Sort products" value={sort} onChange={(e) => setSort(e.target.value)}>
              {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
        </div>
        {items.length ? (
          <ul className="grid">{items.map((p) => <ProductCard key={p.id} p={p} />)}</ul>
        ) : (
          <div className="empty">
            <p>No products match your search.</p>
            <button className="btn" onClick={() => { setQ(''); setCat('All') }}>Clear filters</button>
          </div>
        )}
      </section>

      <section className="perks">
        <div><b>Free shipping</b><p>On orders over {money(STORE.freeShippingAt)}.</p></div>
        <div><b>Easy returns</b><p>Not right? Send it back within 30 days.</p></div>
        <div><b>Secure payment</b><p>Pay with Stripe, PayPal, or GCash.</p></div>
      </section>
    </>
  )
}
