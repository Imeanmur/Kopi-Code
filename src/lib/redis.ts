import { Redis } from '@upstash/redis';

/**
 * Singleton Redis client.
 * Reads UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN from env.
 *
 * Set these in:
 *  - .env.local  (local dev)
 *  - Vercel project settings → Environment Variables (production)
 */
let redis: Redis | null = null;

export function getRedis(): Redis {
  if (!redis) {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!url || !token) {
      throw new Error(
        'Missing Upstash Redis env vars: UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be set.'
      );
    }

    redis = new Redis({ url, token });
  }
  return redis;
}

// ── Key helpers ──────────────────────────────────────────────────────────────
/** Redis hash key that stores claim data for a given token */
export const claimKey = (tokenId: string) => `kopicode:claim:${tokenId}`;
