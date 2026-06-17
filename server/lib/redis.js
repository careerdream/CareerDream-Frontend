import { createRequire } from 'module';

const require = createRequire(import.meta.url);

let redisClient = {
  on: () => {},
  connect: async () => {},
  isReady: false,
  multi: () => ({ get: () => {}, set: () => {}, exec: async () => [] }),
  keys: async () => [],
  get: async () => null,
  set: async () => {},
  incr: async () => {},
  decr: async () => {},
  eval: async () => null
};

try {
  const { createClient } = require('redis');
  
  const realClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  });
  
  realClient.on('error', (err) => console.error('Redis Client Error:', err));
  realClient.on('connect', () => console.log('Redis Client Connected'));
  
  // Connect immediately, but don't crash if it fails immediately
  realClient.connect().catch(console.error);
  
  redisClient = realClient;
} catch (err) {
  console.warn('Redis module not found. Redis features will be disabled.');
}

export default redisClient;
