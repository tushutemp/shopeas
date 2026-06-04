import React from 'react'
import './AboutUs.css'

const AboutUs = () => {
  return (
    <div className="about-us">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-title">About ShopEase</h1>
          <p className="about-subtitle">Your Trusted Online Shopping Destination</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-grid">
            <div className="about-card">
              <div className="about-card-icon">🎯</div>
              <h2>Our Mission</h2>
              <p>
                At ShopEase, we're committed to providing a seamless shopping experience with quality products, 
                competitive prices, and exceptional customer service. We believe shopping should be easy, enjoyable, 
                and accessible to everyone.
              </p>
            </div>

            <div className="about-card">
              <div className="about-card-icon">👁️</div>
              <h2>Our Vision</h2>
              <p>
                We envision becoming the most trusted online marketplace, where customers can find everything they need 
                with confidence. We strive to build lasting relationships with our customers through quality, integrity, 
                and innovation.
              </p>
            </div>

            <div className="about-card">
              <div className="about-card-icon">💡</div>
              <h2>Our Values</h2>
              <p>
                We stand by principles of transparency, quality, and customer-centricity. Every product is carefully 
                selected, every transaction is secure, and every customer concern is our priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="about-why">
        <div className="about-container">
          <h2>Why Choose ShopEase?</h2>
          <div className="about-features">
            <div className="feature-item">
              <div className="feature-number">01</div>
              <h3>Wide Product Range</h3>
              <p>Browse thousands of quality products across multiple categories to find exactly what you need.</p>
            </div>

            <div className="feature-item">
              <div className="feature-number">02</div>
              <h3>Competitive Prices</h3>
              <p>We offer the best prices without compromising on quality. Regular discounts and deals available.</p>
            </div>

            <div className="feature-item">
              <div className="feature-number">03</div>
              <h3>Secure Shopping</h3>
              <p>Your security is our priority. We use advanced encryption and secure payment gateways.</p>
            </div>

            <div className="feature-item">
              <div className="feature-number">04</div>
              <h3>Fast Delivery</h3>
              <p>Quick and reliable shipping to your doorstep. Track your orders in real-time.</p>
            </div>

            <div className="feature-item">
              <div className="feature-number">05</div>
              <h3>24/7 Support</h3>
              <p>Our dedicated customer support team is always ready to help you with any queries.</p>
            </div>

            <div className="feature-item">
              <div className="feature-number">06</div>
              <h3>Easy Returns</h3>
              <p>Hassle-free returns and exchanges within 30 days of purchase guarantee.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="about-container">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>50K+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-card">
              <h3>10K+</h3>
              <p>Products</p>
            </div>
            <div className="stat-card">
              <h3>100%</h3>
              <p>Secure</p>
            </div>
            <div className="stat-card">
              <h3>24/7</h3>
              <p>Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <div className="about-container">
          <h2>Our Team</h2>
          <p className="team-intro">
            We're a passionate team dedicated to making your shopping experience exceptional.
          </p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👨‍💼</div>
              <h3>Naresh Bhat</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍💼</div>
              <h3>Soumya </h3>
              <p>Operations Manager</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👨‍💻</div>
              <h3>Arman</h3>
              <p>Tech Lead</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍💻</div>
              <h3>Rajesh</h3>
              <p>Customer Success Lead</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="about-container">
          <h2>Start Shopping Today</h2>
          <p>Discover our exclusive collection and enjoy premium quality at unbeatable prices.</p>
          <a href="/shop" className="cta-button">Shop Now</a>
        </div>
      </section>
    </div>
  )
}

export default AboutUs
