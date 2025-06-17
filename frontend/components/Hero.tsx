import Link from "next/link"
import { ArrowRight, Star, Users, Award } from "lucide-react"

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-[#005c47] to-[#004a3a] text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Ghế Đá Quang Long
              <span className="block text-yellow-400">Chất Lượng Cao</span>
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Chuyên sản xuất và cung cấp bàn ghế đá, đan, đà, cống với hơn 10 năm kinh nghiệm. Cam kết chất lượng và
              giá cả cạnh tranh.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/products"
                className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Xem Sản Phẩm</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#005c47] transition-colors text-center"
              >
                Liên Hệ Tư Vấn
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold">10+</div>
                <div className="text-sm text-gray-300">Năm Kinh Nghiệm</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-gray-300">Khách Hàng</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-gray-300">Hài Lòng</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Ghế đá công viên Quang Long"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
