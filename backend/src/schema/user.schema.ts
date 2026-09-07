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

const JWTVerifiedTokenObject = z.object({
  id: z.number(),
  username: z.string(),
  type: z.string(),
  teacher_id: z.number().optional(),
  iat: z.number(),
  exp: z.number(),
});

export { UserLoginCredentialsSchema, LoginSuccsesObjectSchema, JWTVerifiedTokenObject };