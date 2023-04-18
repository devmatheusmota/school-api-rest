import { HttpException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class ErrorHandler {
  constructor(
    private readonly error: any,
    private readonly controller: any,
    private readonly method: any,
  ) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw new HttpException(
        {
          status: 500,
          message:
            'Ocorreu um erro ao tentar realizar a operação em nosso banco de dados.',
          error: 'Internal Server Error',
        },
        500,
      );
    }
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
