import { HttpException } from '@nestjs/common';

export class ErrorHandler {
  constructor(
    private readonly error: any,
    private readonly controller: any,
    private readonly method: any,
  ) {
    throw new HttpException(
      {
        status: this.error.status,
        message:
          this.error.message || 'Erro inesperado. Tente novamente mais tarde.',
        error: this.error.response?.error,
        where: `${this.controller} -> ${this.method}`,
      },
      this.error.status,
    );
  }
}
