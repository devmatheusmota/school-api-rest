import { Course } from '../entities/course.entity';

export interface ICourseRepository {
  create(course: Course): Promise<Course>;
  update(id: string, course: Partial<Course>): Promise<Course>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Course | undefined>;
  findAll(): Promise<Course[]>;
}
