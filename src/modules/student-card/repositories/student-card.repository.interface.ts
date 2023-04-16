import { StudentCard } from '../entities/student-card.entity';

export interface IStudentCardRepository {
  create(studentCard: StudentCard): Promise<StudentCard>;
  update(id: string, studentCard: Partial<StudentCard>): Promise<StudentCard>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<StudentCard | undefined>;
  findByStudentId(studentId: string): Promise<StudentCard | undefined>;
  findAll(): Promise<StudentCard[]>;
}
