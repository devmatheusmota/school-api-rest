import { PrismaService } from 'src/prisma/prisma.service';
import { StudentCard } from '../entities/student-card.entity';
import { IStudentCardRepository } from './student-card.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentCardRepository implements IStudentCardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: StudentCard): Promise<StudentCard> {
    const student_card = await this.prisma.studentCard.create({
      data,
    });

    return student_card;
  }

  async findById(id: string): Promise<StudentCard> {
    const student_card = await this.prisma.studentCard.findUnique({
      where: {
        id,
      },
    });

    return student_card;
  }

  async findByStudentId(student_id: string): Promise<StudentCard> {
    const student_card = await this.prisma.studentCard.findUnique({
      where: {
        student_id,
      },
    });

    return student_card;
  }

  async findAll(): Promise<StudentCard[]> {
    const student_cards = await this.prisma.studentCard.findMany();

    return student_cards;
  }

  async update(id: string, data: StudentCard): Promise<StudentCard> {
    const student_card = await this.prisma.studentCard.update({
      where: {
        id,
      },
      data,
    });

    return student_card;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.studentCard.delete({
      where: {
        id,
      },
    });
  }
}
