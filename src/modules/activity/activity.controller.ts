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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Activity')
@UseGuards(AuthGuard('jwt'))
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiBearerAuth()
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
  @ApiBearerAuth()
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listagem de Atividades pelo ID' })
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listagem de Atividades pelo ID do Curso' })
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listagem de Atividades pelo ID do Estudante' })
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listagem de Atividades pelo ID do Professor' })
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

  @Patch(':id')
  @Roles(ROLE.ADMIN, ROLE.TEACHER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualização de Atividades' })
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remoção de Atividades' })
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
