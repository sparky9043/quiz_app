export interface BaseUser {
  username: string;
  type: 'teacher' | 'student';
}

export interface UserNoPassword extends BaseUser {
  id: number;
}

export interface User extends UserNoPassword {
  password_hash: string;
}

export interface NewUser extends BaseUser {
  password: string;
};