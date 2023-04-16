import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddStudentToCourseDto {
  @ApiProperty({ example: '1', description: 'ID do Curso' })
  @IsNotEmpty({ message: 'course_id is required' })
  course_id: string;

  @ApiProperty({ example: '1', description: 'ID do Estudante' })
  @IsNotEmpty({ message: 'student_id is required' })
  student_id: string;
}
