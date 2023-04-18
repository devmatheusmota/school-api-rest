import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateActivityDto {
  @ApiProperty({ example: 'Atividade 1', description: 'Nome da atividade' })
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @ApiProperty({
    example: 'Atividade de matemática',
    description: 'Descrição da atividade',
  })
  @IsNotEmpty({ message: 'description is required' })
  description: string;

  @ApiProperty({ example: '2023-04-20', description: 'Data de entrega' })
  @IsNotEmpty({ message: 'due_date is required' })
  due_date: Date;

  @ApiProperty({
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
    description: 'ID do Curso',
  })
  @IsNotEmpty({ message: 'course_id is required' })
  course_id: string;

  @ApiProperty({
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
    description: 'ID da Disciplina',
  })
  @IsNotEmpty({ message: 'subject_id is required' })
  subject_id: string;
}
