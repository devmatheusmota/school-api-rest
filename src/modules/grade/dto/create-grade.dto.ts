import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateGradeDto {
  @ApiProperty({ example: 10, description: 'Nota da Atividade' })
  @IsNotEmpty({ message: 'value is required' })
  value: number;

  @ApiProperty({ example: '1', description: 'ID do Aluno' })
  @IsNotEmpty({ message: 'student_id is required' })
  student_id: string;

  @ApiProperty({ example: '1', description: 'ID da Atividade' })
  @IsNotEmpty({ message: 'activity_id is required' })
  activity_id: string;
}
