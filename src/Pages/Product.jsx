"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useCart } from "../Context/CartContext"
import "./Product.css"

function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)

        const cachedProducts = localStorage.getItem("products")
        if (cachedProducts) {
          const products = JSON.parse(cachedProducts)
          const found = products.find((p) => p.id === Number(id))
          if (found) {
            setProduct(found)
            return
          }
        }

        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        if (!response.ok) throw new Error("Product not found")
        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading product...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-state">
        <p>Error: {error}</p>
        <button onClick={() => navigate("/")} className="back-button">
          Back to Products
        </button>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="error-state">
        <p>Product not found</p>
        <button onClick={() => navigate("/")} className="back-button">
          Back to Products
        </button>
      </div>
    )
  }

  return (
    <div className="product-detail-container">
      <button onClick={() => navigate("/")} className="back-link">
        ← Back to Products
      </button>

      <div className="product-detail-content">
        <div className="product-detail-image">
          <img src={product.image || "/placeholder.svg"} alt={product.title} />
        </div>

        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.title}</h1>

          <div className="product-detail-rating">
            <span className="rating-stars">★ {product.rating?.rate || "N/A"}</span>
            <span className="rating-count">({product.rating?.count || 0} reviews)</span>
          </div>

          <p className="product-detail-description">{product.description}</p>

          <div className="product-detail-meta">
            <div className="meta-item">
              <span className="meta-label">Category:</span>
              <span className="meta-value">{product.category}</span>
            </div>
          </div>

          <div className="product-detail-purchase">
            <div className="price-section">
              <span className="price-label">Price:</span>
              <span className="price-value">Rs.{(product.price.toFixed(2))*80}</span>
            </div>

            <div className="quantity-section">
              <label htmlFor="quantity" className="quantity-label">
                Quantity:
              </label>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="quantity-button">
                  −
                </button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  max="5"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.min(5, Math.max(1, Number(e.target.value))))}
                  className="quantity-input"
                />
                <button onClick={() => setQuantity(Math.min(5, quantity + 1))} className="quantity-button">
                  +
                </button>
              </div>
            </div>

            <button onClick={handleAddToCart} className="add-to-cart-button">
              {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
