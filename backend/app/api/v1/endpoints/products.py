from fastapi import APIRouter, HTTPException, status, Depends, Request
from typing import List
from app.models.product import ProductCreate, ProductUpdate, ProductInDB
from app.services.product_service import ProductService
from jose import jwt, JWTError
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import os

router = APIRouter()

SECRET_KEY = os.environ.get("SECRET_KEY", "supersecret")
ALGORITHM = "HS256"

security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        return username
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

@router.get("/", response_model=List[ProductInDB])
async def get_products():
    """Get all products"""
    try:
        return await ProductService.get_products()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/{product_id}", response_model=ProductInDB)
async def get_product(product_id: str):
    """Get a single product by ID"""
    product = await ProductService.get_product(product_id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with id {product_id} not found"
        )
    return product

@router.post("/", response_model=ProductInDB, status_code=status.HTTP_201_CREATED)
async def create_product(product: ProductCreate, user: str = Depends(get_current_user)):
    """Create a new product"""
    try:
        return await ProductService.create_product(product)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.put("/{product_id}", response_model=ProductInDB)
async def update_product(product_id: str, product: ProductUpdate, user: str = Depends(get_current_user)):
    """Update a product"""
    updated_product = await ProductService.update_product(product_id, product)
    if not updated_product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with id {product_id} not found"
        )
    return updated_product

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(product_id: str, user: str = Depends(get_current_user)):
    """Delete a product"""
    if not await ProductService.delete_product(product_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with id {product_id} not found"
        ) 