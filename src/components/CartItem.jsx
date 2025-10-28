"use client"
import { useCart } from "../Context/CartContext"
import "./CartItem.css"

function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart()

  return (
    <div className="cart-item">
      <img src={item.image || "/placeholder.svg"} alt={item.title} className="cart-item-image" />

      <div className="cart-item-details">
        <h4 className="cart-item-title">{item.title}</h4>
        <p className="cart-item-category">{item.category}</p>
        <p className="cart-item-price">Rs.{(item.price.toFixed(2)*80)}</p>
      </div>

      <div className="cart-item-quantity">
        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="quantity-button">
          −
        </button>
        <input
          type="number"
          min="1"
          max="10"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
          className="quantity-input"
        />
        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="quantity-button">
          +
        </button>
      </div>

      <div className="cart-item-total">
        <p className="item-total">Rs.{((item.price * item.quantity).toFixed(2))*80}</p>
      </div>

      <button onClick={() => removeFromCart(item.id)} className="remove-button">
        ✕
      </button>
    </div>
  )
}

export default CartItem
