from fastapi import APIRouter
from typing import List
from app.models import BaseModel
from pydantic import Field
from datetime import datetime

router = APIRouter()

class Notification(BaseModel):
    id: int
    title: str
    message: str
    type: str = Field(..., description="info, warning, or danger")
    timestamp: datetime = Field(default_factory=datetime.now)
    read: bool = False

# Mock database for notifications
notifications_db = [
    Notification(id=1, title="High Temperature Alert", message="London temperature exceeded 30°C.", type="danger", timestamp=datetime.now()),
    Notification(id=2, title="System Update", message="New climate models available.", type="info", timestamp=datetime.now())
]

@router.get("/", response_description="Get all notifications", response_model=List[Notification])
async def get_notifications():
    return notifications_db

@router.post("/{id}/read", response_description="Mark notification as read")
async def mark_read(id: int):
    for note in notifications_db:
        if note.id == id:
            note.read = True
            return {"message": "Marked as read"}
    return {"error": "Notification not found"}
