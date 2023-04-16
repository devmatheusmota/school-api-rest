import { PrismaService } from 'src/prisma/prisma.service';
import { Course } from '../entities/course.entity';
import { ICourseRepository } from './course.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseRepository implements ICourseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Course): Promise<Course> {
    const course = await this.prisma.course.create({
      data,
    });

    return course;
  }

  async findById(id: string): Promise<Course> {
    const course = await this.prisma.course.findUnique({
      where: {
        id,
      },
    });

    return course;
  }

  async findAll(): Promise<Course[]> {
    const activities = await this.prisma.course.findMany();

    return activities;
  }

  async update(id: string, data: Course): Promise<Course> {
    const course = await this.prisma.course.update({
      where: {
        id,
      },
      data,
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
