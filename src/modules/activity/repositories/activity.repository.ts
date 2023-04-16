import { PrismaService } from 'src/prisma/prisma.service';
import { Activity } from '../entities/activity.entity';
import { IActivityRepository } from './activity.repository.interface';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ActivityRepository implements IActivityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Activity): Promise<Activity> {
    const classExists = await this.prisma.class.findFirst({
      where: {
        id: data.class_id,
      },
    });

    if (!classExists) {
      throw new NotFoundException('Class not found.');
    }

    const activity = await this.prisma.activity.create({
      data,
    });

    return activity;
  }

  async findById(id: string): Promise<Activity> {
    const activity = await this.prisma.activity.findUnique({
      where: {
        id,
      },
    });

    return activity;
  }

  async findAll(): Promise<Activity[]> {
    const activities = await this.prisma.activity.findMany();

    return activities;
  }

  async update(id: string, data: Activity): Promise<Activity> {
    const activity = await this.prisma.activity.update({
      where: {
        id,
      },
      data,
    });

    return activity;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.activity.delete({
      where: {
        id,
      },
    });
  }
}
