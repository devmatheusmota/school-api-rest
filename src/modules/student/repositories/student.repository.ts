import { PrismaService } from 'src/prisma/prisma.service';
import { Student } from '../entities/student.entity';
import { IStudentRepository } from './student.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentRepository implements IStudentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Student): Promise<Student> {
    const student = await this.prisma.student.create({
      data,
    });

    return student;
  }

  async findById(id: string): Promise<Student> {
    const student = await this.prisma.student.findUnique({
      where: {
        id,
      },
    });

    return student;
  }

  async findByEmail(email: string): Promise<Student> {
    const student = await this.prisma.student.findFirst({
      where: {
        email,
      },
    });

    return student;
  }

  async checkIfEmailExists(email: string): Promise<boolean> {
    const student = await this.prisma.student.findFirst({
      where: {
        email,
      },
    });

    const teacher = await this.prisma.teacher.findFirst({
      where: {
        email,
      },
    });

    return !!student || !!teacher;
  }

  async findAll(): Promise<Student[]> {
    const students = await this.prisma.student.findMany();

    return students;
  }

  async update(id: string, data: Student): Promise<Student> {
    const student = await this.prisma.student.update({
      where: {
        id,
      },
      data,
    });

    return student;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.student.delete({
      where: {
        id,
      },
    });
  }
}
