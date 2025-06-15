import type { Metadata } from "next"
import ProductList from "@/components/ProductList"

export const metadata: Metadata = {
  title: "Sản Phẩm - Ghế Đá Công Viên, Bàn Granito",
  description:
    "Khám phá bộ sưu tập ghế đá công viên, bàn granito, gạch lát sân chất lượng cao từ Quang Long. Giá cả cạnh tranh, giao hàng toàn quốc.",
}

export default function ProductsPage() {
  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sản Phẩm Của Chúng Tôi</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá bộ sưu tập đa dạng các sản phẩm ghế đá, bàn granito và phụ kiện được sản xuất với chất lượng cao
            nhất
          </p>
        </div>
        <ProductList />
      </div>
    </main>
  )
}
