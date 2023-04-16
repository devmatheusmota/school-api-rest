import { Course } from '../entities/course.entity';

export interface ICourseRepository {
  create(course: Course): Promise<Course>;
  update(id: string, course: Partial<Course>): Promise<Course>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Course | undefined>;
  findAll(): Promise<Course[]>;
  findByStudentId(studentId: string): Promise<Course>;
  findByTeacherId(teacherId: string): Promise<Course[]>;
  checkIfCourseExists(name: string, year: number): Promise<boolean>;
  addStudentToCourse(courseId: string, studentId: string): Promise<void>;
  removeStudentFromCourse(courseId: string, studentId: string): Promise<void>;
  addTeacherToCourse(courseId: string, teacherId: string): Promise<void>;
  removeTeacherFromCourse(courseId: string, teacherId: string): Promise<void>;
}
