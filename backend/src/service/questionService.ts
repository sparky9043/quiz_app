import queries from "../../db/queries.ts";
import type { Question } from "../types/quiz.ts";

const getQuestionsByQuizId = async (quizId: number): Promise<Question[]> => {
  const questions = await queries.getQuestionsByQuizId(quizId);

  return questions;
};

export default { getQuestionsByQuizId };