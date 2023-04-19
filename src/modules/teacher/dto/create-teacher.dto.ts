import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({
    description: 'Teacher Name',
    example: 'John Doe',
  })
  @IsNotEmpty({ message: 'name is required!' })
  name: string;

  @ApiProperty({
    description: 'Teacher Email',
    example: 'johndoe@mail.com',
  })
  @IsNotEmpty({ message: 'email is required!' })
  @IsEmail({}, { message: 'Email is invalid!' })
  email: string;

  @ApiProperty({
    description: 'Teacher Password',
    example: '123456',
  })
  @IsNotEmpty({ message: 'password is required!' })
  password: string;
}
