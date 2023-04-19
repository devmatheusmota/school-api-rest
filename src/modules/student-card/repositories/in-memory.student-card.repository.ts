import { randomUUID } from 'crypto';
import { StudentCard } from '../entities/student-card.entity';
import { IStudentCardRepository } from './student-card.repository.interface';

export class InMemoryStudentCardRepository implements IStudentCardRepository {
  private student_cards: StudentCard[] = [];

  async create(data: StudentCard): Promise<StudentCard> {
    data.id = randomUUID();

    this.student_cards.push(data);

    return data;
  }

  async findById(id: string): Promise<StudentCard> {
    const student_card = this.student_cards.find(
      (student_card) => student_card.id === id,
    );

    return student_card;
  }

  async findByStudentId(student_id: string): Promise<StudentCard> {
    const student_card = this.student_cards.find(
      (student_card) => student_card.student_id === student_id,
    );

    return student_card;
  }

  async findAll(): Promise<StudentCard[]> {
    const student_cards = this.student_cards;

    return student_cards;
  }

  async update(id: string, student_card: StudentCard): Promise<StudentCard> {
    const student_cardIndex = this.student_cards.findIndex(
      (student_card) => student_card.id === id,
    );
    student_card.id = this.student_cards[student_cardIndex].id;
    this.student_cards[student_cardIndex] = student_card;

    return student_card;
  }

  async delete(id: string): Promise<void> {
    const student_cardIndex = this.student_cards.findIndex(
      (student_card) => student_card.id === id,
    );

    this.student_cards.splice(student_cardIndex, 1);
  }
}
