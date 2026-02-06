from fastapi import APIRouter, HTTPException
from app.models import PredictionRequest
from app.services.ml_service import ml_service

router = APIRouter()

@router.post("/", response_description="Predict Weather Trend")
async def predict_weather(request: PredictionRequest):
    result = ml_service.predict_weather(request.city, request.country)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result
