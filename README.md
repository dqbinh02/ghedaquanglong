# Quang Long Stone Bench Website

Website thương mại cho Công ty TNHH Ghế Đá Quang Long - chuyên sản xuất ghế đá công viên, bàn granito, gạch lát sân.

## 🚀 Tính năng

- **Frontend**: Next.js 14 với App Router, TailwindCSS, TypeScript
- **Backend**: FastAPI với MongoDB
- **Admin Panel**: Quản lý sản phẩm CRUD
- **SEO**: Tối ưu hóa cho công cụ tìm kiếm
- **Responsive**: Thiết kế mobile-first
- **Performance**: Tối ưu hóa hình ảnh và tốc độ tải

## 📦 Cài đặt

### Frontend (Next.js)

\`\`\`bash
# Clone repository
git clone <repository-url>
cd quang-long-website

# Cài đặt dependencies
npm install

# Tạo file environment
cp .env.example .env.local

# Chạy development server
npm run dev
\`\`\`

### Backend (FastAPI)

\`\`\`bash
# Tạo virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# hoặc
venv\Scripts\activate  # Windows

# Cài đặt dependencies
pip install -r requirements.txt

# Tạo file environment
cp .env.example .env

# Chạy server
python scripts/backend.py
\`\`\`

### Database Setup

\`\`\`bash
# Cài đặt MongoDB
# Ubuntu/Debian:
sudo apt-get install mongodb

# macOS:
brew install mongodb-community

# Windows: Tải từ https://www.mongodb.com/try/download/community

# Seed database với dữ liệu mẫu
python scripts/seed_data.py
\`\`\`

## 🌐 Deployment

### Vercel (Frontend)

\`\`\`bash
# Cài đặt Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
\`\`\`

### Railway/Render (Backend)

1. Tạo tài khoản trên Railway hoặc Render
2. Connect GitHub repository
3. Thêm environment variables
4. Deploy

### VPS Deployment

\`\`\`bash
# Cài đặt PM2
npm install -g pm2

# Frontend
npm run build
pm2 start npm --name "quang-long-frontend" -- start

# Backend
pm2 start "python scripts/backend.py" --name "quang-long-backend"

# Nginx configuration
sudo nano /etc/nginx/sites-available/ghedaquanglong.com
\`\`\`

## 📱 Cấu trúc dự án

\`\`\`
quang-long-website/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Trang chủ
│   ├── products/          # Trang sản phẩm
│   ├── about/             # Về chúng tôi
│   ├── contact/           # Liên hệ
│   ├── admin/             # Admin panel
│   └── api/               # API routes
├── components/            # React components
├── scripts/               # Backend scripts
├── public/                # Static files
└── styles/                # CSS files
\`\`\`

## 🎨 Thiết kế

- **Màu chính**: #005c47 (xanh rêu đậm)
- **Màu phụ**: #f5f5f5 (xám nhạt)
- **Font**: Inter (Google Fonts)
- **Icons**: Lucide React

## 📞 Liên hệ

- **Website**: ghedaquanglong.com
- **Email**: info@ghedaquanglong.com
- **Phone**: 0123 456 789

## 📄 License

© 2024 Công ty TNHH Ghế Đá Quang Long. All rights reserved.
