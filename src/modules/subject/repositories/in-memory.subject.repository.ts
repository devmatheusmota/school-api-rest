import { randomUUID } from 'crypto';
import { ISubjectRepository } from './subject.repository.interface';
import { Subject } from '../entities/subject.entity';

export class InMemorySubjectRepository implements ISubjectRepository {
  private subject: Subject[] = [];

  async create(data: Subject): Promise<Subject> {
    const subject = data;

    subject.id = randomUUID();

    this.subject.push(subject);

    return subject;
  }

  async findById(id: string): Promise<Subject> {
    const subject = this.subject.find((subject) => subject.id === id);

    return subject;
  }

  async findAll(): Promise<Subject[]> {
    const subject = this.subject;

    return subject;
  }

  async findByTeacherId(teacher_id: string): Promise<Subject[]> {
    const subject = this.subject.filter(
      (subject) => subject.teacher_id === teacher_id,
    );

    return subject;
  }

  async update(id: string, subject: Subject): Promise<Subject> {
    const subjectIndex = this.subject.findIndex((subject) => subject.id === id);
    subject.id = this.subject[subjectIndex].id;
    this.subject[subjectIndex] = subject;

    return subject;
  }

  async delete(id: string): Promise<void> {
    const subjectIndex = this.subject.findIndex((subject) => subject.id === id);

    this.subject.splice(subjectIndex, 1);
  }

  async findByName(name: string): Promise<Subject> {
    const subject = this.subject.find((subject) => subject.name === name);

    return subject;
  }
}
