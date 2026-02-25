from fastapi import APIRouter, HTTPException, Body
from app.models import AnalyticsRequest
from app.services.analytics_service import analytics_service

router = APIRouter()

@router.get("/correlation", response_description="Get Correlation Matrix")
async def get_correlation_matrix(city: str = None, country: str = None):
    image_base64 = analytics_service.generate_correlation_matrix(city=city, country=country)
    if not image_base64:
        # Return none to handle gracefully on frontend
        return {"image": None}
    return {"image": image_base64}

@router.post("/comparison", response_description="Compare Variables")
async def compare_variables(request: AnalyticsRequest):
    image_base64 = analytics_service.generate_variable_comparison(
        request.variables, 
        city=request.city,
        country=request.country
    )
    if not image_base64:
        raise HTTPException(status_code=400, detail="Could not generate comparison plot")
    return {"image": image_base64}

@router.get("/data", response_description="Get Historical Data for Interactive Charts")
async def get_historical_data(city: str = None, country: str = None, start_date: str = None, end_date: str = None):
    data = analytics_service.get_all_data(city=city, country=country, start_date=start_date, end_date=end_date)
    if not data:
        # Return empty list instead of 404 so frontend can handle it gracefully
        return {"data": []}
    return {"data": data}
