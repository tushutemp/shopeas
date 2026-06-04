import React from 'react'
import { Link } from 'react-router-dom'
import './CartItem.css'

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      
      <div className="cart-item-details">
        <Link to={`/product/${item.id}`} className="cart-item-title">
          {item.name}
        </Link>
        <p className="cart-item-price">₹{item.price.toFixed(2)}</p>
      </div>
      
      <div className="cart-item-quantity">
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="quantity-btn"
        >
          -
        </button>
        <span className="quantity-value">{item.quantity}</span>
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="quantity-btn"
        >
          +
        </button>
      </div>
      
      <div className="cart-item-total">
        ₹{(item.price * item.quantity).toFixed(2)}
      </div>
      
      <button 
        onClick={() => onRemove(item.id)}
        className="remove-btn"
      >
        Remove
      </button>
    </div>
  )
}

export default CartItem