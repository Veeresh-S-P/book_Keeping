const redis = require('redis');
require('dotenv').config();

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
  legacyMode: true,
});

redisClient.connect().catch(console.error);

redisClient.on('connect', () => {
  console.log('Connected to Redis Cloud');
});

redisClient.on('error', (err) => {
  console.log('Redis error:', err);
});

module.exports = redisClient;
