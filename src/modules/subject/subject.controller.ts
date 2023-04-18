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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Subject')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Criação de Disciplina' })
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

  @Get()
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Listagem de Disciplinas' })
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

  @Get(':id')
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Listagem de Disciplina' })
  @ApiParam({ name: 'id', example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd' })
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

  @Get('/teacher/:id')
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Listagem de Disciplina pelo ID do Professor' })
  @ApiParam({ name: 'id', example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd' })
  async findByTeacherId(@Param('id') id: string) {
    try {
      const subjects = await this.subjectService.findByTeacherId(id);

      return {
        message: 'Subject',
        subject: subjects,
      };
    } catch (error) {
      new ErrorHandler(error, 'SubjectController', 'findByTeacherId');
    }
  }

  @Patch(':id')
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Atualização de Disciplina' })
  @ApiParam({ name: 'id', example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd' })
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

  @Delete(':id')
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Remoção de Disciplina' })
  @ApiParam({ name: 'id', example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd' })
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
