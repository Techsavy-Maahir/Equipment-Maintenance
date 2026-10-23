export class AppError extends Error {
    constructor(statusCode, message, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.name = "AppError";
    }
}
export class ValidationError extends AppError {
    constructor(details) {
        super(400, "Validation error", details);
        this.name = "ValidationError";
    }
}
export class ConflictError extends AppError {
    constructor(message = "Resource already exists") {
        super(409, message);
        this.name = "ConflictError";
    }
}
export class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(404, message);
        this.name = "NotFoundError";
    }
}
//# sourceMappingURL=errors.js.map