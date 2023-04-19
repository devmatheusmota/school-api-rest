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

  async findByStudentId(student_id: string): Promise<Course> {
    const student = await this.prisma.student.findUnique({
      where: {
        id: student_id,
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found.');
    }

    const course = await this.prisma.course.findFirst({
      where: {
        Student: {
          some: {
            id: student_id,
          },
        },
      },
    });

    return course;
  }

  async findByTeacherId(teacher_id: string): Promise<Course[]> {
    const teacher = await this.prisma.teacher.findUnique({
      where: {
        id: teacher_id,
      },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found.');
    }

    const course = await this.prisma.course.findMany({
      where: {
        Teacher: {
          some: {
            id: teacher_id,
          },
        },
      },
    });

    return course;
  }

  async addStudentToCourse(
    course_id: string,
    student_id: string,
  ): Promise<void> {
    const course = await this.prisma.course.findUnique({
      where: {
        id: course_id,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found.');
    }

    const student = await this.prisma.student.findUnique({
      where: {
        id: student_id,
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found.');
    }

    await this.prisma.course.update({
      where: {
        id: course_id,
      },
      data: {
        Student: {
          connect: {
            id: student_id,
          },
        },
      },
    });
  }

  async removeStudentFromCourse(
    course_id: string,
    student_id: string,
  ): Promise<void> {
    const course = await this.prisma.course.findUnique({
      where: {
        id: course_id,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found.');
    }

    const student = await this.prisma.student.findUnique({
      where: {
        id: student_id,
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found.');
    }

    await this.prisma.course.update({
      where: {
        id: course_id,
      },
      data: {
        Student: {
          disconnect: {
            id: student_id,
          },
        },
      },
    });
  }

  async addTeacherToCourse(
    course_id: string,
    teacher_id: string,
  ): Promise<void> {
    const course = await this.prisma.course.findUnique({
      where: {
        id: course_id,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found.');
    }

    const teacher = await this.prisma.teacher.findUnique({
      where: {
        id: teacher_id,
      },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found.');
    }

    await this.prisma.course.update({
      where: {
        id: course_id,
      },
      data: {
        Teacher: {
          connect: {
            id: teacher_id,
          },
        },
      },
    });
  }

  async removeTeacherFromCourse(
    course_id: string,
    teacher_id: string,
  ): Promise<void> {
    const course = await this.prisma.course.findUnique({
      where: {
        id: course_id,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found.');
    }

    const teacher = await this.prisma.teacher.findUnique({
      where: {
        id: teacher_id,
      },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found.');
    }

    await this.prisma.course.update({
      where: {
        id: course_id,
      },
      data: {
        Teacher: {
          disconnect: {
            id: teacher_id,
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
