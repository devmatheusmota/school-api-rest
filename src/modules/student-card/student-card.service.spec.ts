import { Test, TestingModule } from '@nestjs/testing';
import { StudentCardService } from './student-card.service';
import { InMemoryStudentCardRepository } from './repositories/in-memory.student-card.repository';

describe('StudentCardService', () => {
  let service: StudentCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentCardService,
        {
          provide: 'StudentCardRepository',
          useClass: InMemoryStudentCardRepository,
        },
      ],
    }).compile();

    service = module.get<StudentCardService>(StudentCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a student card', async () => {
      const studentCard = await service.create({
        student_id: 'Test Student ID',
        due_date: new Date(),
      });
      expect(studentCard).toHaveProperty('id');
      expect(studentCard).toHaveProperty('student_id', 'Test Student ID');
    });

    it('should throw if student card already exists', async () => {
      await service.create({
        student_id: 'Test Student ID',
        due_date: new Date(),
      });
      await expect(
        service.create({
          student_id: 'Test Student ID',
          due_date: new Date(),
        }),
      ).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return an array of student cards', async () => {
      await service.create({
        student_id: 'Test Student ID',
        due_date: new Date(),
      });

      const studentCards = await service.findAll();

      expect(studentCards).toBeInstanceOf(Array);
    });

    it('should throw if no student cards are found', async () => {
      await expect(service.findAll()).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    it('should return a student card', async () => {
      const studentCard = await service.create({
        student_id: 'Test Student ID',
        due_date: new Date(),
      });

      const foundStudentCard = await service.findOne(studentCard.id);

      expect(foundStudentCard).toHaveProperty('id', studentCard.id);
      expect(foundStudentCard).toHaveProperty('student_id', 'Test Student ID');
    });

    it('should throw if student card is not found', async () => {
      await expect(service.findOne('Test Student Card ID')).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a student card', async () => {
      const studentCard = await service.create({
        student_id: 'Test Student ID',
        due_date: new Date(),
      });

      const updatedStudentCard = await service.update(studentCard.id, {
        student_id: 'Test Student ID',
        due_date: new Date(),
      });

      expect(updatedStudentCard).toHaveProperty('id', studentCard.id);
      expect(updatedStudentCard).toHaveProperty(
        'student_id',
        'Test Student ID',
      );
    });

    it('should throw if student card is not found', async () => {
      await expect(
        service.update('Test Student Card ID', {
          student_id: 'Test Student ID',
          due_date: new Date(),
        }),
      ).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove a student card', async () => {
      const studentCard = await service.create({
        student_id: 'Test Student ID',
        due_date: new Date(),
      });

      await service.remove(studentCard.id);

      await expect(service.findOne(studentCard.id)).rejects.toThrow();
    });

    it('should throw if student card is not found', async () => {
      await expect(service.remove('Test Student Card ID')).rejects.toThrow();
    });
  });
});
