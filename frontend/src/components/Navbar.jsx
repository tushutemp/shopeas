import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import './Navbar.css'

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth()
  const { getCartCount } = useCart()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
    setIsMenuOpen(false)
  }

  const cartCount = getCartCount()

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
          🛍️ShopEase
        </Link>

        <button className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="menu-icon-bar"></span>
          <span className="menu-icon-bar"></span>
          <span className="menu-icon-bar"></span>
        </button>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {user && !isAdmin && (
            <>
              <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/shop" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Shop
              </Link>
              <Link to="/faqs" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                FAQs
              </Link>
              <Link to="/cart" className="nav-link cart-link" onClick={() => setIsMenuOpen(false)}>
                Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
              <Link to="/checkout" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Checkout
              </Link>
              <Link to="/track-order" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                📦 Track Order
              </Link>
            </>
          )}

          {isAdmin && (
            <>
              <Link to="/admin" onClick={() => setIsMenuOpen(false)}><b>Dashboard</b></Link>
              <Link to="/admin/products" onClick={() => setIsMenuOpen(false)}><b>Products</b></Link>
              <Link to="/admin/orders" onClick={() => setIsMenuOpen(false)}><b>Orders</b></Link>
              <Link to="/admin/contacts" onClick={() => setIsMenuOpen(false)}><b>Contacts</b></Link>
            </>
          )}

          {user ? (
            <div className="user-menu">
              <span className="user-name">Hi, {user.name}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="nav-link register" onClick={() => setIsMenuOpen(false)}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
