import { Course } from 'src/modules/course/entities/course.entity';
import { Grade } from 'src/modules/grade/entities/grade.entity';

export class Activity {
  public id?: string;
  public name: string;
  public description: string;
  public due_date: Date;
  public course_id: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public course?: Course;
  public grades?: Grade[];
}
