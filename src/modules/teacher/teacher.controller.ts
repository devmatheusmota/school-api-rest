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
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ErrorHandler } from 'src/error/ErrorHandler';
import { AuthGuard } from '@nestjs/passport';
import { ROLE, Roles } from 'src/roles/roles.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Teacher')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  @Roles(ROLE.ADMIN)
  @ApiOperation({ summary: 'Create Teacher' })
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
      new ErrorHandler(error, this.constructor.name, this.create.name);
    }
  }

  @Get()
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Read Teacher' })
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
      new ErrorHandler(error, this.constructor.name, this.findAll.name);
    }
  }

  @Get(':id')
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Read Teacher By ID' })
  @ApiParam({
    name: 'id',
    description: 'Teacher ID',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
  })
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
      new ErrorHandler(error, this.constructor.name, this.findOne.name);
    }
  }

  @Patch(':id')
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Update Teacher' })
  @ApiParam({
    name: 'id',
    description: 'Teacher ID',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
  })
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
      new ErrorHandler(error, this.constructor.name, this.update.name);
    }
  }

  @Delete(':id')
  @Roles(ROLE.ADMIN)
  @ApiOperation({ summary: 'Delete Teacher' })
  @ApiParam({
    name: 'id',
    description: 'Teacher ID',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
  })
  async remove(@Param('id') id: string) {
    try {
      await this.teacherService.remove(id);

      return {
        message: 'Teacher deleted successfully!',
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.remove.name);
    }
  }
}
