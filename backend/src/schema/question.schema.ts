import * as z from 'zod';

const questionSchema = z.object({
  id: z.number(),
  quiz_id: z.number(), // Points to Quiz
  content: z.string(),
});

export default { questionSchema };