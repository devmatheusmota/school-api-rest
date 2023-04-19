import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({
    description: 'Student name',
    example: 'John Doe',
  })
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @ApiProperty({
    description: 'Student Email',
    example: 'johndoe@gmail.com',
  })
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @ApiProperty({
    description: 'Student Password',
    example: '123456',
  })
  @IsNotEmpty({ message: 'password is required' })
  password: string;
}
