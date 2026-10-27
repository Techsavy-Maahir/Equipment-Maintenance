export declare class AppError extends Error {
    statusCode: number;
    details?: Record<string, unknown> | undefined;
    constructor(statusCode: number, message: string, details?: Record<string, unknown> | undefined);
}
export declare class ValidationError extends AppError {
    constructor(details: Record<string, unknown>);
}
export declare class ConflictError extends AppError {
    constructor(message?: string);
}
export declare class NotFoundError extends AppError {
    constructor(message?: string);
}
//# sourceMappingURL=errors.d.ts.map