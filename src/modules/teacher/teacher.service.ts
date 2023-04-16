import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ITeacherRepository } from './repositories/teacher.repository.interface';
import { hash } from 'bcrypt';

@Injectable()
export class TeacherService {
  constructor(
    @Inject('TeacherRepository')
    private readonly teacherRepository: ITeacherRepository,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const teacherExists = await this.teacherRepository.findByEmail(
      createTeacherDto.email,
    );
    if (teacherExists) {
      throw new BadRequestException('Teacher already exists!');
    }

    createTeacherDto.password = await hash(createTeacherDto.password, 10);

    const teacher = await this.teacherRepository.create(createTeacherDto);

    return teacher;
  }

  async findAll() {
    const teachers = await this.teacherRepository.findAll();

    if (teachers.length === 0) {
      throw new NotFoundException('No teachers found!');
    }

    return teachers.map((teacher) => {
      return {
        ...teacher,
        password: undefined,
      };
    });
  }

  async findOne(id: string) {
    const teacher = await this.teacherRepository.findById(id);

    if (!teacher) {
      throw new NotFoundException('Teacher not found!');
    }

    return { ...teacher, password: undefined };
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {
    const teacherExists = await this.teacherRepository.findById(id);

    if (!teacherExists) {
      throw new NotFoundException('Teacher not found!');
    }

    if (updateTeacherDto.password) {
      updateTeacherDto.password = await hash(updateTeacherDto.password, 10);
    }

    if (
      updateTeacherDto.email &&
      updateTeacherDto.email !== teacherExists.email
    ) {
      const teacherExists = await this.teacherRepository.findByEmail(
        updateTeacherDto.email,
      );

      if (teacherExists) {
        throw new BadRequestException('Email already in use.');
      }
    }

    const teacher = await this.teacherRepository.update(id, updateTeacherDto);

    return teacher;
  }

  async remove(id: string) {
    const teacherExists = await this.teacherRepository.findById(id);

    if (!teacherExists) {
      throw new NotFoundException('Teacher not found!');
    }

    await this.teacherRepository.delete(id);
  }
}
