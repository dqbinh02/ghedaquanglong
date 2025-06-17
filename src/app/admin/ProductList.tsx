"use client"

import { useState, useEffect } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"

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

interface ProductListProps {
  token: string | null
  onEdit: (product: Product | null) => void
  onSuccess: () => void
}

export default function ProductList({ token, onEdit, onSuccess }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (token) {
      fetchProducts()
    }
  }, [token])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      } else {
        setError("Không thể tải danh sách sản phẩm")
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      setError("Có lỗi xảy ra khi tải danh sách sản phẩm")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        })
        if (response.ok) {
          fetchProducts()
        }
      } catch (error) {
        console.error("Error deleting product:", error)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005c47]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-600 text-center p-4 bg-red-50 rounded-lg">
        {error}
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => onEdit(null)}
          className="px-4 py-2 bg-[#005c47] text-white rounded-lg hover:bg-[#004a3a]"
        >
          Thêm sản phẩm mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {product.description}
              </p>
              <p className="text-[#005c47] font-semibold mb-4">
                {product.price.toLocaleString("vi-VN")}đ
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => onEdit(product)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 