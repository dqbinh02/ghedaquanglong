"use client";

import type { Metadata } from "next"
import { useState } from "react";
import ProductList from "@/components/ProductList";
import ProductCategoryFilter from "@/components/ProductCategoryFilter";


export default function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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
        <ProductCategoryFilter selected={selectedCategories} onChange={setSelectedCategories} />
        <ProductList selectedCategories={selectedCategories} />
      </div>
    </main>
  )
}
