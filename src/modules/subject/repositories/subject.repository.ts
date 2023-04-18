import { PrismaService } from 'src/prisma/prisma.service';
import { Subject } from '../entities/subject.entity';
import { ISubjectRepository } from './subject.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SubjectRepository implements ISubjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Subject): Promise<Subject> {
    const subject = await this.prisma.subject.create({
      data,
    });

    return subject;
  }

  async findById(id: string): Promise<Subject> {
    const subject = await this.prisma.subject.findUnique({
      where: {
        id,
      },
    });

    return subject;
  }

  async findAll(): Promise<Subject[]> {
    const students = await this.prisma.subject.findMany({
      include: {
        Teacher: true,
      },
    });

    return students;
  }

  async findByName(name: string): Promise<Subject> {
    const subject = await this.prisma.subject.findFirst({
      where: {
        name,
      },
    });

    return subject;
  }

  async findByTeacherId(teacherId: string): Promise<Subject[]> {
    const subject = await this.prisma.subject.findMany({
      where: {
        teacher_id: teacherId,
      },
    });

    return subject;
  }

  async update(id: string, data: Subject): Promise<Subject> {
    const subject = await this.prisma.subject.update({
      where: {
        id,
      },
      data,
    });

    return subject;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.subject.delete({
      where: {
        id,
      },
    });
  }
}
