import { Test, TestingModule } from '@nestjs/testing';
import { TeacherService } from './teacher.service';
import { InMemoryTeacherRepository } from './repositories/in-memory.teacher.repository';
import { compare } from 'bcrypt';

describe('TeacherService', () => {
  let service: TeacherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeacherService,
        { provide: 'TeacherRepository', useClass: InMemoryTeacherRepository },
      ],
    }).compile();

    service = module.get<TeacherService>(TeacherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a teacher', async () => {
      const teacher = await service.create({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      });

      expect(teacher).toHaveProperty('id');
      expect(teacher.name).toBe('John Doe');
      expect(teacher.email).toBe('johndoe@gmail.com');
      expect(await compare('123456', teacher.password)).toBeTruthy();
    });

    it('should not create a teacher with an existing email', async () => {
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
    it('should return an array of teachers', async () => {
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

      const teachers = await service.findAll();

      expect(teachers).toHaveLength(2);
    });

    it('should throw if there are no teachers', async () => {
      await expect(service.findAll()).rejects.toThrow();
    });

    it('should not return the password', async () => {
      await service.create({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      });

      const teachers = await service.findAll();

      expect(teachers[0].password).toBeUndefined();
    });
  });

  describe('findOne', () => {
    it('should return a teacher', async () => {
      const teacher = await service.create({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      });

      const foundteacher = await service.findOne(teacher.id);

      expect(foundteacher).toHaveProperty('id');
      expect(foundteacher.name).toBe('John Doe');
      expect(foundteacher.email).toBe('johndoe@gmail.com');
    });

    it('should throw if the teacher does not exist', async () => {
      await expect(service.findOne('invalid-id')).rejects.toThrow();
    });

    it('should not return the password', async () => {
      const teacher = await service.create({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      });

      const foundteacher = await service.findOne(teacher.id);

      expect(foundteacher.password).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update a teacher', async () => {
      const teacher = await service.create({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      });

      const updatedteacher = await service.update(teacher.id, {
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
        password: '123456',
      });

      expect(updatedteacher).toHaveProperty('id');
      expect(updatedteacher.name).toBe('Jane Doe');
      expect(updatedteacher.email).toBe('janedoe@gmail.com');
      expect(await compare('123456', updatedteacher.password)).toBeTruthy();
    });

    it('should throw if the teacher does not exist', async () => {
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
    it('should remove a teacher', async () => {
      const teacher = await service.create({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      });

      await service.remove(teacher.id);

      await expect(service.findOne(teacher.id)).rejects.toThrow();
    });
  });
});
