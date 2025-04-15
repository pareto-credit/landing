export class ServerError extends Error {
    constructor({ code, message, details, statusCode }){
        super();
        this.code = code || 'UNKNOWN_ERROR';
        this.message = message || 'An error has occured';
        this.details = details;
        this.statusCode = statusCode || 500;
    }
}

//# sourceMappingURL=server-error.model.js.map