import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './Checkout.css'

const Checkout = () => {
  const navigate = useNavigate()
  const { cartItems, getCartTotal } = useCart()
  const { user } = useAuth()

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    zipCode: '',
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required'
    if (!formData.email.trim()) errs.email = 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Enter a valid email'
    if (!formData.address.trim()) errs.address = 'Address is required'
    if (!formData.city.trim()) errs.city = 'City is required'
    if (!formData.zipCode.trim()) errs.zipCode = 'ZIP code is required'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    const subtotal = getCartTotal()
    const shipping = subtotal > 50 ? 0 : 5
    const total = subtotal + shipping

    const orderData = {
      ...formData,
      items: cartItems,
      subtotal,
      shipping,
      total,
    }

    // Navigate to payment page with order data
    navigate('/payment', { state: { orderData } })
  }

  if (cartItems.length === 0) {
    navigate('/cart')
    return null
  }

  const subtotal = getCartTotal()
  const shipping = subtotal > 50 ? 0 : 5
  const total = subtotal + shipping

  return (
    <div className="checkout">
      <div className="container">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-content">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <h3>Shipping Information</h3>

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <span className="field-err">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="field-err">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && <span className="field-err">{errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {errors.city && <span className="field-err">{errors.city}</span>}
                </div>

                <div className="form-group">
                  <label>Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                  {errors.zipCode && <span className="field-err">{errors.zipCode}</span>}
                </div>
              </div>
            </div>

            <button type="submit" className="place-order-btn">
              Proceed to Payment →
            </button>
          </form>

          <div className="order-summary">
            <h3>Order Summary</h3>
            {cartItems.map(item => (
              <div key={item.id} className="order-item">
                <div className="order-item-info">
                  <span className="order-item-name">{item.name}</span>
                  <span className="order-item-quantity">x{item.quantity}</span>
                </div>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="summary-divider"></div>

            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <div className="checkout-note">
              🔒 You will enter payment details on the next step
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
