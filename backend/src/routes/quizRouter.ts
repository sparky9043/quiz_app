import type { NextFunction, Request, Response } from "express";
import { Router } from "express";
import middleware from "../utils/middleware.ts";
import jwt from "../utils/jwt.ts";
import config from "../utils/config.ts";
import type { LoginSuccessObject } from "../types/login.ts";
import quizService from "../service/quizService.ts";
import { JWTVerifiedTokenObject } from "../schema/user.schema.ts";
// import { LoginSuccsesObjectSchema } from "../schema/user.schema.ts";

const quizRouter = Router();

// Get all quizzes if jsonwebtoken is valid
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

// Get one quiz with all of its questions if jsonwebtoken is valid
quizRouter.get('/:id', middleware.tokenExtractor, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.get('authorization');

    if (!token) {
      throw new Error('no token found in the request handler');
    }

    const quizId = Number(req.params.id);

    const jwtVerifiedTokenObject = jwt.verifyToken(token, config.SECRET);

    const jwtVerifiedTokenObjectParsed = JWTVerifiedTokenObject.parse(jwtVerifiedTokenObject);


    let teacherId;
    if (jwtVerifiedTokenObjectParsed.type == 'teacher') {
      teacherId = jwtVerifiedTokenObjectParsed.id;
    } else if (jwtVerifiedTokenObjectParsed.type == 'student') {
      teacherId = jwtVerifiedTokenObjectParsed.teacher_id;
    }

    if (!teacherId) {
      throw new Error('No teacher Id found');
    }

    const quizWithQuestions = await quizService.getQuizWithQuestionsById(quizId, teacherId);

    res.status(200).json(quizWithQuestions);

  } catch (error) {
    next(error);
  }
});

// Create Quiz (No Questions; to be handled later once a quiz is created successfully)
quizRouter.post('/', middleware.tokenExtractor, (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.get('authorization'));
    res.status(201).json({ succes: 'success' });
  } catch (error) {
    next(error);
  }
});


export default quizRouter;