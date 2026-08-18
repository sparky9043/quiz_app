// Custom Error HTTP Error classes
export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// Validation Error with status code 400
export class ValidationError extends HttpError {
  constructor(message = 'please fill out the form correctly') {
    super(400, message);
  }
}

// Not Found Error with Status Code 404
export class NotFoundError extends HttpError {
  constructor(message = 'not found') {
    super(404, message);
  }
}

// Unauthorized Error with Status Code 401
export class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized Action') {
    super(401, message);
  }
}