import { Student } from '../entities/student.entity';

export interface IStudentRepository {
  create(student: Student): Promise<Student>;
  update(id: string, student: Partial<Student>): Promise<Student>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Student | undefined>;
  findByEmail(email: string): Promise<Student | undefined>;
  findAll(): Promise<Student[]>;
}
