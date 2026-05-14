import helmet from 'helmet';

/**
 * Configures Helmet.js security headers for the CareerDream API.
 *
 * Applies the following protections:
 *  - Content-Security-Policy (CSP)     → Prevents XSS / clickjacking
 *  - Strict-Transport-Security (HSTS)  → Forces HTTPS
 *  - X-Frame-Options: DENY             → Prevents clickjacking
 *  - X-Content-Type-Options: nosniff   → Prevents MIME sniffing
 *  - Referrer-Policy                   → Controls referrer info leakage
 *  - X-XSS-Protection (legacy)         → Older browser XSS filter
 *  - Cross-Origin-Opener-Policy        → Isolates browsing context
 */
export const securityHeaders = helmet({
  // ── Content Security Policy ───────────────────────────────────────
  contentSecurityPolicy: {
    directives: {
      defaultSrc:     ["'self'"],
      scriptSrc:      ["'self'"],
      styleSrc:       ["'self'", "'unsafe-inline'"],   // Allow inline styles (common in React apps)
      imgSrc:         ["'self'", "data:", "https:"],   // Allow HTTPS images and data URIs
      connectSrc:     ["'self'", "https://api.careerdream.in"],
      fontSrc:        ["'self'", "https://fonts.gstatic.com"],
      objectSrc:      ["'none'"],
      frameSrc:       ["'none'"],
      upgradeInsecureRequests: [],
    },
  },

  // ── HTTP Strict Transport Security (HSTS) ─────────────────────────
  // Forces browsers to use HTTPS for 1 year, includes subdomains
  hsts: {
    maxAge:            31536000, // 1 year in seconds
    includeSubDomains: true,
    preload:           true,
  },

  // ── Clickjacking Protection ───────────────────────────────────────
  frameguard: { action: 'deny' },

  // ── MIME Sniffing Prevention ──────────────────────────────────────
  noSniff: true,

  // ── Referrer Policy ──────────────────────────────────────────────
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },

  // ── DNS Prefetch Control ──────────────────────────────────────────
  dnsPrefetchControl: { allow: false },

  // ── Cross-Origin Policies ─────────────────────────────────────────
  crossOriginEmbedderPolicy: false, // Set false to avoid breaking API image loading
  crossOriginOpenerPolicy:   { policy: 'same-origin' },
  crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allow API to be called from frontend domain
});
