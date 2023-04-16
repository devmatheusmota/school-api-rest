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

    const oldObject = this.grades[gradeIndex];

    const newObject = {
      ...oldObject,
      ...grade,
    };

    this.grades[gradeIndex] = newObject;

    return this.grades[gradeIndex];
  }

  async delete(id: string): Promise<void> {
    const gradeIndex = this.grades.findIndex((grade) => grade.id === id);

    this.grades.splice(gradeIndex, 1);
  }

  async checkIfExists(
    student_id: string,
    activity_id: string,
  ): Promise<boolean> {
    const grade = this.grades.find(
      (grade) =>
        grade.student_id === student_id && grade.activity_id === activity_id,
    );

    if (grade) {
      return true;
    }

    return false;
  }
}
