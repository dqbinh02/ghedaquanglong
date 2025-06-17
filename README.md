# Gheda Quang Long Website

Website bán hàng của Gheda Quang Long được xây dựng bằng Next.js, TypeScript và MongoDB.

## Yêu cầu hệ thống

- Node.js 18.x trở lên
- MongoDB 4.x trở lên
- npm hoặc yarn

## Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd ghedaquanglong_website
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file .env.local và cấu hình các biến môi trường:
```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=ghedaquanglong
JWT_SECRET=your-secret-key-here
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3000
```

4. Chạy development server:
```bash
npm run dev
```

5. Mở trình duyệt và truy cập http://localhost:3000

## Cấu trúc dự án

```
src/
├── app/                    # App Router của Next.js
│   ├── api/               # API routes
│   ├── (routes)/         # Các routes của ứng dụng
│   └── layout.tsx        # Root layout
├── components/            # React components
│   └── ui/               # UI components
├── lib/                   # Utility functions và services
│   ├── auth.ts           # Authentication utilities
│   ├── mongodb.ts        # MongoDB connection
│   └── services/         # Business logic services
└── types/                # TypeScript type definitions
```

## API Endpoints

### Products

- `GET /api/v1/products` - Lấy danh sách sản phẩm
- `GET /api/v1/products/categories` - Lấy danh sách categories
- `GET /api/v1/products/:id` - Lấy thông tin sản phẩm theo ID
- `POST /api/v1/products` - Tạo sản phẩm mới
- `PUT /api/v1/products/:id` - Cập nhật sản phẩm
- `DELETE /api/v1/products/:id` - Xóa sản phẩm

### Authentication

- `POST /api/v1/user/login` - Đăng nhập

## Tính năng

- [x] Đăng nhập/Đăng xuất
- [x] Quản lý sản phẩm (CRUD)
- [x] Phân loại sản phẩm theo category
- [x] Responsive design
- [x] Dark mode
- [x] Form validation
- [x] Image upload
- [x] API authentication

## Công nghệ sử dụng

- Next.js 14
- TypeScript
- MongoDB
- Tailwind CSS
- NextAuth.js
- React Hook Form
- Zod
- Shadcn/ui

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
