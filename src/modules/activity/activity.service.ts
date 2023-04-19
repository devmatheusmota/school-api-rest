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

    return activities;
  }

  async findOne(id: string) {
    const activity = await this.activityRepository.findById(id);

    if (!activity) {
      throw new NotFoundException('Activity not found.');
    }

    return activity;
  }

  async findByCourseId(course_id: string) {
    const activities = await this.activityRepository.findByCourseId(course_id);

    if (activities.length === 0) {
      throw new NotFoundException('Activities not found.');
    }

    return activities;
  }

  async findByStudentId(student_id: string) {
    const activities = await this.activityRepository.findByStudentId(
      student_id,
    );

    if (activities.length === 0) {
      throw new NotFoundException('Activities not found.');
    }

    return activities;
  }

  async findByTeacherId(teacher_id: string) {
    const activities = await this.activityRepository.findByTeacherId(
      teacher_id,
    );

    if (activities.length === 0) {
      throw new NotFoundException('Activities not found.');
    }

    return activities;
  }

  async findBySubjectId(subject_id: string) {
    const activities = await this.activityRepository.findBySubjectId(
      subject_id,
    );

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
