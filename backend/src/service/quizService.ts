import queries from "../../db/queries.ts";
import type { Quiz } from "../types/quiz.ts";

const getAllQuizzes = async () => {
  const quizzes = await queries.getAllQuizzes();

  return quizzes;
};

const getAllQuizzesByTeacherId = async (teacherId: number): Promise<Quiz[]> => {
  const quizzesByTeacher = await queries.getAllQuizzesByTeacherId(teacherId);

  return quizzesByTeacher;
};

const getOneQuizById = async(quizId: number, teacherId: number): Promise<Quiz> => {
  const quiz = await queries.getOneQuizById(quizId, teacherId);

  return quiz;
};

export default {
  getAllQuizzes,
  getAllQuizzesByTeacherId,
  getOneQuizById,
};