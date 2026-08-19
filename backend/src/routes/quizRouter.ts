import type { NextFunction, Request, Response } from "express";
import { Router } from "express";
import middleware from "../utils/middleware.ts";
import jwt from "../utils/jwt.ts";
import config from "../utils/config.ts";
// import { HttpError } from "../errors/http.ts";

const quizRouter = Router();

quizRouter.get('/', middleware.tokenExtractor, (req: Request, res: Response, next: NextFunction) => {
  try {
    // Dont forget to add async/await into this block of code
    const token = req.get('authorization');

    if (!token) {
      throw new Error('no token found in the request header');
    }

    const payload = jwt.verifyToken(token, config.SECRET);

    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
});

export default quizRouter;