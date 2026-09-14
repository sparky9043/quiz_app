import queries from "../../db/queries.ts";
import type { Quiz, QuizWithQuestions } from "../types/quiz.ts";
import questionService from "./questionService.ts";

// GET Quizzes
const getAllQuizzes = async () => {
  const quizzes = await queries.getAllQuizzes();

  return quizzes;
};

const getAllQuizzesByTeacherId = async (teacherId: number): Promise<Quiz[]> => {
  const quizzesByTeacher = await queries.getAllQuizzesByTeacherId(teacherId);

  return quizzesByTeacher;
};

const getQuizWithQuestionsById = async(quizId: number, teacherId: number): Promise<QuizWithQuestions> => {
  const quiz = await queries.getOneQuizById(quizId, teacherId);

  const questions = await questionService.getQuestionsByQuizId(quizId);

  const quizWithQuestions = {
    ...quiz,
    questions,
  };

  return quizWithQuestions;
};

// POST Quizzes
const createQuizByTeacherId = async (teacherId: number, quizTitle: string): Promise<Quiz> => {
  const quiz = await queries.createNewQuiz(teacherId, quizTitle);

  return quiz;
};

export default {
  getAllQuizzes,
  getAllQuizzesByTeacherId,
  getQuizWithQuestionsById,
  createQuizByTeacherId,
};