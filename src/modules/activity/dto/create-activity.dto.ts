import { IsNotEmpty } from 'class-validator';

export class CreateActivityDto {
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsNotEmpty({ message: 'description is required' })
  description: string;

  @IsNotEmpty({ message: 'due_date is required' })
  due_date: Date;

  @IsNotEmpty({ message: 'course_id is required' })
  course_id: string;
}
