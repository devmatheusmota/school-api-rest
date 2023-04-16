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
  @ApiOperation({ summary: 'Criação de Professor' })
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
  @Roles(ROLE.ADMIN)
  @ApiOperation({ summary: 'Listagem de Professores' })
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
  @Roles(ROLE.ADMIN)
  @ApiOperation({ summary: 'Listagem de Professor' })
  @ApiParam({
    name: 'id',
    description: 'ID do Professor',
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
      new ErrorHandler(error, 'TeacherController', 'findOne');
    }
  }

  @Patch(':id')
  @Roles(ROLE.ADMIN)
  @ApiOperation({ summary: 'Atualização de Professor' })
  @ApiParam({
    name: 'id',
    description: 'ID do Professor',
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
      new ErrorHandler(error, 'TeacherController', 'update');
    }
  }

  @Delete(':id')
  @Roles(ROLE.ADMIN)
  @ApiOperation({ summary: 'Remoção de Professor' })
  @ApiParam({
    name: 'id',
    description: 'ID do Professor',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
  })
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
