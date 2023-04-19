import { Course } from '../entities/course.entity';

export interface ICourseRepository {
  create(course: Course): Promise<Course>;
  update(id: string, course: Partial<Course>): Promise<Course>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Course | undefined>;
  findAll(): Promise<Course[]>;
  findByStudentId(student_id: string): Promise<Course>;
  findByTeacherId(teacher_id: string): Promise<Course[]>;
  checkIfCourseExists(name: string, year: number): Promise<boolean>;
  addStudentToCourse(course_id: string, student_id: string): Promise<void>;
  removeStudentFromCourse(course_id: string, student_id: string): Promise<void>;
  addTeacherToCourse(course_id: string, teacher_id: string): Promise<void>;
  removeTeacherFromCourse(course_id: string, teacher_id: string): Promise<void>;
}
