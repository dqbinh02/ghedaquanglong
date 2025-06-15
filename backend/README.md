# Quang Long Stone Bench API

API backend cho website Quang Long Stone Bench, được xây dựng bằng FastAPI và MongoDB.

## Yêu cầu hệ thống

- Python >= 3.9
- MongoDB
- uv (Python package manager)

## Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd quang-long-website/backend
```

2. Tạo và kích hoạt môi trường ảo:
```bash
uv venv
source .venv/bin/activate  # Linux/Mac
# hoặc
.venv\Scripts\activate  # Windows
```

3. Cài đặt dependencies:
```bash
uv pip install -e .
```

## Cấu hình

1. Tạo file `.env` trong thư mục `backend`:
```env
MONGODB_URL=mongodb://localhost:27017
```

## Chạy ứng dụng

1. Khởi động server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

2. Truy cập API documentation:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

### Products
- GET `/api/v1/products` - Lấy danh sách sản phẩm
- GET `/api/v1/products/{product_id}` - Lấy thông tin chi tiết sản phẩm
- POST `/api/v1/products` - Tạo sản phẩm mới
- PUT `/api/v1/products/{product_id}` - Cập nhật sản phẩm
- DELETE `/api/v1/products/{product_id}` - Xóa sản phẩm

## Phát triển

### Cấu trúc thư mục
```
backend/
├── app/
│   ├── api/          # API endpoints
│   ├── core/         # Cấu hình cốt lõi
│   ├── db/           # Database
│   ├── models/       # Data models
│   ├── services/     # Business logic
│   └── main.py       # Application entry point
├── tests/            # Test files
├── pyproject.toml    # Project configuration
└── README.md         # This file
```

### Chạy tests
```bash
pytest
```

### Kiểm tra code style
```bash
ruff check .
```

## License

MIT 