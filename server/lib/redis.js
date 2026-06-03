import { createClient } from 'redis';

// Initialize Redis Client
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

// Connect immediately, but don't crash if it fails immediately (reconnect strategy handles it)
redisClient.connect().catch(console.error);

export default redisClient;
