import axios from "axios";
import type { Quiz } from "../types/quiz";

const getQuizzes = async (token: string): Promise<Quiz[]> => {
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
  
  if (!response.data) {
    throw new Error('There was an error fetching quizzes');
  }

  return response.data;
};

export default { getQuizzes };