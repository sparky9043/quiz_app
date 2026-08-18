import type { NextFunction, Request, Response } from "express";
import { DatabaseError } from "pg";
import { HttpError } from "../errors/http.ts";
// import { DatabaseError } from "pg";

const getErrorInfoJson = (err: DatabaseError) => {
  return {
    code: err.code,
    success: false,
    message: err.message,
    errors: {
      detail: err.detail,
    },
  }
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
        .json(getErrorInfoJson(err));
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
      .json({ status: err.status, error: err.message });
  } else {
    next(err);
  }
};

const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.log('inside errorHandler');
  if (err instanceof Error) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  databaseErrorHandler,
  httpErrorHandler,
  errorHandler,
};