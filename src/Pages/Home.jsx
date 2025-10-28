"use client"

import { useState, useEffect } from "react"
import ProductGrid from "../components/ProductGrid"
import "./Home.css"

function HomePage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const cachedProducts = localStorage.getItem("products")
        const cacheTime = localStorage.getItem("productsTime")
        const now = Date.now()

        if (cachedProducts && cacheTime && now - Number.parseInt(cacheTime) < 3600000) {
          setProducts(JSON.parse(cachedProducts))
        } else {
          const response = await fetch("https://fakestoreapi.com/products")
          if (!response.ok) throw new Error("Failed to fetch products")
          const data = await response.json()
          setProducts(data)
          localStorage.setItem("products", JSON.stringify(data))
          localStorage.setItem("productsTime", now.toString())
        }

        const categoriesResponse = await fetch("https://fakestoreapi.com/products/categories")
        if (!categoriesResponse.ok) throw new Error("Failed to fetch categories")
        const categoriesData = await categoriesResponse.json()
        setCategories(categoriesData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">Discover Amazing Products</h1>
        <p className="home-subtitle">Browse our collection of quality items</p>
      </div>

      <div className="filters-section">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      )}

      {error && (
        <div className="error-state">
          <p>Error: {error}</p>
        </div>
      )}

      {!loading && !error && <ProductGrid products={filteredProducts} />}

      {!loading && !error && filteredProducts.length === 0 && (
        <div className="empty-state">
          <p>No products found</p>
        </div>
      )}
    </div>
  )
}

export default HomePage
