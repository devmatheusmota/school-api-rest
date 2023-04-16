import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateStudentCardDto {
  @ApiProperty({ example: '2024-01-01', description: 'Data de Vencimento' })
  @IsNotEmpty({ message: 'due_date is required' })
  due_date: Date;

  @ApiProperty({
    example: 'f72181fe-5bf3-43fb-ab02-c1600f807efd',
    description: 'ID do Aluno',
  })
  @IsNotEmpty({ message: 'student_id is required' })
  student_id: string;
}
