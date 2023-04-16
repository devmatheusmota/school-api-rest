import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ErrorHandler } from 'src/error/ErrorHandler';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    try {
      const course = await this.courseService.create(createCourseDto);

      return {
        message: 'Course created successfully.',
        course,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.create.name);
    }
  }

  @Get()
  async findAll() {
    try {
      const courses = await this.courseService.findAll();

      return {
        message: 'Courses',
        courses,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.findAll.name);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const course = await this.courseService.findOne(id);

      return {
        message: 'Course',
        course,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.findOne.name);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClassDto: UpdateCourseDto,
  ) {
    try {
      const course = await this.courseService.update(id, updateClassDto);

      return {
        message: 'Course updated successfully.',
        course,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.update.name);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.courseService.remove(id);

      return {
        message: 'Course deleted successfully.',
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.remove.name);
    }
  }
}
