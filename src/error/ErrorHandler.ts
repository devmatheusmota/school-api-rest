import { HttpException } from '@nestjs/common';

export class ErrorHandler {
  constructor(private readonly error: any) {}

  public throw() {
    throw new HttpException(
      {
        status: this.error.status,
        message:
          this.error.message || 'Erro inesperado. Tente novamente mais tarde.',
        error: this.error.response?.error,
      },
      this.error.status,
    );
  }
}
