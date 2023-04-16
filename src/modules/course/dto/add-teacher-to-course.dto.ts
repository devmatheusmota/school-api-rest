import { IsNotEmpty } from 'class-validator';

export class AddTeacherToCourseDto {
  @IsNotEmpty({ message: 'course_id is required' })
  course_id: string;

  @IsNotEmpty({ message: 'teacher_id is required' })
  teacher_id: string;
}
