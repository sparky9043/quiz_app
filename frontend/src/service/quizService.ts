import axios from "axios";
import type { Quiz, QuizRequest, QuizWithQuestions } from "../types/quiz";

const quizUrl = '/api/quizzes';

const getQuizzes = async (token: string): Promise<Quiz[]> => {

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

const createNewQuiz = async (quizRequest: QuizRequest, token: string): Promise<Quiz> => {
  const response = await axios
    .post<Quiz>(quizUrl, quizRequest, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

  return response.data;
}

export default {
  getQuizzes,
  getQuizWithQuestions,
  createNewQuiz,
};