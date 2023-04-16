import { PartialType } from '@nestjs/swagger';
import { CreateStudentCardDto } from './create-student-card.dto';

export class UpdateStudentCardDto extends PartialType(CreateStudentCardDto) {}
