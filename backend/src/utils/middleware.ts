import type { NextFunction, Request, Response } from "express";
import { DatabaseError } from "pg";
// import { DatabaseError } from "pg";

const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof DatabaseError) {
    if (err.code == '23505') {
      res.status(409).json({ error: err.message });
    }
  }

  res.status(500);
  res.render('error', { error: err });
};

export default { errorHandler };