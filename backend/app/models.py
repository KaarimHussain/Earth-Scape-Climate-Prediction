from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class ClimateDataSchema(BaseModel):
    temperature: float = Field(..., description="Temperature in Celsius")
    humidity: float = Field(..., description="Humidity percentage")
    co2_level: float = Field(..., description="CO2 level in ppm")
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    location: str = Field(..., description="Location/City name")
    id: Optional[str] = Field(None, alias="_id")

    class Config:
        json_schema_extra = {
            "example": {
                "temperature": 25.5,
                "humidity": 60.0,
                "co2_level": 400.0,
                "timestamp": "2023-10-27T10:00:00",
                "location": "New York"
            }
        }

class ClimateDataUpdate(BaseModel):
    temperature: Optional[float]
    humidity: Optional[float]
    co2_level: Optional[float]
    location: Optional[str]

    class Config:
        json_schema_extra = {
            "example": {
                "temperature": 26.0,
                "humidity": 55.0
            }
        }

class PredictionRequest(BaseModel):
    city: str
    country: str

class AnalyticsRequest(BaseModel):
    variables: List[str]
    city: Optional[str] = None
    country: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None


class User(BaseModel):
    username: str
    email: str | None = None

class Feedback(BaseModel):
    name: str
    email: str
    message: str
    rating: int = Field(..., ge=1, le=5, description="Rating from 1 to 5")

class UserCreate(User):
    password: str

class UserInDB(User):
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None
