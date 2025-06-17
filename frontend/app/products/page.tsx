import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Đang tải sản phẩm...</div>}>
      <ProductsClient />
    </Suspense>
  );
}
