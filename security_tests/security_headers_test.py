"""
Security Headers Validation Test for CareerDream API
------------------------------------------------------
Verifies that the server returns all critical security headers
(set by helmet.js) on every response.

Run:
  python security_headers_test.py
"""

import requests
import sys

BASE_URL = "http://localhost:5000"

# ─────────────────────────────────────────────────────────────────────
# Expected Security Headers & Their Required Values / Presence
# ─────────────────────────────────────────────────────────────────────

REQUIRED_HEADERS = [
    {
        "name": "Strict-Transport-Security",
        "must_contain": "max-age=",
        "description": "HSTS — forces HTTPS for all future requests",
    },
    {
        "name": "X-Content-Type-Options",
        "must_equal": "nosniff",
        "description": "Prevents MIME-type sniffing attacks",
    },
    {
        "name": "X-Frame-Options",
        "must_equal": "DENY",
        "description": "Prevents clickjacking via iframes",
    },
    {
        "name": "Referrer-Policy",
        "must_contain": "strict-origin",
        "description": "Controls how much referrer info is sent",
    },
    {
        "name": "Content-Security-Policy",
        "must_contain": "default-src",
        "description": "Restricts resource loading to prevent XSS",
    },
    {
        "name": "Cross-Origin-Opener-Policy",
        "must_contain": "same-origin",
        "description": "Isolates browsing context from cross-origin docs",
    },
    {
        "name": "X-DNS-Prefetch-Control",
        "must_equal": "off",
        "description": "Disables DNS prefetching to prevent timing attacks",
    },
]

FORBIDDEN_HEADERS = [
    {
        "name": "X-Powered-By",
        "reason": "Reveals server technology (Express). Helmet removes this.",
    },
    {
        "name": "Server",
        "reason": "Reveals server software version.",
    },
]

# ─────────────────────────────────────────────────────────────────────
# Test Endpoints — headers should be set on ALL response types
# ─────────────────────────────────────────────────────────────────────

TEST_ENDPOINTS = [
    ("/api/health",     "GET",  "Health endpoint"),
    ("/api/jobs",       "GET",  "Public API route"),
    ("/api/auth/me",    "GET",  "Protected route (expects 401)"),
    ("/api/auth/login", "POST", "Auth POST route"),
]

# ─────────────────────────────────────────────────────────────────────
# Test Runner
# ─────────────────────────────────────────────────────────────────────

def check_headers(endpoint, method, label, headers):
    print(f"\n  🔎 {label}: {method} {endpoint}")
    failures = 0

    # Check required headers
    for rule in REQUIRED_HEADERS:
        header_name  = rule["name"]
        header_value = headers.get(header_name, "").lower()
        desc         = rule["description"]

        present = header_name.lower() in {k.lower() for k in headers}

        if not present:
            print(f"    [FAIL] Missing: {header_name}")
            print(f"           → {desc}")
            failures += 1
            continue

        actual_value = headers.get(header_name, "")

        if "must_equal" in rule:
            expected = rule["must_equal"].lower()
            if actual_value.lower() != expected:
                print(f"    [FAIL] {header_name}: expected '{rule['must_equal']}', got '{actual_value}'")
                failures += 1
            else:
                print(f"    [PASS] {header_name}: {actual_value}")

        elif "must_contain" in rule:
            expected_fragment = rule["must_contain"].lower()
            if expected_fragment not in actual_value.lower():
                print(f"    [FAIL] {header_name}: expected to contain '{rule['must_contain']}', got '{actual_value}'")
                failures += 1
            else:
                print(f"    [PASS] {header_name}: {actual_value[:80]}")

    # Check forbidden headers
    for forbidden in FORBIDDEN_HEADERS:
        header_name = forbidden["name"]
        if header_name.lower() in {k.lower() for k in headers}:
            print(f"    [FAIL] Forbidden header present: {header_name}")
            print(f"           → {forbidden['reason']}")
            failures += 1
        else:
            print(f"    [PASS] Forbidden header absent: {header_name}")

    return failures


def run_security_header_tests():
    print("=" * 65)
    print("   CareerDream — Security Headers Validation")
    print("=" * 65)

    total_failures = 0

    for endpoint, method, label in TEST_ENDPOINTS:
        url = f"{BASE_URL}{endpoint}"
        try:
            if method == "GET":
                res = requests.get(url)
            elif method == "POST":
                res = requests.post(url, json={})

            failures = check_headers(endpoint, method, label, res.headers)
            total_failures += failures

        except requests.exceptions.ConnectionError:
            print(f"\n  [ERROR] Could not connect to {url}. Is the server running?")
            sys.exit(1)

    print("\n" + "=" * 65)
    if total_failures == 0:
        print("  ✅ All security headers are correctly configured!")
    else:
        print(f"  ❌ {total_failures} header check(s) failed. Review [FAIL] entries above.")
        print()
        print("  Remediation: Ensure `securityHeaders` middleware is imported")
        print("  and applied as the FIRST middleware in server.js:")
        print()
        print("    import { securityHeaders } from './middleware/securityHeaders.js';")
        print("    app.use(securityHeaders); // ← before CORS and routes")
    print("=" * 65)
    return total_failures


if __name__ == "__main__":
    failures = run_security_header_tests()
    sys.exit(1 if failures > 0 else 0)
