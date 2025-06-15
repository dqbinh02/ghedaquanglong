import motor.motor_asyncio
from ..core.config import settings
import logging

logger = logging.getLogger(__name__)

class MongoDB:
    client: motor.motor_asyncio.AsyncIOMotorClient = None
    db: motor.motor_asyncio.AsyncIOMotorDatabase = None

    async def connect_to_mongodb(self):
        self.client = motor.motor_asyncio.AsyncIOMotorClient(settings.MONGODB_URL)
        self.db = self.client[settings.DATABASE_NAME]
        # Test the connection
        await self.client.admin.command('ping')
        logger.info(f"Successfully connected to MongoDB. Database: {settings.DATABASE_NAME}")

    async def close_mongodb_connection(self):
        if self.client:
            self.client.close()
            logger.info("MongoDB connection closed.")

mongodb = MongoDB()

async def get_database():
    if mongodb.client is None:
        await mongodb.connect_to_mongodb()
    return mongodb.db 