const redisClient = require('../config/redisClient');

/**
 * Set a value in Redis cache
 * @param {string} key - Cache key
 * @param {any} value - Value to cache
 * @param {number} expiresIn - Expiration time in seconds (default: 600)
 */
const setCache = async (key, value, expiresIn = 600) => {
  try {
    const cacheKey = `cache:${key}`;
    await redisClient.setEx(
      cacheKey,
      expiresIn,
      JSON.stringify(value)
    );
    console.log(`Cache SET: ${cacheKey}`);
  } catch (error) {
    console.error(`Error setting cache for key ${key}:`, error);
  }
};

/**
 * Get a value from Redis cache
 * @param {string} key - Cache key
 * @returns {Promise<any|null>} Cached value or null
 */
const getCache = async (key) => {
  try {
    const cacheKey = `cache:${key}`;
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log(`Cache GET: ${cacheKey}`);
      return JSON.parse(cachedData);
    }
    return null;
  } catch (error) {
    console.error(`Error getting cache for key ${key}:`, error);
    return null;
  }
};

/**
 * Delete a cache entry
 * @param {string} key - Cache key
 */
const deleteCache = async (key) => {
  try {
    const cacheKey = `cache:${key}`;
    await redisClient.del(cacheKey);
    console.log(`Cache DELETE: ${cacheKey}`);
  } catch (error) {
    console.error(`Error deleting cache for key ${key}:`, error);
  }
};

/**
 * Clear all cache entries matching a pattern
 * @param {string} pattern - Redis key pattern (e.g., 'cache:*')
 */
const clearCacheByPattern = async (pattern) => {
  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log(`Cache CLEARED: ${pattern} (${keys.length} keys deleted)`);
    }
  } catch (error) {
    console.error(`Error clearing cache pattern ${pattern}:`, error);
  }
};

/**
 * Invalidate all related caches (e.g., when a book is created/updated)
 * Clears all book-related GET request caches
 */
const invalidateBookCache = async () => {
  await clearCacheByPattern('cache:/api/books*');
};

/**
 * Invalidate all library-related caches
 */
const invalidateLibraryCache = async () => {
  await clearCacheByPattern('cache:/api/libraries*');
};

/**
 * Invalidate all user-related caches
 */
const invalidateUserCache = async () => {
  await clearCacheByPattern('cache:/api/users*');
};

module.exports = {
  setCache,
  getCache,
  deleteCache,
  clearCacheByPattern,
  invalidateBookCache,
  invalidateLibraryCache,
  invalidateUserCache,
};
