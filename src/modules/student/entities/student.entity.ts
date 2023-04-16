export class Student {
  public id?: string;
  public name: string;
  public email: string;
  public password: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) {
    Object.assign(this, props);
  }
}
