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

export interface NewUser extends BaseUser {
  password: string;
  teacher_id?: number;
};

export interface UserLoginCredentials {
  username: string;
  password: string;
};