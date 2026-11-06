import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingBag, Menu, X, Leaf } from 'lucide-react'
export default function Navbar({ onCartClick, cartCount=0 }) {
  const [open, setOpen] = useState(false)
  return <header className="site-header"><div className="nav-wrap">
    <Link to="/" className="brand"><img src="/logo.png" alt="FitWellth logo"/><span>FITWELLTH<small>Eat healthy. Live well.</small></span></Link>
    <button className="mobile-menu icon-btn" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button>
    <nav className={open ? 'nav-links show' : 'nav-links'}>
      <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
      <a href="/#menu" onClick={() => setOpen(false)}>Our menu</a>
      <a href="/#story" onClick={() => setOpen(false)}>Our story</a>
      <a href="/#reviews" onClick={() => setOpen(false)}>Reviews</a>
    </nav>
    <div className="nav-actions"><a className="nav-order" href="/#menu"><Leaf size={16}/> Order fresh</a><button className="cart-trigger" onClick={onCartClick} aria-label="Open cart"><ShoppingBag size={19}/><span>Cart</span>{cartCount > 0 && <b>{cartCount}</b>}</button></div>
  </div></header>
}
