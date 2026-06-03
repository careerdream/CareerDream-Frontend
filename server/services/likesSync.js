import prisma from '../lib/prisma.js';
import redisClient from '../lib/redis.js';

/**
 * Background Service to batch flush Article Likes from Redis to Database
 */
export const startLikesSyncService = (intervalMs = 5 * 60 * 1000) => { // Default 5 minutes
  console.log(`[LikesSync] Service started with interval ${intervalMs / 1000}s`);

  setInterval(async () => {
    if (!redisClient.isReady) {
      console.warn('[LikesSync] Redis not ready. Skipping flush.');
      return;
    }

    try {
      // Find all article like keys
      // Note: for very large datasets, SCAN is preferred. KEYS is used here for simplicity.
      const keys = await redisClient.keys('article:likes:*');
      if (keys.length === 0) return;

      console.log(`[LikesSync] Found ${keys.length} articles to flush likes for.`);

      // Read values and reset to 0 atomically using MULTI
      const multi = redisClient.multi();
      keys.forEach(key => {
        multi.get(key);
        multi.set(key, 0); // Reset after read
      });

      const results = await multi.exec();
      
      const updates = [];

      for (let i = 0; i < keys.length; i++) {
        // results is array of [get_result, set_result, get_result, set_result...]
        const countStr = results[i * 2]; 
        const count = parseInt(countStr, 10);
        
        if (count > 0) {
          const articleIdStr = keys[i].replace('article:likes:', '');
          const articleId = parseInt(articleIdStr, 10);

          if (!isNaN(articleId)) {
            updates.push(
              prisma.blogPost.update({
                where: { id: articleId },
                data: { likesCount: { increment: count } }
              })
            );
          }
        }
      }

      if (updates.length > 0) {
        // Execute all updates in a transaction
        await prisma.$transaction(updates);
        console.log(`[LikesSync] Successfully flushed ${updates.length} articles to DB.`);
      }

    } catch (error) {
      console.error('[LikesSync] Error flushing likes to DB:', error);
    }
  }, intervalMs);
};
