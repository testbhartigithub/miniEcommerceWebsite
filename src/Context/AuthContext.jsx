"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    const token = localStorage.getItem("authToken")
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (err) {
        console.error("[v0] Failed to load user from localStorage:", err)
        localStorage.removeItem("user")
        localStorage.removeItem("authToken")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (username, password) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        throw new Error("Invalid username or password")
      }

      const data = await response.json()
      const token = data.token

      // Fetch user details
      const usersResponse = await fetch("https://fakestoreapi.com/users")
      if (!usersResponse.ok) throw new Error("Failed to fetch user data")
      const users = await usersResponse.json()
      const foundUser = users.find((u) => u.username === username)

      if (foundUser) {
        const userData = {
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
        }
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("authToken", token)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed"
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (username, email, password) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          name: { firstname: username, lastname: "" },
          address: { city: "", street: "", number: 0, zipcode: "", geolocation: { lat: "", long: "" } },
          phone: "",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create account")
      }

      const data = await response.json()
      const userData = {
        id: data.id,
        username: data.username,
        email: data.email,
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      localStorage.setItem("authToken", "temp-token")
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Signup failed"
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("authToken")
    setError(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
