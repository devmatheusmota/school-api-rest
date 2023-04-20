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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Course')
@ApiBearerAuth()
@Controller('course')
@UseGuards(AuthGuard('jwt'))
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Create Course' })
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

  @Post('student')
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Add/Remove Student To/From Course - Toggle' })
  async addStudentToCourse(@Body() addStudentToCourse: AddStudentToCourseDto) {
    try {
      const message = await this.courseService.addStudentToCourse(
        addStudentToCourse.course_id,
        addStudentToCourse.student_id,
      );

      return {
        message,
      };
    } catch (error) {
      new ErrorHandler(
        error,
        this.constructor.name,
        this.addStudentToCourse.name,
      );
    }
  }

  @Post('teacher')
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Add/Remove Teacher To/From Course' })
  async addTeacherToCourse(
    @Body() addTeacherToCourseDto: AddTeacherToCourseDto,
  ) {
    try {
      const message = await this.courseService.addTeacherToCourse(
        addTeacherToCourseDto.course_id,
        addTeacherToCourseDto.teacher_id,
      );

      return {
        message,
      };
    } catch (error) {
      new ErrorHandler(
        error,
        this.constructor.name,
        this.addTeacherToCourse.name,
      );
    }
  }

  @Get()
  @Roles(ROLE.ADMIN, ROLE.TEACHER, ROLE.STUDENT)
  @ApiOperation({ summary: 'Read Course' })
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
  @Roles(ROLE.ADMIN, ROLE.TEACHER, ROLE.STUDENT)
  @ApiOperation({ summary: 'Read Course By ID' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Course ID',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
  })
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

  @Get('student/:id')
  @Roles(ROLE.ADMIN, ROLE.TEACHER, ROLE.STUDENT)
  @ApiOperation({ summary: 'Read Course By Student ID' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Student ID',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
  })
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

  @Get('teacher/:id')
  @Roles(ROLE.ADMIN, ROLE.TEACHER, ROLE.STUDENT)
  @ApiOperation({ summary: 'Read Course By Teacher ID' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Teacher ID',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
  })
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

  @Patch(':id')
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Update Course' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Course ID',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
  })
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
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Delete Course' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Course ID',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
  })
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
