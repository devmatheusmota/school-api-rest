import { randomUUID } from 'crypto';
import { StudentCard } from '../entities/student-card.entity';
import { IStudentCardRepository } from './student-card.repository.interface';

export class InMemoryStudentCardRepository implements IStudentCardRepository {
  private studentCards: StudentCard[] = [];

  async create(data: StudentCard): Promise<StudentCard> {
    data.id = randomUUID();

    this.studentCards.push(data);

    return data;
  }

  async findById(id: string): Promise<StudentCard> {
    const studentCard = this.studentCards.find(
      (studentCard) => studentCard.id === id,
    );

    return studentCard;
  }

  async findByStudentId(student_id: string): Promise<StudentCard> {
    const studentCard = this.studentCards.find(
      (studentCard) => studentCard.student_id === student_id,
    );

    return studentCard;
  }

  async findAll(): Promise<StudentCard[]> {
    const studentCards = this.studentCards;

    return studentCards;
  }

  async update(id: string, studentCard: StudentCard): Promise<StudentCard> {
    const studentCardIndex = this.studentCards.findIndex(
      (studentCard) => studentCard.id === id,
    );
    studentCard.id = this.studentCards[studentCardIndex].id;
    this.studentCards[studentCardIndex] = studentCard;

    return studentCard;
  }

  async delete(id: string): Promise<void> {
    const studentCardIndex = this.studentCards.findIndex(
      (studentCard) => studentCard.id === id,
    );

    this.studentCards.splice(studentCardIndex, 1);
  }
}
