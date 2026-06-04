import React, { useState, useEffect } from 'react'
import './AdminProducts.css'
import axios from 'axios'
import { useToast } from '../../context/ToastContext'

const AdminProducts = () => {
  const { showToast } = useToast()
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const API_URL = 'http://localhost:5000/api/products'

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    image: '',
    rating: '4.0'
  })

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL)
      if (response.data?.success) {
        setProducts(response.data.data)
      } else {
        console.error('Failed to load products:', response.data)
      }
    } catch (error) {
      console.error('Error loading products:', error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let response
      
      if (editingProduct) {
        // Update existing product
        const productId = editingProduct._id || editingProduct.id
        response = await axios.put(`${API_URL}/${productId}`, formData)
      } else {
        // Add new product
        response = await axios.post(API_URL, formData)
      }
      
      const result = response.data

      if (result.success) {
        if (editingProduct) {
          showToast('Product updated successfully!', 'success')
          // Properly update only the edited product
          setProducts(prevProducts => 
            prevProducts.map(p => {
              const pId = p._id || p.id
              const rId = result.data._id || result.data.id
              return pId === rId ? { ...result.data } : p
            })
          )
        } else {
          showToast('Product added successfully!', 'success')
          setProducts(prevProducts => [{ ...result.data }, ...prevProducts])
        }
        resetForm()
      } else {
        showToast(editingProduct ? 'Failed to update product' : 'Failed to add product', 'error')
        console.error('Product save failed:', result)
      }
    } catch (err) {
      showToast(editingProduct ? 'Error updating product' : 'Error adding product', 'error')
      console.error('Error saving product:', err)
    }
  }

  const handleEdit = (product) => {
    // Deep clone the product to avoid reference issues
    setEditingProduct({ ...product })
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      stock: product.stock,
      image: product.image,
      rating: product.rating
    })
    setShowForm(true)
  }

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return
    }

    try {
      const response = await axios.delete(`${API_URL}/${productId}`)
      if (response.data?.success) {
        showToast('Product deleted successfully!', 'success')
        setProducts(prevProducts => prevProducts.filter(p => p._id !== productId && p.id !== productId))
      } else {
        showToast('Failed to delete product', 'error')
        console.error('Failed to delete product:', response.data)
      }
    } catch (error) {
      showToast('Error deleting product', 'error')
      console.error('Error deleting product:', error)
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingProduct(null)
    setFormData({
      name: '',
      price: '',
      description: '',
      category: '',
      stock: '',
      image: '',
      rating: '4.0'
    })
  }

  return (
    <div className="admin-products">
      <div className="container">
        <div className="admin-header">
          <h1 className="admin-title">Manage Products</h1>
          <button onClick={() => setShowForm(true)} className="add-product-btn">
             Add Product
          </button>
        </div>
        
        {showForm && (
          <div className="product-form-modal">
            <div className="product-form-container">
              <div className="form-header">
                <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <button onClick={resetForm} className="close-btn">&times;</button>
              </div>
              
              <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Price (₹)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Clothes">Clothes</option>
      
                      <option value="Bags">Bags</option>
                      <option value="Books">Books</option>
                      <option value="Stationaries">Stationaries</option>
                      <option value="Home & Kitchen">Home & Kitchen</option>
                      <option value="Sports">Sports</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Rating (1-5)</label>
                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      step="0.1"
                      min="0"
                      max="5"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://via.placeholder.com/300x300?text=Product"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    required
                  ></textarea>
                </div>
                
                <div className="form-actions">
                  <button type="button" onClick={resetForm} className="cancel-btn">
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    {editingProduct ? 'Update' : 'Add'} Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id || product.id}>
                  <td>
                    <img src={product.image} alt={product.name} className="product-thumb" />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>₹{Number(product.price).toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td>{product.rating} ★</td>
                  <td>
                    <button onClick={() => handleEdit(product)} className="edit-btn">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(product._id || product.id)} className="delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminProducts