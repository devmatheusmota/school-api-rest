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
