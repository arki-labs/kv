/**
 * The HTTP response cache on Redis: `@arki/http/idempotency` stores a finished response here and
 * replays it when the same `Idempotency-Key` comes again.
 *
 * A redis adapter entry: it takes the `ioredis` client the app already has (the same type `KV`
 * uses for its rate limiter). `@arki/http` is an optional peer.
 *
 * Each key holds one string, `owner \n fingerprint \n response-json`; the third part is empty while the
 * request runs. `begin` is `SET NX`, so two first requests cannot both start. `finish` and
 * `abandon` are small Lua scripts that check the owner and write in one step, so a slow worker
 * whose key was reconciled and reassigned cannot touch the new entry.
 * Pending reservations never expire. `finish` starts replay retention atomically with `SET PX`.
 */
import type { Redis } from 'ioredis';
import type { ResponseCache } from '@arki/http/idempotency';
export type RedisResponseCacheOptions = {
    /** Prefix for every key. Default `idem:`. */
    readonly prefix?: string;
};
/** A response cache on Redis. Pending reservations have no TTL. */
export declare function redisResponseCache(redis: Redis, options?: RedisResponseCacheOptions): ResponseCache;
//# sourceMappingURL=idempotency.d.ts.map