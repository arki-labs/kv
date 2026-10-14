export declare const env: Readonly<{
    NODE_ENV: "development" | "production" | "test";
    KV_URL?: string | undefined;
    KV_NAMESPACE?: string | undefined;
    REDIS_HOST?: string | undefined;
    REDIS_PORT: number;
    REDIS_USERNAME?: string | undefined;
    REDIS_PASSWORD?: string | undefined;
    REDIS_DB: number;
    REDIS_TLS: boolean;
    UPSTASH_REDIS_REST_URL?: string | undefined;
    UPSTASH_REDIS_REST_TOKEN?: string | undefined;
    RATE_LIMIT_REDIS_URL?: string | undefined;
    RATE_LIMIT_PREFIX: string;
    CACHE_TTL_DEFAULT: number;
    CACHE_TTL_LONG: number;
    CACHE_TTL_SHORT: number;
}>;
//# sourceMappingURL=env.d.ts.map