import { Product } from "@/types"

export const productApi = {
  getAll: async (): Promise<Product[]> => {
    const res = await fetch("/api/products")
    if (!res.ok) throw new Error("Failed to fetch products")
    return res.json()
  },
  getById: async (id: string): Promise<Product> => {
    const res = await fetch(`/api/products/${id}`)
    if (!res.ok) throw new Error("Failed to fetch product")
    return res.json()
  },
  getByCategory: async (category: string): Promise<Product[]> => {
    const res = await fetch(`/api/products?category=${category}`)
    if (!res.ok) throw new Error("Failed to fetch products")
    return res.json()
  },
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch("/api/products")
  if (!res.ok) throw new Error("Failed to fetch products")
  return res.json()
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`/api/products/${id}`)
  if (!res.ok) throw new Error("Failed to fetch product")
  return res.json()
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(`/api/products?category=${category}`)
  if (!res.ok) throw new Error("Failed to fetch products")
  return res.json()
} 