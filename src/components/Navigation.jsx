import { Link,useNavigate } from "react-router-dom"
import { useCart } from "../Context/CartContext"
import { useAuth } from "../Context/AuthContext"
import { useState } from "react"
import "./Navigation.css"

export default function Navigation() {
  const { items } = useCart()
  const { user, logout, isAuthenticated } = useAuth()
  const navigate= useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
    navigate("/login")
  }

  const userInitial = user?.username ? user.username.charAt(0).toUpperCase() : "U"

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">MS</div>
          <span className="logo-text">Mini Ecommerce Store</span>
        </Link>

        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <Link to="/" className="nav-link">
                Products
              </Link>
              <Link to="/cart" className="nav-link cart-link">
                Cart
                {items.length > 0 && <span className="cart-badge">{items.length}</span>}
              </Link>

              <div className="user-menu">
                <button className="user-button" onClick={() => setShowUserMenu(!showDropdown)}>
                  <div className="user-avatar">{userInitial}</div>
                </button>

                {showUserMenu && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">
                      <p className="dropdown-username">{user?.username || "User"}</p>
                      <p className="dropdown-email">{user?.email || "email@example.com"}</p>
                    </div>
                    <button onClick={handleLogout} className="logout-button">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link signup-link">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
