import socket
import ssl
import datetime
import OpenSSL
from urllib.parse import urlparse

def check_ssl_details(hostname, port=443):
    print(f"--- SSL/TLS Validation for {hostname} ---")
    
    context = ssl.create_default_context()
    try:
        with socket.create_connection((hostname, port)) as sock:
            with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                # Check SSL version
                version = ssock.version()
                print(f"[INFO] TLS Version: {version}")
                
                # Get certificate info
                cert = ssock.getpeercert()
                
                # Check expiration
                not_after_str = cert['notAfter']
                expiry_date = datetime.datetime.strptime(not_after_str, '%b %d %H:%M:%S %Y %Z')
                days_left = (expiry_date - datetime.datetime.now()).days
                
                print(f"[INFO] Certificate Expiry: {not_after_str}")
                if days_left < 30:
                    print(f"[WARNING] Certificate expires in {days_left} days!")
                else:
                    print(f"[PASS] Certificate is valid for another {days_left} days.")

                # Check Cipher
                cipher = ssock.cipher()
                print(f"[INFO] Cipher Suite: {cipher[0]} ({cipher[1]} bits)")
                
                if "SHA1" in cipher[0] or "MD5" in cipher[0]:
                    print("[FAIL] Weak cipher detected (SHA1/MD5)!")
                else:
                    print("[PASS] Modern cipher suite in use.")

    except Exception as e:
        print(f"[ERROR] Failed to validate SSL: {e}")

def check_http_redirect(url):
    print(f"\n--- Checking HTTP to HTTPS Redirect ---")
    parsed = urlparse(url)
    http_url = f"http://{parsed.netloc}"
    
    try:
        response = requests.get(http_url, allow_redirects=False)
        if response.status_code in [301, 302, 307, 308]:
            location = response.headers.get('Location', '')
            if location.startswith('https://'):
                print(f"[PASS] Redirect confirmed: {http_url} -> {location}")
            else:
                print(f"[FAIL] Redirect found but to non-HTTPS location: {location}")
        else:
            print(f"[FAIL] No redirect found. Status: {response.status_code}")
    except Exception as e:
        print(f"[ERROR] HTTP check failed: {e}")

if __name__ == "__main__":
    import requests # Required for redirect check
    domain = "careerdream.in"
    check_ssl_details(domain)
    check_http_redirect(f"https://{domain}")
