"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Phone, Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Product } from "@/types"

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string)
    }
  }, [params.id])

  const fetchProduct = async (id: string) => {
    try {
      const data = await getProduct(id)
      setProduct(data)
    } catch (error) {
      console.error("Error fetching product:", error)
    } finally {
      setLoading(false)
    }
  }

  async function getProduct(id: string): Promise<Product> {
    const response = await fetch(`/api/products/${id}`)
    if (!response.ok) {
      throw new Error("Failed to fetch product")
    }
    return response.json()
  }

  if (loading) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-32 mb-8"></div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="h-96 bg-gray-300 rounded-lg"></div>
              <div>
                <div className="h-8 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-8"></div>
                <div className="h-12 bg-gray-300 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy sản phẩm</h1>
          <Link href="/products" className="text-[#005c47] hover:underline">
            Quay lại danh sách sản phẩm
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        <Link href="/products" className="inline-flex items-center space-x-2 text-[#005c47] hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại sản phẩm</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <img
              src={product.image_url || "/placeholder.svg?height=500&width=600"}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <div className="text-3xl font-bold text-[#005c47] mb-2">{product.price.toLocaleString("vi-VN")}đ</div>
              <p className="text-gray-600">Giá có thể thay đổi tùy theo kích thước và yêu cầu</p>
            </div>

            <div className="space-y-4">
              <a
                href="tel:+84123456789"
                className="w-full bg-[#005c47] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#004a3a] transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Gọi Ngay: 0123 456 789</span>
              </a>

              <a
                href="mailto:info@ghedaquanglong.com"
                className="w-full border-2 border-[#005c47] text-[#005c47] py-3 px-6 rounded-lg font-semibold hover:bg-[#005c47] hover:text-white transition-colors flex items-center justify-center space-x-2"
              >
                <Mail className="w-5 h-5" />
                <span>Gửi Email Tư Vấn</span>
              </a>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">Cam kết của chúng tôi:</h3>
              <ul className="text-yellow-700 space-y-1">
                <li>• Chất lượng sản phẩm đảm bảo</li>
                <li>• Giao hàng và lắp đặt tận nơi</li>
                <li>• Bảo hành sản phẩm</li>
                <li>• Tư vấn miễn phí</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
