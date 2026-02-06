from fastapi import APIRouter, Body, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List

from app.models import Feedback
from app.database import get_database

router = APIRouter()

@router.post("/", response_description="Submit feedback", response_model=Feedback)
async def submit_feedback(feedback: Feedback = Body(...)):
    db = get_database()
    feedback_collection = db.get_collection("feedback")
    
    feedback_data = jsonable_encoder(feedback)
    new_feedback = await feedback_collection.insert_one(feedback_data)
    created_feedback = await feedback_collection.find_one({"_id": new_feedback.inserted_id})
    return created_feedback

@router.get("/", response_description="List all feedback", response_model=List[Feedback])
async def list_feedback():
    db = get_database()
    feedback_collection = db.get_collection("feedback")
    feedbacks = await feedback_collection.find().to_list(1000)
    return feedbacks
