import axios from "axios";
import type { Quiz } from "../types/quiz";

const getQuizzes = async (token: string) => {
  const quizUrl = '/api/quizzes';

  const response = await axios
    .get<Quiz[]>(
      quizUrl,
      {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      },
    );

  return response;
};

export default { getQuizzes };