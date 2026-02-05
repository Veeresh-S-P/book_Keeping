const redisClient = require('../config/redisClient');

/**
 * Cache middleware for GET requests
 * Caches successful GET responses in Redis for 10 minutes
 */
const cacheMiddleware = async (req, res, next) => {
  // Only cache GET requests
  if (req.method !== 'GET') {
    return next();
  }

  try {
    // Generate cache key from request method and path with query params
    const cacheKey = `cache:${req.originalUrl || req.url}`;

    // Try to get cached data
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log(`Cache HIT for: ${cacheKey}`);
      return res.json(JSON.parse(cachedData));
    }

    console.log(`Cache MISS for: ${cacheKey}`);

    // Override res.json to cache the response before sending
    const originalJson = res.json.bind(res);

    res.json = function (data) {
      // Cache the response for 10 minutes (600 seconds)
      redisClient
        .setEx(cacheKey, 600, JSON.stringify(data))
        .catch((err) => console.error('Error setting cache:', err));

      return originalJson(data);
    };

    next();
  } catch (error) {
    console.error('Cache middleware error:', error);
    // If cache fails, continue without caching
    next();
  }
};

module.exports = cacheMiddleware;
