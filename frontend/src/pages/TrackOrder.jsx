import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import './TrackOrder.css'

const statusSteps = ['pending', 'processing', 'shipped', 'completed']

const statusConfig = {
  pending:    { label: 'Order Placed',    icon: '📋', color: '#f59e0b', desc: 'Your order has been received' },
  processing: { label: 'Processing',      icon: '⚙️', color: '#3b82f6', desc: 'We are preparing your items' },
  shipped:    { label: 'Shipped',         icon: '🚚', color: '#8b5cf6', desc: 'Your order is on its way' },
  completed:  { label: 'Delivered',       icon: '✅', color: '#22c55e', desc: 'Your order has been delivered' },
  cancelled:  { label: 'Cancelled',       icon: '❌', color: '#ef4444', desc: 'This order was cancelled' },
}

const TrackOrder = () => {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [searchId, setSearchId] = useState('')
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('orders') || '[]')
    // Show only current user's orders if logged in
    const userOrders = user
      ? stored.filter(o => o.email === user.email || o.user?.email === user.email)
      : stored
    const sorted = [...userOrders].reverse()
    setOrders(sorted)
    setFiltered(sorted)
  }, [user])

  const handleSearch = (e) => {
    const val = e.target.value
    setSearchId(val)
    if (!val.trim()) {
      setFiltered(orders)
      return
    }
    const q = val.toLowerCase()
    setFiltered(orders.filter(o =>
      String(o._id || o.id).toLowerCase().includes(q) ||
      (o.fullName || '').toLowerCase().includes(q)
    ))
  }

  const getStepIndex = (status) => statusSteps.indexOf(status)

  return (
    <div className="track-page">
      <div className="track-container">
        <div className="track-header">
          <div className="track-icon">📦</div>
          <h1>Track Your Orders</h1>
          <p>Monitor the status of your recent orders</p>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Order ID or Name..."
            value={searchId}
            onChange={handleSearch}
          />
          <span className="search-icon">🔍</span>
        </div>

        {filtered.length === 0 && (
          <div className="no-orders">
            <div className="no-orders-icon">📭</div>
            <h3>No Orders Found</h3>
            <p>You haven't placed any orders yet. Start shopping!</p>
            <a href="/shop" className="shop-link">Go to Shop</a>
          </div>
        )}

        <div className="orders-list">
          {filtered.map(order => {
            const orderId = order._id || order.id
            const displayId = typeof orderId === 'string'
              ? orderId.slice(-8).toUpperCase()
              : String(orderId).slice(-8)
            const isOpen = selectedOrder === String(orderId)
            const stepIdx = getStepIndex(order.status)
            const conf = statusConfig[order.status] || statusConfig.pending

            return (
              <div key={orderId} className={`order-card ${isOpen ? 'open' : ''}`}>
                <div
                  className="order-card-header"
                  onClick={() => setSelectedOrder(isOpen ? null : String(orderId))}
                >
                  <div className="order-meta">
                    <span className="order-id">#{displayId}</span>
                    <span className="order-date">
                      {new Date(order.date || order.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="order-meta-right">
                    <span className="order-total">₹{order.total?.toFixed(2)}</span>
                    <span
                      className="order-status-badge"
                      style={{ background: conf.color + '20', color: conf.color }}
                    >
                      {conf.icon} {conf.label}
                    </span>
                    <span className="expand-icon">{isOpen ? '▲' : '▼'}</span>
                  </div>
                </div>

                {isOpen && (
                  <div className="order-card-body">
                    {/* Progress Tracker */}
                    {order.status !== 'cancelled' && (
                      <div className="progress-tracker">
                        {statusSteps.map((step, idx) => {
                          const sc = statusConfig[step]
                          const done = idx <= stepIdx
                          const active = idx === stepIdx
                          return (
                            <React.Fragment key={step}>
                              <div className={`step ${done ? 'done' : ''} ${active ? 'active' : ''}`}>
                                <div className="step-circle" style={done ? { background: sc.color } : {}}>
                                  {done ? sc.icon : idx + 1}
                                </div>
                                <span className="step-label">{sc.label}</span>
                              </div>
                              {idx < statusSteps.length - 1 && (
                                <div className={`step-line ${idx < stepIdx ? 'done' : ''}`} />
                              )}
                            </React.Fragment>
                          )
                        })}
                      </div>
                    )}

                    {order.status === 'cancelled' && (
                      <div className="cancelled-banner">
                        ❌ This order has been cancelled
                      </div>
                    )}

                    {/* Details */}
                    <div className="track-details-grid">
                      <div className="track-detail-block">
                        <h4>📍 Delivery Address</h4>
                        <p>{order.fullName}</p>
                        <p>{order.address}, {order.city}</p>
                        <p>PIN: {order.zipCode}</p>
                      </div>
                      <div className="track-detail-block">
                        <h4>💳 Payment</h4>
                        <p>Method: {order.paymentMethod ? order.paymentMethod.toUpperCase() : 'N/A'}</p>
                        <p>Status: <span className="paid-badge">✅ Paid</span></p>
                        <p>Total: ₹{order.total?.toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="track-items">
                      <h4>🛍️ Items</h4>
                      {order.items?.map((item, i) => (
                        <div key={i} className="track-item-row">
                          <span>{item.name} × {item.quantity}</span>
                          <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="track-item-row total-row">
                        <span><strong>Total</strong></span>
                        <span><strong>₹{order.total?.toFixed(2)}</strong></span>
                      </div>
                    </div>

                    {/* Current Status Banner */}
                    <div
                      className="current-status-banner"
                      style={{ background: conf.color + '15', borderColor: conf.color + '40' }}
                    >
                      <span style={{ fontSize: '1.4rem' }}>{conf.icon}</span>
                      <div>
                        <strong style={{ color: conf.color }}>{conf.label}</strong>
                        <p>{conf.desc}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TrackOrder
