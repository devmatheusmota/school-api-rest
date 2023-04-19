import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateStudentCardDto {
  @ApiProperty({
    description: 'Due Date',
    example: '2024-01-01',
  })
  @IsNotEmpty({ message: 'due_date is required' })
  due_date: Date;

  @ApiProperty({
    description: 'Student ID',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
  })
  @IsNotEmpty({ message: 'student_id is required' })
  student_id: string;
}
