import type { NextFunction, Request, Response } from "express";
import { Router } from "express";
import middleware from "../utils/middleware.ts";
import jwt from "../utils/jwt.ts";
import config from "../utils/config.ts";
import type { LoginSuccessObject } from "../types/login.ts";
import quizService from "../service/quizService.ts";

const quizRouter = Router();

quizRouter.get('/', middleware.tokenExtractor, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Dont forget to add async/await into this block of code
    const token = req.get('authorization');

    if (!token) {
      throw new Error('no token found in the request header');
    }

    const loginSuccessObject = jwt.verifyToken(token, config.SECRET) as LoginSuccessObject;

    const quizzes = await quizService.getAllQuizzesByTeacher(loginSuccessObject);

    res.status(200).json(quizzes);
  } catch (error) {
    next(error);
  }
});

export default quizRouter;