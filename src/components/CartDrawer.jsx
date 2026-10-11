import { useEffect, useRef } from 'react'
import Art from './Art.jsx'
import Qty from './Qty.jsx'
import { useCart } from '../store.jsx'
import { STORE, money } from '../data.js'

export default function CartDrawer() {
  const { open, setOpen, lines, subtotal, shipping, setQty } = useCart()
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open, setOpen])

  const left = Math.max(0, STORE.freeShippingAt - subtotal)
  const pct = Math.min(100, (subtotal / STORE.freeShippingAt) * 100)

  return (
    <>
      <div className={open ? 'scrim show' : 'scrim'} onClick={() => setOpen(false)} />
      <aside className={open ? 'drawer open' : 'drawer'} role="dialog" aria-modal="true" aria-label="Shopping cart">
        <div className="drawer-head">
          <h2>Your cart</h2>
          <button ref={closeRef} className="link" onClick={() => setOpen(false)}>Close</button>
        </div>
        {lines.length === 0 ? (
          <div className="empty">
            <p>Your cart is empty.</p>
            <a className="btn" href="#/" onClick={() => setOpen(false)}>Start shopping</a>
          </div>
        ) : (
          <>
            <div className="ship">
              <p>{left > 0 ? <>Add <b>{money(left)}</b> more for free shipping</> : <b>You get free shipping</b>}</p>
              <div className="bar"><span style={{ width: `${pct}%` }} /></div>
            </div>
            <ul className="lines">
              {lines.map((l) => (
                <li key={l.key}>
                  <div className="thumb" style={{ background: l.product.bg }}>
                    <Art kind={l.product.kind} color={l.product.colors.find((x) => x.name === l.color)?.hex} />
                  </div>
                  <div>
                    <a href={`#/product/${l.id}`} onClick={() => setOpen(false)} className="lname">{l.product.name}</a>
                    <p className="muted">{l.color}{l.size ? `, ${l.size}` : ''}</p>
                    <Qty value={l.qty} onChange={(q) => setQty(l.key, q)} label={`Quantity for ${l.product.name}`} />
                  </div>
                  <b>{money(l.product.price * l.qty)}</b>
                </li>
              ))}
            </ul>
            <div className="drawer-foot">
              <div className="sum"><span>Subtotal</span><b>{money(subtotal)}</b></div>
              <div className="sum muted"><span>Shipping</span><span>{shipping === 0 ? 'Free' : money(shipping)}</span></div>
              <a className="btn full" href="#/checkout" onClick={() => setOpen(false)}>Checkout</a>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
