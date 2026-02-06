import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import os

# Configuration
CITIES = [
    {"city": "Karachi", "country": "Pakistan", "lat": 24.86, "base_temp": 26, "temp_var": 8, "humidity_base": 70, "co2_base": 420},
    {"city": "New York", "country": "United States", "lat": 40.71, "base_temp": 13, "temp_var": 15, "humidity_base": 65, "co2_base": 415},
    {"city": "London", "country": "United Kingdom", "lat": 51.50, "base_temp": 11, "temp_var": 7, "humidity_base": 80, "co2_base": 412},
    {"city": "Tokyo", "country": "Japan", "lat": 35.67, "base_temp": 16, "temp_var": 10, "humidity_base": 60, "co2_base": 418},
    {"city": "Sydney", "country": "Australia", "lat": -33.86, "base_temp": 18, "temp_var": 6, "humidity_base": 65, "co2_base": 410}
]

START_DATE = datetime(2020, 1, 1)
END_DATE = datetime(2025, 12, 31)
DAYS = (END_DATE - START_DATE).days

data = []

print(f"Generating data from {START_DATE.date()} to {END_DATE.date()} ({DAYS} days) for {len(CITIES)} cities...")

for city_info in CITIES:
    dates = [START_DATE + timedelta(days=i) for i in range(DAYS)]
    
    # Generate seasonality (sine wave)
    # Northern hemisphere peaks in mid-year (approx day 200), Southern in start/end (approx day 0/365)
    day_of_year = np.array([d.timetuple().tm_yday for d in dates])
    
    if city_info["lat"] > 0:
        seasonality = -np.cos(2 * np.pi * day_of_year / 365) # Peak in summer (June/July)
    else:
        seasonality = np.cos(2 * np.pi * day_of_year / 365) # Peak in summer (Dec/Jan)

    # Temperature
    temps = city_info["base_temp"] + (city_info["temp_var"] * seasonality) + np.random.normal(0, 3, DAYS)
    
    # Humidity (inverse to temp roughly + noise)
    humidity = city_info["humidity_base"] - (5 * seasonality) + np.random.normal(0, 10, DAYS)
    humidity = np.clip(humidity, 20, 100)
    
    # CO2 (Trend upward + random noise + seasonal oscillation)
    # Industrial/Urban baseline + global rising trend (approx 2ppm/year)
    years_passed = np.array([(d - START_DATE).days / 365 for d in dates])
    co2 = city_info["co2_base"] + (2.5 * years_passed) + np.random.normal(0, 2, DAYS)
    
    # Wind Speed (Random lognormal)
    wind = np.random.lognormal(2.5, 0.4, DAYS)
    
    # Rainfall (probabilistic based on humidity)
    rain_prob = (humidity - 50) / 100
    rain_prob = np.clip(rain_prob, 0, 1)
    is_rain = np.random.rand(DAYS) < (rain_prob * 0.3)
    rainfall = np.where(is_rain, np.random.exponential(5, DAYS), 0)
    
    # Pressure
    pressure = 1013 - (temps - 15)/2 + np.random.normal(0, 5, DAYS)

    for i in range(DAYS):
        data.append({
            "date": dates[i].strftime("%Y-%m-%d"),
            "temperature": round(temps[i], 1),
            "humidity": round(humidity[i], 0),
            "co2_levels": round(co2[i], 1),
            "city": city_info["city"],
            "country": city_info["country"],
            "wind_speed": round(wind[i], 1),
            "rainfall": round(rainfall[i], 1),
            "pressure": round(pressure[i], 0)
        })

df = pd.DataFrame(data)

# Save to CSV
output_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "global_climate_data.csv")
df.to_csv(output_path, index=False)
print(f"Successfully generated {len(df)} rows of data at {output_path}")
