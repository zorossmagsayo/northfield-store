// Payment layer. Card details are never typed into this app: Stripe, PayPal and
// GCash all take the customer to their own secure page (hosted checkout).
//
// Demo mode (no VITE_API_URL): payment is simulated so you can test the full flow.
// Live mode: POST the order to your backend, which creates the hosted checkout
// session with the provider and returns { redirectUrl }. See README.
const API = import.meta.env.VITE_API_URL
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

export const METHODS = [
  { id: 'stripe', label: 'Card', hint: 'Visa, Mastercard, and more via Stripe' },
  { id: 'paypal', label: 'PayPal', hint: 'Pay with your PayPal balance or card' },
  { id: 'gcash', label: 'GCash', hint: 'Pay with the GCash app' },
]

export async function pay(method, order) {
  if (!API) {
    await wait(1200)
    return { status: 'paid', id: `NF-${Date.now().toString(36).toUpperCase()}` }
  }
  const res = await fetch(`${API}/api/checkout/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  })
  if (!res.ok) throw new Error('We could not start the payment. Please try again.')
  const data = await res.json()
  if (data.redirectUrl) {
    window.location.href = data.redirectUrl
    return { status: 'redirect' }
  }
  return data
}
