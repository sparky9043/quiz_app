import * as z from 'zod';

const UserLoginCredentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const LoginSuccsesObjectSchema = z.object({
  token: z.string(),
  id: z.number(),
  username: z.string(),
  type: z.string(),
  teacher_id: z.number().optional(),
});

export { UserLoginCredentialsSchema, LoginSuccsesObjectSchema };