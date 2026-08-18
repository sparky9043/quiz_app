import type { NextFunction, Request, Response } from "express";
import { Router } from "express";
import middleware from "../utils/middleware.ts";

const quizRouter = Router();

quizRouter.get('/', middleware.tokenExtractor, async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.get('authorization');
    console.log(token);
  } catch (error) {
    next(error);
  }
});

export default quizRouter;