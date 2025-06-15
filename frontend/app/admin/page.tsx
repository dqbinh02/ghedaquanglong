"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamic imports with proper loading components
const AdminLogin = dynamic(() => import("./AdminLogin"), {
  ssr: false,
  loading: () => <div>Loading login form...</div>
})

const ProductList = dynamic(() => import("./ProductList"), {
  ssr: false,
  loading: () => <div>Loading product list...</div>
})

const ProductForm = dynamic(() => import("./ProductForm"), {
  ssr: false,
  loading: () => <div>Loading product form...</div>
})

interface Product {
  _id: string
  name: string
  description: string
  image_url: string
  price: number
  category: string
  material: string
  dimensions: string
  weight: string
  features: string[]
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken")
    if (storedToken) {
      setToken(storedToken)
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (newToken: string) => {
    localStorage.setItem("adminToken", newToken)
    setToken(newToken)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    setToken(null)
    setIsAuthenticated(false)
  }

  const handleEdit = (product: Product | null) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingProduct(null)
    setSuccessMessage("Thao tác thành công!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005c47] mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {!isAuthenticated ? (
            <AdminLogin onLogin={handleLogin} />
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Quản lý sản phẩm</h1>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Đăng xuất
                </button>
              </div>

              {successMessage && (
                <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
                  {successMessage}
                </div>
              )}

              <ProductList
                token={token}
                onEdit={handleEdit}
                onSuccess={handleFormSuccess}
              />

              {showForm && (
                <ProductForm
                  token={token}
                  product={editingProduct}
                  onClose={handleFormClose}
                  onSuccess={handleFormSuccess}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
