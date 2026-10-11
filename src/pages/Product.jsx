import { useEffect, useState } from 'react'
import Art from '../components/Art.jsx'
import Qty from '../components/Qty.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { useCart } from '../store.jsx'
import { PRODUCTS, STORE, money } from '../data.js'

export default function Product({ id }) {
  const p = PRODUCTS.find((x) => x.id === id)
  const { add, setOpen } = useCart()
  const [color, setColor] = useState(p?.colors[0].name)
  const [size, setSize] = useState(p?.sizes ? 'M' : null)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    document.title = p ? `${p.name} | ${STORE.name}` : STORE.name
    setColor(p?.colors[0].name); setSize(p?.sizes ? 'M' : null); setQty(1)
  }, [p])

  if (!p) {
    return (
      <section className="page"><h1>Product not found</h1><p>This product may have been removed.</p><a className="btn" href="#/">Back to shop</a></section>
    )
  }

  const hex = (p.colors.find((c) => c.name === color) || p.colors[0]).hex
  const related = PRODUCTS.filter((x) => x.id !== p.id).sort((a, b) => (b.cat === p.cat) - (a.cat === p.cat)).slice(0, 4)
  const addToCart = () => { add({ id: p.id, color, size, qty }); setOpen(true) }

  return (
    <>
      <section className="pdp">
        <div className="gallery" style={{ background: p.bg }}>
          {p.image ? <img src={p.image} alt={p.name} /> : <Art kind={p.kind} color={hex} />}
        </div>
        <div className="buy">
          <a className="back" href="#/">&larr; All products</a>
          <h1>{p.name}</h1>
          <p className="price">{money(p.price)}</p>
          <p>{p.desc}</p>

          <fieldset>
            <legend>Color: <b>{color}</b></legend>
            <div className="swatches">
              {p.colors.map((c) => (
                <button key={c.name} className={c.name === color ? 'sw on' : 'sw'} style={{ background: c.hex }} aria-label={c.name} aria-pressed={c.name === color} onClick={() => setColor(c.name)} />
              ))}
            </div>
          </fieldset>

          {p.sizes && (
            <fieldset>
              <legend>Size: <b>{size}</b></legend>
              <div className="sizes">
                {p.sizes.map((s) => (
                  <button key={s} className={s === size ? 'size on' : 'size'} aria-pressed={s === size} onClick={() => setSize(s)}>{s}</button>
                ))}
              </div>
            </fieldset>
          )}

          <div className="buyrow">
            <Qty value={qty} onChange={(n) => setQty(Math.max(1, n))} label="Quantity" />
            <button className="btn grow" onClick={addToCart}>Add to cart, {money(p.price * qty)}</button>
          </div>

          <ul className="details">{p.details.map((d) => <li key={d}>{d}</li>)}</ul>
        </div>
      </section>
      <section className="shop">
        <h2>You may also like</h2>
        <ul className="grid">{related.map((r) => <ProductCard key={r.id} p={r} />)}</ul>
      </section>
    </>
  )
}
