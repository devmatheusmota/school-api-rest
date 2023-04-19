import { PrismaService } from 'src/prisma/prisma.service';
import { Activity } from '../entities/activity.entity';
import { IActivityRepository } from './activity.repository.interface';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ActivityRepository implements IActivityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Activity): Promise<Activity> {
    const courseExists = await this.prisma.course.findFirst({
      where: {
        id: data.course_id,
      },
    });

    if (!courseExists) {
      throw new NotFoundException('Course not found.');
    }

    const activity = await this.prisma.activity.create({
      data,
    });

    return activity;
  }

  async findById(id: string): Promise<Activity> {
    const activity = await this.prisma.activity.findUnique({
      where: {
        id,
      },
    });

    return activity;
  }

  async findAll(): Promise<Activity[]> {
    const activities = await this.prisma.activity.findMany();

    return activities;
  }

  async findByStudentId(student_id: string): Promise<Activity[]> {
    const student = await this.prisma.student.findUnique({
      where: {
        id: student_id,
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found.');
    }

    const activity = await this.prisma.activity.findMany({
      where: {
        Course: {
          Student: {
            some: {
              id: student_id,
            },
          },
        },
      },
    });

    return activity;
  }
  async findByTeacherId(teacher_id: string): Promise<Activity[]> {
    const teacher = await this.prisma.teacher.findUnique({
      where: {
        id: teacher_id,
      },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found.');
    }

    const activities = await this.prisma.activity.findMany({
      where: {
        Course: {
          Teacher: {
            some: {
              id: teacher_id,
            },
          },
        },
      },
    });

    return activities;
  }

  async findByCourseId(course_id: string): Promise<Activity[]> {
    const course = await this.prisma.course.findUnique({
      where: {
        id: course_id,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found.');
    }

    const activities = await this.prisma.activity.findMany({
      where: {
        course_id: course_id,
      },
    });

    return activities;
  }

  async findBySubjectId(subject_id: string): Promise<Activity[]> {
    const subject = await this.prisma.subject.findUnique({
      where: {
        id: subject_id,
      },
    });

    if (!subject) {
      throw new NotFoundException('Subject not found.');
    }

    const activities = await this.prisma.activity.findMany({
      where: {
        subject_id,
      },
    });

    return activities;
  }

  async update(id: string, data: Activity): Promise<Activity> {
    const activity = await this.prisma.activity.update({
      where: {
        id,
      },
      data,
    });

    return activity;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.activity.delete({
      where: {
        id,
      },
    });
  }
}
