import { IsNotEmpty } from 'class-validator';

export class AddStudentToCourseDto {
  @IsNotEmpty({ message: 'course_id is required' })
  course_id: string;

  @IsNotEmpty({ message: 'student_id is required' })
  student_id: string;
}
