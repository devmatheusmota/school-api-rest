import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({
    description: 'Subject Name',
    example: 'Math',
  })
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @ApiProperty({
    description: 'Teacher ID',
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
  })
  @IsNotEmpty({ message: 'teacher_id is required' })
  teacher_id: string;
}
