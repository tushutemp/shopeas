import React from 'react'
import { Link } from 'react-router-dom'
import './FeaturePage.css'

const SupportInfo = () => {
  return (
    <div className="feature-page">
      <section className="feature-hero">
        <div className="feature-hero-content container">
          <Link to="/" className="back-button">← Back</Link>
          <div className="feature-icon-large">💬</div>
          <h1>24/7 Support</h1>
          <p>Our support team is available anytime to help with your orders and questions.</p>
          <Link to="/contact" className="feature-cta">Contact Support</Link>
        </div>
      </section>

      <section className="feature-details container">
        <h2>Support That’s Always There</h2>
        <p>
          Whether you need help with an order, product question, or return, our friendly team is ready to help
          around the clock.
        </p>

        <div className="feature-grid">
          <div className="feature-box">
            <h3>Round-the-clock Help</h3>
            <p>Support is available whenever you need it, day or night.</p>
          </div>
          <div className="feature-box">
            <h3>Multiple Channels</h3>
            <p>Reach us by email, chat, or phone for quick assistance.</p>
          </div>
          <div className="feature-box">
            <h3>Order Assistance</h3>
            <p>We help with tracking, returns, cancellations, and any other order issue.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SupportInfo
