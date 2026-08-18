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
  id: number;
  password_hash: string;
}

export interface NewUser extends BaseUser {
  password: string;
};

export interface UserLoginCredentials {
  username: string;
  password: string;
};