import redisClient from '../lib/redis.js';

// Token Bucket Lua Script
// KEYS[1] - The rate limit key
// ARGV[1] - Capacity (burst limit)
// ARGV[2] - Refill rate (tokens per second)
// ARGV[3] - Current timestamp in seconds
const TOKEN_BUCKET_SCRIPT = `
  local key = KEYS[1]
  local capacity = tonumber(ARGV[1])
  local refillRate = tonumber(ARGV[2])
  local now = tonumber(ARGV[3])

  local tokens
  local lastRefill

  local bucket = redis.call('HMGET', key, 'tokens', 'lastRefill')
  if bucket[1] then
    tokens = tonumber(bucket[1])
    lastRefill = tonumber(bucket[2])
    
    local elapsed = math.max(0, now - lastRefill)
    local tokensToAdd = elapsed * refillRate
    tokens = math.min(capacity, tokens + tokensToAdd)
    
    -- Update lastRefill for the tokens we just added
    if elapsed > 0 then
      lastRefill = now
    end
  else
    tokens = capacity
    lastRefill = now
  end

  local allowed = 0
  if tokens >= 1 then
    tokens = tokens - 1
    allowed = 1
  end

  redis.call('HMSET', key, 'tokens', tokens, 'lastRefill', lastRefill)
  -- Set expiration to clean up unused keys
  redis.call('EXPIRE', key, math.ceil(capacity / refillRate))

  return { allowed, tokens }
`;

/**
 * Token Bucket Rate Limiter Middleware
 * @param {Object} options Options for the token bucket
 * @param {number} options.capacity Maximum number of tokens in the bucket (burst limit)
 * @param {number} options.refillRate Tokens added per second
 * @param {string} options.prefix Prefix for the Redis key
 */
export const tokenBucketLimiter = (options = {}) => {
  const { capacity = 10, refillRate = 1, prefix = 'login:rate:' } = options;

  return async (req, res, next) => {
    try {
      if (!redisClient.isReady) {
        // Fallback or bypass if Redis is down (could also reject, but bypass is safer for auth if Redis fails temporarily)
        console.warn('Redis is not ready, bypassing rate limit');
        return next();
      }

      const identifier = req.body.email ? req.body.email.toLowerCase() : (req.ip || 'unknown');
      const key = `${prefix}${identifier}`;
      const now = Math.floor(Date.now() / 1000);

      // Execute atomic Lua script
      const result = await redisClient.eval(TOKEN_BUCKET_SCRIPT, {
        keys: [key],
        arguments: [capacity.toString(), refillRate.toString(), now.toString()]
      });

      const allowed = result[0] === 1;
      const remainingTokens = result[1];

      res.setHeader('X-RateLimit-Limit', capacity);
      res.setHeader('X-RateLimit-Remaining', remainingTokens);

      if (!allowed) {
        return res.status(429).json({
          error: 'too_many_requests',
          message: 'Too many authentication attempts. Please try again later.'
        });
      }

      next();
    } catch (error) {
      console.error('Rate Limiter Error:', error);
      // In case of error (e.g., Redis down), allow the request to proceed
      next();
    }
  };
};
