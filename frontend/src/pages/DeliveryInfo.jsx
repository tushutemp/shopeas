import React from 'react'
import { Link } from 'react-router-dom'
import './FeaturePage.css'

const DeliveryInfo = () => {
  return (
    <div className="feature-page">
      <section className="feature-hero">
        <div className="feature-hero-content container">
          <Link to="/" className="back-button">← Back</Link>
          <div className="feature-icon-large">⚡</div>
          <h1>Fast Delivery</h1>
          <p>Experience quick order processing and reliable delivery for every purchase.</p>
          <Link to="/shop" className="feature-cta">Start Shopping</Link>
        </div>
      </section>

      <section className="feature-details container">
        <h2>Fast and Reliable Delivery</h2>
        <p>
          We aim to ship your orders as quickly as possible so you can receive your favourite products without delay.
          Our delivery partners help us keep service fast and dependable.
        </p>

        <div className="feature-grid">
          <div className="feature-box">
            <h3>Quick Processing</h3>
            <p>Orders are prepared and dispatched promptly after confirmation.</p>
          </div>
          <div className="feature-box">
            <h3>Dependable Partners</h3>
            <p>We work with trusted couriers to deliver your package safely.</p>
          </div>
          <div className="feature-box">
            <h3>Order Tracking</h3>
            <p>Stay updated with tracking notifications from shipment to delivery.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DeliveryInfo
