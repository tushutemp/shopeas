import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  if (isLoginPage) {
    return (
      <footer className="footer footer-minimal">
        <div className="footer-minimal-inner">
          <Link to="/faqs" className="footer-minimal-link">FAQs</Link>
          <span className="footer-minimal-copy">&copy; 2026 ShopEase</span>
        </div>
      </footer>
    )
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>ShopEase</h3>
          <p>Your one-stop shop for everything you need. Quality products at affordable prices.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/checkout">Checkout</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faqs">FAQs</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Instagram">📸</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 ShopEase. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
