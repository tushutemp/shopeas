import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import './ProductDetail.css'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  const { showToast } = useToast()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`)
        if (response.data?.success) {
          const fetchedProduct = response.data.data
          setProduct({ ...fetchedProduct, id: fetchedProduct.id || fetchedProduct._id })
        } else {
          navigate('/shop')
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        navigate('/shop')
      }
    }

    fetchProduct()
  }, [id, navigate])

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      showToast('Please log in first to add items to the cart.', 'warning')
      return
    }

    const result = addToCart(product, quantity)
    if (result.success) {
      showToast('Added to cart successfully', 'success')
    }
  }

  if (!product) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="product-detail">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
           Back
        </button>

        <div className="product-detail-content">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail-info">
            <h1>{product.name}</h1>
            <p className="product-category">{product.category}</p>
            <div className="product-rating">
              <span className="stars">★</span>
              <span>{product.rating} ({product.reviews ?? 0} reviews)</span>
            </div>
            <p className="product-price">₹{product.price.toFixed(2)}</p>
            <p className="product-description">{product.description}</p>
            
            <div className="product-stock">
              {product.stock > 0 ? (
                <span className="in-stock">✓ In Stock ({product.stock} available)</span>
              ) : (
                <span className="out-of-stock">✗ Out of Stock</span>
              )}
            </div>

            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="quantity-btn"
                >
                  -
                </button>
                <span className="quantity-value">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              className="add-to-cart-btn-large"
              disabled={product.stock === 0}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail