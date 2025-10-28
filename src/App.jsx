import { Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./Context/AuthContext"
import { CartProvider } from "./Context/CartContext"
import Navigation from "./components/Navigation"
import HomePage from "./Pages/Home"
import Login from "./Pages/Login"
import SignupPage from "./Pages/SignUp"
import ProductDetail from "./Pages/Product"
import CartPage from "./Pages/Cart"
import ProtectedRoute from "./components/ProtectedRoute"
import CheckoutPage from "./Pages/CheckOut"
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="app-wrapper">
          <Navigation />
          <main className="app-main">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignupPage />} />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/product/:id"
                element={
                  <ProtectedRoute>
                    <ProductDetail />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
