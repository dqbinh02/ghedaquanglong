import asyncio
from passlib.context import CryptContext
from app.db.mongodb import mongodb

async def create_admin():
    await mongodb.connect_to_mongodb()
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    hashed = pwd_context.hash("admin")
    user = {"username": "admin", "hashed_password": hashed}
    exists = await mongodb.db["users"].find_one({"username": "admin"})
    if not exists:
        await mongodb.db["users"].insert_one(user)
        print("Admin user created.")
    else:
        print("Admin user already exists.")
    await mongodb.close_mongodb_connection()

if __name__ == "__main__":
    asyncio.run(create_admin())
