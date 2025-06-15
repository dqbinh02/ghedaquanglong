import type { Metadata } from "next"
import ProductGrid from "@/components/ProductGrid"
import Hero from "@/components/Hero"

export const metadata: Metadata = {
  title: "Ghế Đá Quang Long - Chuyên sản xuất ghế đá công viên, bàn granito",
  description:
    "Công ty TNHH Ghế Đá Quang Long chuyên sản xuất và cung cấp ghế đá công viên, ghế đá sân vườn, bàn granito, gạch lát sân chất lượng cao.",
  keywords: "ghế đá công viên, ghế đá sân vườn, bàn granito, gạch lát sân, đá ốp lát",
  openGraph: {
    title: "Ghế Đá Quang Long - Chuyên sản xuất ghế đá công viên",
    description: "Chuyên sản xuất và cung cấp ghế đá công viên, bàn granito chất lượng cao",
    url: "https://ghedaquanglong.com",
    siteName: "Ghế Đá Quang Long",
    locale: "vi_VN",
    type: "website",
  },
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sản Phẩm Nổi Bật</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Khám phá bộ sưu tập ghế đá công viên, bàn granito và phụ kiện chất lượng cao được sản xuất bởi Quang Long
              với hơn 10 năm kinh nghiệm
            </p>
          </div>
          <ProductGrid />
        </div>
      </section>
    </main>
  )
}
