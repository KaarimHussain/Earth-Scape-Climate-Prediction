from fastapi import APIRouter
import pandas as pd
import os

router = APIRouter()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DATA_PATH = os.path.join(BASE_DIR, "data", "global_climate_data.csv")

@router.get("/stats")
async def get_system_stats():
    stats = {
        "status": "operational",
        "dataset_rows": 0,
        "cities_tracked": [],
        "last_updated": "2025-12-30"
    }
    
    if os.path.exists(DATA_PATH):
        try:
            df = pd.read_csv(DATA_PATH)
            stats["dataset_rows"] = len(df)
            stats["cities_tracked"] = df['city'].unique().tolist() if 'city' in df.columns else []
            if 'date' in df.columns:
                stats["last_updated"] = df['date'].max()
        except Exception as e:
            stats["error"] = str(e)
            
    return stats
