import type { IRateLimiterOptions, RateLimiterAbstract } from 'rate-limiter-flexible';
export declare class KV {
    #private;
    private readonly namespace?;
    private readonly rateLimitPrefix;
    constructor(redisUrl: string, namespace?: string | undefined, // Keyv namespace
    rateLimitPrefix?: string);
    get<T = unknown>(key: string): Promise<T | undefined>;
    set<T = unknown>(key: string, value: T, expirationSeconds?: number): Promise<boolean>;
    setIfNotExists<T = unknown>(key: string, value: T, expirationSeconds: number): Promise<boolean>;
    mset<T = unknown>(keyValuePairs: [string, T][], _expirationSeconds?: number): Promise<void>;
    mget<T = unknown>(keys: string[]): Promise<(T | undefined)[]>;
    exists(key: string): Promise<boolean>;
    delete(key: string): Promise<boolean>;
    deleteMany(keys: string[]): Promise<boolean>;
    clear(): Promise<void>;
    publish(channel: string, message: string): Promise<number>;
    /**
     * Gets or creates a RateLimiter instance with the specified options.
     *
     * @param id A unique identifier for this rate limiter configuration (e.g., 'login', 'api_global').
     * @param options Configuration options for the rate limiter (points, duration, etc.).
     *                See `rate-limiter-flexible` documentation for details.
     *                Defaults typically include `points` and `duration`.
     * @returns A RateLimiterAbstract instance ready to use (.consume, .get, etc.).
     *          Returns a RateLimiterMemory instance if Redis client is not ready.
     */
    getRateLimiter(id: string, options: Partial<IRateLimiterOptions>): RateLimiterAbstract;
    /**
     * Disconnects both Keyv and the Rate Limiter Redis client.
     */
    close(): Promise<void>;
}
export { createKV, createRateLimitKV } from './factory.js';
//# sourceMappingURL=index.d.ts.map