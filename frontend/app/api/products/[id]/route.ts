import { type NextRequest, NextResponse } from "next/server"

// Mock data - in real app, this would be in a database
const products = [
  {
    _id: "1",
    name: "Ghế Đá Công Viên Cao Cấp",
    description:
      "Ghế đá công viên được chế tác từ đá granite tự nhiên, bền đẹp theo thời gian. Thiết kế hiện đại, phù hợp với mọi không gian công cộng.",
    image_url: "/placeholder.svg?height=300&width=400",
    price: 2500000,
  },
  {
    _id: "2",
    name: "Bàn Granito Tròn",
    description:
      "Bàn granito tròn chất lượng cao, bề mặt nhẵn bóng, chống thấm nước. Phù hợp cho sân vườn, công viên, khu vui chơi.",
    image_url: "/placeholder.svg?height=300&width=400",
    price: 3200000,
  },
  {
    _id: "3",
    name: "Ghế Đá Sân Vườn",
    description:
      "Ghế đá sân vườn thiết kế đơn giản, thanh lịch. Chất liệu đá tự nhiên cao cấp, chống chịu thời tiết tốt.",
    image_url: "/placeholder.svg?height=300&width=400",
    price: 1800000,
  },
  {
    _id: "4",
    name: "Gạch Lát Sân Granite",
    description:
      "Gạch lát sân từ đá granite tự nhiên, độ bền cao, chống trơn trượt. Màu sắc đa dạng, phù hợp mọi thiết kế.",
    image_url: "/placeholder.svg?height=300&width=400",
    price: 450000,
  },
  {
    _id: "5",
    name: "Bàn Ghế Đá Combo",
    description:
      "Bộ bàn ghế đá hoàn chỉnh gồm 1 bàn và 4 ghế. Thiết kế hài hòa, chất lượng cao, phù hợp cho gia đình và công cộng.",
    image_url: "/placeholder.svg?height=300&width=400",
    price: 8500000,
  },
  {
    _id: "6",
    name: "Ghế Đá Có Tựa Lưng",
    description:
      "Ghế đá có tựa lưng thoải mái, thiết kế ergonomic. Chất liệu đá granite cao cấp, bền đẹp và sang trọng.",
    image_url: "/placeholder.svg?height=300&width=400",
    price: 3500000,
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = products.find((p) => p._id === params.id)
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const index = products.findIndex((p) => p._id === params.id)
    if (index === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    products[index] = { ...products[index], ...body }
    return NextResponse.json(products[index])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const index = products.findIndex((p) => p._id === params.id)
    if (index === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    products.splice(index, 1)
    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
