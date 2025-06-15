'use client';

import { useEffect, useState } from 'react';
import { productApi, Product } from '@/lib/api';

export default function ProductList() {
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

    if (loading) {
        return <div className="flex justify-center items-center min-h-[400px]">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center min-h-[400px] text-red-500">{error}</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <div key={product._id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-blue-600">
                                {product.price.toLocaleString('vi-VN')} VNĐ
                            </span>
                            <button 
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                                onClick={() => window.location.href = `/products/${product._id}`}
                            >
                                Xem Chi Tiết
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
} 