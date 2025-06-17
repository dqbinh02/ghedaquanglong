"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductList from "@/components/ProductList";
import ProductCategoryFilter from "@/components/ProductCategoryFilter";

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Khi vào trang, đọc category từ query
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    } else {
      setSelectedCategories([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get("category")]);

  // Khi filter thay đổi, cập nhật lại URL
  const handleCategoryChange = (cats: string[]) => {
    setSelectedCategories(cats);
    if (cats.length > 0) {
      router.replace(`?category=${encodeURIComponent(cats[0])}`);
    } else {
      router.replace("/products");
    }
  };

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sản Phẩm Của Chúng Tôi</h1>
          <p className="text-lg text-gray-600">Khám phá các sản phẩm chất lượng cao của chúng tôi</p>
        </div>
        <ProductCategoryFilter
          selected={selectedCategories}
          onChange={handleCategoryChange}
        />
        <div className="mt-8">
          <ProductList selectedCategories={selectedCategories} />
        </div>
      </div>
    </main>
  );
}
