import { randomUUID } from 'crypto';
import { IGradeRepository } from './grade.repository.interface';
import { Grade } from '../entities/grade.entity';

export class InMemoryGradeRepository implements IGradeRepository {
  private grade: Grade[] = [];

  async create(data: Grade): Promise<Grade> {
    const grade = new Grade(data);

    grade.id = randomUUID();

    this.grade.push(grade);

    return grade;
  }

  async findById(id: string): Promise<Grade> {
    const grade = this.grade.find((grade) => grade.id === id);

    return grade;
  }

  async findAll(): Promise<Grade[]> {
    const grade = this.grade;

    return grade;
  }

  async update(id: string, grade: Grade): Promise<Grade> {
    const gradeIndex = this.grade.findIndex((grade) => grade.id === id);
    grade.id = this.grade[gradeIndex].id;
    this.grade[gradeIndex] = grade;

    return grade;
  }

  async delete(id: string): Promise<void> {
    const gradeIndex = this.grade.findIndex((grade) => grade.id === id);

    this.grade.splice(gradeIndex, 1);
  }

  checkIfExists(student_id: string, activity_id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
