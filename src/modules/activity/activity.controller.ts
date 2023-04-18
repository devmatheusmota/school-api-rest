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
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ErrorHandler } from 'src/error/ErrorHandler';
import { ROLE, Roles } from 'src/roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Activity')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Criação de Atividades' })
  async create(@Body() createActivityDto: CreateActivityDto) {
    try {
      const activity = await this.activityService.create(createActivityDto);

      return {
        message: 'Activity created successfully.',
        activity,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, 'create');
    }
  }

  @Get()
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Listagem de Atividades' })
  async findAll() {
    try {
      const activities = await this.activityService.findAll();

      return {
        message: 'Activities',
        activities,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, 'findAll');
    }
  }

  @Get(':id')
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Listagem de Atividades pelo ID' })
  @ApiParam({
    name: 'id',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
    description: 'ID da Atividade',
  })
  async findOne(@Param('id') id: string) {
    try {
      const activity = await this.activityService.findOne(id);

      return {
        message: 'Activity',
        activity,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, 'findOne');
    }
  }

  @Get('course/:id')
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Listagem de Atividades pelo ID do Curso' })
  @ApiParam({
    name: 'id',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
    description: 'ID do Curso',
  })
  async findByCourseId(@Param('id') id: string) {
    try {
      const activities = await this.activityService.findByCourseId(id);

      return {
        message: 'Activities',
        activities,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, 'findByCourseId');
    }
  }

  @Get('student/:id')
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Listagem de Atividades pelo ID do Estudante' })
  @ApiParam({
    name: 'id',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
    description: 'ID do Estudante',
  })
  async findByStudentId(@Param('id') id: string) {
    try {
      const activities = await this.activityService.findByStudentId(id);

      return {
        message: 'Activities',
        activities,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, 'findByStudentId');
    }
  }

  @Get('teacher/:id')
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Listagem de Atividades pelo ID do Professor' })
  @ApiParam({
    name: 'id',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
    description: 'ID do Professor',
  })
  async findByTeacherId(@Param('id') id: string) {
    try {
      const activities = await this.activityService.findByTeacherId(id);

      return {
        message: 'Activities',
        activities,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, 'findByTeacherId');
    }
  }

  @Get('subject/:id')
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Listagem de Atividades pelo ID da Disciplina' })
  @ApiParam({
    name: 'id',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
    description: 'ID da Disciplina',
  })
  async findBySubjectId(@Param('id') id: string) {
    try {
      const activities = await this.activityService.findBySubjectId(id);

      return {
        message: 'Activities',
        activities,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, 'findBySubjectId');
    }
  }

  @Patch(':id')
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiOperation({ summary: 'Atualização de Atividades' })
  @ApiParam({
    name: 'id',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
    description: 'ID da Atividade',
  })
  async update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    try {
      const activity = await this.activityService.update(id, updateActivityDto);

      return {
        message: 'Activity updated successfully.',
        activity,
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, 'update');
    }
  }

  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @Delete(':id')
  @ApiOperation({ summary: 'Remoção de Atividades' })
  @ApiParam({
    name: 'id',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
    description: 'ID da Atividade',
  })
  async remove(@Param('id') id: string) {
    try {
      await this.activityService.remove(id);

      return {
        message: 'Activity deleted successfully.',
      };
    } catch (error) {
      new ErrorHandler(error, this.constructor.name, 'remove');
    }
  }
}
