import Art from './Art.jsx'
import { useCart } from '../store.jsx'
import { money } from '../data.js'

export default function ProductCard({ p }) {
  const { add, setOpen } = useCart()
  const quickAdd = () => {
    add({ id: p.id, color: p.colors[0].name, size: p.sizes ? 'M' : null, qty: 1 })
    setOpen(true)
  }
  return (
    <li className="pcard">
      <div className="tilewrap">
        <a href={`#/product/${p.id}`} tabIndex={-1} aria-hidden="true">
          <div className="tile" style={{ background: p.bg }}>
            {p.image ? <img src={p.image} alt="" loading="lazy" /> : <Art kind={p.kind} color={p.colors[0].hex} />}
          </div>
        </a>
        <button className="quick" onClick={quickAdd} aria-label={`Quick add ${p.name} to cart`}>Add to cart</button>
      </div>
      <a className="pinfo" href={`#/product/${p.id}`}>
        <span className="pname">{p.name}</span>
        <span className="pprice">{money(p.price)}</span>
      </a>
      <div className="dots" aria-label={`${p.colors.length} colors`}>
        {p.colors.map((c) => <i key={c.name} style={{ background: c.hex }} />)}
      </div>
    </li>
  )
}
