export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class ValidationError extends AppError {
  constructor(details: Record<string, unknown>) {
    super(400, "Validation error", details);
    this.name = "ValidationError";
  }
}

export class ConflictError extends AppError {
  constructor(message: string = "Resource already exists") {
    super(409, message);
    this.name = "ConflictError";
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(404, message);
    this.name = "NotFoundError";
  }
}