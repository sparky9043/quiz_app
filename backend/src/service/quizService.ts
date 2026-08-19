import queries from "../../db/queries.ts";
import type { LoginSuccessObject } from "../types/login.ts";

const getAllQuizzes = async () => {
  const quizzes = await queries.getAllQuizzes();

  return quizzes;
}

const getAllQuizzesByTeacher = async (successObject: LoginSuccessObject) => {
  const quizzesByTeacher = await queries.getAllQuizzesByTeacher(successObject);

  return quizzesByTeacher;
};

export default {
  getAllQuizzes,
  getAllQuizzesByTeacher,
};