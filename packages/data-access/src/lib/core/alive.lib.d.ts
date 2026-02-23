export interface KeepAliveOptions {
    /**
     * milliseconds
     *
     * @default 1000
     */
    minDelay?: number;
    /**
     * milliseconds
     *
     * @default Infinity
     */
    maxDelay?: number;
    /**
     * Reset attempts number delay (milliseconds).
     *
     * @default 30000
     */
    resetAfter?: number;
    /**
     * Abort signal.
     */
    signal?: AbortSignal;
    /**
     * Exit handler.
     */
    onExit?: (err: any) => any;
}
/**
 * Keep alive an async function with exponential retry.
 */
export declare function keepAlive(fn: () => Promise<any>, options?: KeepAliveOptions): () => void;
