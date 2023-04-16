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

  @ApiProperty({ example: '1', description: 'ID do Curso' })
  @IsNotEmpty({ message: 'course_id is required' })
  course_id: string;
}
