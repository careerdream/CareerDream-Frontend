import requests
import time
import sys

# Configuration
BASE_URL = "http://localhost:5000"
TEST_ENDPOINT = f"{BASE_URL}/api/test-limit"
MAX_ATTEMPTS = 10

def run_rate_limit_test():
    print(f"--- Starting Rate Limiting Test on {TEST_ENDPOINT} ---")
    print(f"Targeting: {TEST_ENDPOINT}")
    print(f"Expectation: 5 successful requests, followed by HTTP 429 (Too Many Requests)\n")

    for i in range(1, MAX_ATTEMPTS + 1):
        try:
            start_time = time.time()
            response = requests.get(TEST_ENDPOINT)
            latency = (time.time() - start_time) * 1000
            
            status_code = response.status_code
            print(f"Attempt {i:02d}: Status {status_code} | Latency: {latency:.2f}ms")

            if status_code == 200:
                print(f"  [PASS] Request successful: {response.json().get('message')}")
            elif status_code == 429:
                print(f"  [SUCCESS] Rate limit triggered as expected!")
                print(f"  [INFO] Response Body: {response.json()}")
                print(f"  [INFO] Retry-After Header: {response.headers.get('Retry-After', 'Not found')}")
                break
            else:
                print(f"  [FAIL] Unexpected status code: {status_code}")
                print(f"  [INFO] Response: {response.text}")
        
        except requests.exceptions.ConnectionError:
            print(f"  [ERROR] Could not connect to the server. Is it running at {BASE_URL}?")
            sys.exit(1)
        
        # Small delay between requests to simulate rapid but sequential traffic
        time.sleep(0.1)

    print("\n--- Test Complete ---")

if __name__ == "__main__":
    run_rate_limit_test()
