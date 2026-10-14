export class RateLimitExceededError extends Error {
    limiterResult;
    constructor(message, limiterResult, cause) {
        super(message);
        this.name = 'RateLimitExceededError';
        this.limiterResult = limiterResult;
        this.cause = cause;
    }
    getHttpHeaders(points) {
        return {
            'Retry-After': (this.limiterResult.msBeforeNext ?? 2500) / 1000,
            'X-RateLimit-Limit': points,
            'X-RateLimit-Remaining': this.limiterResult.remainingPoints,
            'X-RateLimit-Reset': Math.ceil((Date.now() + (this.limiterResult.msBeforeNext ?? 2500)) / 1000),
        };
    }
}
export const KV_INITIALIZATION_ERROR_CODES = {
    urlRequiredInProduction: 'KV_INIT_E001',
    connectionFailed: 'KV_INIT_E002',
    creationFailed: 'KV_INIT_E003',
};
/** The KV store could not be set up in production. The caller decides whether to end the program. */
export class KVInitializationError extends Error {
    code;
    remediation;
    constructor(args) {
        super(args.message, { cause: args.cause });
        this.name = 'KVInitializationError';
        this.code = args.code;
        this.remediation = args.remediation;
    }
}
//# sourceMappingURL=errors.js.map