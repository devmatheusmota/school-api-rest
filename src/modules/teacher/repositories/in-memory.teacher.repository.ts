import { randomUUID } from 'crypto';
import { ITeacherRepository } from './teacher.repository.interface';
import { Teacher } from '../entities/teacher.entity';

export class InMemoryTeacherRepository implements ITeacherRepository {
  private students: Teacher[] = [];

  async create(data: Teacher): Promise<Teacher> {
    const teacher = new Teacher(data);

    teacher.id = randomUUID();

    this.students.push(teacher);

    return teacher;
  }

  async findById(id: string): Promise<Teacher> {
    const teacher = this.students.find((teacher) => teacher.id === id);

    return teacher;
  }

  async findByEmail(email: string): Promise<Teacher> {
    const teacher = this.students.find((teacher) => teacher.email === email);

    return teacher;
  }

  async findAll(): Promise<Teacher[]> {
    const students = this.students;

    return students;
  }

  async update(id: string, teacher: Teacher): Promise<Teacher> {
    const studentIndex = this.students.findIndex(
      (teacher) => teacher.id === id,
    );
    teacher.id = this.students[studentIndex].id;
    this.students[studentIndex] = teacher;

    return teacher;
  }

  async delete(id: string): Promise<void> {
    const studentIndex = this.students.findIndex(
      (teacher) => teacher.id === id,
    );

    this.students.splice(studentIndex, 1);
  }
}
