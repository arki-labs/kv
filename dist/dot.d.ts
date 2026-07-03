/**
 * DOT adapter for `@arki/kv`.
 *
 * Wraps `KV` construction as a DOT pip. The pip opens a Redis-backed
 * KV client in `boot`, publishes it as `services.kv`, and closes the client
 * in `dispose` (reverse declaration order).
 *
 * @example
 * ```ts
 * import { defineApp } from '@arki/dot';
 * import { kv } from '@arki/kv/dot';
 *
 * const app = await defineApp('my-app')
 *   .use(kv({ url: process.env.KV_URL!, namespace: 'my-app' }))
 *   .boot();
 *
 * await app.services.kv.set('hello', 'world', 60);
 * await app.dispose();
 * ```
 *
 * To mount a second KV scope in the same app, rename the published wire
 * key at the mount site:
 *
 * ```ts
 * import { rename } from '@arki/dot';
 *
 * .use(kv({ namespace: 'app' }))
 * .use(rename(kv({ namespace: 'sessions' }), { kv: 'sessionsKv' }, 'sessions-kv'))
 * ```
 *
 * The `@arki/dot` package is an OPTIONAL peer of `@arki/kv`. Importing
 * this adapter without `@arki/dot` installed will fail at module load —
 * that is intentional: the adapter only makes sense in a DOT app.
 */
import { type EmptyShape, type Pip } from '@arki/dot/pip';
import { KV } from './index.js';
/**
 * Stable error codes thrown by the kv pip. Exported so consumers and
 * coding agents can match against them — never parse the message.
 */
export declare const KV_PIP_ERROR_CODES: {
    /** boot was called without a configured URL. */
    readonly urlNotConfigured: "KV_PIP_E001";
};
/**
 * Options for the kv DOT adapter.
 */
export type KvDotOptions = {
    /**
     * Redis/Keyv URL. Use `rediss://` for TLS. If omitted, the pip reads
     * `KV_URL` from `process.env` (matching the `createKV` factory behaviour).
     */
    readonly url?: string;
    /** Optional namespace prefix for all keys (defaults to no prefix). */
    readonly namespace?: string;
    /** Optional prefix for rate-limit keys (default `rl`). */
    readonly rateLimitPrefix?: string;
};
/** Services published by the kv adapter. */
export type KvServices = {
    readonly kv: KV;
};
/**
 * Build a DOT pip that opens a `KV` client and publishes it as a service.
 *
 * @param options - Connection + naming options.
 * @returns A pip that publishes `services.kv`.
 */
export declare function kv(options?: KvDotOptions): Pip<EmptyShape, KvServices>;
//# sourceMappingURL=dot.d.ts.map