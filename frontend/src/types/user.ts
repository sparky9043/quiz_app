export interface UserLoginCredentials {
  username: string;
  password: string;
}

export interface UserLoginSuccessObject {
  token: string;
  id: number;
  type: string;
  username: string;
}