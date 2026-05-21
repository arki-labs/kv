/**
 * Debug logging for @arki/kv package
 *
 * Enable debug output by setting the DEBUG environment variable:
 * DEBUG=kv:* - Enable all KV debug logs
 * DEBUG=kv:client - Enable KV client logs only
 * DEBUG=kv:limiter - Enable rate limiter logs only
 * DEBUG=kv:* - Enable all logs
 */
import { createDebug } from '@arki/log/debug';
/**
 * Debug logger for KV client operations
 */
export declare const debugKV: createDebug.Debugger;
/**
 * Debug logger for rate limiting operations
 */
export declare const debugLimiter: createDebug.Debugger;
//# sourceMappingURL=debug.d.ts.map