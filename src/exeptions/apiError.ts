export class ApiError extends Error {
  constructor(public status: number, public message: string, public errors?: Error[]) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static unauthorizedError() {
    return new ApiError(401, 'Not Authorized');
  }


  static badRequest(message: string) {
    return new ApiError(500, message)
  }
}
