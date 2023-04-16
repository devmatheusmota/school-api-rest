import { Address } from 'src/modules/address/entities/address.entity';
import { Class } from 'src/modules/class/entities/class.entity';
import { Grade } from 'src/modules/grade/entities/grade.entity';

export class Student {
  public id?: string;
  public name: string;
  public email: string;
  public password: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public class_id?: string;
  public class?: Class;
  public grades?: Grade[];
  public address?: Address;
}
