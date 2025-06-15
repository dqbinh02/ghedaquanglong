import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from ..core.config import settings
import logging

logger = logging.getLogger(__name__)

# Sample products data
sample_products = [
    {
        "name": "Ghế Đá Công Viên Cao Cấp",
        "description": "Ghế đá công viên được chế tác từ đá granite tự nhiên, bền đẹp theo thời gian. Thiết kế hiện đại, phù hợp với mọi không gian công cộng. Kích thước: 120x45x45cm, Trọng lượng: 80kg.",
        "image_url": "https://example.com/ghe-da-cao-cap.jpg",
        "price": 2500000,
        "category": "Ghế đá công viên",
        "material": "Đá granite tự nhiên",
        "dimensions": "120x45x45cm",
        "weight": "80kg",
        "features": ["Chống thấm nước", "Chống nắng", "Bền màu", "Dễ vệ sinh"]
    },
    {
        "name": "Bàn Granito Tròn",
        "description": "Bàn granito tròn chất lượng cao, bề mặt nhẵn bóng, chống thấm nước. Phù hợp cho sân vườn, công viên, khu vui chơi. Kích thước: Ø80x45cm, Trọng lượng: 60kg.",
        "image_url": "https://example.com/ban-granito-tron.jpg",
        "price": 3200000,
        "category": "Bàn đá",
        "material": "Đá granito",
        "dimensions": "Ø80x45cm",
        "weight": "60kg",
        "features": ["Bề mặt nhẵn bóng", "Chống thấm nước", "Chống trầy xước"]
    },
    {
        "name": "Ghế Đá Sân Vườn",
        "description": "Ghế đá sân vườn thiết kế đơn giản, thanh lịch. Chất liệu đá tự nhiên cao cấp, chống chịu thời tiết tốt. Kích thước: 100x40x40cm, Trọng lượng: 70kg.",
        "image_url": "https://example.com/ghe-da-san-vuon.jpg",
        "price": 1800000,
        "category": "Ghế đá sân vườn",
        "material": "Đá tự nhiên",
        "dimensions": "100x40x40cm",
        "weight": "70kg",
        "features": ["Chống thời tiết", "Bền màu", "Dễ vệ sinh"]
    },
    {
        "name": "Bộ Bàn Ghế Đá Combo",
        "description": "Bộ bàn ghế đá hoàn chỉnh gồm 1 bàn và 4 ghế. Thiết kế hài hòa, chất lượng cao, phù hợp cho gia đình và công cộng. Bàn: Ø100x45cm, Ghế: 45x45x45cm.",
        "image_url": "https://example.com/ban-ghe-combo.jpg",
        "price": 8500000,
        "category": "Bộ bàn ghế",
        "material": "Đá granite",
        "dimensions": "Bàn: Ø100x45cm, Ghế: 45x45x45cm",
        "weight": "250kg",
        "features": ["Thiết kế đồng bộ", "Chất lượng cao cấp", "Bền đẹp"]
    },
    {
        "name": "Ghế Đá Có Tựa Lưng",
        "description": "Ghế đá có tựa lưng thoải mái, thiết kế ergonomic. Chất liệu đá granite cao cấp, bền đẹp và sang trọng. Kích thước: 120x50x85cm, Trọng lượng: 100kg.",
        "image_url": "https://example.com/ghe-da-tua-lung.jpg",
        "price": 3500000,
        "category": "Ghế đá có tựa",
        "material": "Đá granite",
        "dimensions": "120x50x85cm",
        "weight": "100kg",
        "features": ["Tựa lưng thoải mái", "Thiết kế ergonomic", "Sang trọng"]
    },
    {
        "name": "Gạch Lát Sân Granite",
        "description": "Gạch lát sân từ đá granite tự nhiên, độ bền cao, chống trơn trượt. Màu sắc đa dạng, phù hợp mọi thiết kế. Kích thước: 60x60x3cm.",
        "image_url": "https://example.com/gach-lat-san.jpg",
        "price": 450000,
        "category": "Gạch lát",
        "material": "Đá granite",
        "dimensions": "60x60x3cm",
        "weight": "15kg/viên",
        "features": ["Chống trơn trượt", "Độ bền cao", "Màu sắc đa dạng"]
    }
]

async def seed_database():
    try:
        # Connect to MongoDB
        client = AsyncIOMotorClient(settings.MONGODB_URL)
        db = client[settings.DATABASE_NAME]
        products_collection = db.products
        
        # Check if database exists
        if settings.DATABASE_NAME not in await client.list_database_names():
            logger.info(f"Creating new database: {settings.DATABASE_NAME}")
        
        # Clear existing data
        await products_collection.delete_many({})
        logger.info("Cleared existing products")
        
        # Insert sample data
        result = await products_collection.insert_many(sample_products)
        logger.info(f"Inserted {len(result.inserted_ids)} products")
        
        # Close connection
        client.close()
        logger.info("Database seeded successfully!")
        
    except Exception as e:
        logger.error(f"Error seeding database: {str(e)}")
        raise

if __name__ == "__main__":
    asyncio.run(seed_database()) 