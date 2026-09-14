import * as z from 'zod';
import { quizSchema } from "../schema/quiz.schema.ts";

export type Quiz = z.infer<typeof quizSchema>;

export interface Question {
  id: number;
  quiz_id: number; // points to Quiz
  content: string;
}

export interface QuizWithQuestions extends Quiz {
  questions: Question[],
}

export interface OptionNoAnswer {
  id: number;
  question_id: number;
  content: string;  
}

export interface Option extends OptionNoAnswer {
  is_correct: boolean;
}