import { Class } from 'src/modules/class/entities/class.entity';
import { Subject } from 'src/modules/subject/entities/subject.entity';

export class Teacher {
  public id?: string;
  public name: string;
  public email: string;
  public password: string;
  public created_at?: Date;
  public updated_at?: Date;
  public subjects?: Subject[];
  public classes?: Class[];
}
