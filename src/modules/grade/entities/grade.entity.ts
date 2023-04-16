import { Activity } from 'src/modules/activity/entities/activity.entity';
import { Student } from 'src/modules/student/entities/student.entity';

export class Grade {
  public id?: string;
  public value: number;
  public student_id: string;
  public activity_id: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public student?: Student;
  public activity?: Activity;
}
