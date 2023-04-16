import { randomUUID } from 'crypto';
import { IGradeRepository } from './grade.repository.interface';
import { Grade } from '../entities/grade.entity';

export class InMemoryGradeRepository implements IGradeRepository {
  private grades: Grade[] = [];

  async create(data: Grade): Promise<Grade> {
    data.id = randomUUID();

    this.grades.push(data);

    return data;
  }

  async findById(id: string): Promise<Grade> {
    const grade = this.grades.find((grade) => grade.id === id);

    return grade;
  }

  async findAll(): Promise<Grade[]> {
    const grade = this.grades;

    return grade;
  }

  async findByStudentId(student_id: string): Promise<Grade[]> {
    const grades = this.grades.filter(
      (grade) => grade.student_id === student_id,
    );

    return grades;
  }

  async findByActivityId(activity_id: string): Promise<Grade[]> {
    const grades = this.grades.filter(
      (grade) => grade.activity_id === activity_id,
    );

    return grades;
  }

  async findByCourseId(course_id: string): Promise<Grade[]> {
    const grades = this.grades.filter(
      (grade) => grade.activity.course_id === course_id,
    );

    return grades;
  }

  async update(id: string, grade: Grade): Promise<Grade> {
    const gradeIndex = this.grades.findIndex((grade) => grade.id === id);
    grade.id = this.grades[gradeIndex].id;
    this.grades[gradeIndex] = grade;

    return grade;
  }

  async delete(id: string): Promise<void> {
    const gradeIndex = this.grades.findIndex((grade) => grade.id === id);

    this.grades.splice(gradeIndex, 1);
  }

  async checkIfExists(
    _student_id: string,
    _activity_id: string,
  ): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
