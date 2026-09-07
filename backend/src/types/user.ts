import * as z from 'zod';
import { UserLoginCredentialsSchema } from '../schema/user.schema.ts';

export interface BaseUser {
  username: string;
  type: 'teacher' | 'student';
}

export interface UserNoPassword extends BaseUser {
  id: number;
  teacher_id?: number;
}

export interface NewUserPasswordHashed extends BaseUser {
  password_hash: string;
  teacher_id?: number;
}

export interface User extends NewUserPasswordHashed {
  id: number;
  password_hash: string;
}

export interface NewUserRequest extends BaseUser {
  password: string;
  teacher_id?: number;
};

export type UserLoginCredentials = z.infer<typeof UserLoginCredentialsSchema>;