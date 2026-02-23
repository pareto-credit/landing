export type SharedLogFn = {
    <T extends object>(obj: T, msg?: string, ...args: any[]): void;
    (obj: unknown, msg?: string, ...args: any[]): void;
    (msg: string, ...args: any[]): void;
};
export interface SharedLogger {
    fatal?: SharedLogFn;
    error?: SharedLogFn;
    warn?: SharedLogFn;
    info?: SharedLogFn;
    debug?: SharedLogFn;
    trace?: SharedLogFn;
}
