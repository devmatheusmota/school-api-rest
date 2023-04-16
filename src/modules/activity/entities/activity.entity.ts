export class Activity {
  public id?: string;
  public name: string;
  public description: string;
  public due_date: Date;
  public class_id: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>) {
    Object.assign(this, props);
  }
}
