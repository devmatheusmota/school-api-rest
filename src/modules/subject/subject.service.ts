import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { ISubjectRepository } from './repositories/subject.repository.interface';

@Injectable()
export class SubjectService {
  constructor(
    @Inject('SubjectRepository')
    private readonly subjectRepository: ISubjectRepository,
  ) {}

  async create(createSubjectDto: CreateSubjectDto) {
    const subjectExists = await this.subjectRepository.findByName(
      createSubjectDto.name,
    );

    if (subjectExists) {
      throw new NotFoundException('Subject already exists');
    }

    const subject = await this.subjectRepository.create(createSubjectDto);

    return subject;
  }

  async findAll() {
    const subjects = await this.subjectRepository.findAll();

    if (subjects.length === 0) {
      throw new NotFoundException('No subjects found');
    }

    return subjects;
  }

  async findOne(id: string) {
    const subject = await this.subjectRepository.findById(id);

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    return subject;
  }

  async update(id: string, updateSubjectDto: UpdateSubjectDto) {
    const subjectExists = await this.subjectRepository.findById(id);

    if (!subjectExists) {
      throw new NotFoundException('Subject not found');
    }

    const subject = await this.subjectRepository.update(id, updateSubjectDto);

    return subject;
  }

  async remove(id: string) {
    const subjectExists = await this.subjectRepository.findById(id);

    if (!subjectExists) {
      throw new NotFoundException('Subject not found');
    }

    await this.subjectRepository.delete(id);
  }
}
