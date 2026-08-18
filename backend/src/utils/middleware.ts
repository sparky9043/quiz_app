import type { NextFunction, Request, Response } from "express";
import { DatabaseError } from "pg";
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

const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.log('code reached');
  if (err instanceof Error) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  databaseErrorHandler,
  errorHandler,
};