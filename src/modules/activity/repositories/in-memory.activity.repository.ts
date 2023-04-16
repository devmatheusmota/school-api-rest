import { randomUUID } from 'crypto';
import { IActivityRepository } from './activity.repository.interface';
import { Activity } from '../entities/activity.entity';

export class InMemoryActivityRepository implements IActivityRepository {
  private activity: Activity[] = [];

  async create(data: Activity): Promise<Activity> {
    const activity = new Activity(data);

    activity.id = randomUUID();

    this.activity.push(activity);

    return activity;
  }

  async findById(id: string): Promise<Activity> {
    const activity = this.activity.find((activity) => activity.id === id);

    return activity;
  }

  async findAll(): Promise<Activity[]> {
    const activity = this.activity;

    return activity;
  }

  async update(id: string, activity: Activity): Promise<Activity> {
    const activityIndex = this.activity.findIndex(
      (activity) => activity.id === id,
    );
    activity.id = this.activity[activityIndex].id;
    this.activity[activityIndex] = activity;

    return activity;
  }

  async delete(id: string): Promise<void> {
    const activityIndex = this.activity.findIndex(
      (activity) => activity.id === id,
    );

    this.activity.splice(activityIndex, 1);
  }
}
