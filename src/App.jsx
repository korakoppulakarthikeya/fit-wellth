import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import ProductPage from './pages/ProductPage'
import NotFound from './pages/NotFound'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import AnnouncementBar from './components/layout/AnnouncementBar'
import WhatsAppButton from './components/layout/WhatsAppButton'
import { useState } from 'react'
import CartDrawer from './components/cart/CartDrawer'
import { useCartContext } from './context/CartContext'

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const { count } = useCartContext()
  return <>
    <AnnouncementBar />
    <Navbar onCartClick={() => setCartOpen(true)} cartCount={count} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:slug" element={<ProductPage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
    <WhatsAppButton />
    <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
  </>
}
