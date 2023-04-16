import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { IStudentRepository } from './repositories/student.repository.interface';
import { hash } from 'bcrypt';

@Injectable()
export class StudentService {
  constructor(
    @Inject('StudentRepository')
    private readonly studentRepository: IStudentRepository,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    createStudentDto.password = await hash(createStudentDto.password, 10);

    const emailExists = await this.studentRepository.checkIfEmailExists(
      createStudentDto.email,
    );

    if (emailExists) {
      throw new BadRequestException('Email already in use!');
    }

    const student = await this.studentRepository.create(createStudentDto);

    return student;
  }

  async findAll() {
    const students = await this.studentRepository.findAll();

    if (students.length === 0) {
      throw new NotFoundException('No students found!');
    }

    return students.map((student) => {
      return { ...student, password: undefined };
    });
  }

  async findOne(id: string) {
    const student = await this.studentRepository.findById(id);

    if (!student) {
      throw new NotFoundException('Student not found!');
    }

    return { ...student, password: undefined };
  }

  async findByEmail(email: string) {
    const student = await this.studentRepository.findByEmail(email);

    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const studentExists = await this.studentRepository.findById(id);

    if (!studentExists) {
      throw new NotFoundException('Student not found!');
    }

    if (updateStudentDto.password) {
      updateStudentDto.password = await hash(updateStudentDto.password, 10);
    }

    if (
      updateStudentDto.email &&
      updateStudentDto.email !== studentExists.email
    ) {
      const studentExists = await this.studentRepository.findByEmail(
        updateStudentDto.email,
      );

      if (studentExists) {
        throw new BadRequestException('Email already in use.');
      }
    }

    const student = await this.studentRepository.update(id, updateStudentDto);

    return student;
  }

  async remove(id: string) {
    const studentExists = await this.studentRepository.findById(id);

    if (!studentExists) {
      throw new NotFoundException('Student not found!');
    }

    await this.studentRepository.delete(id);
  }
}
