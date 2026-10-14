/**
 * Debug logging for @arki/kv package
 *
 * Enable debug output by setting the DEBUG environment variable:
 * DEBUG=kv:* - Enable all KV debug logs
 * DEBUG=kv:client - Enable KV client logs only
 * DEBUG=kv:limiter - Enable rate limiter logs only
 * DEBUG=kv:* - Enable all logs
 */
/**
 * Debug logger for KV client operations
 */
export declare const debugKV: import("@arki/log").Logger;
/**
 * Debug logger for rate limiting operations
 */
export declare const debugLimiter: import("@arki/log").Logger;
//# sourceMappingURL=debug.d.ts.map