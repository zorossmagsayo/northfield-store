import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { PRODUCTS, STORE } from './data.js'

const Ctx = createContext(null)
const load = () => { try { return JSON.parse(localStorage.getItem('nf-cart')) || [] } catch { return [] } }

function reducer(state, a) {
  switch (a.type) {
    case 'add': {
      const found = state.find((i) => i.key === a.item.key)
      if (!found) return [...state, a.item]
      return state.map((i) => (i.key === a.item.key ? { ...i, qty: Math.min(10, i.qty + a.item.qty) } : i))
    }
    case 'qty':
      return state.map((i) => (i.key === a.key ? { ...i, qty: Math.min(10, a.qty) } : i)).filter((i) => i.qty > 0)
    case 'clear':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [], load)
  const [open, setOpen] = useState(false)

  useEffect(() => { try { localStorage.setItem('nf-cart', JSON.stringify(items)) } catch { /* storage unavailable */ } }, [items])

  const value = useMemo(() => {
    const lines = items
      .map((i) => ({ ...i, product: PRODUCTS.find((p) => p.id === i.id) }))
      .filter((l) => l.product)
    const subtotal = lines.reduce((t, l) => t + l.product.price * l.qty, 0)
    const shipping = subtotal === 0 || subtotal >= STORE.freeShippingAt ? 0 : STORE.shipping
    return {
      lines, subtotal, shipping, total: subtotal + shipping,
      count: lines.reduce((t, l) => t + l.qty, 0),
      open, setOpen,
      add: ({ id, color, size, qty }) => dispatch({ type: 'add', item: { key: `${id}|${color}|${size || '-'}`, id, color, size, qty } }),
      setQty: (key, qty) => dispatch({ type: 'qty', key, qty }),
      clear: () => dispatch({ type: 'clear' }),
    }
  }, [items, open])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useCart = () => useContext(Ctx)
