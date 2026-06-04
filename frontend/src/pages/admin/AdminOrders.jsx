import React, { useState, useEffect } from 'react'
import './AdminOrders.css'

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = () => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    setOrders(storedOrders.reverse())
  }

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    )
    setOrders(updatedOrders)
    localStorage.setItem('orders', JSON.stringify(updatedOrders))
    
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }
  }

  const deleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      const updatedOrders = orders.filter(order => order.id !== orderId)
      setOrders(updatedOrders)
      localStorage.setItem('orders', JSON.stringify(updatedOrders))
      setSelectedOrder(null)
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'status-pending'
      case 'processing': return 'status-processing'
      case 'shipped': return 'status-shipped'
      case 'delivered': return 'status-delivered'
      case 'cancelled': return 'status-cancelled'
      default: return 'status-pending'
    }
  }

  return (
    <div className="admin-orders">
      <div className="container">
        <h1 className="admin-title">Manage Orders</h1>
        
        <div className="orders-layout">
          <div className="orders-list">
            <div className="orders-header">
              <h2>All Orders ({orders.length})</h2>
            </div>
            
            <div className="orders-container">
              {orders.length === 0 ? (
                <div className="no-orders">
                  <p>No orders found</p>
                </div>
              ) : (
                orders.map(order => (
                  <div 
                    key={order.id} 
                    className={`order-card ${selectedOrder?.id === order.id ? 'active' : ''}`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="order-card-header">
                      <span className="order-id">#{order.id}</span>
                      <span className={`order-status ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-card-info">
                      <p><strong>Customer:</strong> {order.user?.name || 'Unknown'}</p>
                      <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                      <p><strong>Total:</strong> ₹{order.total?.toFixed(2)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {selectedOrder && (
            <div className="order-details">
              <div className="order-details-header">
                <h2>Order Details</h2>
                <button onClick={() => setSelectedOrder(null)} className="close-details">
                  &times;
                </button>
              </div>
              
              <div className="order-info">
                <p><strong>Order ID:</strong> #{selectedOrder.id}</p>
                <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleString()}</p>
                <p><strong>Customer:</strong> {selectedOrder.user?.name}</p>
                <p><strong>Email:</strong> {selectedOrder.user?.email}</p>
              </div>
              
              <div className="order-status-update">
                <label><strong>Update Status:</strong></label>
                <select 
                  value={selectedOrder.status}
                  onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                  className="status-select"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <div className="order-actions">
                <button 
                  onClick={() => deleteOrder(selectedOrder.id)}
                  className="delete-order-btn"
                >
                  Delete Order
                </button>
              </div>
              
              <div className="order-items">
                <h3>Items</h3>
                <div className="items-list">
                  {selectedOrder.items?.map((item, index) => (
                    <div key={index} className="order-item-detail">
                      <div className="item-info">
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">x{item.quantity}</span>
                      </div>
                      <span className="item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="order-total">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>₹{(selectedOrder.total - (selectedOrder.total > 50 ? 0 : 5)).toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Shipping:</span>
                  <span>{selectedOrder.total > 50 ? 'Free' : '₹5.00'}</span>
                </div>
                <div className="total-row grand-total">
                  <span>Total:</span>
                  <span>₹{selectedOrder.total?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminOrders