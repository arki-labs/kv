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
export declare const KV_INITIALIZATION_ERROR_CODES: {
    readonly urlRequiredInProduction: 'KV_INIT_E001';
    readonly connectionFailed: 'KV_INIT_E002';
    readonly creationFailed: 'KV_INIT_E003';
};
/** The KV store could not be set up in production. The caller decides whether to end the program. */
export declare class KVInitializationError extends Error {
    readonly code: (typeof KV_INITIALIZATION_ERROR_CODES)[keyof typeof KV_INITIALIZATION_ERROR_CODES];
    readonly remediation: string;
    constructor(args: {
        readonly code: (typeof KV_INITIALIZATION_ERROR_CODES)[keyof typeof KV_INITIALIZATION_ERROR_CODES];
        readonly message: string;
        readonly remediation: string;
        readonly cause?: unknown;
    });
}
//# sourceMappingURL=errors.d.ts.map