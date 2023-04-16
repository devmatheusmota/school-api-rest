import { randomUUID } from 'crypto';
import { Student } from '../entities/student.entity';
import { IStudentRepository } from './student.repository.interface';

export class InMemoryStudentRepository implements IStudentRepository {
  private students: Student[] = [];

  async create(data: Student): Promise<Student> {
    data.id = randomUUID();

    this.students.push(data);

    return data;
  }

  async findById(id: string): Promise<Student> {
    const student = this.students.find((student) => student.id === id);

    return student;
  }

  async findByEmail(email: string): Promise<Student> {
    const student = this.students.find((student) => student.email === email);

    return student;
  }

  async findAll(): Promise<Student[]> {
    const students = this.students;

    return students;
  }

  async update(id: string, student: Student): Promise<Student> {
    const studentIndex = this.students.findIndex(
      (student) => student.id === id,
    );
    student.id = this.students[studentIndex].id;
    this.students[studentIndex] = student;

    return student;
  }

  async delete(id: string): Promise<void> {
    const studentIndex = this.students.findIndex(
      (student) => student.id === id,
    );

    this.students.splice(studentIndex, 1);
  }

  async checkIfEmailExists(email: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
