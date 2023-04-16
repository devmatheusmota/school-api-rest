import { Activity } from '../entities/activity.entity';

export interface IActivityRepository {
  create(activity: Activity): Promise<Activity>;
  update(id: string, activity: Partial<Activity>): Promise<Activity>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Activity | undefined>;
  findAll(): Promise<Activity[]>;
}
