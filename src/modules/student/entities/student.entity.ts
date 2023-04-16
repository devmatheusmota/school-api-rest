import { Address } from 'src/modules/address/entities/address.entity';
import { Course } from 'src/modules/course/entities/course.entity';
import { Grade } from 'src/modules/grade/entities/grade.entity';

export class Student {
  public id?: string;
  public name: string;
  public email: string;
  public password: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public course_id?: string;
  public course?: Course;
  public grades?: Grade[];
  public address?: Address;
}
