import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super(
      process.env.NODE_ENV === 'production'
        ? {
            log: ['error', 'warn'],
            errorFormat: 'colorless',
          }
        : {
            log: ['query', 'info', 'warn', 'error'],
            errorFormat: 'pretty',
          },
    );
  }
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
