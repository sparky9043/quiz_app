import queries from "../../db/queries.ts";
import type { Quiz, QuizWithQuestions } from "../types/quiz.ts";
import questionService from "./questionService.ts";

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

export default {
  getAllQuizzes,
  getAllQuizzesByTeacherId,
  getQuizWithQuestionsById,
};