import { IsNotEmpty } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsNotEmpty({ message: 'year is required' })
  year: number;
}
