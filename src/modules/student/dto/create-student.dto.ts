import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty({ message: "'name' is required" })
  name: string;

  @IsNotEmpty({ message: "'email' is required" })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsNotEmpty({ message: "'password' is required" })
  password: string;
}
