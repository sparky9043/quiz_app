import * as z from 'zod';
import { quizSchema } from "../schema/quiz.schema.ts";
import questionSchema from '../schema/question.schema.ts';

export type Quiz = z.infer<typeof quizSchema>;

export type Question = z.infer<typeof questionSchema>;

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