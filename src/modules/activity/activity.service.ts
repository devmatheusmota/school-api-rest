import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { IActivityRepository } from './repositories/activity.repository.interface';

@Injectable()
export class ActivityService {
  constructor(
    @Inject('ActivityRepository')
    private activityRepository: IActivityRepository,
  ) {}

  async create(createActivityDto: CreateActivityDto) {
    createActivityDto.due_date = new Date(createActivityDto.due_date);

    const activity = await this.activityRepository.create(createActivityDto);

    return activity;
  }

  async findAll() {
    const activities = await this.activityRepository.findAll();

    if (activities.length === 0) {
      throw new NotFoundException('No activities found.');
    }
  }

  async findOne(id: string) {
    const activity = await this.activityRepository.findById(id);

    if (!activity) {
      throw new NotFoundException('Activity not found.');
    }

    return activity;
  }

  async findByCourseId(courseId: string) {
    const activities = await this.activityRepository.findByCourseId(courseId);

    if (activities.length === 0) {
      throw new NotFoundException('Activities not found.');
    }

    return activities;
  }

  async findByStudentId(studentId: string) {
    const activities = await this.activityRepository.findByStudentId(studentId);

    if (activities.length === 0) {
      throw new NotFoundException('Activities not found.');
    }

    return activities;
  }

  async findByTeacherId(teacherId: string) {
    const activities = await this.activityRepository.findByTeacherId(teacherId);

    if (activities.length === 0) {
      throw new NotFoundException('Activities not found.');
    }

    return activities;
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    const activityExists = await this.activityRepository.findById(id);

    if (!activityExists) {
      throw new NotFoundException('Activity not found.');
    }

    const activity = await this.activityRepository.update(
      id,
      updateActivityDto,
    );

    return activity;
  }

  async remove(id: string) {
    const activityExists = await this.activityRepository.findById(id);

    if (!activityExists) {
      throw new NotFoundException('Activity not found.');
    }

    await this.activityRepository.delete(id);
  }
}
