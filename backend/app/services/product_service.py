from typing import List, Optional
from bson import ObjectId
from ..db.mongodb import get_database
from ..models.product import ProductCreate, ProductUpdate, ProductInDB
from datetime import datetime

class ProductService:
    collection_name = "products"

    @staticmethod
    async def get_products() -> List[ProductInDB]:
        db = await get_database()
        products = []
        async for product in db.products.find():
            product["_id"] = str(product["_id"])
            products.append(ProductInDB(**product))
        return products

    @staticmethod
    async def get_product(product_id: str) -> Optional[ProductInDB]:
        db = await get_database()
        if not ObjectId.is_valid(product_id):
            return None
        product = await db.products.find_one({"_id": ObjectId(product_id)})
        if product:
            product["_id"] = str(product["_id"])
            return ProductInDB(**product)
        return None

    @staticmethod
    async def create_product(product: ProductCreate) -> ProductInDB:
        db = await get_database()
        product_dict = product.model_dump()
        product_dict["created_at"] = datetime.utcnow()
        product_dict["updated_at"] = datetime.utcnow()
        
        result = await db.products.insert_one(product_dict)
        created_product = await db.products.find_one({"_id": result.inserted_id})
        created_product["_id"] = str(created_product["_id"])
        return ProductInDB(**created_product)

    @staticmethod
    async def update_product(product_id: str, product: ProductUpdate) -> Optional[ProductInDB]:
        db = await get_database()
        if not ObjectId.is_valid(product_id):
            return None
            
        update_data = product.model_dump(exclude_unset=True)
        if update_data:
            update_data["updated_at"] = datetime.utcnow()
            await db.products.update_one(
                {"_id": ObjectId(product_id)},
                {"$set": update_data}
            )
            
        updated_product = await db.products.find_one({"_id": ObjectId(product_id)})
        if updated_product:
            updated_product["_id"] = str(updated_product["_id"])
            return ProductInDB(**updated_product)
        return None

    @staticmethod
    async def delete_product(product_id: str) -> bool:
        db = await get_database()
        if not ObjectId.is_valid(product_id):
            return False
            
        result = await db.products.delete_one({"_id": ObjectId(product_id)})
        return result.deleted_count > 0 