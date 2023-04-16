import { Student } from 'src/modules/student/entities/student.entity';

export class StudentCard {
  public id?: string;
  public due_date: Date;
  public createdAt?: Date;
  public updatedAt?: Date;
  public student_id: string;
  public student?: Student;
}
