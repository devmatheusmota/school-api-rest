import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ErrorHandler } from 'src/error/ErrorHandler';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  async create(@Body() createTeacherDto: CreateTeacherDto) {
    try {
      const teacher = await this.teacherService.create(createTeacherDto);
      return {
        message: 'Teacher created successfully!',
        teacher: {
          ...teacher,
          password: undefined,
        },
      };
    } catch (error) {
      new ErrorHandler(error, 'TeacherController', 'create');
    }
  }

  @Get()
  async findAll() {
    try {
      const students = await this.teacherService.findAll();

      return {
        message: 'Teachers',
        teachers: students.map((teacher) => {
          return {
            ...teacher,
            password: undefined,
          };
        }),
      };
    } catch (error) {
      new ErrorHandler(error, 'TeacherController', 'findAll');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const student = await this.teacherService.findOne(id);

      return {
        message: 'Teacher',
        teacher: {
          ...student,
          password: undefined,
        },
      };
    } catch (error) {
      new ErrorHandler(error, 'TeacherController', 'findOne');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    try {
      const teacher = await this.teacherService.update(id, updateTeacherDto);

      return {
        message: 'Teacher updated successfully!',
        teacher: {
          ...teacher,
          password: undefined,
        },
      };
    } catch (error) {
      new ErrorHandler(error, 'TeacherController', 'update');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.teacherService.remove(id);

      return {
        message: 'Teacher deleted successfully!',
      };
    } catch (error) {
      new ErrorHandler(error, 'TeacherController', 'remove');
    }
  }
}
