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

  async findByStudentId(studentId: string) {
    const course = await this.courseRepository.findByStudentId(studentId);

    if (!course) {
      throw new NotFoundException('Course not found.');
    }

    return course;
  }

  async findByTeacherId(teacherId: string) {
    const courses = await this.courseRepository.findByTeacherId(teacherId);

    if (courses.length === 0) {
      throw new NotFoundException('No courses found.');
    }

    return courses;
  }

  async addStudentToCourse(courseId: string, studentId: string) {
    const courseExists = await this.courseRepository.findById(courseId);

    if (!courseExists) {
      throw new NotFoundException('Course not found.');
    }

    if (courseExists.Student.map((student) => student.id).includes(studentId)) {
      await this.courseRepository.removeStudentFromCourse(courseId, studentId);

      return {
        message: 'Student removed from course.',
      };
    }

    await this.courseRepository.addStudentToCourse(courseId, studentId);

    return {
      message: 'Student added to course.',
    };
  }

  async addTeacherToCourse(courseId: string, teacherId: string) {
    const courseExists = await this.courseRepository.findById(courseId);

    if (!courseExists) {
      throw new NotFoundException('Course not found.');
    }

    if (courseExists.Teacher.map((student) => student.id).includes(teacherId)) {
      await this.courseRepository.removeTeacherFromCourse(courseId, teacherId);

      return {
        message: 'Teacher removed from course.',
      };
    }

    await this.courseRepository.addTeacherToCourse(courseId, teacherId);

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
