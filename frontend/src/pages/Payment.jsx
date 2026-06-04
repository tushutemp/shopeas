import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../context/CartContext'
import './Payment.css'

const Payment = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { clearCart } = useCart()

  // Get order data passed from Checkout
  const orderData = location.state?.orderData
  if (!orderData) {
    navigate('/cart')
    return null
  }

  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })
  const [upiId, setUpiId] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const API_URL = process.env.API_URL

  const handleCardChange = (e) => {
    let { name, value } = e.target
    if (name === 'cardNumber') {
      value = value.replace(/\D/g, '').substring(0, 16)
      value = value.replace(/(.{4})/g, '$1 ').trim()
    }
    if (name === 'expiryDate') {
      value = value.replace(/\D/g, '').substring(0, 4)
      if (value.length > 2) value = value.substring(0, 2) + '/' + value.substring(2)
    }
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').substring(0, 3)
    }
    setCardData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateCard = () => {
    const errs = {}
    const rawNumber = cardData.cardNumber.replace(/\s/g, '')
    if (rawNumber.length !== 16) errs.cardNumber = 'Card number must be 16 digits'
    if (!cardData.cardName.trim()) errs.cardName = 'Cardholder name is required'
    if (!/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) errs.expiryDate = 'Use MM/YY format'
    if (cardData.cvv.length !== 3) errs.cvv = 'CVV must be 3 digits'
    return errs
  }

  const validateUpi = () => {
    const errs = {}
    if (!/^[\w.\-_]{2,}\@[a-zA-Z]{2,}$/.test(upiId)) errs.upiId = 'Enter a valid UPI ID (e.g. name@upi)'
    return errs
  }

  const handlePay = async () => {
    let validationErrors = {}
    if (paymentMethod === 'card') validationErrors = validateCard()
    else if (paymentMethod === 'upi') validationErrors = validateUpi()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    try {
      const finalOrder = {
        ...orderData,
        paymentMethod,
        cardNumber: paymentMethod === 'card' ? cardData.cardNumber.replace(/\s/g, '').slice(-4) : '',
        expiryDate: paymentMethod === 'card' ? cardData.expiryDate : '',
        cvv: '',
        upiId: paymentMethod === 'upi' ? upiId : '',
        paymentStatus: 'paid',
      }

      const token = localStorage.getItem('token')
      const response = await axios.post(`${API_URL}/orders`, finalOrder, {
        headers: { Authorization: `Bearer ${token}` }
      })

      const savedOrder = response.data?.order

      // Save to localStorage for tracking
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
      const trackingOrder = {
        _id: savedOrder?._id || Date.now().toString(),
        id: savedOrder?._id || Date.now(),
        fullName: orderData.fullName,
        email: orderData.email,
        address: orderData.address,
        city: orderData.city,
        zipCode: orderData.zipCode,
        items: orderData.items,
        subtotal: orderData.subtotal,
        shipping: orderData.shipping,
        total: orderData.total,
        paymentMethod,
        date: new Date().toISOString(),
        status: 'pending',
        paymentStatus: 'paid',
      }
      existingOrders.push(trackingOrder)
      localStorage.setItem('orders', JSON.stringify(existingOrders))

      clearCart()
      navigate('/payment-success', { state: { order: trackingOrder } })
    } catch (error) {
      console.error('Payment failed:', error)
      setErrors({ general: 'Payment failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="payment-header">
          <div className="payment-header-icon">🔒</div>
          <h1>Secure Payment</h1>
          <p>Your payment information is encrypted and secure</p>
        </div>

        <div className="payment-content">
          <div className="payment-left">
            {/* Payment Method Selector */}
            <div className="payment-methods">
              <h3>Choose Payment Method</h3>
              <div className="method-tabs">
                <button
                  className={`method-tab ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <span>💳</span> Credit / Debit Card
                </button>
                <button
                  className={`method-tab ${paymentMethod === 'upi' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <span>📱</span> UPI
                </button>
                <button
                  className={`method-tab ${paymentMethod === 'cod' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <span>💵</span> Cash on Delivery
                </button>
              </div>
            </div>

            {/* Card Form */}
            {paymentMethod === 'card' && (
              <div className="payment-form">
                <div className="card-preview">
                  <div className="card-chip">💳</div>
                  <div className="card-number-display">
                    {cardData.cardNumber || '•••• •••• •••• ••••'}
                  </div>
                  <div className="card-bottom">
                    <span>{cardData.cardName || 'CARDHOLDER NAME'}</span>
                    <span>{cardData.expiryDate || 'MM/YY'}</span>
                  </div>
                </div>

                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.cardNumber}
                    onChange={handleCardChange}
                    maxLength={19}
                  />
                  {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
                </div>

                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    name="cardName"
                    placeholder="Name on card"
                    value={cardData.cardName}
                    onChange={handleCardChange}
                  />
                  {errors.cardName && <span className="field-error">{errors.cardName}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={cardData.expiryDate}
                      onChange={handleCardChange}
                      maxLength={5}
                    />
                    {errors.expiryDate && <span className="field-error">{errors.expiryDate}</span>}
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="password"
                      name="cvv"
                      placeholder="•••"
                      value={cardData.cvv}
                      onChange={handleCardChange}
                      maxLength={3}
                    />
                    {errors.cvv && <span className="field-error">{errors.cvv}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* UPI Form */}
            {paymentMethod === 'upi' && (
              <div className="payment-form">
                <div className="upi-info">
                  <p>Enter your UPI ID to complete payment</p>
                  <div className="upi-logos">
                    <span>GPay</span><span>PhonePe</span><span>Paytm</span><span>BHIM</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>UPI ID</label>
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={e => { setUpiId(e.target.value); setErrors({}) }}
                  />
                  {errors.upiId && <span className="field-error">{errors.upiId}</span>}
                </div>
              </div>
            )}

            {/* Cash on Delivery */}
            {paymentMethod === 'cod' && (
              <div className="payment-form">
                <div className="cod-info">
                  <div className="cod-icon">💵</div>
                  <h4>Cash on Delivery</h4>
                  <p>Pay when your order arrives at your doorstep. Have exact change ready.</p>
                  <ul>
                    <li>✅ No online payment needed</li>
                    <li>✅ Pay when you receive</li>
                    <li>⚠️ Extra ₹40 COD charge may apply</li>
                  </ul>
                </div>
              </div>
            )}

            {errors.general && <div className="general-error">{errors.general}</div>}

            <button
              className="pay-btn"
              onClick={handlePay}
              disabled={loading}
            >
              {loading ? (
                <span className="loading-spinner">Processing...</span>
              ) : (
                <>🔒 Pay ₹{orderData.total?.toFixed(2)}</>
              )}
            </button>
          </div>

          {/* Order Summary Sidebar */}
          <div className="payment-right">
            <div className="order-summary-card">
              <h3>Order Summary</h3>
              <div className="summary-items">
                {orderData.items?.map((item, i) => (
                  <div key={i} className="summary-item">
                    <span className="item-name">{item.name} <span className="item-qty">×{item.quantity}</span></span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="summary-divider" />
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{orderData.subtotal?.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{orderData.shipping === 0 ? 'Free' : `₹${orderData.shipping?.toFixed(2)}`}</span>
              </div>
              <div className="summary-row total-row">
                <span>Total</span>
                <span>₹{orderData.total?.toFixed(2)}</span>
              </div>

              <div className="delivery-info">
                <h4>📦 Deliver to</h4>
                <p>{orderData.fullName}</p>
                <p>{orderData.address}, {orderData.city} - {orderData.zipCode}</p>
              </div>

              <div className="security-badges">
                <span>🔒 SSL Secured</span>
                <span>🛡️ Buyer Protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
