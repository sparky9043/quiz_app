import * as z from 'zod';

const quizRequestSchema = z.object({
  teacher_id: z.number(),
  title: z.string(),
  timestamps: z.string(),
});

const quizSchema = quizRequestSchema.extend({
  id: z.number(),
});

export { quizRequestSchema, quizSchema };