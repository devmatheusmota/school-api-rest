import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ErrorHandler } from 'src/error/ErrorHandler';
import { ROLE, Roles } from 'src/roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AddTeacherToCourseDto } from './dto/add-teacher-to-course.dto';
import { AddStudentToCourseDto } from './dto/add-student-to-course.dto';

@Controller('course')
@UseGuards(AuthGuard('jwt'))
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Roles(ROLE.ADMIN, ROLE.TEACHER)
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

  @Roles(ROLE.ADMIN, ROLE.TEACHER)
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

  @Roles(ROLE.ADMIN, ROLE.TEACHER)
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

  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @Get('student/:id')
  async findByStudentId(@Param('id') id: string) {
    try {
      const course = await this.courseService.findByStudentId(id);

      return {
        message: 'Course',
        course,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.findByStudentId.name);
    }
  }

  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @Get('teacher/:id')
  async findByTeacherId(@Param('id') id: string) {
    try {
      const courses = await this.courseService.findByTeacherId(id);

      return {
        message: 'Courses',
        courses,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.findByTeacherId.name);
    }
  }

  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @Post('student')
  async addStudentToCourse(@Body() addStudentToCourse: AddStudentToCourseDto) {
    try {
      const course = await this.courseService.addStudentToCourse(
        addStudentToCourse.course_id,
        addStudentToCourse.student_id,
      );

      return course;
    } catch (error) {
      new ErrorHandler(
        error,
        this.constructor.name,
        this.addStudentToCourse.name,
      );
    }
  }

  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @Post('teacher')
  async addTeacherToCourse(
    @Body() addTeacherToCourseDto: AddTeacherToCourseDto,
  ) {
    try {
      const course = await this.courseService.addTeacherToCourse(
        addTeacherToCourseDto.course_id,
        addTeacherToCourseDto.teacher_id,
      );

      return course;
    } catch (error) {
      new ErrorHandler(
        error,
        this.constructor.name,
        this.addTeacherToCourse.name,
      );
    }
  }

  @Roles(ROLE.ADMIN, ROLE.TEACHER)
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

  @Roles(ROLE.ADMIN, ROLE.TEACHER)
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
