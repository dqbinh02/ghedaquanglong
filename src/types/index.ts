export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  images: string[]
  features: string[]
  specifications: {
    material: string
    dimensions: string
    weight: string
  }
  createdAt: string
  updatedAt: string
} 