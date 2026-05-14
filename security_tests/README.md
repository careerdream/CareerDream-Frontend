# CareerDream Security Testing Suite

A comprehensive collection of pre-launch security test scripts for the **CareerDream** web platform.

---

## Prerequisites

Install Python dependencies once:
```bash
pip install requests locust pyopenssl
```

---

## Test 1 — Rate Limiting (`brute_force_test.py`)

Tests that the Express rate limiter correctly returns `HTTP 429` after the threshold is hit.

### Run
```bash
# Make sure the backend server is running first
cd security_tests
python brute_force_test.py
```

### Expected Output
```
--- Starting Rate Limiting Test on http://localhost:5000/api/test-limit ---
Attempt 01: Status 200 | Latency: 12.30ms
  [PASS] Request successful: Success! You have not hit the rate limit yet.
Attempt 02: Status 200 | ...
...
Attempt 06: Status 429 | ...
  [SUCCESS] Rate limit triggered as expected!
  [INFO] Retry-After Header: 60
```

### How to Interpret Failures
| Symptom | Meaning | Fix |
|---|---|---|
| Never hits 429 | Rate limiter not applied | Check `server.js` imports `rateLimiter.js` |
| 429 on attempt 1 | Window already exceeded | Restart server or wait for window to reset |
| 500 Internal Error | Server crash | Check server logs for errors |

---

## Test 2 — SSL/TLS Validation (`ssl_test.py`)

Validates certificate expiry, cipher strength, and HTTP→HTTPS redirect behavior.

### Run
```bash
python ssl_test.py
```

### Expected Output
```
--- SSL/TLS Validation for careerdream.in ---
[INFO] TLS Version: TLSv1.3
[INFO] Certificate Expiry: May 15 00:00:00 2026 GMT
[PASS] Certificate is valid for another 90 days.
[INFO] Cipher Suite: TLS_AES_256_GCM_SHA384 (256 bits)
[PASS] Modern cipher suite in use.

--- Checking HTTP to HTTPS Redirect ---
[PASS] Redirect confirmed: http://careerdream.in -> https://careerdream.in/
```

### How to Interpret Failures
| Symptom | Meaning | Fix |
|---|---|---|
| `Certificate expires in X days` (< 30) | Cert renewal needed | Renew via Hostinger / Let's Encrypt |
| `Weak cipher detected (SHA1/MD5)` | Outdated TLS config | Update server TLS settings to TLS 1.2+ |
| `No redirect found` | HTTP not redirecting | Add redirect rule in Hostinger `.htaccess` or Nginx config |

---

## Test 3 — RBAC & Access Control (`rbac_test.py`)

Tests role-based access control, expired JWTs, SQL injection, and XSS payloads.

> **Before running:** Update the `USER_EMAIL` and `USER_PASSWORD` constants in the script with a real test account.

### Run
```bash
python rbac_test.py
```

### Expected Output
```
[TEST GROUP 1] Unauthenticated Access to Protected Routes
  [PASS] No token → /api/auth/me: Expected 401, Got 401

[TEST GROUP 2] Regular User Cannot Access Admin Routes
  [PASS] Regular user → /api/issues: Expected 403, Got 403

[TEST GROUP 3] Expired / Tampered Token
  [PASS] Expired token → /api/auth/me: Expected 401, Got 401

[TEST GROUP 5] SQL Injection in Login
  [PASS] Injection rejected (Status 401): email=' OR '1'='1

[TEST GROUP 6] XSS Payloads in Input Fields
  Status 400 for XSS payload in 'name': <script>alert('XSS')</script>
  [PASS] Payload not reflected raw in response.
```

### How to Interpret Failures
| Symptom | Meaning | Fix |
|---|---|---|
| Group 1/3: Status 200 instead of 401 | Auth middleware not applied | Add `verifyToken` middleware to route |
| Group 2: Status 200 instead of 403 | RBAC not enforced | Add `verifyAdmin` middleware to admin routes |
| Group 5: Status 200 on SQL injection | Possible SQL injection vulnerability | Use parameterized queries (Prisma does this by default — check raw queries) |
| Group 6: Script tags reflected in response | XSS vulnerability | Sanitize inputs with a library like `validator.js` or `DOMPurify` |

---

## Test 4 — Load & Stress Testing (`locustfile.py`)

Simulates 1000 concurrent users with realistic traffic patterns (60% anonymous, 35% authenticated, 5% brute-force attackers).

### Install Locust
```bash
pip install locust
```

### Run (Web UI)
```bash
cd security_tests
locust -f locustfile.py --host=http://localhost:5000
# Then open http://localhost:8089 in your browser
```

### Run (Headless / CI Mode — 1000 users, 5 min)
```bash
locust -f locustfile.py \
  --host=http://localhost:5000 \
  --headless \
  --users=1000 \
  --spawn-rate=50 \
  --run-time=5m \
  --html=report.html
```

### Locust Configuration (Recommended Test)
| Setting | Value |
|---|---|
| **Number of Users** | 1000 |
| **Spawn Rate** | 50 users/sec |
| **Host** | `http://localhost:5000` |
| **Run Time** | 5 minutes |

### Key Metrics to Watch
| Metric | Acceptable Threshold | Action if Exceeded |
|---|---|---|
| **Failure Rate** | < 5% | Investigate erroring endpoints |
| **Avg Response Time** | < 500ms | Profile slow DB queries |
| **95th Percentile RT** | < 2000ms | Add caching (Redis) |
| **Requests/sec** | > 50 RPS sustained | Scale horizontally |

### How to Interpret Failures
| Symptom | Meaning | Fix |
|---|---|---|
| High 500 errors under load | Server crashes / DB pool exhausted | Increase DB connection pool size |
| 429 spike for `AnonymousUser` | General rate limiter too aggressive | Tune `apiLimiter` windowMs/max |
| Avg RT > 2s at 500 users | Database bottleneck | Add DB indexes, query optimization |
| Failure rate climbs after 800 users | Server memory limit hit | Scale Node.js with PM2 clustering |

---

## OWASP ZAP — Automated Vulnerability Scan

For automated detection of SQLi, XSS, CSRF, and authentication bypass at scale, use **OWASP ZAP**.

### Setup
1. [Download OWASP ZAP](https://www.zaproxy.org/download/)
2. Install the ZAP CLI:
   ```bash
   pip install zaproxy
   ```

### Quick Scan
```bash
# Passive scan (no attacks, just observe)
zap-cli quick-scan --self-contained --start-options '-config api.disablekey=true' http://localhost:5000

# Active scan (simulates real attacks — run ONLY on staging!)
zap-cli active-scan --scanners all http://localhost:5000
```

> ⚠️ **WARNING:** Never run an active scan against production. Use staging only.

### Interpreting ZAP Alerts
| Alert Level | Meaning | Action |
|---|---|---|
| 🔴 **High** | Critical vulnerability (e.g., SQLi, RCE) | Fix immediately before launch |
| 🟠 **Medium** | Exploitable flaw (e.g., XSS, CSRF) | Fix before launch |
| 🟡 **Low** | Minor hardening issue | Fix after launch |
| ℹ️ **Informational** | Best-practice suggestion | Review when time allows |

---

## Rate Limiter Configuration Reference

The middleware lives in `server/middleware/rateLimiter.js`.

| Limiter | Applies To | Window | Max Requests | Behavior on Exceed |
|---|---|---|---|---|
| `apiLimiter` | All `/api/*` routes | 15 min | 100 | 429 + headers |
| `authLimiter` | `/api/auth/*` | 1 hour | 10 | 429 + headers |
| `testLimiter` | `/api/test-limit` | 1 min | 5 | 429 + headers |

The `RateLimit-*` standard headers (RFC 6585) are automatically returned on every response, making it easy for clients to track their quota.

---

## Quick Run — All Tests
```bash
cd security_tests

# 1. Confirm server is running
curl http://localhost:5000/api/health

# 2. Rate limiting
python brute_force_test.py

# 3. SSL validation
python ssl_test.py

# 4. RBAC & injection
python rbac_test.py

# 5. Load test (headless)
locust -f locustfile.py --host=http://localhost:5000 --headless --users=100 --spawn-rate=10 --run-time=1m
```
