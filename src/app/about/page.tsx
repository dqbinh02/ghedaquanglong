import type { Metadata } from "next"
import { Award, Users, Clock, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Về Chúng Tôi - Công ty TNHH Ghế Đá Quang Long",
  description:
    "Tìm hiểu về Công ty TNHH Ghế Đá Quang Long - hơn 10 năm kinh nghiệm sản xuất ghế đá công viên, bàn granito chất lượng cao.",
}

export default function AboutPage() {
  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Về Công Ty Ghế Đá Quang Long</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hơn 10 năm kinh nghiệm trong lĩnh vực sản xuất và cung cấp ghế đá công viên, bàn granito chất lượng cao
          </p>
        </div>

        {/* Company Story */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Câu Chuyện Của Chúng Tôi</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Công ty TNHH Ghế Đá Quang Long được thành lập với sứ mệnh mang đến những sản phẩm ghế đá công viên, bàn
                granito chất lượng cao nhất cho khách hàng trên toàn quốc.
              </p>
              <p>
                Với hơn 10 năm kinh nghiệm trong ngành, chúng tôi đã không ngừng đầu tư vào công nghệ sản xuất hiện đại
                và đội ngũ thợ lành nghề để tạo ra những sản phẩm hoàn hảo nhất.
              </p>
              <p>
                Quang Long tự hào là đối tác tin cậy của hàng trăm dự án công viên, khu đô thị, và không gian công cộng
                trên khắp Việt Nam.
              </p>
            </div>
          </div>
          <div>
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Xưởng sản xuất Quang Long"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#005c47] rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">10+</div>
            <div className="text-gray-600">Năm Kinh Nghiệm</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#005c47] rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
            <div className="text-gray-600">Khách Hàng</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#005c47] rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
            <div className="text-gray-600">Dự Án</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#005c47] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
            <div className="text-gray-600">Hài Lòng</div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Giá Trị Cốt Lõi</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#005c47] rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Chất Lượng</h3>
              <p className="text-gray-600">
                Cam kết sử dụng nguyên liệu cao cấp và quy trình sản xuất nghiêm ngặt để đảm bảo chất lượng sản phẩm tốt
                nhất.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#005c47] rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Uy Tín</h3>
              <p className="text-gray-600">
                Xây dựng mối quan hệ lâu dài với khách hàng dựa trên sự tin tưởng và dịch vụ chuyên nghiệp.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#005c47] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Bền Vững</h3>
              <p className="text-gray-600">
                Sản xuất các sản phẩm bền vững, thân thiện với môi trường và có tuổi thọ cao.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
