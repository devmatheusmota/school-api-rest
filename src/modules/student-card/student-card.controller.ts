import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentCardService } from './student-card.service';
import { CreateStudentCardDto } from './dto/create-student-card.dto';
import { UpdateStudentCardDto } from './dto/update-student-card.dto';
import { ErrorHandler } from 'src/error/ErrorHandler';

@Controller('student-card')
export class StudentCardController {
  constructor(private readonly studentCardService: StudentCardService) {}

  @Post()
  async create(@Body() createStudentCardDto: CreateStudentCardDto) {
    try {
      const studentCard = await this.studentCardService.create(
        createStudentCardDto,
      );

      return {
        message: 'Student card created successfully.',
        studentCard,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.create.name);
    }
  }

  @Get()
  async findAll() {
    try {
      const studentCards = await this.studentCardService.findAll();

      return {
        message: 'Student Cards',
        studentCards,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.findAll.name);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const studentCard = await this.studentCardService.findOne(id);

      return {
        message: 'Student Card',
        studentCard,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.findOne.name);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentCardDto: UpdateStudentCardDto,
  ) {
    try {
      const studentCard = await this.studentCardService.update(
        id,
        updateStudentCardDto,
      );

      return {
        message: 'Student card updated successfully.',
        studentCard,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.update.name);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.studentCardService.remove(id);

      return {
        message: 'Student card deleted successfully.',
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.remove.name);
    }
  }
}
