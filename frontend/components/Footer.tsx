import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-[#005c47] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">QL</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">Ghế Đá Quang Long</h3>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Chuyên sản xuất và cung cấp ghế đá công viên, bàn granito, gạch lát sân chất lượng cao với hơn 10 năm kinh
              nghiệm.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên Kết Nhanh</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Sản Phẩm
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  Về Chúng Tôi
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Liên Hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Thông Tin Liên Hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#005c47] mt-0.5" />
                <span className="text-gray-400">RRQH+9V9, Nguyễn Xiển, Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#005c47]" />
                <span className="text-gray-400">0908 008 230 - 0933 327 422</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#005c47]" />
                <span className="text-gray-400">ghedaquanglong@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Giờ Làm Việc</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-[#005c47]" />
                <div className="text-gray-400">
                  <div>24/7</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2025 Công ty TNHH Ghế Đá Quang Long. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
