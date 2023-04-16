import { Teacher } from '../entities/teacher.entity';

export interface ITeacherRepository {
  create(teacher: Teacher): Promise<Teacher>;
  update(id: string, teacher: Partial<Teacher>): Promise<Teacher>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Teacher | undefined>;
  findByEmail(email: string): Promise<Teacher | undefined>;
  findAll(): Promise<Teacher[]>;
}
