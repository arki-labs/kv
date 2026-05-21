import { KV } from './index.js';
/**
 * Create a KV instance using environment configuration
 * @param namespace - The KV namespace (typically the app key).
 *   Falls back to the KV_NAMESPACE environment variable if not provided.
 * @param rateLimitPrefix - Optional prefix for rate limiter keys (default: 'rl')
 * @returns KV instance
 * @throws Error if KV_URL is not configured
 */
export declare function createKV(namespace?: string, rateLimitPrefix?: string): KV;
/**
 * Create a KV instance for rate limiting using environment configuration
 * @param namespace - The KV namespace (typically the app key).
 *   Falls back to the KV_NAMESPACE environment variable if not provided.
 * @returns KV instance configured for rate limiting
 * @throws Error if RATE_LIMIT_REDIS_URL or KV_URL is not configured
 */
export declare function createRateLimitKV(namespace?: string): KV;
//# sourceMappingURL=factory.d.ts.map