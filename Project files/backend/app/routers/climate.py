from fastapi import APIRouter, Body, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List

from app.models import ClimateDataSchema, ClimateDataUpdate
from app.database import get_database

router = APIRouter()
@router.post("/", response_description="Add new climate data", response_model=ClimateDataSchema)
async def add_climate_data(data: ClimateDataSchema = Body(...)):
    db = get_database()
    climate_collection = db.get_collection("climate_data")
    data = jsonable_encoder(data)
    new_data = await climate_collection.insert_one(data)
    created_data = await climate_collection.find_one({"_id": new_data.inserted_id})
    return created_data

@router.get("/", response_description="List all climate data", response_model=List[ClimateDataSchema])
async def get_climate_data():
    db = get_database()
    climate_collection = db.get_collection("climate_data")
    data = await climate_collection.find().to_list(1000)
    return data
