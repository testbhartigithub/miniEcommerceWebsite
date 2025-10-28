"use client"

import { Link } from "react-router-dom"
import { useCart } from "../Context/CartContext"
import CartItem from "../components/CartItem"
import "./Cart.css"

function CartPage() {
  const { items, clearCart, total } = useCart()
  const tax = total * 0.1
  

  if (items.length === 0) {
    return (
      <div className="empty-cart-container">
        <div className="empty-cart-content">
          <div className="empty-cart-icon">🛒</div>
          <h2 className="empty-cart-title">Your cart is empty</h2>
          <p className="empty-cart-text">Start shopping to add items to your cart</p>
          <Link to="/" className="continue-shopping-button">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>

      <div className="cart-content">
        <div className="cart-items-section">
          <div className="cart-items-header">
            <span>{items.length} item(s) in cart</span>
          </div>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="cart-summary">
          <h3 className="summary-title">Order Summary</h3>

          <div className="summary-row">
            <span className="summary-label">Subtotal:</span>
            <span className="summary-value">Rs. {(total.toFixed(2))*80}</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Tax (10%):</span>
            <span className="summary-value">Rs.{(tax.toFixed(2))*80}</span>
          </div>

          <div className="summary-row summary-total">
            <span className="summary-label">Total:</span>
            <span className="summary-value">Rs.{((total + tax)*80).toFixed(2)}</span>
          </div>

          <Link to="/checkout" className="checkout-button">
            Proceed to Checkout
          </Link>

          <button onClick={clearCart} className="clear-cart-button">
            Clear Cart
          </button>

          <Link to="/" className="continue-shopping-link">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartPage
