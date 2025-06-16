"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

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

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false)

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError("Không thể tải danh sách sản phẩm")
      console.error("Error fetching products:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      if (!response.ok) {
        throw new Error("Failed to fetch categories")
      }
      const data = await response.json()
      setCategories(data)
    } catch (err) {
      console.error("Error fetching categories:", err)
    }
  }

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchProducts}
          className="mt-4 px-4 py-2 bg-[#005c47] text-white rounded-lg hover:bg-[#004a3a]"
        >
          Thử lại
        </button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Không có sản phẩm nào</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="relative">
        <button
          onClick={() => setIsCategoryPopupOpen(!isCategoryPopupOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <span>{selectedCategory || "Tất cả danh mục"}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {isCategoryPopupOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <button
              onClick={() => {
                setSelectedCategory(null)
                setIsCategoryPopupOpen(false)
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-50"
            >
              Tất cả danh mục
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  setIsCategoryPopupOpen(false)
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50"
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Link
            href={`/products/${product._id}`}
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-[#005c47] font-semibold">
                  {product.price.toLocaleString("vi-VN")}đ
                </span>
                <span className="text-sm text-gray-500">{product.category}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
