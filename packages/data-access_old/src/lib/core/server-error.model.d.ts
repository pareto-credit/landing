export interface ServerErrorOptions {
    /**
     * Error code
     * @default "UNKNOWN_ERROR"
     */
    code?: string;
    /**
     * Error message
     * @default "An error has occured."
     */
    message?: string;
    /**
     * Useful info about the error occured.
     */
    details?: Record<string, any>;
    /**
     * HTTP Statut code
     * @default 500
     */
    statusCode?: number;
}
export declare class ServerError extends Error {
    code: string;
    message: string;
    details?: Record<string, any>;
    statusCode: number;
    constructor({ code, message, details, statusCode }: ServerErrorOptions);
}
