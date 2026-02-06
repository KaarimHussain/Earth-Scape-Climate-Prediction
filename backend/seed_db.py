
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import datetime

async def seed():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client.earth_scape_climate_prediction
    collection = db.climate_data
    
    # Check if data exists
    count = await collection.count_documents({})
    print(f"Current document count: {count}")
    
    if count == 0:
        print("Seeding data...")
        mock_data = [
            {
                "location": "New York",
                "temperature": 22.5,
                "humidity": 60,
                "co2_level": 415,
                "timestamp": datetime.datetime.now().isoformat()
            },
            {
                "location": "London",
                "temperature": 15.2,
                "humidity": 72,
                "co2_level": 412,
                "timestamp": datetime.datetime.now().isoformat()
            },
            {
                "location": "Tokyo",
                "temperature": 26.8,
                "humidity": 55,
                "co2_level": 420,
                "timestamp": datetime.datetime.now().isoformat()
            }
        ]
        await collection.insert_many(mock_data)
        print("Data seeded!")
    else:
        print("Data already exists.")
        
    # Validating read
    print("Reading back data...")
    docs = await collection.find().to_list(10)
    print(docs)
    client.close()

if __name__ == "__main__":
    asyncio.run(seed())
