import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingBag, Menu, X, Leaf, Sparkles } from 'lucide-react'

export default function Navbar({ onCartClick, cartCount = 0 }) {
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark">
            <img src="/logo.png" alt="FitWellth logo" />
            <span className="brand-leaf"><Leaf size={13} /></span>
          </span>
          <span>FITWELLTH<small>Eat healthy. Live well.</small></span>
        </Link>

        <button
          className="mobile-menu icon-btn"
          onClick={() => setOpen(value => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>

        <nav className={open ? 'nav-links show' : 'nav-links'} aria-label="Main navigation">
          <NavLink to="/" onClick={closeMenu} end>Home</NavLink>
          <a href="/#menu" onClick={closeMenu}>Our menu</a>
          <a href="/#story" onClick={closeMenu}>Our story</a>
          <a href="/#reviews" onClick={closeMenu}>Reviews</a>
        </nav>

        <div className="nav-actions">
          <a className="nav-order" href="/#menu" onClick={closeMenu}>
            <Sparkles size={15} /> <span>Explore goodness</span>
          </a>
          <button className="cart-trigger" onClick={onCartClick} aria-label={`Open cart, ${cartCount} items`}>
            <ShoppingBag size={18} />
            <span>Cart</span>
            <b className={cartCount ? 'cart-count has-items' : 'cart-count'}>{cartCount}</b>
          </button>
        </div>
      </div>
    </header>
  )
}
