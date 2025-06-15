import type { Metadata } from "next"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Liên Hệ - Công ty TNHH Ghế Đá Quang Long",
  description:
    "Liên hệ với Ghế Đá Quang Long để được tư vấn và báo giá sản phẩm ghế đá công viên, bàn granito. Hotline: 0908 008 230",
}

export default function ContactPage() {
  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hãy liên hệ với chúng tôi để được tư vấn và báo giá chi tiết cho các sản phẩm ghế đá công viên, bàn granito
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Thông Tin Liên Hệ</h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#005c47] rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Địa Chỉ</h3>
                  <p className="text-gray-600">
                    RRQH+9V9, Nguyễn Xiển, Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh, Việt Nam
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#005c47] rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Điện Thoại</h3>
                  <p className="text-gray-600">
                    Hotline:{" "}
                    <a href="tel:+84908008230" className="text-[#005c47] hover:underline">
                      090 800 8230
                    </a>
                    <span> hoặc </span> 
                    <a href="tel:+84908008230" className="text-[#005c47] hover:underline">
                      093 332 7422
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#005c47] rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:ghedaquanglong@gmail.com" className="text-[#005c47] hover:underline">
                      ghedaquanglong@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#005c47] rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Giờ Làm Việc</h3>
                  <p className="text-gray-600">
                    24/7
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="mt-8 p-6 bg-[#005c47] rounded-lg text-white">
              <h3 className="text-xl font-bold mb-4">Liên Hệ Nhanh</h3>
              <div className="space-y-3">
                <a
                  href="tel:+84908008230"
                  className="block w-full bg-white text-[#005c47] py-3 px-4 rounded-lg font-semibold text-center hover:bg-gray-100 transition-colors"
                >
                  Gọi Ngay: 0908 008 230 – 0933 327 422
                </a>
                <a
                  href="mailto:ghedaquanglong@gmail.com"
                  className="block w-full border-2 border-white text-white py-3 px-4 rounded-lg font-semibold text-center hover:bg-white hover:text-[#005c47] transition-colors"
                >
                  Gửi Email
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Bản Đồ</h2>
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <p>Google Maps sẽ được tích hợp tại đây</p>
                <p className="text-sm mt-2">Tọa độ: RRQH+9V9, Nguyễn Xiển, Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh</p>
              </div>
            </div>

            {/* Directions */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Hướng Dẫn Đường Đi</h4>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Từ Vinhome Grank Park - Nguyễn Xiển, Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh</li>
                <li>• Đi thêm khoảng 500m</li>
                <li>• Bản hiệu của Ghế Đá Quang Long sẽ nằm bên tay trái</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
