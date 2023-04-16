import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({ example: 'John Doe', description: 'Nome do Professor' })
  @IsNotEmpty({ message: 'name is required!' })
  name: string;

  @ApiProperty({
    example: 'johndoe@mail.com',
    description: 'Email do Professor',
  })
  @IsNotEmpty({ message: 'email is required!' })
  @IsEmail({}, { message: 'Email is invalid!' })
  email: string;

  @ApiProperty({ example: '123456', description: 'Senha do Professor' })
  @IsNotEmpty({ message: 'password is required!' })
  password: string;
}
