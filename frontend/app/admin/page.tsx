"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Eye } from "lucide-react"

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

import AdminLogin from "./login"

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: "",
    price: 0,
    category: "",
    material: "",
    dimensions: "",
    weight: "",
    features: "",
  })
  const [successMessage, setSuccessMessage] = useState<string | null>(null)


  const [token, setToken] = useState<string | null>(typeof window !== "undefined" ? localStorage.getItem("admin_token") : null)

  useEffect(() => {
    if (token) fetchProducts()
  }, [token])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      } else if (response.status === 401) {
        handleLogout()
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingProduct ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${editingProduct._id}` : `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`
      const method = editingProduct ? "PUT" : "POST"
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          features: formData.features.split(",").map(f => f.trim()).filter(f => f),
        }),
      })

      if (response.ok) {
        fetchProducts()
        resetForm()
        if (editingProduct) {
          setSuccessMessage("Cập nhật thành công!")
          setTimeout(() => setSuccessMessage(null), 2000)
        } else {
          setSuccessMessage("Thêm sản phẩm thành công!")
          setTimeout(() => setSuccessMessage(null), 2000)
        }
      }
    } catch (error) {
      console.error("Error saving product:", error)
      alert("Có lỗi xảy ra!")
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      image_url: product.image_url,
      price: product.price,
      category: product.category || "",
      material: product.material || "",
      dimensions: product.dimensions || "",
      weight: product.weight || "",
      features: product.features ? product.features.join(", ") : "",
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`, {
          method: "DELETE",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })

        if (response.ok) {
          fetchProducts()
          alert("Xóa thành công!")
        }
      } catch (error) {
        console.error("Error deleting product:", error)
        alert("Có lỗi xảy ra!")
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      image_url: "",
      price: 0,
      category: "",
      material: "",
      dimensions: "",
      weight: "",
      features: "",
    })
    setEditingProduct(null)
    setShowForm(false)
  }

  const handleLogin = (jwt: string) => {
    localStorage.setItem("admin_token", jwt)
    setToken(jwt)
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_token")
    setToken(null)
  }

  if (!token) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {successMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all">
          {successMessage}
        </div>
      )}
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Quản Lý Sản Phẩm</h1>
            <button onClick={handleLogout} className="ml-4 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">Đăng xuất</button>
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#005c47] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#004a3a] transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Thêm Sản Phẩm</span>
            </button>
          </div>

          {/* Product Form */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <h2 className="text-xl font-bold mb-4">{editingProduct ? "Sửa Sản Phẩm" : "Thêm Sản Phẩm Mới"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005c47]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005c47]"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL hình ảnh</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Đường dẫn ảnh"
                      value={formData.image_url}
                      onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="Giá"
                      value={formData.price}
                      onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục (category)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Danh mục (category)"
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Chất liệu (material)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Chất liệu (material)"
                      value={formData.material}
                      onChange={e => setFormData({ ...formData, material: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kích thước (dimensions)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Kích thước (dimensions)"
                      value={formData.dimensions}
                      onChange={e => setFormData({ ...formData, dimensions: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Khối lượng (weight)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Khối lượng (weight)"
                      value={formData.weight}
                      onChange={e => setFormData({ ...formData, weight: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tính năng (features, cách nhau dấu phẩy)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Tính năng (features, cách nhau dấu phẩy)"
                      value={formData.features}
                      onChange={e => setFormData({ ...formData, features: e.target.value })}
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="flex-1 bg-[#005c47] text-white py-2 rounded-lg hover:bg-[#004a3a] transition-colors"
                    >
                      {editingProduct ? "Cập Nhật" : "Thêm"}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2">Tên</th>
                  <th className="px-4 py-2">Mô tả</th>
                  <th className="px-4 py-2">Ảnh</th>
                  <th className="px-4 py-2">Giá</th>
                  <th className="px-4 py-2">Danh mục</th>
                  <th className="px-4 py-2">Chất liệu</th>
                  <th className="px-4 py-2">Kích thước</th>
                  <th className="px-4 py-2">Khối lượng</th>
                  <th className="px-4 py-2">Tính năng</th>
                  <th className="px-4 py-2">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-8 text-center text-gray-500">
                      Đang tải...
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-8 text-center text-gray-500">
                      Chưa có sản phẩm nào
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product._id} className="border-t">
                      <td className="border px-4 py-2">{product.name}</td>
                      <td className="border px-4 py-2">{product.description}</td>
                      <td className="border px-4 py-2"><img src={product.image_url} alt="Ảnh" className="h-16 w-16 object-cover" /></td>
                      <td className="border px-4 py-2">{product.price.toLocaleString()}₫</td>
                      <td className="border px-4 py-2">{product.category}</td>
                      <td className="border px-4 py-2">{product.material}</td>
                      <td className="border px-4 py-2">{product.dimensions}</td>
                      <td className="border px-4 py-2">{product.weight}</td>
                      <td className="border px-4 py-2">{product.features && product.features.join(", ")}</td>
                      <td className="border px-4 py-2">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => window.open(`/products/${product._id}`, "_blank")}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
