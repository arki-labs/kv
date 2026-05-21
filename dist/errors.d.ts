import type { IRateLimiterRes } from 'rate-limiter-flexible';
export declare class RateLimitExceededError extends Error {
    readonly limiterResult: IRateLimiterRes;
    constructor(message: string, limiterResult: IRateLimiterRes, cause?: Error);
    getHttpHeaders(points: number): {
        'Retry-After': number;
        'X-RateLimit-Limit': number;
        'X-RateLimit-Remaining': number | undefined;
        'X-RateLimit-Reset': number;
    };
}
//# sourceMappingURL=errors.d.ts.map