/** Run one KV command inside a `kv.<command>` span and count it in `kv.commands` by outcome. */
export declare function observeKv<T>(command: string, execute: () => Promise<T>): Promise<T>;
//# sourceMappingURL=telemetry.d.ts.map