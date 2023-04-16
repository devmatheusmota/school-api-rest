import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ example: 'Matemática', description: 'Nome do Curso' })
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @ApiProperty({ example: '2023', description: 'Ano do Curso' })
  @IsNotEmpty({ message: 'year is required' })
  year: number;
}
