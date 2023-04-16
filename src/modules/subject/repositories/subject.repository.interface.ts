import { Subject } from '../entities/subject.entity';

export interface ISubjectRepository {
  create(subject: Subject): Promise<Subject>;
  update(id: string, subject: Partial<Subject>): Promise<Subject>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Subject | undefined>;
  findAll(): Promise<Subject[]>;
  findByName(name: string): Promise<Subject | undefined>;
}
