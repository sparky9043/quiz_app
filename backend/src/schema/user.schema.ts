import * as z from 'zod';

const UserLoginCredentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export { UserLoginCredentialsSchema };