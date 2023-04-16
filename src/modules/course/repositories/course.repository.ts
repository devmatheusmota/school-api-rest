import { PrismaService } from 'src/prisma/prisma.service';
import { Course } from '../entities/course.entity';
import { ICourseRepository } from './course.repository.interface';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CourseRepository implements ICourseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Course): Promise<Course> {
    // const classExists = await this.prisma.course.findFirst({
    //   where: {
    //     id: data.course_id,
    //   },
    // });

    // if (!classExists) {
    //   throw new NotFoundException('Course not found.');
    // }

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
}
