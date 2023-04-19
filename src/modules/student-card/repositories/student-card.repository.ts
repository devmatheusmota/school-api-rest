import { PrismaService } from 'src/prisma/prisma.service';
import { StudentCard } from '../entities/student-card.entity';
import { IStudentCardRepository } from './student-card.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentCardRepository implements IStudentCardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: StudentCard): Promise<StudentCard> {
    const studentCard = await this.prisma.studentCard.create({
      data,
    });

    return studentCard;
  }

  async findById(id: string): Promise<StudentCard> {
    const studentCard = await this.prisma.studentCard.findUnique({
      where: {
        id,
      },
    });

    return studentCard;
  }

  async findByStudentId(student_id: string): Promise<StudentCard> {
    const studentCard = await this.prisma.studentCard.findUnique({
      where: {
        student_id: student_id,
      },
    });

    return studentCard;
  }

  async findAll(): Promise<StudentCard[]> {
    const studentCards = await this.prisma.studentCard.findMany();

    return studentCards;
  }

  async update(id: string, data: StudentCard): Promise<StudentCard> {
    const studentCard = await this.prisma.studentCard.update({
      where: {
        id,
      },
      data,
    });

    return studentCard;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.studentCard.delete({
      where: {
        id,
      },
    });
  }
}
