import { useState } from 'react'
import Art from '../components/Art.jsx'
import { useCart } from '../store.jsx'
import { METHODS, pay } from '../payments.js'
import { money } from '../data.js'
import { go } from '../router.js'

const EMPTY = { email: '', name: '', address: '', city: '', postal: '', country: 'United States' }

function validate(v) {
  const e = {}
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email address.'
  if (!v.name.trim()) e.name = 'Enter your full name.'
  if (!v.address.trim()) e.address = 'Enter your street address.'
  if (!v.city.trim()) e.city = 'Enter your city.'
  if (!v.postal.trim()) e.postal = 'Enter your postal code.'
  return e
}

function Input({ id, label, v, set, errors, ...rest }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} value={v[id]} onChange={set(id)} aria-invalid={!!errors[id]} {...rest} />
      {errors[id] && <p className="error" role="alert">{errors[id]}</p>}
    </div>
  )
}

export default function Checkout() {
  const { lines, subtotal, shipping, total, clear } = useCart()
  const [v, setV] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [method, setMethod] = useState('stripe')
  const [busy, setBusy] = useState(false)
  const [fail, setFail] = useState('')

  const set = (k) => (e) => setV({ ...v, [k]: e.target.value })

  if (lines.length === 0) {
    return <section className="page"><h1>Checkout</h1><p>Your cart is empty.</p><a className="btn" href="#/">Continue shopping</a></section>
  }

  async function submit(e) {
    e.preventDefault()
    const found = validate(v)
    setErrors(found)
    setFail('')
    if (Object.keys(found).length) return
    setBusy(true)
    const order = {
      customer: { email: v.email, name: v.name },
      shippingAddress: { line1: v.address, city: v.city, postalCode: v.postal, country: v.country },
      items: lines.map((l) => ({ id: l.id, name: l.product.name, color: l.color, size: l.size, quantity: l.qty, unitAmount: Math.round(l.product.price * 100) })),
      shippingAmount: Math.round(shipping * 100),
      totalAmount: Math.round(total * 100),
      currency: 'usd',
    }
    try {
      const res = await pay(method, order)
      try { sessionStorage.setItem('nf-order', JSON.stringify({ id: res.id, email: v.email, total, method })) } catch { /* ignore */ }
      if (res.status === 'paid') { clear(); go('/success') }
    } catch (err) {
      setFail(err.message)
      setBusy(false)
    }
  }

  return (
    <section className="checkout">
      <form onSubmit={submit} noValidate>
        <h1>Checkout</h1>
        <h2>Contact</h2>
        <Input id="email" label="Email" type="email" autoComplete="email" v={v} set={set} errors={errors} />
        <h2>Shipping address</h2>
        <Input id="name" label="Full name" autoComplete="name" v={v} set={set} errors={errors} />
        <Input id="address" label="Street address" autoComplete="street-address" v={v} set={set} errors={errors} />
        <div className="two">
          <Input id="city" label="City" autoComplete="address-level2" v={v} set={set} errors={errors} />
          <Input id="postal" label="Postal code" autoComplete="postal-code" v={v} set={set} errors={errors} />
        </div>
        <div className="field">
          <label htmlFor="country">Country</label>
          <select id="country" value={v.country} onChange={set('country')}>
            {['United States', 'Canada', 'United Kingdom', 'Australia', 'Philippines'].map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <h2>Payment</h2>
        <div className="pay" role="radiogroup" aria-label="Payment method">
          {METHODS.map((m) => (
            <label key={m.id} className={m.id === method ? 'paycard on' : 'paycard'}>
              <input type="radio" name="method" value={m.id} checked={m.id === method} onChange={() => setMethod(m.id)} />
              <span><b>{m.label}</b><small>{m.hint}</small></span>
            </label>
          ))}
        </div>
        <p className="muted">You will enter your payment details on a secure page from the provider. We never see or store them.</p>
        {fail && <p className="error" role="alert">{fail}</p>}
        <button className="btn full" type="submit" disabled={busy}>{busy ? 'Processing payment...' : `Pay ${money(total)}`}</button>
      </form>

      <aside className="summary" aria-label="Order summary">
        <h2>Order summary</h2>
        <ul className="lines">
          {lines.map((l) => (
            <li key={l.key}>
              <div className="thumb" style={{ background: l.product.bg }}>
                <Art kind={l.product.kind} color={l.product.colors.find((x) => x.name === l.color)?.hex} />
                <span className="qbadge">{l.qty}</span>
              </div>
              <div><b>{l.product.name}</b><p className="muted">{l.color}{l.size ? `, ${l.size}` : ''}</p></div>
              <b>{money(l.product.price * l.qty)}</b>
            </li>
          ))}
        </ul>
        <div className="sum"><span>Subtotal</span><span>{money(subtotal)}</span></div>
        <div className="sum"><span>Shipping</span><span>{shipping === 0 ? 'Free' : money(shipping)}</span></div>
        <div className="sum total"><span>Total</span><b>{money(total)}</b></div>
      </aside>
    </section>
  )
}
