"""
OWASP ZAP Automated Vulnerability Scanner for CareerDream
----------------------------------------------------------
Performs a passive baseline scan + active attack scan.

Prerequisites:
  1. Download & install OWASP ZAP: https://www.zaproxy.org/download/
  2. Start ZAP in daemon mode:
       Windows: "C:\Program Files\ZAP\Zed Attack Proxy\zap.bat" -daemon -port 8090 -config api.key=changeme
       Linux:   zap.sh -daemon -port 8090 -config api.key=changeme
  3. Install the Python API client:
       pip install python-owasp-zap-v2.4

Usage:
  python zap_scan.py --target http://localhost:5000 --api-key changeme
"""

import time
import sys
import argparse
from zapv2 import ZAPv2

# ─────────────────────────────────────────────
# Configuration
# ─────────────────────────────────────────────

SENSITIVE_ENDPOINTS = [
    "/api/auth/login",
    "/api/auth/register",
    "/api/auth/me",
    "/api/jobs",
    "/api/courses",
    "/api/issues",
    "/api/recruiter",
    "/api/blog",
]

RISK_LABELS = {
    "3": "🔴 HIGH",
    "2": "🟠 MEDIUM",
    "1": "🟡 LOW",
    "0": "ℹ️  INFORMATIONAL",
}


# ─────────────────────────────────────────────
# Scanner Functions
# ─────────────────────────────────────────────

def wait_for_spider(zap, scan_id, timeout=120):
    """Polls the spider scan until completion."""
    elapsed = 0
    while int(zap.spider.status(scan_id)) < 100:
        progress = zap.spider.status(scan_id)
        print(f"  Spider progress: {progress}%", end="\r")
        time.sleep(2)
        elapsed += 2
        if elapsed > timeout:
            print("\n  [WARN] Spider timed out.")
            break
    print(f"  Spider complete: 100%              ")


def wait_for_active_scan(zap, scan_id, timeout=300):
    """Polls the active scan until completion."""
    elapsed = 0
    while int(zap.ascan.status(scan_id)) < 100:
        progress = zap.ascan.status(scan_id)
        print(f"  Active scan progress: {progress}%", end="\r")
        time.sleep(5)
        elapsed += 5
        if elapsed > timeout:
            print("\n  [WARN] Active scan timed out.")
            break
    print(f"  Active scan complete: 100%              ")


def run_baseline_scan(zap, target):
    """Passive (baseline) scan — observes without attacking."""
    print(f"\n[STEP 1] Spidering target: {target}")
    spider_id = zap.spider.scan(target)
    wait_for_spider(zap, spider_id)

    print("\n[STEP 2] Running passive analysis on collected URLs...")
    time.sleep(5)  # Allow passive scanner to process


def run_active_scan(zap, target):
    """Active scan — simulates real attacks. STAGING ONLY."""
    print(f"\n[STEP 3] Starting active scan on: {target}")
    print("  ⚠️  WARNING: This sends real attack payloads. Use staging only!")
    
    scan_id = zap.ascan.scan(target)
    wait_for_active_scan(zap, scan_id)


def print_alerts_report(zap, target):
    """Prints all alerts grouped by risk level."""
    print("\n" + "=" * 65)
    print("   OWASP ZAP — Vulnerability Report for CareerDream")
    print("=" * 65)

    alerts = zap.core.alerts(baseurl=target)
    
    if not alerts:
        print("  ✅ No alerts found! Great security posture.")
        return

    # Group by risk
    grouped = {"3": [], "2": [], "1": [], "0": []}
    for alert in alerts:
        risk = alert.get("risk", "0")
        # ZAP returns "High"/"Medium"/"Low"/"Informational" — map to number
        risk_map = {"High": "3", "Medium": "2", "Low": "1", "Informational": "0"}
        risk_key = risk_map.get(risk, "0")
        grouped[risk_key].append(alert)

    total = len(alerts)
    print(f"\n  Total Alerts: {total}")
    print(f"  {RISK_LABELS['3']}: {len(grouped['3'])}")
    print(f"  {RISK_LABELS['2']}: {len(grouped['2'])}")
    print(f"  {RISK_LABELS['1']}: {len(grouped['1'])}")
    print(f"  {RISK_LABELS['0']}: {len(grouped['0'])}\n")

    for risk_level in ["3", "2", "1", "0"]:
        if not grouped[risk_level]:
            continue
        print(f"\n  {RISK_LABELS[risk_level]} Alerts:")
        print("  " + "-" * 55)
        for alert in grouped[risk_level]:
            print(f"  • {alert.get('alert', 'Unknown')}")
            print(f"    URL: {alert.get('url', 'N/A')}")
            print(f"    Description: {alert.get('description', '')[:120]}...")
            print(f"    Solution: {alert.get('solution', '')[:120]}...")
            print()

    print("=" * 65)
    print("  Remediation Priority:")
    print("  1. Fix all 🔴 HIGH issues before launch (SQLi, RCE, Auth bypass)")
    print("  2. Fix all 🟠 MEDIUM issues before launch (XSS, CSRF)")
    print("  3. Address 🟡 LOW issues post-launch")
    print("=" * 65)


def save_html_report(zap, output_path="zap_report.html"):
    """Saves the full ZAP HTML report."""
    report = zap.core.htmlreport()
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(report)
    print(f"\n  📄 Full HTML report saved to: {output_path}")


# ─────────────────────────────────────────────
# Main Entry Point
# ─────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="OWASP ZAP Security Scanner for CareerDream")
    parser.add_argument("--target",   default="http://localhost:5000", help="Target base URL")
    parser.add_argument("--api-key",  default="changeme",              help="ZAP API key")
    parser.add_argument("--zap-host", default="localhost",             help="ZAP daemon host")
    parser.add_argument("--zap-port", default=8090,      type=int,    help="ZAP daemon port")
    parser.add_argument("--active",   action="store_true",             help="Run active (attack) scan (staging only!)")
    parser.add_argument("--output",   default="zap_report.html",       help="HTML report output path")
    args = parser.parse_args()

    print(f"  Connecting to ZAP at {args.zap_host}:{args.zap_port}...")
    zap = ZAPv2(
        apikey=args.api_key,
        proxies={
            "http":  f"http://{args.zap_host}:{args.zap_port}",
            "https": f"http://{args.zap_host}:{args.zap_port}",
        }
    )

    try:
        version = zap.core.version
        print(f"  ✅ Connected to ZAP version: {version}")
    except Exception as e:
        print(f"  ❌ Could not connect to ZAP: {e}")
        print("     Make sure ZAP is running in daemon mode (see script header).")
        sys.exit(1)

    print(f"\n  Target: {args.target}")
    print(f"  Mode:   {'ACTIVE (attack)' if args.active else 'PASSIVE (baseline)'}")

    run_baseline_scan(zap, args.target)

    if args.active:
        run_active_scan(zap, args.target)

    print_alerts_report(zap, args.target)
    save_html_report(zap, args.output)


if __name__ == "__main__":
    main()
