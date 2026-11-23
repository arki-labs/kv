/**
 * Run one KV command inside a `kv.<command>` span and count it in `kv.commands` by outcome. A returned
 * failure sets `failure.code`, and error status only when it is a fault (`isFault`: status 500 or
 * higher); a throw is recorded, marks the span failed and is rethrown unchanged.
 */
export declare function observeKv<T>(command: string, execute: () => Promise<T>): Promise<T>;
//# sourceMappingURL=telemetry.d.ts.map