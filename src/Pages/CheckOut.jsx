"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../Context/CartContext"
import CheckOutForm from "../components/CheckOutForm"
import OrderConfirmation from "../components/OrderConfirmation"
import "./CheckOut.css"

function CheckoutPage() {
  const navigate = useNavigate()
  const { items, total, clearCart } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderData, setOrderData] = useState(null)

  const tax = total * 0.1
  const grandTotal = total + tax

  const handlePlaceOrder = (formData) => {
    const order = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString(),
      items,
      subtotal: total,
      tax,
      total: grandTotal,
      ...formData,
    }
    setOrderData(order)
    setOrderPlaced(true)
    clearCart()
  }

  if (orderPlaced && orderData) {
    return <OrderConfirmation order={orderData} onContinue={() => navigate("/")} />
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="empty-checkout">
        <p>Your cart is empty. Please add items before checkout.</p>
        <button onClick={() => navigate("/")} className="back-button">
          Back to Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-content">
        <div className="checkout-form-section">
          <CheckOutForm onSubmit={handlePlaceOrder} />
        </div>

        <div className="checkout-summary">
          <h3 className="summary-title">Order Summary</h3>

          <div className="summary-items">
            {items.map((item) => (
              <div key={item.id} className="summary-item">
                <span className="item-name">{item.title}</span>
                <span className="item-price">
                  {item.quantity} × Rs.{(item.price.toFixed(2))*80}
                </span>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>Rs.{(total.toFixed(2))*80}</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%):</span>
              <span>Rs.{(tax.toFixed(2))*80}</span>
            </div>
            <div className="summary-row summary-total">
              <span>Total:</span>
              <span>Rs.{((total + tax)*80).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
