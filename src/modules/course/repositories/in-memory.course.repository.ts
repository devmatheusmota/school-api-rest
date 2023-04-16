import { randomUUID } from 'crypto';
import { ICourseRepository } from './course.repository.interface';
import { Course } from '../entities/course.entity';

export class InMemoryCourseRepository implements ICourseRepository {
  private course: Course[] = [];

  async create(data: Course): Promise<Course> {
    data.id = randomUUID();

    this.course.push(data);

    return data;
  }

  async findById(id: string): Promise<Course> {
    const course = this.course.find((course) => course.id === id);

    return course;
  }

  async findAll(): Promise<Course[]> {
    const course = this.course;

    return course;
  }

  async update(id: string, course: Course): Promise<Course> {
    const courseIndex = this.course.findIndex((course) => course.id === id);
    course.id = this.course[courseIndex].id;
    this.course[courseIndex] = course;

    return course;
  }

  async delete(id: string): Promise<void> {
    const courseIndex = this.course.findIndex((course) => course.id === id);

    this.course.splice(courseIndex, 1);
  }

  async checkIfCourseExists(name: string): Promise<boolean> {
    const course = this.course.find((course) => course.name === name);

    return !!course;
  }

  async findByStudentId(studentId: string): Promise<Course> {
    const course = this.course.find(
      (course) => course.students[0].id === studentId,
    );

    return course;
  }

  async findByTeacherId(teacherId: string): Promise<Course[]> {
    const courses = this.course.map((course) => {
      if (course.teachers.map((teacher) => teacher.id === teacherId)) {
        return course;
      }
    });

    return courses;
  }
}
