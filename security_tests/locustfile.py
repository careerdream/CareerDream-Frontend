"""
Locust Load & Stress Test for CareerDream API
Simulates realistic user behavior to find performance breaking points.

Usage:
  pip install locust
  locust -f locustfile.py --host=http://localhost:5000

Then open http://localhost:8089 in your browser and configure:
  - Number of users: 1000
  - Spawn rate: 50 users/second
  - Host: http://localhost:5000 (or https://api.careerdream.in for production)
"""

from locust import HttpUser, TaskSet, task, between, events
import json
import random

# ─────────────────────────────────────────────
# Shared Test Data
# ─────────────────────────────────────────────

TEST_EMAIL    = "testuser@careerdream.in"
TEST_PASSWORD = "testpassword123"

SAMPLE_JOB_TITLES = [
    "Software Engineer", "Data Analyst", "Product Manager",
    "UI/UX Designer", "Backend Developer", "DevOps Engineer",
]


# ─────────────────────────────────────────────
# Task Sets (User Behaviors)
# ─────────────────────────────────────────────

class AnonymousBrowsingTasks(TaskSet):
    """Simulates unauthenticated users browsing the platform."""

    @task(5)
    def health_check(self):
        self.client.get("/api/health", name="GET /api/health")

    @task(10)
    def browse_jobs(self):
        self.client.get("/api/jobs", name="GET /api/jobs")

    @task(8)
    def browse_courses(self):
        self.client.get("/api/courses", name="GET /api/courses")

    @task(3)
    def browse_blog(self):
        self.client.get("/api/blog", name="GET /api/blog")

    @task(2)
    def try_protected_without_token(self):
        """Expect 401 — verifies that protection is in place under load."""
        with self.client.get(
            "/api/auth/me",
            name="GET /api/auth/me (no token)",
            catch_response=True
        ) as response:
            if response.status_code == 401:
                response.success()
            else:
                response.failure(f"Expected 401, got {response.status_code}")


class AuthenticatedUserTasks(TaskSet):
    """Simulates logged-in users — login once, then perform actions."""

    token = None

    def on_start(self):
        """Called once when a simulated user starts. Perform login."""
        res = self.client.post(
            "/api/auth/login",
            json={"email": TEST_EMAIL, "password": TEST_PASSWORD},
            name="POST /api/auth/login"
        )
        if res.status_code == 200:
            self.token = res.json().get("token")
        else:
            self.token = None

    def auth_headers(self):
        return {"Authorization": f"Bearer {self.token}"} if self.token else {}

    @task(10)
    def get_my_profile(self):
        self.client.get(
            "/api/auth/me",
            headers=self.auth_headers(),
            name="GET /api/auth/me (authenticated)"
        )

    @task(8)
    def view_courses(self):
        self.client.get(
            "/api/courses",
            headers=self.auth_headers(),
            name="GET /api/courses (authenticated)"
        )

    @task(6)
    def view_jobs(self):
        self.client.get(
            "/api/jobs",
            headers=self.auth_headers(),
            name="GET /api/jobs (authenticated)"
        )

    @task(4)
    def view_assessments(self):
        self.client.get(
            "/api/assessments",
            headers=self.auth_headers(),
            name="GET /api/assessments"
        )

    @task(2)
    def view_activity(self):
        self.client.get(
            "/api/activity",
            headers=self.auth_headers(),
            name="GET /api/activity"
        )


class BruteForceSimulationTasks(TaskSet):
    """
    Simulates a brute-force attacker.
    Expects 429 responses after the rate limit is hit.
    Used with a small number of users (e.g., 5) to verify protection.
    """

    @task
    def attempt_login_brute_force(self):
        with self.client.post(
            "/api/auth/login",
            json={"email": "victim@careerdream.in", "password": f"guess{random.randint(1000, 9999)}"},
            name="POST /api/auth/login (brute force)",
            catch_response=True
        ) as res:
            if res.status_code in [401, 400]:
                res.success()  # Correctly rejected
            elif res.status_code == 429:
                res.success()  # Rate limited as expected
            else:
                res.failure(f"Unexpected status: {res.status_code}")


# ─────────────────────────────────────────────
# User Classes
# ─────────────────────────────────────────────

class AnonymousUser(HttpUser):
    """Represents a public visitor browsing the site."""
    tasks = [AnonymousBrowsingTasks]
    wait_time = between(1, 3)  # Realistic delay between actions
    weight = 60  # 60% of simulated traffic


class LoggedInUser(HttpUser):
    """Represents an authenticated user using the platform."""
    tasks = [AuthenticatedUserTasks]
    wait_time = between(2, 5)
    weight = 35  # 35% of simulated traffic


class BruteForceAttacker(HttpUser):
    """Represents a malicious actor attempting brute force."""
    tasks = [BruteForceSimulationTasks]
    wait_time = between(0.1, 0.2)  # Very aggressive (10 req/s)
    weight = 5  # Only 5% — a few attackers


# ─────────────────────────────────────────────
# Event Hooks — Custom Summary on Completion
# ─────────────────────────────────────────────

@events.quitting.add_listener
def on_quitting(environment, **kwargs):
    stats = environment.stats
    print("\n" + "=" * 60)
    print("   CareerDream Load Test Summary")
    print("=" * 60)
    
    for name, entry in stats.entries.items():
        print(
            f"  {name[1]} {name[0]}\n"
            f"    Requests: {entry.num_requests} | Failures: {entry.num_failures} "
            f"| Avg: {entry.avg_response_time:.0f}ms | 95th: {entry.get_response_time_percentile(0.95):.0f}ms"
        )

    total_rps = stats.total.current_rps
    failure_rate = (stats.total.num_failures / max(stats.total.num_requests, 1)) * 100
    print(f"\n  Total RPS: {total_rps:.1f}")
    print(f"  Overall Failure Rate: {failure_rate:.2f}%")
    if failure_rate > 5:
        print("  [WARNING] Failure rate exceeds 5%! Investigate breaking points.")
    else:
        print("  [PASS] System handled load within acceptable failure threshold.")
    print("=" * 60)
