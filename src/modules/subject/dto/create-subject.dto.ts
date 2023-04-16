import { IsNotEmpty } from 'class-validator';

export class CreateSubjectDto {
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsNotEmpty({ message: 'teacher_id is required' })
  teacher_id: string;
}
