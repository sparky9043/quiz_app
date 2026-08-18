import type { NextFunction, Request, Response } from "express";
// import { DatabaseError } from "pg";

const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500);
  res.render('error', { error: err });
};

export default { errorHandler };