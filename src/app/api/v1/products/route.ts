import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ProductService } from '@/lib/services/product-service';
import { ProductCreate, ProductUpdate } from '@/types/product';

// GET /api/v1/products
export async function GET() {
  try {
    const products = await ProductService.getProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST /api/v1/products
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const product: ProductCreate = await request.json();
    const newProduct = await ProductService.createProduct(product);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 