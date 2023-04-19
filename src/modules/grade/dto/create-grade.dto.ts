import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateGradeDto {
  @ApiProperty({ description: "Activity's Grade", example: 10 })
  @IsNotEmpty({ message: 'value is required' })
  value: number;

  @ApiProperty({
    description: 'Student ID',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
  })
  @IsNotEmpty({ message: 'student_id is required' })
  student_id: string;

  @ApiProperty({
    description: 'Activity ID',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
  })
  @IsNotEmpty({ message: 'activity_id is required' })
  activity_id: string;
}
