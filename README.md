# Northfield: React e-commerce store (Vite + JavaScript)

Dependencies: `react` and `react-dom` only. Routing is a tiny hash router (`src/router.js`).

## Run
    npm install
    npm run dev

## Features
Product catalog with search, category filter and sorting. Product pages with color, size and quantity. Persistent cart drawer with a free-shipping progress bar. Checkout with validation, Stripe / PayPal / GCash selection, and a success page.

## Payments
Card details are never typed into this app. Each provider uses its own hosted checkout page, which keeps you out of PCI scope.

- **Demo mode** (default, no `VITE_API_URL`): payment is simulated, so the whole flow works offline.
- **Live mode**: copy `.env.example` to `.env`, set `VITE_API_URL` (for example `http://localhost:4242`), and build a backend with one endpoint per provider: `POST /api/checkout/stripe`, `/paypal`, `/gcash`. Each receives the order from `src/pages/Checkout.jsx`, creates a hosted checkout session, and returns `{ "redirectUrl": "..." }`. Set the provider's success URL to `https://your-site/#/success` and the cancel URL to `https://your-site/#/checkout`.

**Important:** the backend must recompute prices from your own product data. Never trust `unitAmount` or `totalAmount` sent from the browser.

### Stripe example (Node + Express, `npm i express cors stripe`)
    import express from 'express'
    import cors from 'cors'
    import Stripe from 'stripe'

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const app = express()
    app.use(cors(), express.json())

    app.post('/api/checkout/stripe', async (req, res) => {
      const { items, customer } = req.body // look up real prices by item.id here
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        customer_email: customer.email,
        line_items: items.map((i) => ({
          quantity: i.quantity,
          price_data: { currency: 'usd', unit_amount: i.unitAmount, product_data: { name: i.name } },
        })),
        success_url: 'http://localhost:5173/#/success',
        cancel_url: 'http://localhost:5173/#/checkout',
      })
      res.json({ redirectUrl: session.url })
    })
    app.listen(4242)

PayPal uses its Orders API (create an order, return the approval link). GCash is normally accepted through a payment gateway that supports it (for example PayMongo or Xendit): create a payment with that provider and return its checkout URL.

## Customize
Store name, shipping rules, and products live in `src/data.js`. Colors and fonts are CSS variables at the top of `src/index.css`. For real photos, put images in `public/images/` and add `image: '/images/file.jpg'` to a product.
