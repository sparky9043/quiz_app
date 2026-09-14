import * as z from 'zod';

const quizRequestSchema = z.object({
  teacher_id: z.number(),
  title: z.string()
});

const quizSchema = quizRequestSchema.extend({
  id: z.number(),
  timestamps: z.string(),
});

export { quizRequestSchema, quizSchema };