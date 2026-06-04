import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    inStockProducts: 0,
    outOfStockProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    processingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    totalContacts: 0,
    newContacts: 0,
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [topProducts, setTopProducts] = useState([])

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const token = localStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }

      // Fetch products from API
      const productsResponse = await axios.get('http://localhost:5000/api/products')
      const products = productsResponse.data?.data || []

      // Fetch orders from API
      let apiOrders = []
      try {
        const ordersResponse = await axios.get('http://localhost:5000/api/orders', { headers })
        apiOrders = ordersResponse.data?.orders || []
      } catch (e) {
        console.warn('Could not fetch orders from API, falling back to localStorage')
      }

      // Fetch contacts from API
      let contacts = []
      try {
        const contactsResponse = await axios.get('http://localhost:5000/api/contact', { headers })
        contacts = contactsResponse.data?.data || []
      } catch (e) {
        console.warn('Could not fetch contacts from API')
      }

      // Merge localStorage orders (for any not yet in DB)
      const localOrders = JSON.parse(localStorage.getItem('orders') || '[]')
      const orders = apiOrders.length > 0 ? apiOrders : localOrders

      const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)
      const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0
      const inStock = products.filter(p => p.stock > 0).length
      const outOfStock = products.filter(p => p.stock === 0).length

      setStats({
        totalProducts: products.length || 8,
        inStockProducts: inStock,
        outOfStockProducts: outOfStock,
        totalOrders: orders.length,
        pendingOrders: orders.filter(o => o.status === 'pending').length,
        processingOrders: orders.filter(o => o.status === 'processing').length,
        shippedOrders: orders.filter(o => o.status === 'shipped').length,
        deliveredOrders: orders.filter(o => o.status === 'completed' || o.status === 'delivered').length,
        totalRevenue,
        averageOrderValue,
        totalContacts: contacts.length,
        newContacts: contacts.filter(c => c.status === 'new').length,
      })

      setRecentOrders([...orders].slice(-5).reverse())
      setTopProducts(products.slice(0, 5))
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)
      setStats(prev => ({
        ...prev,
        totalProducts: 8,
        totalOrders: orders.length,
        pendingOrders: orders.filter(o => o.status === 'pending').length,
        totalRevenue,
        averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
      }))
      setRecentOrders(orders.slice(-5).reverse())
    }
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1 className="admin-title">Admin Dashboard</h1>

        {/* Primary Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <h3>Total Products</h3>
              <p className="stat-value">{stats.totalProducts}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🛒</div>
            <div className="stat-info">
              <h3>Total Orders</h3>
              <p className="stat-value">{stats.totalOrders}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>Total Revenue</h3>
              <p className="stat-value">₹{stats.totalRevenue.toFixed(2)}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-info">
              <h3>Avg Order Value</h3>
              <p className="stat-value">₹{stats.averageOrderValue.toFixed(2)}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📬</div>
            <div className="stat-info">
              <h3>Contact Messages</h3>
              <p className="stat-value">{stats.totalContacts}</p>
              {stats.newContacts > 0 && (
                <span className="new-badge">{stats.newContacts} new</span>
              )}
            </div>
          </div>
        </div>

        {/* Product & Order Status Stats */}
        <div className="detailed-stats">
          <div className="stats-section">
            <h2>📦 Product Status</h2>
            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-label">In Stock</span>
                <span className="stat-number in-stock">{stats.inStockProducts}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Out of Stock</span>
                <span className="stat-number out-of-stock">{stats.outOfStockProducts}</span>
              </div>
            </div>
          </div>

          <div className="stats-section">
            <h2>🛒 Order Status</h2>
            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-label">Pending</span>
                <span className="stat-number pending">{stats.pendingOrders}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Processing</span>
                <span className="stat-number processing">{stats.processingOrders}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Shipped</span>
                <span className="stat-number shipped">{stats.shippedOrders}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Delivered</span>
                <span className="stat-number delivered">{stats.deliveredOrders}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="admin-actions">
          <Link to="/admin/products" className="action-card">
            <div className="action-icon">📝</div>
            <h3>Manage Products</h3>
            <p>Add, edit, or remove products</p>
          </Link>

          <Link to="/admin/orders" className="action-card">
            <div className="action-icon">📋</div>
            <h3>Manage Orders</h3>
            <p>View and update orders</p>
          </Link>

          <Link to="/admin/contacts" className="action-card">
            <div className="action-icon">📬</div>
            <h3>Contact Messages</h3>
            <p>
              View customer inquiries
              {stats.newContacts > 0 && (
                <span className="action-badge">{stats.newContacts} new</span>
              )}
            </p>
          </Link>
        </div>

        {recentOrders.length > 0 && (
          <div className="recent-orders">
            <h2>📋 Recent Orders</h2>
            <div className="orders-table-container">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => {
                    const oid = order._id || order.id
                    const displayId = typeof oid === 'string' ? oid.slice(-8).toUpperCase() : String(oid).slice(-8)
                    return (
                      <tr key={oid}>
                        <td>#{displayId}</td>
                        <td>{order.fullName || order.user?.name || 'Unknown'}</td>
                        <td>{new Date(order.createdAt || order.date).toLocaleDateString()}</td>
                        <td>₹{(order.total || 0).toFixed(2)}</td>
                        <td><span className={`status-badge ${order.status}`}>{order.status}</span></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!recentOrders.length && (
          <div className="no-data-section">
            <p>No orders yet. Start by managing products and waiting for customer orders!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
