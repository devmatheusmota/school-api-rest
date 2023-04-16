import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { InMemoryStudentRepository } from './repositories/in-memory.student.repository';
import { compare } from 'bcrypt';

describe('StudentService', () => {
  let service: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: 'StudentRepository',
          useClass: InMemoryStudentRepository,
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a student', async () => {
      const student = await service.create({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      });

      expect(student).toHaveProperty('id');
      expect(student.name).toBe('John Doe');
      expect(student.email).toBe('johndoe@gmail.com');
      expect(await compare('123456', student.password)).toBeTruthy();
    });

    it('should not create a student with an existing email', async () => {
      await service.create({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      });

      await expect(
        service.create({
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          password: '123456',
        }),
      ).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      await service.create({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      });

      await service.create({
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
        password: '123456',
      });

      const students = await service.findAll();

      expect(students).toHaveLength(2);
    });

    it('should throw if there are no students', async () => {
      await expect(service.findAll()).rejects.toThrow();
    });

    it('should not return the password', async () => {
      await service.create({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      });

      const students = await service.findAll();

      expect(students[0].password).toBeUndefined();
    });
  });

  describe('findOne', () => {
    it('should return a student', async () => {
      const student = await service.create({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      });

      const foundStudent = await service.findOne(student.id);

      expect(foundStudent).toHaveProperty('id');
      expect(foundStudent.name).toBe('John Doe');
      expect(foundStudent.email).toBe('johndoe@gmail.com');
    });

    it('should throw if the student does not exist', async () => {
      await expect(service.findOne('invalid-id')).rejects.toThrow();
    });

    it('should not return the password', async () => {
      const student = await service.create({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      });

      const foundStudent = await service.findOne(student.id);

      expect(foundStudent.password).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update a student', async () => {
      const student = await service.create({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      });

      const updatedStudent = await service.update(student.id, {
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
        password: '123456',
      });

      expect(updatedStudent).toHaveProperty('id');
      expect(updatedStudent.name).toBe('Jane Doe');
      expect(updatedStudent.email).toBe('janedoe@gmail.com');
      expect(await compare('123456', updatedStudent.password)).toBeTruthy();
    });

    it('should throw if the student does not exist', async () => {
      await expect(
        service.update('invalid-id', {
          name: 'Jane Doe',
          email: 'johndoe@gmail.com',
          password: '123456',
        }),
      ).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove a student', async () => {
      const student = await service.create({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      });

      await service.remove(student.id);

      await expect(service.findOne(student.id)).rejects.toThrow();
    });
  });
});
