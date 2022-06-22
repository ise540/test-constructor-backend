import type { ValidationError } from "express-validator";

export class ApiError extends Error {
  constructor(public status: number, public message: string, public errors?: ValidationError[]) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static unauthorizedError() {
    return new ApiError(401, 'Not Authorized');
  }

  static badRequest(message: string,  errors?: ValidationError[]) {
    return new ApiError(500, message, errors)
  }

  static notFound(message: string) {
    return new ApiError(404, `${message} not Found`)
  }
}
