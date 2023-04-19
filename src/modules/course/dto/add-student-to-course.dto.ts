import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddStudentToCourseDto {
  @ApiProperty({
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
    description: 'Course ID',
  })
  @IsNotEmpty({ message: 'course_id is required' })
  course_id: string;

  @ApiProperty({
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
    description: 'Student ID',
  })
  @IsNotEmpty({ message: 'student_id is required' })
  student_id: string;
}
