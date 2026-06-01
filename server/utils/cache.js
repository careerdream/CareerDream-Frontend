import NodeCache from 'node-cache';

// StdTTL = 60 seconds, checkperiod = 120 seconds
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

export const cacheMiddleware = (duration) => (req, res, next) => {
  // Only cache GET requests
  if (req.method !== 'GET') {
    return next();
  }

  const key = req.originalUrl || req.url;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    res.setHeader('X-Cache', 'HIT');
    return res.json(cachedResponse);
  } else {
    res.setHeader('X-Cache', 'MISS');
    // Override res.json to store the response in cache before sending
    const originalJson = res.json;
    res.json = (body) => {
      // Only cache successful responses
      if (res.statusCode >= 200 && res.statusCode < 300) {
        cache.set(key, body, duration || 60);
      }
      return originalJson.call(res, body);
    };
    next();
  }
};

export const clearCache = (keyPattern) => {
  const keys = cache.keys();
  if (!keyPattern) {
    cache.flushAll();
    return;
  }
  
  const keysToDelete = keys.filter(k => k.includes(keyPattern));
  keysToDelete.forEach(k => cache.del(k));
};

export default cache;
