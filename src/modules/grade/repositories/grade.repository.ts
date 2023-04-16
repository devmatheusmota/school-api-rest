import { PrismaService } from 'src/prisma/prisma.service';
import { Grade } from '../entities/grade.entity';
import { IGradeRepository } from './grade.repository.interface';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class GradeRepository implements IGradeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Grade): Promise<Grade> {
    const studentExists = await this.prisma.student.findUnique({
      where: {
        id: data.student_id,
      },
    });

    if (!studentExists) {
      throw new NotFoundException('Student not found');
    }

    const activityExists = await this.prisma.activity.findUnique({
      where: {
        id: data.activity_id,
      },
    });

    if (!activityExists) {
      throw new NotFoundException('Activity not found');
    }

    const grade = await this.prisma.grade.create({
      data,
    });

    return grade;
  }

  async findById(id: string): Promise<Grade> {
    const grade = await this.prisma.grade.findUnique({
      where: {
        id,
      },
    });

    return grade;
  }

  async findAll(): Promise<Grade[]> {
    const students = await this.prisma.grade.findMany();

    return students;
  }

  async update(id: string, data: Grade): Promise<Grade> {
    const grade = await this.prisma.grade.update({
      where: {
        id,
      },
      data,
    });

    return grade;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.grade.delete({
      where: {
        id,
      },
    });
  }

  async checkIfExists(
    student_id: string,
    activity_id: string,
  ): Promise<boolean> {
    const grade = await this.prisma.grade.findFirst({
      where: {
        student_id,
        activity_id,
      },
    });

    return !!grade;
  }
}