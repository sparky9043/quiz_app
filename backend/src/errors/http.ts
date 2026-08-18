// Custom Error HTTP Error classes
export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
};

// Not Found Error with Status Code 404
export class NotFoundError extends HttpError {
  constructor(message = 'not found') {
    super(404, message);
  }
}