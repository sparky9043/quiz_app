export interface LoginSuccessObject {
  token: string;
  id: number;
  username: string;
  type: string;
  teacher_id?: number;
}