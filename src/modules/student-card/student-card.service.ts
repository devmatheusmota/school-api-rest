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
    private readonly student_cardRepository: IStudentCardRepository,
  ) {}

  async create(createStudentCardDto: CreateStudentCardDto) {
    const student_cardExists =
      await this.student_cardRepository.findByStudentId(
        createStudentCardDto.student_id,
      );

    if (student_cardExists) {
      throw new BadRequestException('Student card already exists.');
    }

    createStudentCardDto.due_date = new Date(createStudentCardDto.due_date);

    const student_card = await this.student_cardRepository.create(
      createStudentCardDto,
    );

    return student_card;
  }

  async findAll() {
    const student_cards = await this.student_cardRepository.findAll();

    if (student_cards.length === 0) {
      throw new NotFoundException('No student cards found.');
    }

    return student_cards;
  }

  async findOne(id: string) {
    const student_card = await this.student_cardRepository.findById(id);

    if (!student_card) {
      throw new NotFoundException('Student card not found.');
    }

    return student_card;
  }

  async update(id: string, updateStudentCardDto: UpdateStudentCardDto) {
    const student_cardExists = await this.student_cardRepository.findById(id);

    if (!student_cardExists) {
      throw new NotFoundException('Student card not found.');
    }

    if (updateStudentCardDto.due_date) {
      updateStudentCardDto.due_date = new Date(updateStudentCardDto.due_date);
    }

    const updatedStudentCard = await this.student_cardRepository.update(
      id,
      updateStudentCardDto,
    );

    return updatedStudentCard;
  }

  async remove(id: string) {
    const student_cardExists = await this.student_cardRepository.findById(id);

    if (!student_cardExists) {
      throw new NotFoundException('Student card not found.');
    }

    await this.student_cardRepository.delete(id);
  }
}
