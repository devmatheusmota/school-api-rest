import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

export class Seed {
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

    await this.prisma.teacher.create({
      data: {
        name: 'teacher',
        email: 'teacher@teacher.com.br',
        password: await hash('teacher', 10),
      },
    });

    await this.prisma.student.create({
      data: {
        name: 'student',
        email: 'student@student.com.br',
        password: await hash('student', 10),
      },
    });
  }
}

new Seed(prisma).seed();
