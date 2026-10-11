import { useCart } from '../store.jsx'
import { STORE, money } from '../data.js'

export default function Header() {
  const { count, setOpen } = useCart()
  return (
    <>
      <div className="promo">Free shipping on orders over {money(STORE.freeShippingAt)}</div>
      <header className="header">
        <a className="brand" href="#/">{STORE.name}</a>
        <nav className="nav" aria-label="Main">
          <a href="#/">Shop</a>
          <button className="cart-btn" onClick={() => setOpen(true)} aria-label={`Open cart, ${count} items`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 8h14l-1 12H6z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {count > 0 && <span className="count">{count}</span>}
          </button>
        </nav>
      </header>
    </>
  )
}
