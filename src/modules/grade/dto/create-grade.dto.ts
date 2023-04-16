import { IsNotEmpty } from 'class-validator';

export class CreateGradeDto {
  @IsNotEmpty({ message: 'value is required' })
  value: number;

  @IsNotEmpty({ message: 'student_id is required' })
  student_id: string;

  @IsNotEmpty({ message: 'activity_id is required' })
  activity_id: string;
}
