import { type NextRequest, NextResponse } from "next/server"

// Mock data for demonstration
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

export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }

    const products = await response.json()
    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newProduct = {
      _id: Date.now().toString(),
      ...body,
    }
    products.push(newProduct)
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
