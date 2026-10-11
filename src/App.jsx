import Header from './components/Header.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import Home from './pages/Home.jsx'
import Product from './pages/Product.jsx'
import Checkout from './pages/Checkout.jsx'
import Success from './pages/Success.jsx'
import { useRoute } from './router.js'
import { STORE } from './data.js'

export default function App() {
  const { name, id } = useRoute()
  return (
    <>
      <Header />
      <main>
        {name === 'product' ? <Product id={id} /> : name === 'checkout' ? <Checkout /> : name === 'success' ? <Success /> : <Home />}
      </main>
      <footer className="footer"><p>&copy; {new Date().getFullYear()} {STORE.name}. Demo store.</p></footer>
      <CartDrawer />
    </>
  )
}
