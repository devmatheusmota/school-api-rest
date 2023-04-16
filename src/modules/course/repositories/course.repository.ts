import { PrismaService } from 'src/prisma/prisma.service';
import { Course } from '../entities/course.entity';
import { ICourseRepository } from './course.repository.interface';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CourseRepository implements ICourseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Course): Promise<Course> {
    const course = await this.prisma.course.create({
      data: {
        name: data.name,
        year: data.year,
      },
    });

    return course;
  }

  async findById(id: string): Promise<Course> {
    const course = await this.prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        Student: true,
        Teacher: true,
      },
    });

    return course;
  }

  async findAll(): Promise<Course[]> {
    const activities = await this.prisma.course.findMany();

    return activities;
  }

  async findByStudentId(studentId: string): Promise<Course> {
    const student = await this.prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found.');
    }

    const course = await this.prisma.course.findFirst({
      where: {
        Student: {
          some: {
            id: studentId,
          },
        },
      },
    });

    return course;
  }

  async findByTeacherId(teacherId: string): Promise<Course[]> {
    const teacher = await this.prisma.teacher.findUnique({
      where: {
        id: teacherId,
      },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found.');
    }

    const course = await this.prisma.course.findMany({
      where: {
        Teacher: {
          some: {
            id: teacherId,
          },
        },
      },
    });

    return course;
  }

  async addStudentToCourse(courseId: string, studentId: string): Promise<void> {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found.');
    }

    const student = await this.prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found.');
    }

    await this.prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        Student: {
          connect: {
            id: studentId,
          },
        },
      },
    });
  }

  async removeStudentFromCourse(
    courseId: string,
    studentId: string,
  ): Promise<void> {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found.');
    }

    const student = await this.prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found.');
    }

    await this.prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        Student: {
          disconnect: {
            id: studentId,
          },
        },
      },
    });
  }

  async addTeacherToCourse(courseId: string, teacherId: string): Promise<void> {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found.');
    }

    const teacher = await this.prisma.teacher.findUnique({
      where: {
        id: teacherId,
      },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found.');
    }

    await this.prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        Teacher: {
          connect: {
            id: teacherId,
          },
        },
      },
    });
  }

  async removeTeacherFromCourse(
    courseId: string,
    teacherId: string,
  ): Promise<void> {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found.');
    }

    const teacher = await this.prisma.teacher.findUnique({
      where: {
        id: teacherId,
      },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found.');
    }

    await this.prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        Teacher: {
          disconnect: {
            id: teacherId,
          },
        },
      },
    });
  }

  async update(id: string, data: Course): Promise<Course> {
    const course = await this.prisma.course.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        year: data.year,
      },
    });

    return course;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.course.delete({
      where: {
        id,
      },
    });
  }

  async checkIfCourseExists(name: string, year: number): Promise<boolean> {
    const course = await this.prisma.course.findFirst({
      where: {
        name,
        year,
      },
    });

    return !!course;
  }
}
