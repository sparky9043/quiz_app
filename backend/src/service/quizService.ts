import queries from "../../db/queries.ts";

const getAllQuizzes = async () => {
  const quizzes = await queries.getAllQuizzes();

  return quizzes;
};

const getAllQuizzesByTeacherId = async (teacherId: number) => {
  const quizzesByTeacher = await queries.getAllQuizzesByTeacherId(teacherId);

  return quizzesByTeacher;
};

export default {
  getAllQuizzes,
  getAllQuizzesByTeacherId,
};