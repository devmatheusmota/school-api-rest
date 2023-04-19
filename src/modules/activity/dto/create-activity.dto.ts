import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateActivityDto {
  @ApiProperty({
    description: "Activity's name",
    example: 'Activity 1',
  })
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @ApiProperty({
    description: "Activity's description",
    example: "Math's Activity",
  })
  @IsNotEmpty({ message: 'description is required' })
  description: string;

  @ApiProperty({
    description: 'Due Date',
    example: '2023-04-20',
  })
  @IsNotEmpty({ message: 'due_date is required' })
  due_date: Date;

  @ApiProperty({
    description: 'Course ID',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
  })
  @IsNotEmpty({ message: 'course_id is required' })
  course_id: string;

  @ApiProperty({
    description: 'Subject ID',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
  })
  @IsNotEmpty({ message: 'subject_id is required' })
  subject_id: string;
}
