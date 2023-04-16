import { IsNotEmpty } from 'class-validator';

export class CreateStudentCardDto {
  @IsNotEmpty({ message: 'due_date is required' })
  due_date: Date;

  @IsNotEmpty({ message: 'student_id is required' })
  student_id: string;
}
