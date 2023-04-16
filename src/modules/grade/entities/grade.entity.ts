export class Grade {
  public id?: string;
  public value: number;
  public student_id: string;
  public activity_id: string;
  public created_at?: Date;
  public updated_at?: Date;

  constructor(props: Omit<Grade, 'id' | 'created_at' | 'updated_at'>) {
    Object.assign(this, props);
  }
}
