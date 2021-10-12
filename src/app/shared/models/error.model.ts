export class Error {
  error!: ErrorResponse;
}

class ErrorResponse {
  message!: string;
  status!: number;
  errorCode!: number;
}
