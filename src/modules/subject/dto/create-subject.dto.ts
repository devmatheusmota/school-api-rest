import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({ example: 'Matemática', description: 'Nome da Disciplina' })
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @ApiProperty({
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
    description: 'ID do Professor',
  })
  @IsNotEmpty({ message: 'teacher_id is required' })
  teacher_id: string;
}
