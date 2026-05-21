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
//# sourceMappingURL=errors.js.map