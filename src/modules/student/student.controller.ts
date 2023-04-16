import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ErrorHandler } from 'src/error/ErrorHandler';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    try {
      const student = await this.studentService.create(createStudentDto);

      return {
        message: 'Student created successfully.',
        student: {
          ...student,
          password: undefined,
        },
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, 'create').throw();
    }
  }

  @Get()
  async findAll() {
    try {
      const students = await this.studentService.findAll();

      return {
        message: 'Students',
        students: students.map((student) => {
          return {
            ...student,
            password: undefined,
          };
        }),
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, 'findAll').throw();
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const student = await this.studentService.findOne(id);

      return {
        message: 'Student',
        student: {
          ...student,
          password: undefined,
        },
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, 'findOne').throw();
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    try {
      const student = await this.studentService.update(id, updateStudentDto);

      return {
        message: 'Student updated successfully.',
        student: {
          ...student,
          password: undefined,
        },
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, 'update').throw();
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      await this.studentService.remove(id);
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, 'remove').throw();
    }
  }
}
