import { Link } from "react-router-dom";
import "./ProductGrid.css";

export default function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <Link key={product.id} to={`/product/${product.id}`} className="product-link">
          <div className="product-card">
            <div className="product-image-container">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="product-image"
              />
            </div>

            <div className="product-content">
              <h3 className="product-title">{product.title}</h3>
              

              <div className="product-footer">
                <span className="product-price">Rs.{(product.price.toFixed(2)*80)}</span>
                {product.rating && (
                  <span className="product-rating">
                    ⭐ {product.rating.rate.toFixed(1)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
