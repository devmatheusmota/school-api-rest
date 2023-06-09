import { Student } from '../entities/student.entity';

export interface IStudentRepository {
  create(student: Student): Promise<Student>;
  update(id: string, student: Partial<Student>): Promise<Student>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Student | undefined>;
  findByCourse(id: string): Promise<Student[]>;
  findByEmail(email: string): Promise<Student | undefined>;
  findAll(): Promise<Student[]>;
  checkIfEmailExists(email: string): Promise<boolean>;
}
