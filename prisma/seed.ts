import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

const SUBJECTS = ['Matemática', 'Português', 'Inglês'];
const ACTIVITIES = [
  {
    name: 'Matemática',
    description: 'Atividade de Matemática',
    due_date: new Date('2023-05-19'),
    subjects: ['Matemática'],
  },
  {
    name: 'Português',
    description: 'Atividade de Português',
    due_date: new Date('2023-05-19'),
    subjects: ['Português'],
  },
  {
    name: 'Inglês',
    description: 'Atividade de Inglês',
    due_date: new Date('2023-05-19'),
    subjects: ['Inglês'],
  },
];

export class Seed {
  constructor(private readonly prisma: PrismaClient) {}
  async seed() {
    // Creating ADMIN
    await this.prisma.teacher.create({
      data: {
        name: 'Administrador',
        email: 'admin@admin.com.br',
        password: await hash('admin', 10),
        role: 'ADMIN',
      },
    });

    // Creating TEACHER
    const teacher = await this.prisma.teacher.create({
      data: {
        name: 'Professor Girafales',
        email: 'teacher@teacher.com.br',
        password: await hash('teacher', 10),
      },
    });

    // Creating STUDENT
    await this.prisma.student.create({
      data: {
        name: 'Chaves',
        email: 'student@student.com.br',
        password: await hash('student', 10),
      },
    });

    // Creating other STUDENTS
    for (let i = 1; i < 10; i++) {
      await this.prisma.student.create({
        data: {
          name: `Student ${i}`,
          email: `student${i}@mail.com`,
          password: await hash('student', 10),
        },
      });
    }
    const allStudents = await this.prisma.student.findMany({});

    // Creating Student Card
    for (const student of allStudents) {
      await this.prisma.studentCard.create({
        data: {
          due_date: new Date('2024-04-19'),
          Student: {
            connect: {
              id: student.id,
            },
          },
        },
      });
    }

    // Creating SUBJECTS
    for (const subject of SUBJECTS) {
      await this.prisma.subject.create({
        data: {
          name: subject,
          Teacher: {
            connect: {
              id: teacher.id,
            },
          },
        },
      });
    }

    // Creating COURSE
    const course = await this.prisma.course.create({
      data: {
        name: '9º ano',
        year: 2023,
        Teacher: {
          connect: {
            id: teacher.id,
          },
        },
      },
    });

    // Connecting Students to Course
    for (const student of allStudents) {
      await this.prisma.student.update({
        where: {
          id: student.id,
        },
        data: {
          Course: {
            connect: {
              id: course.id,
            },
          },
        },
      });
    }

    const subjects = await this.prisma.subject.findMany({});

    // Creating Activities
    for (const activity of ACTIVITIES) {
      await this.prisma.activity.create({
        data: {
          name: activity.name,
          description: activity.description,
          due_date: activity.due_date,
          Subject: {
            connect: {
              id: subjects
                .map((subject) => subject.id)
                .find((id) => {
                  return activity.subjects.includes(
                    subjects.find((s) => s.id === id)?.name,
                  );
                }),
            },
          },
          Course: {
            connect: {
              id: course.id,
            },
          },
        },
      });
    }

    // Creating Grades
    const activities = await this.prisma.activity.findMany({});
    const students = await this.prisma.student.findMany({});
    for (const activity of activities) {
      for (const student of students) {
        await this.prisma.grade.create({
          data: {
            value: Math.floor(Math.random() * 10),
            activity_id: activity.id,
            student_id: student.id,
          },
        });
      }
    }
  }
}

new Seed(prisma).seed();
