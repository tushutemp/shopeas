import React from 'react'
import { Link } from 'react-router-dom'
import './FeaturePage.css'

const PricingInfo = () => {
  return (
    <div className="feature-page">
      <section className="feature-hero">
        <div className="feature-hero-content container">
          <Link to="/" className="back-button">← Back</Link>
          <div className="feature-icon-large">💰</div>
          <h1>Competitive Prices</h1>
          <p>Get the best deals with high-quality products at prices that fit your budget.</p>
          <Link to="/shop" className="feature-cta">Browse Deals</Link>
        </div>
      </section>

      <section className="feature-details container">
        <h2>Why Our Prices Are Better</h2>
        <p>
          We partner with trusted suppliers to offer competitive pricing without compromising on quality.
          Our goal is to help you save more on every purchase.
        </p>

        <div className="feature-grid">
          <div className="feature-box">
            <h3>Best Value</h3>
            <p>Carefully chosen products at the right price so you can shop smartly.</p>
          </div>
          <div className="feature-box">
            <h3>Curated Discounts</h3>
            <p>Regular offers and seasonal deals help you save even more.</p>
          </div>
          <div className="feature-box">
            <h3>Quality Selection</h3>
            <p>Competitive prices on products that meet our quality standards.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PricingInfo
