import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { IGradeRepository } from './repositories/grade.repository.interface';

@Injectable()
export class GradeService {
  constructor(
    @Inject('GradeRepository')
    private readonly gradeRepository: IGradeRepository,
  ) {}

  async create(createGradeDto: CreateGradeDto) {
    const gradeExists = await this.gradeRepository.checkIfExists(
      createGradeDto.student_id,
      createGradeDto.activity_id,
    );

    if (gradeExists) {
      throw new BadRequestException('Grade already exists. You can update it.');
    }

    const grade = await this.gradeRepository.create(createGradeDto);

    return grade;
  }

  async findAll() {
    const grade = await this.gradeRepository.findAll();

    if (grade.length === 0) {
      throw new NotFoundException('No grades found');
    }

    return grade;
  }

  async findOne(id: string) {
    const grade = await this.gradeRepository.findById(id);

    if (!grade) {
      throw new NotFoundException('Grade not found');
    }

    return grade;
  }

  async findByStudentId(studentId: string) {
    const grades = await this.gradeRepository.findByStudentId(studentId);

    if (grades.length === 0) {
      throw new NotFoundException('No grades found');
    }

    return grades;
  }

  async findByActivityId(activityId: string) {
    const grades = await this.gradeRepository.findByActivityId(activityId);

    if (grades.length === 0) {
      throw new NotFoundException('No grades found');
    }

    return grades;
  }

  async findByCourseId(courseId: string) {
    const grades = await this.gradeRepository.findByCourseId(courseId);

    if (grades.length === 0) {
      throw new NotFoundException('No grades found');
    }

    return grades;
  }

  async update(id: string, updateGradeDto: UpdateGradeDto) {
    const gradeExists = await this.gradeRepository.findById(id);

    if (!gradeExists) {
      throw new NotFoundException('Grade not found');
    }

    const grade = await this.gradeRepository.update(id, updateGradeDto);

    return grade;
  }

  async remove(id: string) {
    const gradeExists = await this.gradeRepository.findById(id);

    if (!gradeExists) {
      throw new NotFoundException('Grade not found');
    }

    await this.gradeRepository.delete(id);
  }
}
