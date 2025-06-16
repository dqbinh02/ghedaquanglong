import type { Metadata } from "next";

// Next.js sẽ truyền params vào hàm generateMetadata

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Sử dụng biến môi trường server-side (không dùng NEXT_PUBLIC_)
  const API_URL = process.env.API_URL || "http://localhost:8000";
  const SITE_URL = process.env.SITE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${API_URL}/products/${params.slug}`);
    if (!res.ok) {
      return {
        title: "Sản phẩm không tồn tại | Ghế Đá Quang Long",
        description: "Không tìm thấy sản phẩm phù hợp."
      };
    }
    const product = await res.json();
    return {
      title: `${product.name} | Ghế Đá Quang Long`,
      description: product.description || "Chi tiết sản phẩm ghế đá, bàn đá, phụ kiện đá chất lượng cao.",
      openGraph: {
        title: `${product.name} | Ghế Đá Quang Long`,
        description: product.description,
        images: product.image_url ? [product.image_url] : [],
        url: `${SITE_URL}/products/${params.slug}`,
        siteName: "Ghế Đá Quang Long",
        locale: "vi_VN",
        type: "website",
      },
    };
  } catch (error) {
    return {
      title: "Lỗi hệ thống | Ghế Đá Quang Long",
      description: "Không thể lấy thông tin sản phẩm. Vui lòng thử lại sau."
    };
  }
}

