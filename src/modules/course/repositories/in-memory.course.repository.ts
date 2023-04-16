import { randomUUID } from 'crypto';
import { ICourseRepository } from './course.repository.interface';
import { Course } from '../entities/course.entity';
import { NotFoundException } from '@nestjs/common';
import { hash } from 'bcrypt';

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
      (course) => course.Student[0].id === studentId,
    );

    return course;
  }

  async findByTeacherId(teacherId: string): Promise<Course[]> {
    const courses = this.course.map((course) => {
      if (course.Teacher.map((teacher) => teacher.id === teacherId)) {
        return course;
      }
    });

    return courses;
  }

  async addStudentToCourse(courseId: string, studentId: string): Promise<void> {
    const course = this.course.find((course) => course.id === courseId);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    course.Student.push({
      id: studentId,
      name: 'Student',
      email: 'student@email.com',
      password: await hash('123456', 10),
    });
  }

  async removeStudentFromCourse(
    courseId: string,
    studentId: string,
  ): Promise<void> {
    const course = this.course.find((course) => course.id === courseId);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const studentIndex = course.Student.findIndex(
      (student) => student.id === studentId,
    );

    course.Student.splice(studentIndex, 1);
  }

  async addTeacherToCourse(courseId: string, teacherId: string): Promise<void> {
    const course = this.course.find((course) => course.id === courseId);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    course.Teacher.push({
      id: teacherId,
      name: 'Teacher',
      email: 'teacher@mail.com',
      password: await hash('123456', 10),
    });
  }

  async removeTeacherFromCourse(
    courseId: string,
    teacherId: string,
  ): Promise<void> {
    const course = this.course.find((course) => course.id === courseId);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const teacherIndex = course.Teacher.findIndex(
      (teacher) => teacher.id === teacherId,
    );

    course.Teacher.splice(teacherIndex, 1);
  }
}
