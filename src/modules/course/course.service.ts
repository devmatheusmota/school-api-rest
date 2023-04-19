import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ICourseRepository } from './repositories/course.repository.interface';

@Injectable()
export class CourseService {
  constructor(
    @Inject('CourseRepository')
    private readonly courseRepository: ICourseRepository,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const courseExists = await this.courseRepository.checkIfCourseExists(
      createCourseDto.name,
      createCourseDto.year,
    );

    if (courseExists) {
      throw new BadRequestException('Course already exists.');
    }

    const course = await this.courseRepository.create(createCourseDto);

    return course;
  }

  async findAll() {
    const courses = await this.courseRepository.findAll();

    if (courses.length === 0) {
      throw new NotFoundException('No courses found.');
    }

    return courses;
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findById(id);

    if (!course) {
      throw new NotFoundException('Course not found.');
    }

    return course;
  }

  async findByStudentId(student_id: string) {
    const course = await this.courseRepository.findByStudentId(student_id);

    if (!course) {
      throw new NotFoundException('Course not found.');
    }

    return course;
  }

  async findByTeacherId(teacher_id: string) {
    const courses = await this.courseRepository.findByTeacherId(teacher_id);

    if (courses.length === 0) {
      throw new NotFoundException('No courses found.');
    }

    return courses;
  }

  async addStudentToCourse(course_id: string, student_id: string) {
    const courseExists = await this.courseRepository.findById(course_id);

    if (!courseExists) {
      throw new NotFoundException('Course not found.');
    }

    const isStudentAlreadyInCourse = courseExists.Student.map(
      (student) => student.id,
    ).includes(student_id);

    if (isStudentAlreadyInCourse) {
      await this.courseRepository.removeStudentFromCourse(
        course_id,
        student_id,
      );

      return {
        message: 'Student removed from course.',
      };
    }

    await this.courseRepository.addStudentToCourse(course_id, student_id);

    return {
      message: 'Student added to course.',
    };
  }

  async addTeacherToCourse(course_id: string, teacher_id: string) {
    const courseExists = await this.courseRepository.findById(course_id);

    if (!courseExists) {
      throw new NotFoundException('Course not found.');
    }

    const isTeacherAlreadyInCourse = courseExists.Teacher.map(
      (teacher) => teacher.id,
    ).includes(teacher_id);

    if (isTeacherAlreadyInCourse) {
      await this.courseRepository.removeTeacherFromCourse(
        course_id,
        teacher_id,
      );

      return {
        message: 'Teacher removed from course.',
      };
    }

    await this.courseRepository.addTeacherToCourse(course_id, teacher_id);

    return {
      message: 'Teacher added to course.',
    };
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const courseExists = await this.courseRepository.findById(id);

    if (!courseExists) {
      throw new NotFoundException('Course not found.');
    }

    const course = await this.courseRepository.update(id, updateCourseDto);

    return course;
  }

  async remove(id: string) {
    const courseExists = await this.courseRepository.findById(id);

    if (!courseExists) {
      throw new NotFoundException('Course not found.');
    }

    await this.courseRepository.delete(id);
  }
}
