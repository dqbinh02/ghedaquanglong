from pydantic_settings import BaseSettings
from typing import List
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Ghe Da Quang Long API"
    
    # CORS
    # Get cros from env
    BACKEND_CORS_ORIGINS: str = os.getenv("BACKEND_CORS_ORIGINS")
    
    # MongoDB
    MONGODB_URL: str = os.getenv("MONGODB_URL")
    DATABASE_NAME: str = os.getenv("DATABASE_NAME")

    class Config:
        case_sensitive = True

settings = Settings() 