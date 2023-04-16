import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddTeacherToCourseDto {
  @ApiProperty({ example: '1', description: 'ID do Curso' })
  @IsNotEmpty({ message: 'course_id is required' })
  course_id: string;

  @ApiProperty({ example: '1', description: 'ID do Professor' })
  @IsNotEmpty({ message: 'teacher_id is required' })
  teacher_id: string;
}
