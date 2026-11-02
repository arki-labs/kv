/** A Redis-backed key-value store and rate-limiter client (`KV`) with an in-memory fallback. */
import type { IRateLimiterOptions, RateLimiterAbstract } from 'rate-limiter-flexible';
import type { SchemaOutput, StandardSchemaV1 } from '@arki/schema';
import type { Failure } from '@arki/failure';
import { KvCloseFailed } from './errors.js';
/** Options for {@link KV} beyond the URL, namespace and rate limit prefix. */
export type KvOptions = {
    /**
     * Skip TLS certificate checks for a `rediss://` URL (default `false`: the certificate is verified).
     * Turn it on only for a server with a self-signed certificate that you trust, such as a local test Redis.
     */
    readonly allowUnverifiedTls?: boolean;
    /**
     * How long one command may take before it returns {@link KvUnavailable}, in milliseconds (default `5000`).
     * A Redis that is down never answers (the client keeps reconnecting), so without this limit a call would wait for ever.
     */
    readonly commandTimeoutMs?: number;
};
/** Options for one command. */
export type KvCallOptions = {
    /** Aborting the signal ends the wait with {@link KvCancelled}. A write that was already sent may still land. */
    readonly signal?: AbortSignal;
};
export declare class KV {
    #private;
    private readonly namespace?;
    private readonly rateLimitPrefix;
    constructor(redisUrl: string, namespace?: string | undefined, // Keyv namespace
    rateLimitPrefix?: string, // Prefix for rate limiter keys
    options?: KvOptions);
    /**
     * Read `key` and check it against `schema` (any Standard Schema, zod by default). Returns the parsed
     * value, `undefined` for a missing key, {@link KvValueInvalid} when the stored value has the wrong shape,
     * or {@link KvUnavailable} / {@link KvCancelled}.
     */
    get<Schema extends StandardSchemaV1>(key: string, schema: Schema, options?: KvCallOptions): Promise<Failure | SchemaOutput<Schema> | undefined>;
    /** Write `value` (anything JSON can hold). With `expirationSeconds` the key expires after that many seconds. */
    set(key: string, value: unknown, expirationSeconds?: number, options?: KvCallOptions): Promise<boolean | Failure<"kv.cancelled", {
        command: string;
    }> | Failure<"kv.unavailable", {
        command: string;
        reason: string;
    }>>;
    /**
     * Write `value` only if `key` is absent, in one atomic Redis `SET NX EX`. The key and the stored
     * format are the ones {@link KV.set} uses, so {@link KV.get} reads the value back.
     */
    setIfNotExists(key: string, value: unknown, expirationSeconds: number, options?: KvCallOptions): Promise<boolean | Failure<"kv.cancelled", {
        command: string;
    }> | Failure<"kv.unavailable", {
        command: string;
        reason: string;
    }>>;
    /** Write every pair; with `expirationSeconds`, each pair expires after that many seconds. */
    mset(keyValuePairs: readonly (readonly [string, unknown])[], expirationSeconds?: number, options?: KvCallOptions): Promise<void | Failure<"kv.cancelled", {
        command: string;
    }> | Failure<"kv.unavailable", {
        command: string;
        reason: string;
    }>>;
    /**
     * Read several keys and check each stored value against `schema`. Missing keys are `undefined`.
     * The first value with the wrong shape fails the whole call with {@link KvValueInvalid}.
     */
    mget<Schema extends StandardSchemaV1>(keys: readonly string[], schema: Schema, options?: KvCallOptions): Promise<(SchemaOutput<Schema> | undefined)[] | Failure>;
    exists(key: string, options?: KvCallOptions): Promise<boolean | Failure<"kv.cancelled", {
        command: string;
    }> | Failure<"kv.unavailable", {
        command: string;
        reason: string;
    }>>;
    delete(key: string, options?: KvCallOptions): Promise<boolean | Failure<"kv.cancelled", {
        command: string;
    }> | Failure<"kv.unavailable", {
        command: string;
        reason: string;
    }>>;
    deleteMany(keys: readonly string[], options?: KvCallOptions): Promise<boolean | Failure<"kv.cancelled", {
        command: string;
    }> | Failure<"kv.unavailable", {
        command: string;
        reason: string;
    }>>;
    clear(options?: KvCallOptions): Promise<void | Failure<"kv.cancelled", {
        command: string;
    }> | Failure<"kv.unavailable", {
        command: string;
        reason: string;
    }>>;
    /** Publish `message` on `channel`. Returns how many subscribers received it. */
    publish(channel: string, message: string, options?: KvCallOptions): Promise<number | Failure<"kv.cancelled", {
        command: string;
    }> | Failure<"kv.unavailable", {
        command: string;
        reason: string;
    }>>;
    /**
     * The ids of rate limiters that count in this process only, because Redis was not ready when they
     * were made. Their limits are not shared with other replicas. A limiter leaves this list when
     * `getRateLimiter` rebuilds it on Redis after the connection is ready.
     */
    get degradedRateLimiters(): readonly string[];
    /**
     * Gets or creates a RateLimiter instance with the specified options.
     *
     * @param id A unique identifier for this rate limiter configuration (e.g., 'login', 'api_global').
     * @param options Configuration options for the rate limiter (points, duration, etc.).
     *                See `rate-limiter-flexible` documentation for details.
     *                Defaults typically include `points` and `duration`.
     * @returns A RateLimiterAbstract instance ready to use (.consume, .get, etc.).
     *          While Redis is not ready this is a per-process `RateLimiterMemory`: a warning is logged,
     *          the id appears in {@link KV.degradedRateLimiters}, and the next call after Redis becomes
     *          ready returns a Redis-backed limiter instead.
     */
    getRateLimiter(id: string, options: Partial<IRateLimiterOptions>): RateLimiterAbstract;
    /**
     * Disconnects both Keyv and the Rate Limiter Redis client. Both disconnects are tried; a returned
     * {@link KvCloseFailed} names the first one that failed. `undefined` means both closed.
     */
    close(): Promise<KvCloseFailed | undefined>;
}
/** What `getRateLimiter(...).consume()` rejects with when the limit is hit; check it with `instanceof`. */
export { RateLimiterRes } from 'rate-limiter-flexible';
export { KvCancelled, KvCloseFailed, KvUnavailable, KvValueInvalid } from './errors.js';
export { createKV, createRateLimitKV } from './factory.js';
//# sourceMappingURL=index.d.ts.map