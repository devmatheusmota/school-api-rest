import { Activity } from 'src/modules/activity/entities/activity.entity';
import { Student } from 'src/modules/student/entities/student.entity';
import { Teacher } from 'src/modules/teacher/entities/teacher.entity';

export class Class {
  public id?: string;
  public name: string;
  public year: number;
  public createdAt?: Date;
  public updatedAt?: Date;
  public teachers?: Teacher[];
  public activities?: Activity[];
  public students?: Student[];
}
