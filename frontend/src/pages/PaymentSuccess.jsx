import React from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import './PaymentSuccess.css'

const PaymentSuccess = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const order = location.state?.order

  if (!order) {
    navigate('/')
    return null
  }

  const methodLabel = {
    card: '💳 Credit/Debit Card',
    upi: '📱 UPI',
    cod: '💵 Cash on Delivery',
  }

  return (
    <div className="success-page">
      <div className="success-container">
        {/* Animated checkmark */}
        <div className="success-animation">
          <div className="checkmark-circle">
            <div className="checkmark">✓</div>
          </div>
          <div className="ripple r1"></div>
          <div className="ripple r2"></div>
        </div>

        <h1 className="success-title">Payment Successful! 🎉</h1>
        <p className="success-subtitle">
          Your order has been placed. We'll get it to you soon!
        </p>

        {/* Order Details Card */}
        <div className="order-details-card">
          <div className="order-id-row">
            <span>Order ID</span>
            <strong>#{typeof order._id === 'string' ? order._id.slice(-8).toUpperCase() : order.id}</strong>
          </div>
          <div className="order-detail-row">
            <span>Payment Method</span>
            <strong>{methodLabel[order.paymentMethod] || order.paymentMethod}</strong>
          </div>
          <div className="order-detail-row">
            <span>Amount Paid</span>
            <strong className="amount">₹{order.total?.toFixed(2)}</strong>
          </div>
          <div className="order-detail-row">
            <span>Deliver to</span>
            <strong>{order.fullName}, {order.city}</strong>
          </div>
          <div className="order-detail-row">
            <span>Estimated Delivery</span>
            <strong>3–5 Business Days</strong>
          </div>
          <div className="status-row">
            <span>Order Status</span>
            <span className="status-badge pending">⏳ Pending</span>
          </div>
        </div>

        {/* Items Summary */}
        <div className="items-summary">
          <h4>Items Ordered</h4>
          {order.items?.map((item, i) => (
            <div key={i} className="order-item-row">
              <span>{item.name} × {item.quantity}</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="success-actions">
          <Link to="/track-order" className="btn-track">
            📦 Track My Order
          </Link>
          <Link to="/shop" className="btn-shop">
            🛍️ Continue Shopping
          </Link>
        </div>

        <p className="email-notice">
          A confirmation has been noted for <strong>{order.email}</strong>
        </p>
      </div>
    </div>
  )
}

export default PaymentSuccess
