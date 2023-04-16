import { PrismaService } from 'src/prisma/prisma.service';
import { Teacher } from '../entities/teacher.entity';
import { ITeacherRepository } from './teacher.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TeacherRepository implements ITeacherRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Teacher): Promise<Teacher> {
    const teacher = await this.prisma.teacher.create({
      data,
    });

    return teacher;
  }

  async findById(id: string): Promise<Teacher> {
    const teacher = await this.prisma.teacher.findUnique({
      where: {
        id,
      },
    });

    return teacher;
  }

  async findByEmail(email: string): Promise<Teacher> {
    const teacher = await this.prisma.teacher.findFirst({
      where: {
        email,
      },
    });

    return teacher;
  }

  async findAll(): Promise<Teacher[]> {
    const students = await this.prisma.teacher.findMany();

    return students;
  }

  async update(id: string, data: Teacher): Promise<Teacher> {
    const teacher = await this.prisma.teacher.update({
      where: {
        id,
      },
      data,
    });

    return teacher;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.teacher.delete({
      where: {
        id,
      },
    });
  }
}
