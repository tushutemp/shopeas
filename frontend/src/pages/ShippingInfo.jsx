import React from 'react'
import { Link } from 'react-router-dom'
import './FeaturePage.css'

const ShippingInfo = () => {
  return (
    <div className="feature-page">
      <section className="feature-hero">
        <div className="feature-hero-content container">
          <Link to="/" className="back-button">← Back</Link>
          <div className="feature-icon-large">🚚</div>
          <h1>Free Shipping</h1>
          <p>Enjoy free shipping on all orders over ₹50000, delivered quickly to your door.</p>
          <Link to="/shop" className="feature-cta">Shop Now</Link>
        </div>
      </section>

      <section className="feature-details container">
        <h2>Shipping Benefits</h2>
        <p>
          We offer free shipping on qualifying orders so you can save more while enjoying a smooth delivery experience.
          Most orders are processed and dispatched the same business day.
        </p>

        <div className="feature-grid">
          <div className="feature-box">
            <h3>No Delivery Fees</h3>
            <p>Free shipping applies automatically for orders above ₹50000 with no hidden charges.</p>
          </div>
          <div className="feature-box">
            <h3>Fast Dispatch</h3>
            <p>Orders are prepared quickly so your package reaches you faster.</p>
          </div>
          <div className="feature-box">
            <h3>Track Your Order</h3>
            <p>Get timely updates and tracking details from dispatch to delivery.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ShippingInfo
