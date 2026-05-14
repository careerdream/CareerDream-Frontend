"""
RBAC & Access Control Test Suite for CareerDream
Tests: Admin-only routes, session expiration, unauthorized access
"""

import requests
import json

BASE_URL = "http://localhost:5000"

# ─────────────────────────────────────────────
# Helper Utilities
# ─────────────────────────────────────────────

def login(email, password):
    """Logs in and returns the JWT token, or None on failure."""
    res = requests.post(f"{BASE_URL}/api/auth/login", json={"email": email, "password": password})
    if res.status_code == 200:
        return res.json().get("token")
    return None

def make_request(method, endpoint, token=None, payload=None):
    """Makes an authenticated or unauthenticated HTTP request."""
    headers = {}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    url = f"{BASE_URL}{endpoint}"
    if method == "GET":
        return requests.get(url, headers=headers)
    elif method == "POST":
        return requests.post(url, json=payload, headers=headers)
    elif method == "DELETE":
        return requests.delete(url, headers=headers)

def assert_status(test_name, response, expected_status):
    """Asserts that the response has the expected status code."""
    actual = response.status_code
    status = "[PASS]" if actual == expected_status else "[FAIL]"
    print(f"  {status} {test_name}: Expected {expected_status}, Got {actual}")
    if actual != expected_status:
        print(f"         Response: {response.text[:200]}")


# ─────────────────────────────────────────────
# Test Cases
# ─────────────────────────────────────────────

def test_unauthenticated_access():
    """Verify that protected routes return 401 without a token."""
    print("\n[TEST GROUP 1] Unauthenticated Access to Protected Routes")
    protected_routes = [
        ("GET",    "/api/auth/me"),
        ("GET",    "/api/recruiter"),
    ]
    for method, endpoint in protected_routes:
        res = make_request(method, endpoint, token=None)
        assert_status(f"No token → {endpoint}", res, 401)


def test_admin_route_as_regular_user():
    """Verify that a regular user cannot access admin-only endpoints."""
    print("\n[TEST GROUP 2] Regular User Cannot Access Admin Routes")
    
    # Use your real test user credentials
    USER_EMAIL    = "testuser@careerdream.in"
    USER_PASSWORD = "testpassword123"
    
    token = login(USER_EMAIL, USER_PASSWORD)
    if not token:
        print("  [SKIP] Could not log in as regular user. Check credentials.")
        return

    # Issues admin route: GET /api/issues (if admin-only) or another admin endpoint
    admin_routes = [
        ("GET", "/api/issues"),   # Adjust if this is admin-only
    ]
    for method, endpoint in admin_routes:
        res = make_request(method, endpoint, token=token)
        # Expect 403 Forbidden (not 401, since the user IS authenticated)
        assert_status(f"Regular user → {endpoint}", res, 403)


def test_expired_token():
    """Simulate using an expired/invalid JWT token."""
    print("\n[TEST GROUP 3] Expired / Tampered Token")
    
    # A manually crafted expired JWT (expired in 2020)
    EXPIRED_TOKEN = (
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."
        "eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNTc3ODM2ODAwLCJleHAiOjE1Nzc4MzY4MDF9."
        "invalid_signature"
    )
    res = make_request("GET", "/api/auth/me", token=EXPIRED_TOKEN)
    assert_status("Expired token → /api/auth/me", res, 401)


def test_no_token_on_auth_routes():
    """Verify that auth routes without tokens are rejected."""
    print("\n[TEST GROUP 4] Missing Token Variations")
    
    # Malformed: 'Bearer ' with no actual token
    headers = {"Authorization": "Bearer "}
    res = requests.get(f"{BASE_URL}/api/auth/me", headers=headers)
    assert_status("Empty Bearer token", res, 401)

    # Malformed: wrong scheme
    headers = {"Authorization": "Token sometoken"}
    res = requests.get(f"{BASE_URL}/api/auth/me", headers=headers)
    assert_status("Wrong auth scheme (Token)", res, 401)


def test_sql_injection_login():
    """Attempt SQL injection payloads in the login endpoint."""
    print("\n[TEST GROUP 5] SQL Injection in Login")
    
    payloads = [
        {"email": "' OR '1'='1", "password": "anything"},
        {"email": "admin'--",    "password": "anything"},
        {"email": "' OR 1=1--", "password": ""},
    ]
    for payload in payloads:
        res = make_request("POST", "/api/auth/login", payload=payload)
        # Should return 400 (bad request) or 401 (invalid credentials), never 200
        if res.status_code == 200:
            print(f"  [FAIL] SQL Injection may have succeeded! Payload: {payload}")
        else:
            print(f"  [PASS] Injection rejected (Status {res.status_code}): email={payload['email']}")


def test_xss_payload_in_fields():
    """Attempt XSS payloads in user-facing input fields."""
    print("\n[TEST GROUP 6] XSS Payloads in Input Fields")
    
    xss_payloads = [
        "<script>alert('XSS')</script>",
        "javascript:alert(1)",
        "<img src=x onerror=alert(1)>",
        "'\"><svg/onload=alert(1)>",
    ]
    # Test via the registration endpoint (adjust if register route differs)
    for xss in xss_payloads:
        res = make_request("POST", "/api/auth/register", payload={
            "name": xss,
            "email": f"xss_test_{hash(xss) % 9999}@test.com",
            "password": "ValidPass123!"
        })
        # A secure backend should sanitize / reject, never echo raw scripts
        print(f"  Status {res.status_code} for XSS payload in 'name': {xss[:50]}")
        if res.status_code == 200:
            body = res.text
            if "<script>" in body or "onerror=" in body:
                print("    [FAIL] Raw XSS payload reflected in response!")
            else:
                print("    [PASS] Payload not reflected raw in response.")


# ─────────────────────────────────────────────
# Main Runner
# ─────────────────────────────────────────────

if __name__ == "__main__":
    print("=" * 60)
    print("   CareerDream RBAC & Access Control Security Tests")
    print("=" * 60)
    
    test_unauthenticated_access()
    test_admin_route_as_regular_user()
    test_expired_token()
    test_no_token_on_auth_routes()
    test_sql_injection_login()
    test_xss_payload_in_fields()
    
    print("\n" + "=" * 60)
    print("   All tests complete. Review [FAIL] items above.")
    print("=" * 60)
