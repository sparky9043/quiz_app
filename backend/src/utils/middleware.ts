import type { NextFunction, Request, Response } from "express";
import { DatabaseError } from "pg";
import { HttpError, ValidationError } from "../errors/http.ts";
import type { DatabaseErrorDetails, HttpErrorDetails } from "../types/status.ts";

const tokenExtractor = (req: Request, _res: Response, next: NextFunction) => {
  const tokenBearer = req.get('authorization');

  if (!tokenBearer || !tokenBearer.startsWith("Bearer ")) {
    throw new ValidationError('Token invalid or missing Bearer in the header');
  }

  const extractedToken = tokenBearer.replace('Bearer ', '');

  req.headers['authorization'] = extractedToken;

  next();
};

const getDatabaseErrorDetails = (err: DatabaseError): DatabaseErrorDetails => {
  return {
    code: err.code!,
    success: false,
    message: err.message,
    errors: {
      detail: err.detail,
    },
  };
};

const getHttpErrorDetails = (err: HttpError): HttpErrorDetails => {
  return {
    status: err.status,
    message: err.message,
  };
};

const databaseErrorHandler = (err: unknown, _req: Request, res: Response, next: NextFunction) => {
  console.log('inside databaseErrorhandler');
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof DatabaseError) {
    if (err.code == '23505') {
      res
        .status(409)
        .json(getDatabaseErrorDetails(err));
    }
  } else {
    next(err);
  }
};

const httpErrorHandler = (err: unknown, _req: Request, res: Response, next: NextFunction) => {
  console.log('inside httpErrorHandler');
  if (err instanceof HttpError) {
    res
      .status(err.status)
      .json(getHttpErrorDetails(err));
  } else {
    next(err);
  }
};

const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.log('inside errorHandler');
  console.error('An unexpected error occurred:', err);

  if (err instanceof Error) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

export default {
  tokenExtractor,
  databaseErrorHandler,
  httpErrorHandler,
  errorHandler,
};