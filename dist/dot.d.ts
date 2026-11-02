/**
 * DOT adapter for `@arki/kv`.
 *
 * Wraps `KV` construction as a DOT plugin. The plugin's `kv` factory opens a
 * Redis-backed KV client at boot, publishes it as `services.kv`, and closes
 * the client in `dispose` (reverse declaration order). `cache.provides.kv`
 * is the typed handle consumers name in their `needs`.
 *
 * @example
 * ```ts
 * import { defineApp } from '@arki/dot';
 * import { kv } from '@arki/kv/dot';
 *
 * const app = await defineApp('my-app')
 *   // Whole-config thunk: env is read at boot, so the declaration stays
 *   // import-pure (loadable from a bare checkout).
 *   .infra(kv(() => ({ url: env.KV_URL, namespace: 'my-app' })))
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
 * .infra(kv({ namespace: 'app' }))
 * .infra(rename(kv({ namespace: 'sessions' }), { kv: 'sessionsKv' }, 'sessions-kv'))
 * ```
 *
 * Redis optional (dev, tests)? `kv.optional(...)` publishes `kv` as
 * `KV | null` — `null` when no URL is set — instead of failing boot.
 *
 * The `@arki/dot` package is an OPTIONAL peer of `@arki/kv`. Importing
 * this adapter without `@arki/dot` installed will fail at module load —
 * that is intentional: the adapter only makes sense in a DOT app.
 */
import type { Deferred } from '@arki/dot/unit';
import { KV } from './index.js';
/**
 * Stable error codes thrown by the kv plugin. Exported so consumers and
 * coding agents can match against them — never parse the message.
 */
export declare const KV_PLUGIN_ERROR_CODES: {
    /**
     * `kv()` booted without a configured URL: no `url` option and no `KV_URL`.
     *
     * @fix Set `KV_URL`, pass `url`, or use `kv.optional()` for an app that runs without Redis.
     * @verify bun run test -- src/dot.test.ts
     */
    readonly urlNotConfigured: 'ARKI_KV_PLUGIN_E001';
    /**
     * `probe: true` was set and the set, get and delete round trip at boot failed or timed out.
     *
     * @fix Check the URL, the network and the credentials. Raise `probeTimeoutMs` for a slow link.
     * @verify bun run test -- src/dot.test.ts
     */
    readonly probeFailed: 'ARKI_KV_PLUGIN_E002';
};
/**
 * Options for the kv DOT adapter.
 */
export type KvDotOptions = {
    /**
     * Redis/Keyv URL. Use `rediss://` for TLS. If omitted, the plugin reads
     * `KV_URL` from `process.env` (matching the `createKV` factory behaviour).
     * To defer an env read to boot, prefer thunking the WHOLE options object
     * — `kv(() => ({ url: env.REDIS_URL }))` — over this per-field thunk
     * (kept for backwards compatibility).
     */
    readonly url?: string | (() => string | undefined);
    /** Optional namespace prefix for all keys (defaults to no prefix). */
    readonly namespace?: string;
    /** Optional prefix for rate-limit keys (default `rl`). */
    readonly rateLimitPrefix?: string;
    /**
     * Skip TLS certificate checks for a `rediss://` URL (default `false`: the certificate is verified).
     * Turn it on only for a server with a self-signed certificate that you trust.
     */
    readonly allowUnverifiedTls?: boolean;
    /**
     * Prove the connection at boot with a set/get/delete round trip (default
     * `false`). A bad or unreachable URL then fails boot instead of the first
     * request. The client is closed before the error is thrown.
     */
    readonly probe?: boolean;
    /**
     * How long the probe may take, in milliseconds (default `5000`). An
     * unreachable Redis never answers — the client keeps reconnecting — so
     * without this limit a bad URL would hang boot instead of failing it.
     */
    readonly probeTimeoutMs?: number;
    /** How long one command may take before it returns `KvUnavailable`, in milliseconds (default `5000`). */
    readonly commandTimeoutMs?: number;
};
/** Services published by the kv adapter. */
export type KvServices = {
    readonly kv: KV;
};
/**
 * Build a DOT plugin that opens a `KV` client and publishes it as a service.
 *
 * Without a URL, boot fails with `ARKI_KV_PLUGIN_E001`. For an app that runs
 * without Redis (dev, tests), use {@link kv.optional} instead.
 *
 * @param options - Connection + naming options, or a thunk producing them.
 *   Thunk the whole object to keep the declaration import-pure — env is
 *   then read at boot, not at module load:
 *   `kv(() => ({ url: env.REDIS_URL, namespace: 'my-app' }))`.
 * @returns A plugin that publishes `services.kv`.
 */
export declare function kv(options?: Deferred<KvDotOptions>): Omit<import("@arki/dot/unit").Unit<import("@arki/dot/unit").WireNeeds<import("@arki/dot/unit").EmptyShape>, import("@arki/dot/unit").ProvidedValues<{
    kv: KV | Promise<KV>;
}>, import("@arki/dot/unit").EmptyShape, "kv", import("@arki/dot/unit").EmptyOwnership, import("@arki/dot/unit").EmptyPhases>, "factories" | "hooks" | "logging"> & import("@arki/dot/unit").LoggingSlot<import("@arki/dot/unit").DotLoggingHandle<undefined>> & import("@arki/dot/unit").FactoryContract<import("@arki/dot/unit").ProvidedValues<{
    kv: KV | Promise<KV>;
}>> & {
    readonly factories: {
        readonly kv: (ctx: never) => KV | Promise<KV>;
    };
    readonly hooks: import("@arki/dot/unit").PhaseHooks<never, {
        readonly configure: undefined;
        readonly start: undefined;
        readonly stop: undefined;
        readonly dispose: undefined;
    }, import("@arki/dot/unit").DotConfigureContext> & import("@arki/dot/unit").BootSlot<import("@arki/dot/unit").CtxOf<import("@arki/dot/unit").EmptyShape> & import("@arki/dot/unit").ProvidedValues<{
        kv: KV | Promise<KV>;
    }> & import("@arki/dot/unit").KernelCtx, undefined>;
} & import("@arki/dot/unit").InfraRole;
export declare namespace kv {
    var optional: (options?: Deferred<KvDotOptions>) => Omit<import("@arki/dot/unit").Unit<import("@arki/dot/unit").WireNeeds<import("@arki/dot/unit").EmptyShape>, import("@arki/dot/unit").ProvidedValues<{
        kv: KV | Promise<KV> | null;
    }>, import("@arki/dot/unit").EmptyShape, "kv", import("@arki/dot/unit").EmptyOwnership, import("@arki/dot/unit").EmptyPhases>, "factories" | "hooks" | "logging"> & import("@arki/dot/unit").LoggingSlot<import("@arki/dot/unit").DotLoggingHandle<undefined>> & import("@arki/dot/unit").FactoryContract<import("@arki/dot/unit").ProvidedValues<{
        kv: KV | Promise<KV> | null;
    }>> & {
        readonly factories: {
            readonly kv: (ctx: never) => KV | Promise<KV> | null;
        };
        readonly hooks: import("@arki/dot/unit").PhaseHooks<never, {
            readonly configure: undefined;
            readonly start: undefined;
            readonly stop: undefined;
            readonly dispose: undefined;
        }, import("@arki/dot/unit").DotConfigureContext> & import("@arki/dot/unit").BootSlot<import("@arki/dot/unit").CtxOf<import("@arki/dot/unit").EmptyShape> & import("@arki/dot/unit").ProvidedValues<{
            kv: KV | Promise<KV> | null;
        }> & import("@arki/dot/unit").KernelCtx, undefined>;
    } & import("@arki/dot/unit").InfraRole;
}
//# sourceMappingURL=dot.d.ts.map