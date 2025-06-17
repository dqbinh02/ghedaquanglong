export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface ProductCreate {
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
}

export interface ProductUpdate {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  image_url?: string;
} 