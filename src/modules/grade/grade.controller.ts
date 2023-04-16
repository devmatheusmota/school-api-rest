import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { ErrorHandler } from 'src/error/ErrorHandler';

@Controller('grade')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

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
