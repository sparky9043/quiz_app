import type { NextFunction, Request, Response } from "express";
import { Router } from "express";
import middleware from "../utils/middleware.ts";

const quizRouter = Router();

quizRouter.get('/', middleware.tokenExtractor, (req: Request, _res: Response, next: NextFunction) => {
  try {
    // Dont forget to add async/await into this block of code
    const token = req.get('authorization');
    console.log(token);
  } catch (error) {
    next(error);
  }
});

export default quizRouter;