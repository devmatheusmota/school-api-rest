import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

export class seed {
  constructor(private readonly prisma: PrismaClient) {}
  async seed() {
    await this.prisma.teacher.create({
      data: {
        name: 'admin',
        email: 'admin@admin.com.br',
        password: await hash('admin', 10),
        role: 'ADMIN',
      },
    });
  }
}

new seed(prisma).seed();
