import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './AdminContacts.css'

const API_URL = import.meta.env.VITE_API_URL

const statusConfig = {
  new:      { label: 'New',      color: '#3b82f6', bg: '#eff6ff' },
  read:     { label: 'Read',     color: '#f59e0b', bg: '#fffbeb' },
  resolved: { label: 'Resolved', color: '#22c55e', bg: '#f0fdf4' },
}

const AdminContacts = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedContact, setSelectedContact] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_URL}/contact`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setContacts(response.data.data || [])
    } catch (err) {
      setError('Failed to load contacts. Make sure you are logged in as admin.')
      console.error('Error fetching contacts:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id)
      const token = localStorage.getItem('token')
      await axios.patch(`${API_URL}/contact/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setContacts(prev => prev.map(c => c._id === id ? { ...c, status } : c))
      if (selectedContact?._id === id) {
        setSelectedContact(prev => ({ ...prev, status }))
      }
    } catch (err) {
      console.error('Error updating status:', err)
    } finally {
      setUpdatingId(null)
    }
  }

  const filtered = filterStatus === 'all'
    ? contacts
    : contacts.filter(c => c.status === filterStatus)

  const counts = {
    all: contacts.length,
    new: contacts.filter(c => c.status === 'new').length,
    read: contacts.filter(c => c.status === 'read').length,
    resolved: contacts.filter(c => c.status === 'resolved').length,
  }

  return (
    <div className="admin-contacts">
      <div className="container">
        <div className="ac-header">
          <div>
            <h1 className="ac-title">📬 Contact Messages</h1>
            <p className="ac-subtitle">View and manage customer contact submissions</p>
          </div>
          <button className="refresh-btn" onClick={fetchContacts}>🔄 Refresh</button>
        </div>

        {/* Stats Row */}
        <div className="contact-stats">
          {['all', 'new', 'read', 'resolved'].map(s => (
            <button
              key={s}
              className={`stat-filter-btn ${filterStatus === s ? 'active' : ''}`}
              onClick={() => setFilterStatus(s)}
            >
              <span className="stat-count">{counts[s]}</span>
              <span className="stat-label">{s === 'all' ? 'All' : statusConfig[s]?.label}</span>
            </button>
          ))}
        </div>

        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading contacts...</p>
          </div>
        )}

        {error && (
          <div className="error-banner">{error}</div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No messages found</h3>
            <p>{filterStatus === 'all' ? 'No contact submissions yet.' : `No ${filterStatus} messages.`}</p>
          </div>
        )}

        <div className="contacts-layout">
          {/* Contact List */}
          <div className="contacts-list">
            {filtered.map(contact => {
              const sc = statusConfig[contact.status] || statusConfig.new
              return (
                <div
                  key={contact._id}
                  className={`contact-item ${selectedContact?._id === contact._id ? 'selected' : ''} ${contact.status === 'new' ? 'unread' : ''}`}
                  onClick={() => {
                    setSelectedContact(contact)
                    if (contact.status === 'new') updateStatus(contact._id, 'read')
                  }}
                >
                  <div className="contact-item-top">
                    <div className="contact-avatar">
                      {contact.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="contact-preview">
                      <div className="contact-name-row">
                        <span className="contact-name">{contact.name}</span>
                        <span
                          className="contact-status-pill"
                          style={{ background: sc.bg, color: sc.color }}
                        >
                          {sc.label}
                        </span>
                      </div>
                      <span className="contact-email">{contact.email}</span>
                      <span className="contact-subject">{contact.subject}</span>
                      <span className="contact-date">
                        {new Date(contact.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit', month: 'short', year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  <p className="contact-message-preview">
                    {contact.message.substring(0, 80)}{contact.message.length > 80 ? '...' : ''}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Contact Detail */}
          {selectedContact ? (
            <div className="contact-detail">
              <div className="detail-header">
                <div className="detail-avatar">{selectedContact.name?.charAt(0).toUpperCase()}</div>
                <div className="detail-meta">
                  <h3>{selectedContact.name}</h3>
                  <a href={`mailto:${selectedContact.email}`} className="detail-email">
                    {selectedContact.email}
                  </a>
                  <span className="detail-date">
                    {new Date(selectedContact.createdAt).toLocaleDateString('en-IN', {
                      weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              <div className="detail-subject">
                <label>Subject</label>
                <p>{selectedContact.subject}</p>
              </div>

              <div className="detail-message">
                <label>Message</label>
                <p>{selectedContact.message}</p>
              </div>

              <div className="detail-actions">
                <label>Update Status</label>
                <div className="status-buttons">
                  {['new', 'read', 'resolved'].map(s => {
                    const sc = statusConfig[s]
                    return (
                      <button
                        key={s}
                        className={`status-btn ${selectedContact.status === s ? 'active' : ''}`}
                        style={selectedContact.status === s ? { background: sc.color, color: 'white' } : {}}
                        onClick={() => updateStatus(selectedContact._id, s)}
                        disabled={updatingId === selectedContact._id}
                      >
                        {updatingId === selectedContact._id ? '...' : sc.label}
                      </button>
                    )
                  })}
                </div>
                <a
                  href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                  className="reply-btn"
                >
                  📧 Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="contact-detail empty-detail">
              <div className="select-prompt">
                <span>📩</span>
                <p>Select a message to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminContacts
