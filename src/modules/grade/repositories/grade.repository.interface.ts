import { Grade } from '../entities/grade.entity';

export interface IGradeRepository {
  create(grade: Grade): Promise<Grade>;
  update(id: string, grade: Partial<Grade>): Promise<Grade>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Grade | undefined>;
  findAll(): Promise<Grade[]>;
  checkIfExists(student_id: string, activity_id: string): Promise<boolean>;
  findByStudentId(student_id: string): Promise<Grade[]>;
  findByActivityId(activity_id: string): Promise<Grade[]>;
  findByCourseId(course_id: string): Promise<Grade[]>;
}
