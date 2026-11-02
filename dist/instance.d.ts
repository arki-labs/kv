import { KV } from './index.js';
/**
 * Initializes the shared KV client instance and tests the connection.
 * Returns null if env vars are missing (development only).
 *
 * @param namespace - The KV namespace (typically the app key).
 *   Falls back to the KV_NAMESPACE environment variable if not provided.
 * @internal Use this function in application singletons, not at module level.
 *   Lazy invocation from request handlers is required — calling at module load
 *   time will attempt a Redis connection during build/test.
 */
export declare function initializeKV(namespace?: string): Promise<KV | null>;
/**
 * Create KV instance synchronously without connection test
 *
 * Use this when you need a KV instance immediately and can tolerate
 * lazy connection establishment. The connection will be established
 * on first use.
 *
 * @param namespace - The KV namespace (typically the app key).
 *   Falls back to the KV_NAMESPACE environment variable if not provided.
 * @internal Use this in application singletons for synchronous initialization
 */
export declare function createKVInstance(namespace?: string): KV | null;
//# sourceMappingURL=instance.d.ts.map