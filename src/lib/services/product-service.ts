import { Product, ProductCreate, ProductUpdate } from '@/types/product';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

interface ProductDocument extends Omit<Product, 'id'> {
  _id: ObjectId;
}

export class ProductService {
  static async getProducts(): Promise<Product[]> {
    const db = await connectToDatabase();
    const products = await db.collection<ProductDocument>('products').find().toArray();
    return products.map(product => ({
      ...product,
      id: product._id.toString(),
    }));
  }

  static async getProduct(id: string): Promise<Product | null> {
    const db = await connectToDatabase();
    const product = await db.collection<ProductDocument>('products').findOne({ _id: new ObjectId(id) });
    if (!product) return null;
    return {
      ...product,
      id: product._id.toString(),
    };
  }

  static async createProduct(product: ProductCreate): Promise<Product> {
    const db = await connectToDatabase();
    const now = new Date().toISOString();
    const newProduct = {
      ...product,
      created_at: now,
      updated_at: now,
    };
    const result = await db.collection('products').insertOne(newProduct);
    return {
      ...newProduct,
      id: result.insertedId.toString(),
    };
  }

  static async updateProduct(id: string, product: ProductUpdate): Promise<Product | null> {
    const db = await connectToDatabase();
    const now = new Date().toISOString();
    const { _id, ...updateData } = product as any; // Remove _id if present
    const update = {
      ...updateData,
      updated_at: now,
    };
    const result = await db.collection<ProductDocument>('products').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: 'after' }
    );
    if (!result) return null;
    return {
      ...result,
      id: result._id.toString(),
    };
  }

  static async deleteProduct(id: string): Promise<boolean> {
    const db = await connectToDatabase();
    const result = await db.collection('products').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
} 