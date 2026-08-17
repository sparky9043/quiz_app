export interface BaseUser {
  username: string;
  type: 'teacher' | 'student';
}

export interface UserNoPassword extends BaseUser {
  id: number;
}

export interface NewUserPasswordHashed extends BaseUser {
  password_hash: string;
}

export interface User extends NewUserPasswordHashed {
  password_hash: string;
}

export interface NewUser extends BaseUser {
  password: string;
};