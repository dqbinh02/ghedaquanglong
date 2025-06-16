"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/lib/categories";
import { useSearchParams, useRouter } from "next/navigation";
import { Tag, Grid } from "lucide-react";

const iconStyle = "w-5 h-5 mr-1 text-[#005c47] bg-[#e0f7f3] rounded-full p-1";


interface ProductCategoryFilterProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function ProductCategoryFilter({ selected, onChange }: ProductCategoryFilterProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải danh mục sản phẩm");
        setLoading(false);
      });
  }, []);

  const handleClick = (cat: string) => {
    if (cat === "") {
      onChange([]);
    } else {
      if (selected.includes(cat)) {
        onChange(selected.filter((c) => c !== cat));
      } else {
        onChange([...selected, cat]);
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      <button
        onClick={() => handleClick("")}
        className={`flex items-center px-4 py-2 rounded-full border transition-all text-sm font-medium shadow-sm hover:bg-[#e0f7f3] hover:text-[#005c47] ${
          selected.length === 0 ? "bg-[#005c47] text-white" : "bg-white text-gray-700 border-gray-200"
        }`}
      >
        <Grid className="w-5 h-5 mr-1" />Tất cả
      </button>
      {loading && <span>Đang tải...</span>}
      {error && <span className="text-red-500">{error}</span>}
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className={`flex items-center px-4 py-2 rounded-full border transition-all text-sm font-medium shadow-sm hover:bg-[#e0f7f3] hover:text-[#005c47] ${
            selected.includes(cat) ? "bg-[#005c47] text-white" : "bg-white text-gray-700 border-gray-200"
          }`}
        >
          <Tag className={iconStyle} /> {cat}
        </button>
      ))}
    </div>
  );
}
