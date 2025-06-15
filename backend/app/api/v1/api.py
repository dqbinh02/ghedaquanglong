from fastapi import APIRouter
from .endpoints import products, user

api_router = APIRouter()
api_router.include_router(products.router, prefix="/products", tags=["products"])
api_router.include_router(user.router, prefix="/user", tags=["user"]) 