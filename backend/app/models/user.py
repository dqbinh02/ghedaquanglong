from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId

class User(BaseModel):
    id: Optional[str] = Field(default_factory=str, alias="_id")
    username: str
    hashed_password: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
