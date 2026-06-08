import rateLimit, { ipKeyGenerator } from 'express-rate-limit';

/**
 * General rate limiter for all API requests
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increased to avoid blocking dashboard loads
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: ipKeyGenerator,
  message: {
    status: 429,
    message: 'Too many requests from this IP, please try again after 15 minutes',
  },
});

/**
 * Stricter rate limiter for authentication routes (login, register)
 * to prevent brute-force attacks.
 */
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 login/register attempts per hour
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: ipKeyGenerator,
  message: {
    status: 429,
    message: 'Too many authentication attempts. Please try again after an hour.',
  },
  skipSuccessfulRequests: true, // Only count failed attempts if possible (middleware doesn't know success easily, but this is a good start)
});

/**
 * Specific rate limiter for brute-force simulation tests
 * This one is more aggressive to demonstrate the 429 response.
 */
export const testLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Only 5 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: ipKeyGenerator,
  message: {
    status: 429,
    message: 'Rate limit exceeded for testing purposes',
  },
});

/**
 * Rate limiter for code playground submissions (100 per minute per user)
 */
export const playgroundLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  message: { status: 429, message: 'Too many code submissions. Please wait 1 minute.' },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: ipKeyGenerator,
});

/**
 * Rate limiter for AI generating endpoints (5 per 15 minutes)
 */
export const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { status: 429, message: 'Too many AI requests. Please wait a few minutes before trying again.' },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: ipKeyGenerator,
});

