export interface DatabaseErrorDetails {
  code: string | number;
  success: boolean;
  message: string;
  errors?: {
    detail?: string;
  };
}

export interface HttpErrorDetails {
  status: number;
  message: string;
}