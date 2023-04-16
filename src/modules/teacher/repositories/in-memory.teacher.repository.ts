import { randomUUID } from 'crypto';
import { ITeacherRepository } from './teacher.repository.interface';
import { Teacher } from '../entities/teacher.entity';

export class InMemoryTeacherRepository implements ITeacherRepository {
  private teacher: Teacher[] = [];

  async create(data: Teacher): Promise<Teacher> {
    data.id = randomUUID();

    this.teacher.push(data);

    return data;
  }

  async findById(id: string): Promise<Teacher> {
    const teacher = this.teacher.find((teacher) => teacher.id === id);

    return teacher;
  }

  async findByEmail(email: string): Promise<Teacher> {
    const teacher = this.teacher.find((teacher) => teacher.email === email);

    return teacher;
  }

  async findAll(): Promise<Teacher[]> {
    const teacher = this.teacher;

    return teacher;
  }

  async update(id: string, teacher: Teacher): Promise<Teacher> {
    const teacherIndex = this.teacher.findIndex((teacher) => teacher.id === id);
    teacher.id = this.teacher[teacherIndex].id;
    this.teacher[teacherIndex] = teacher;

    return teacher;
  }

  async delete(id: string): Promise<void> {
    const teacherIndex = this.teacher.findIndex((teacher) => teacher.id === id);

    this.teacher.splice(teacherIndex, 1);
  }

  async checkIfEmailExists(email: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
