'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { productApi, Product } from '@/lib/api';

interface ProductListProps {
  selectedCategories: string[];
}

export default function ProductList({ selectedCategories }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const data = await productApi.getAll();
        if (isMounted) {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch products');
          console.error('Error fetching products:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = selectedCategories.length > 0
    ? products.filter((p) => selectedCategories.includes(p.category))
    : products;

  if (loading) {
    return <div className="flex justify-center items-center min-h-[400px]">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-[400px] text-red-500">{error}</div>;
  }

  if (filteredProducts.length === 0) {
    return <div className="flex justify-center items-center min-h-[400px] text-gray-500">Không có sản phẩm nào.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProducts.map((product) => (
        <Link key={product._id} href={`/products/${product._id}`} className="block group">
          <div className="bg-white border rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group relative cursor-pointer">
            <div className="relative">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-bold mb-2 text-[#005c47] group-hover:underline">{product.name}</h2>
              <p className="text-gray-600 mb-3 line-clamp-2 min-h-[40px]">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-semibold text-[#005c47]">{product.price.toLocaleString()}₫</span>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                  onClick={e => {
                    e.preventDefault();
                    window.location.href = `/products/${product._id}`;
                  }}
                >
                  Xem Chi Tiết
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}