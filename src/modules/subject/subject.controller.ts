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
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { ErrorHandler } from 'src/error/ErrorHandler';
import { AuthGuard } from '@nestjs/passport';
import { ROLE, Roles } from 'src/roles/roles.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @Post()
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    try {
      const subject = await this.subjectService.create(createSubjectDto);

      return {
        message: 'Subject created successfully.',
        subject,
      };
    } catch (error) {
      new ErrorHandler(error, 'SubjectController', 'create');
    }
  }

  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @Get()
  async findAll() {
    try {
      const subjects = await this.subjectService.findAll();

      return {
        message: 'Subjects',
        subjects,
      };
    } catch (error) {
      new ErrorHandler(error, 'SubjectController', 'findAll');
    }
  }

  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const subject = await this.subjectService.findOne(id);

      return {
        message: 'Subject',
        subject,
      };
    } catch (error) {
      new ErrorHandler(error, 'SubjectController', 'findOne');
    }
  }

  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    try {
      const subject = await this.subjectService.update(id, updateSubjectDto);

      return {
        message: 'Subject updated successfully.',
        subject,
      };
    } catch (error) {
      new ErrorHandler(error, 'SubjectController', 'update');
    }
  }

  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.subjectService.remove(id);

      return {
        message: 'Subject deleted successfully.',
      };
    } catch (error) {
      new ErrorHandler(error, 'SubjectController', 'remove');
    }
  }
}
