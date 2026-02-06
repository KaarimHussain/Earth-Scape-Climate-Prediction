import requests
import json

BASE_URL = "http://127.0.0.1:8000"

def test_predict():
    print(f"Testing POST {BASE_URL}/predict/...")
    try:
        response = requests.post(f"{BASE_URL}/predict/", json={"city": "London", "country": "UK"})
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text[:200]}...") # Truncate for brevity
    except Exception as e:
        print(f"Predict Failed: {e}")

def test_correlation():
    print(f"\nTesting GET {BASE_URL}/analytics/correlation...")
    try:
        response = requests.get(f"{BASE_URL}/analytics/correlation")
        print(f"Status: {response.status_code}")
        # Not printing binary image data
        print("Response received (image data)" if response.status_code == 200 else f"Response: {response.text}")
    except Exception as e:
        print(f"Correlation Failed: {e}")

if __name__ == "__main__":
    test_predict()
    test_correlation()
