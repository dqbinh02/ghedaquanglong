"use client";
import { useState } from "react";
import type { Metadata } from "next"
import ProductGrid from "@/components/ProductGrid"
import ProductCategoryFilter from "@/components/ProductCategoryFilter"
import Hero from "@/components/Hero"


export default function HomePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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
          <ProductCategoryFilter selected={selectedCategories} onChange={setSelectedCategories} />
          <ProductGrid selectedCategories={selectedCategories} />
        </div>
      </section>
    </main>
  )
}
