import type { NextFunction, Request, Response } from "express";
import { Router } from "express";
import middleware from "../utils/middleware.ts";
import jwt from "../utils/jwt.ts";
import config from "../utils/config.ts";
import quizService from "../service/quizService.ts";
import type { QuizRequest, Quiz } from "../types/quiz.ts";
import { quizRequestSchema } from "../schema/quiz.schema.ts";

const quizRouter = Router();

// Get all quizzes if jsonwebtoken is valid
quizRouter.get('/', middleware.tokenExtractor, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.get('authorization');

    if (!token) {
      throw new Error('no token found in the request header');
    }

    const jwtVerifiedToken = jwt.verifyToken(token, config.SECRET);

    let teacherId;

    // Role based condition
    
    // Use user.id directly if teacher; Use user.teacher_id if student
    if (jwtVerifiedToken.type === 'teacher') {
      teacherId = jwtVerifiedToken.id;
    } else if (jwtVerifiedToken.type === 'student') {
      teacherId = jwtVerifiedToken.teacher_id;
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

    const jwtVerifiedToken = jwt.verifyToken(token, config.SECRET);

    let teacherId;
    if (jwtVerifiedToken.type == 'teacher') {
      teacherId = jwtVerifiedToken.id;
    } else if (jwtVerifiedToken.type == 'student') {
      teacherId = jwtVerifiedToken.teacher_id;
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
quizRouter.post('/', middleware.tokenExtractor, async (req: Request<unknown, unknown, QuizRequest>, res: Response<Quiz>, next: NextFunction) => {
  try {
    const token = req.get('authorization');

    if (!token) {
      throw new Error('no token found in the request handler');
    }

    const jwtVerifiedToken = jwt.verifyToken(token, config.SECRET);

    const userType = jwtVerifiedToken.type;

    if (userType != 'teacher') {
      throw new Error('Only teachers are allowed to create tests');
    }

    const quizRequest = quizRequestSchema.parse(req.body);

    const teacherId = Number(quizRequest.teacher_id);
    const savedQuiz = await quizService.createQuizByTeacherId(teacherId, quizRequest.title);

    res.status(201).json(savedQuiz);
  } catch (error) {
    next(error);
  }
});


export default quizRouter;