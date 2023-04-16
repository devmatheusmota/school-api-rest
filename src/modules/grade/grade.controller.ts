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
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { ErrorHandler } from 'src/error/ErrorHandler';
import { ROLE, Roles } from 'src/roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('grade')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @Post()
  async create(@Body() createGradeDto: CreateGradeDto) {
    try {
      const grade = await this.gradeService.create(createGradeDto);

      return {
        message: 'Grade created successfully.',
        grade,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, 'create');
    }
  }

  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @Get()
  async findAll() {
    try {
      const grades = await this.gradeService.findAll();

      return {
        message: 'Grades',
        grades,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, 'findAll');
    }
  }

  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const grade = await this.gradeService.findOne(id);

      return {
        message: 'Grade',
        grade,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, 'findOne');
    }
  }

  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGradeDto: UpdateGradeDto,
  ) {
    try {
      const grade = await this.gradeService.update(id, updateGradeDto);

      return {
        message: 'Grade updated successfully.',
        grade,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, 'update');
    }
  }

  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.gradeService.remove(id);

      return {
        message: 'Grade deleted successfully.',
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, 'remove');
    }
  }
}
