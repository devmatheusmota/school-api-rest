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

    const teacher = await this.prisma.teacher.create({
      data: {
        name: 'teacher',
        email: 'teacher@teacher.com.br',
        password: await hash('teacher', 10),
      },
    });

    const student = await this.prisma.student.create({
      data: {
        name: 'student',
        email: 'student@student.com.br',
        password: await hash('student', 10),
      },
    });

    await this.prisma.course.create({
      data: {
        name: '8th Grade',
        year: 2023,
        Teacher: {
          connect: {
            id: teacher.id,
          },
        },
        Student: {
          connect: {
            id: student.id,
          },
        },
      },
    });

    await this.prisma.studentCard.create({
      data: {
        student_id: student.id,
        due_date: new Date(new Date().setDate(new Date().getDate() + 1)),
      },
    });
  }
}

new Seed(prisma).seed();
