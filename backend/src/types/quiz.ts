export interface Quiz {
  id: number;
  teacher_id: number;
  title: string;
  timestamp: string;
}

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