export class Teacher {
  public id?: string;
  public name: string;
  public email: string;
  public password: string;
  public class_id?: string;
  public created_at?: Date;
  public updated_at?: Date;

  constructor(props: Omit<Teacher, 'id' | 'created_at' | 'updated_at'>) {
    Object.assign(this, props);
  }
}
