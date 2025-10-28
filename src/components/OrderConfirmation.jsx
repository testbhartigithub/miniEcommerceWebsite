import { Link } from "react-router-dom"
import "./OrderConfirmation.css"

function OrderConfirmation({ order, onContinue }) {
  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="confirmation-icon">✓</div>
        <h1 className="confirmation-title">Order Confirmed!</h1>
        <p className="confirmation-message">Thank you for your purchase</p>

        <div className="order-details">
          <div className="detail-row">
            <span className="detail-label">Order ID:</span>
            <span className="detail-value">{order.id}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Date:</span>
            <span className="detail-value">{order.date}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{order.name}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{order.email}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Address:</span>
            <span className="detail-value">{order.address}</span>
          </div>
        </div>

        <div className="order-summary">
          <h3 className="summary-title">Order Summary</h3>
          <div className="summary-items">
            {order.items.map((item) => (
              <div key={item.id} className="summary-item">
                <span className="item-info">
                  {item.quantity}x {item.title}
                </span>
                <span className="item-price">Rs.{((item.price * item.quantity).toFixed(2))*80}</span>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>Rs.{(order.subtotal.toFixed(2))*80}</span>
            </div>
            <div className="total-row">
              <span>Tax:</span>
              <span>Rs.{(order.tax.toFixed(2))*80}</span>
            </div>
            <div className="total-row total">
              <span>Total:</span>
              <span>Rs.{((order.total)*80).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <Link to="/" className="continue-button">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default OrderConfirmation
