import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ErrorHandler } from 'src/error/ErrorHandler';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
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

  @Patch(':id')
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

  @Delete(':id')
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
