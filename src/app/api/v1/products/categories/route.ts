import { NextResponse } from 'next/server';
import { ProductService } from '@/lib/services/product-service';

export async function GET() {
  try {
    const products = await ProductService.getProducts();
    const categories = [...new Set(products.map(p => p.category))].sort();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 