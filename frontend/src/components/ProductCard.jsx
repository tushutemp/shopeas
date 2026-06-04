import React from 'react'
import { Link } from 'react-router-dom'
import './ProductCard.css'

const ProductCard = ({ product }) => {
  const productId = product.id || product._id

  return (
    <div className="product-card">
      <Link to={`/product/${productId}`} className="product-link">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.name}</h3>
          <p className="product-category">{product.category}</p>
          <div className="product-price">₹{Number(product.price).toFixed(2)}</div>
          <div className="product-rating">
            <span className="stars">★</span>
            <span>{product.rating} ({product.reviews ?? 0} reviews)</span>
          </div>
        </div>
      </Link>
      <Link to={`/product/${productId}`} className="add-to-cart-btn">
        Add to Cart
      </Link>
    </div>
  )
}

export default ProductCard