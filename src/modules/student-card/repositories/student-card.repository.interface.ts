import { StudentCard } from '../entities/student-card.entity';

export interface IStudentCardRepository {
  create(student_card: StudentCard): Promise<StudentCard>;
  update(id: string, student_card: Partial<StudentCard>): Promise<StudentCard>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<StudentCard | undefined>;
  findByStudentId(student_id: string): Promise<StudentCard | undefined>;
  findAll(): Promise<StudentCard[]>;
}
