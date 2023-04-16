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
  @ApiOperation({ summary: 'Criação de Cursos' })
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
  @ApiOperation({ summary: 'Adicionar/Remover Aluno ao Curso - Toggle' })
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

  @Post('teacher')
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Adicionar/Remover Professor ao Curso - Toggle' })
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

  @Get()
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Listagem de Cursos' })
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
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Listagem de Cursos pelo ID' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'ID do Curso',
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
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Listagem de Cursos pelo ID do Aluno' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'ID do Aluno',
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
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Listagem de Cursos pelo ID do Professor' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'ID do Professor',
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
  @ApiOperation({ summary: 'Atualização de Cursos' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'ID do Curso',
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
  @ApiOperation({ summary: 'Remoção de Cursos' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'ID do Curso',
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
