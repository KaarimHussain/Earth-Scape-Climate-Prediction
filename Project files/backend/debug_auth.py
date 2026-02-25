import requests
import time

url = "http://127.0.0.1:8000/auth/register"
username = f"debug_user_{int(time.time())}"
payload = {
    "username": username,
    "email": f"{username}@example.com",
    "password": "password123"
}

try:
    print(f"Sending request to {url} with payload: {payload}")
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response Body: {response.text}")
except Exception as e:
    print(f"Request failed: {e}")
