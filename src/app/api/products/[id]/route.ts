import { NextResponse } from "next/server"
import { ProductService } from "@/lib/services/product-service"
import { ObjectId } from "mongodb"

function isValidObjectId(id: string) {
  return ObjectId.isValid(id) && (String)(new ObjectId(id)) === id;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await ProductService.getProduct(params.id)
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  if (!isValidObjectId(params.id)) {
    return NextResponse.json({ error: "Invalid product id" }, { status: 400 })
  }
  try {
    const body = await request.json()
    const updatedProduct = await ProductService.updateProduct(params.id, body)
    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  if (!isValidObjectId(params.id)) {
    return NextResponse.json({ error: "Invalid product id" }, { status: 400 })
  }
  try {
    const deleted = await ProductService.deleteProduct(params.id)
    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
