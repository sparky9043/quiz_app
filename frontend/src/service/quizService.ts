import axios from "axios";
import type { Quiz, QuizWithQuestions } from "../types/quiz";

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

const getQuizWithQuestions = async (quizId: string | number, token: string): Promise<QuizWithQuestions> => {
  const quizUrl = '/api/quizzes';

  const response = await axios
    .get<QuizWithQuestions>(
      `${quizUrl}/${quizId}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      },
    );

  if (!response.data) {
    throw new Error('There was an error fetching quiz with questiosn');
  }

  return response.data;
};  

export default { getQuizzes, getQuizWithQuestions };