import { useEffect, useState } from 'react'
import { useCart } from '../store.jsx'
import { money } from '../data.js'

export default function Success() {
  const { clear } = useCart()
  const [order] = useState(() => { try { return JSON.parse(sessionStorage.getItem('nf-order')) } catch { return null } })
  useEffect(() => { clear() }, [])
  return (
    <section className="page center">
      <div className="check" aria-hidden="true">&#10003;</div>
      <h1>Thank you for your order</h1>
      {order ? (
        <p>Order <b>{order.id || 'received'}</b> for {money(order.total)} is confirmed. A receipt is on its way to {order.email}.</p>
      ) : (
        <p>Your payment was received. A receipt is on its way to your email.</p>
      )}
      <a className="btn" href="#/">Continue shopping</a>
    </section>
  )
}
