import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ description: "Course's name", example: 'Math' })
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @ApiProperty({ example: '2023', description: "Courses's Year" })
  @IsNotEmpty({ message: 'year is required' })
  year: number;
}
