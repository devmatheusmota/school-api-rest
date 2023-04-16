import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentCardDto } from './dto/create-student-card.dto';
import { UpdateStudentCardDto } from './dto/update-student-card.dto';
import { IStudentCardRepository } from './repositories/student-card.repository.interface';

@Injectable()
export class StudentCardService {
  constructor(
    @Inject('StudentCardRepository')
    private readonly studentCardRepository: IStudentCardRepository,
  ) {}

  async create(createStudentCardDto: CreateStudentCardDto) {
    const studentCardExists = await this.studentCardRepository.findByStudentId(
      createStudentCardDto.student_id,
    );

    if (studentCardExists) {
      throw new BadRequestException('Student card already exists.');
    }

    createStudentCardDto.due_date = new Date(createStudentCardDto.due_date);

    const studentCard = await this.studentCardRepository.create(
      createStudentCardDto,
    );

    return studentCard;
  }

  async findAll() {
    const studentCards = await this.studentCardRepository.findAll();

    if (studentCards.length === 0) {
      throw new NotFoundException('No student cards found.');
    }

    return studentCards;
  }

  async findOne(id: string) {
    const studentCard = await this.studentCardRepository.findById(id);

    if (!studentCard) {
      throw new NotFoundException('Student card not found.');
    }

    return studentCard;
  }

  async update(id: string, updateStudentCardDto: UpdateStudentCardDto) {
    const studentCardExists = await this.studentCardRepository.findById(id);

    if (!studentCardExists) {
      throw new NotFoundException('Student card not found.');
    }

    if (updateStudentCardDto.due_date) {
      updateStudentCardDto.due_date = new Date(updateStudentCardDto.due_date);
    }

    const updatedStudentCard = await this.studentCardRepository.update(
      id,
      updateStudentCardDto,
    );

    return updatedStudentCard;
  }

  async remove(id: string) {
    const studentCardExists = await this.studentCardRepository.findById(id);

    if (!studentCardExists) {
      throw new NotFoundException('Student card not found.');
    }

    await this.studentCardRepository.delete(id);
  }
}
