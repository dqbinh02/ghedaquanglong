import { NextResponse } from "next/server"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1"

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`)
    if (!response.ok) {
      throw new Error("Failed to fetch categories")
    }
    const categories = await response.json()
    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    )
  }
} 