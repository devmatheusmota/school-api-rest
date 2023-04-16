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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Grade')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('grade')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Post()
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Lançamento de Notas' })
  async create(@Body() createGradeDto: CreateGradeDto) {
    try {
      const grade = await this.gradeService.create(createGradeDto);

      return {
        message: 'Grade created successfully.',
        grade,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.create.name);
    }
  }

  @Get()
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Listagem de Notas' })
  async findAll() {
    try {
      const grades = await this.gradeService.findAll();

      return {
        message: 'Grades',
        grades,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.findAll.name);
    }
  }

  @Get(':id')
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Listagem de Notas por ID' })
  @ApiParam({
    name: 'id',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
    description: 'ID da Nota',
  })
  async findOne(@Param('id') id: string) {
    try {
      const grade = await this.gradeService.findOne(id);

      return {
        message: 'Grade',
        grade,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.findOne.name);
    }
  }

  @Get('student/:id')
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Listagem de Notas por ID do Aluno' })
  @ApiParam({
    name: 'id',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
    description: 'ID do Aluno',
  })
  async findByStudentId(@Param('id') id: string) {
    try {
      const grades = await this.gradeService.findByStudentId(id);

      return {
        message: 'Grades',
        grades,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.findByStudentId.name);
    }
  }

  @Get('activity/:id')
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Listagem de Notas por ID da Atividade' })
  @ApiParam({
    name: 'id',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
    description: 'ID da Atividade',
  })
  async findByActivityId(@Param('id') id: string) {
    try {
      const grades = await this.gradeService.findByActivityId(id);

      return {
        message: 'Grades',
        grades,
      };
    } catch (error) {
      new ErrorHandler(
        error,
        this.constructor.name,
        this.findByActivityId.name,
      );
    }
  }

  @Get('course/:id')
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Listagem de Notas por ID do Curso' })
  @ApiParam({
    name: 'id',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
    description: 'ID do Curso',
  })
  async findByCourseId(@Param('id') id: string) {
    try {
      const grades = await this.gradeService.findByCourseId(id);

      return {
        message: 'Grades',
        grades,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, this.findByCourseId.name);
    }
  }

  @Patch(':id')
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Atualização de Notas' })
  @ApiParam({
    name: 'id',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
    description: 'ID da Nota',
  })
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
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Remoção de Notas' })
  @ApiParam({
    name: 'id',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
    description: 'ID da Nota',
  })
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
