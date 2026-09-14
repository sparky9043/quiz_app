import * as z from 'zod';

const quizSchema = z.object({
  id: z.number(),
  teacher_id: z.number(),
  title: z.string(),
  timestamps: z.string(),
});

export { quizSchema };