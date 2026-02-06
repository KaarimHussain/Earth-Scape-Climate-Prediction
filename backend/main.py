from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import climate, prediction, analytics, auth, feedback, notifications

from contextlib import asynccontextmanager
from app.database import connect_to_mongo, close_mongo_connection

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()

app = FastAPI(lifespan=lifespan)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, tags=["Authentication"], prefix="/auth")
app.include_router(climate.router, tags=["Climate"], prefix="/climate")
app.include_router(prediction.router, tags=["Prediction"], prefix="/predict")
app.include_router(analytics.router, tags=["Analytics"], prefix="/analytics")
app.include_router(feedback.router, tags=["Feedback"], prefix="/feedback")
app.include_router(notifications.router, tags=["Notifications"], prefix="/notifications")

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to Earth Scape Climate Prediction API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)