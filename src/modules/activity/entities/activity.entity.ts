import { Class } from 'src/modules/class/entities/class.entity';
import { Grade } from 'src/modules/grade/entities/grade.entity';

export class Activity {
  public id?: string;
  public name: string;
  public description: string;
  public due_date: Date;
  public class_id: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public class?: Class;
  public grades?: Grade[];
}
