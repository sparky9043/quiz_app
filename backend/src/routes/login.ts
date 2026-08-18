import type { NextFunction, Request, Response } from "express";
import { Router } from "express";

const loginRouter = Router();

loginRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req, res);
    res.status(201).json({ status: 'success' });
  } catch (error) {
    next(error);
  }
});

export default loginRouter;