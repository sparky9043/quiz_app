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
    const token = req.get('authorization');

    if (!token) {
      throw new Error('no token found in the request header');
    }

    const loginSuccessObject = jwt.verifyToken(token, config.SECRET) as LoginSuccessObject;

    let teacherId;

    // Role based condition
    
    // Use user.id directly if teacher; Use user.teacher_id if student
    if (loginSuccessObject.type === 'teacher') {
      teacherId = loginSuccessObject.id;
    } else if (loginSuccessObject.type === 'student') {
      teacherId = loginSuccessObject.teacher_id;
    }

    if (!teacherId) {
      throw new Error('No teacher Id found');
    }

    const quizzes = await quizService.getAllQuizzesByTeacherId(teacherId);

    res.status(200).json(quizzes);
  } catch (error) {
    next(error);
  }
});

quizRouter.get('/:id', middleware.tokenExtractor, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.get('authorization');

    if (!token) {
      throw new Error('no token found in the request handler');
    }

    const quizId = Number(req.params.id);

    const loginSuccessObject = jwt.verifyToken(token, config.SECRET) as LoginSuccessObject;

    let teacherId;
    if (loginSuccessObject.type == 'teacher') {
      teacherId = loginSuccessObject.id;
    } else if (loginSuccessObject.type == 'teacher') {
      teacherId = loginSuccessObject.teacher_id;
    }

    if (!teacherId) {
      throw new Error('No teacher Id found');
    }

    console.log(quizId, teacherId);

    res.status(200).json({ success: 'success' });

  } catch (error) {
    next(error);
  }
});

export default quizRouter;