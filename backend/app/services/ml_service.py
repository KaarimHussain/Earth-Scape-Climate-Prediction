import os
import pickle
import pandas as pd
import requests
import logging

logger = logging.getLogger(__name__)

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MODEL_PATH = os.path.join(BASE_DIR, "models", "model.pkl")
DATA_PATH = os.path.join(BASE_DIR, "data", "climate_data.csv")

# Constants
API_KEY = 'd2a0b86d0e5883fad5d67f7002929b49'
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

class MLService:
    def __init__(self):
        self.model = None # Lazy load or load safely
        self.data = self._load_data()
        # Attempt to load model safely without crashing app if sklearn fails
        try:
            self.model = self._load_model()
        except Exception:
            logger.warning("ML Model could not be loaded at startup.")

    def _load_model(self):
        try:
            # Import inside to avoid top-level crash
            from sklearn.ensemble import RandomForestRegressor
            if os.path.exists(MODEL_PATH):
                with open(MODEL_PATH, 'rb') as file:
                    return pickle.load(file)
        except Exception as e:
            logger.error(f"Failed to load model: {e}")
            return None

    def _load_data(self):
        if os.path.exists(DATA_PATH):
            return pd.read_csv(DATA_PATH)
        return None

    def predict_weather(self, city: str, country: str):
        """Fetches weather from OpenWeatherMap and makes a simple prediction."""
        if not city or not country:
            return {"error": "City and Country are required"}

        complete_url = f"{BASE_URL}?q={city},{country}&appid={API_KEY}&units=metric"
        try:
            response = requests.get(complete_url)
            if response.status_code == 200:
                weather_data = response.json()
                current_temp = weather_data['main']['temp']
                
                # Logic from legacy code
                if current_temp > 30:
                    alert_color = "danger"
                elif current_temp < 20:
                    alert_color = "warning"
                else:
                    alert_color = "success"

                trend = "further increase" if current_temp > 28 else "remain stable"
                prediction_text = f"Current temperature for {city}, {country}: {current_temp:.2f}°C. The temperature is expected to {trend}."

                # Fetch Forecast Data
                forecast_url = f"https://api.openweathermap.org/data/2.5/forecast?q={city},{country}&appid={API_KEY}&units=metric"
                forecast_response = requests.get(forecast_url)
                hourly_forecast = []
                if forecast_response.status_code == 200:
                    forecast_data = forecast_response.json()
                    # Get next 4 intervals (approx 12 hours)
                    for item in forecast_data['list'][:5]:
                        hourly_forecast.append({
                            "time": pd.to_datetime(item['dt'], unit='s').strftime('%H:%M'),
                            "temp": item['main']['temp']
                        })

                return {
                    "current_temp": current_temp,
                    "prediction": prediction_text,
                    "alert_color": alert_color,
                    "weather_data": weather_data,
                    "hourly_forecast": hourly_forecast
                }
            else:
                return {"error": f"Failed to fetch weather data: {response.status_code}"}
        except Exception as e:
            return {"error": str(e)}

    def train_model(self):
        """Retrains the model (Legacy logic)"""
        try:
            from sklearn.ensemble import RandomForestRegressor
            from sklearn.model_selection import train_test_split
        except ImportError:
            return {"error": "sklearn not installed"}

        if self.data is None:
            return {"error": "No data available for training"}

        features = self.data[['humidity', 'co2_levels', 'wind_speed', 'rainfall', 'pressure']]
        target = self.data['temperature']
        
        X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, random_state=42)
        
        model = RandomForestRegressor(n_estimators=100, random_state=42)
        model.fit(X_train, y_train)
        
        accuracy = model.score(X_test, y_test)
        
        # Save the new model
        os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
        with open(MODEL_PATH, 'wb') as file:
            pickle.dump(model, file)
            
        self.model = model
        return {"accuracy": accuracy}

    def detect_anomalies(self):
        """Detects anomalies (Legacy logic)"""
        try:
            from sklearn.ensemble import IsolationForest
        except ImportError:
            return {"error": "sklearn not installed"}

        if self.data is None:
            return {"error": "No data available"}
            
        features = self.data[['temperature', 'humidity', 'co2_levels', 'wind_speed', 'rainfall', 'pressure']]
        iso_forest = IsolationForest(contamination=0.05, random_state=42)
        anomalies = iso_forest.fit_predict(features)
        
        count = list(anomalies).count(-1)
        return {"anomalies_detected": count}

ml_service = MLService()
