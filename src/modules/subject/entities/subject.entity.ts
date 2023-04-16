export class Subject {
  public id?: string;
  public name: string;
  public teacher_id: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: Omit<Subject, 'id'>) {
    Object.assign(this, props);
  }
}
