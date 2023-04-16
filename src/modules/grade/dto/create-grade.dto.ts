import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateGradeDto {
  @ApiProperty({ example: 10, description: 'Nota da Atividade' })
  @IsNotEmpty({ message: 'value is required' })
  value: number;

  @ApiProperty({
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
    description: 'ID do Aluno',
  })
  @IsNotEmpty({ message: 'student_id is required' })
  student_id: string;

  @ApiProperty({
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
    description: 'ID da Atividade',
  })
  @IsNotEmpty({ message: 'activity_id is required' })
  activity_id: string;
}
