import { Test, TestingModule } from '@nestjs/testing';
import { GradeService } from './grade.service';
import { InMemoryGradeRepository } from './repositories/in-memory.grade.repository';

describe('GradeService', () => {
  let service: GradeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GradeService,
        {
          provide: 'GradeRepository',
          useClass: InMemoryGradeRepository,
        },
      ],
    }).compile();

    service = module.get<GradeService>(GradeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a grade', async () => {
      const grade = await service.create({
        activity_id: 'Test Activity ID',
        student_id: 'Test Student ID',
        value: 10,
      });
      expect(grade).toHaveProperty('id');
      expect(grade).toHaveProperty('activity_id', 'Test Activity ID');
      expect(grade).toHaveProperty('student_id', 'Test Student ID');
      expect(grade).toHaveProperty('value', 10);
    });

    it('should throw if grade already exists', async () => {
      await service.create({
        activity_id: 'Test Activity ID',
        student_id: 'Test Student ID',
        value: 10,
      });
      await expect(
        service.create({
          activity_id: 'Test Activity ID',
          student_id: 'Test Student ID',
          value: 10,
        }),
      ).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return an array of grades', async () => {
      await service.create({
        activity_id: 'Test Activity ID',
        student_id: 'Test Student ID',
        value: 10,
      });

      const grades = await service.findAll();

      expect(grades).toBeInstanceOf(Array);
    });

    it('should throw if no grades are found', async () => {
      await expect(service.findAll()).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    it('should return a grade', async () => {
      const grade = await service.create({
        activity_id: 'Test Activity ID',
        student_id: 'Test Student ID',
        value: 10,
      });

      const foundGrade = await service.findOne(grade.id);

      expect(foundGrade).toHaveProperty('id', grade.id);
      expect(foundGrade).toHaveProperty('activity_id', 'Test Activity ID');
      expect(foundGrade).toHaveProperty('student_id', 'Test Student ID');
      expect(foundGrade).toHaveProperty('value', 10);
    });

    it('should throw if grade is not found', async () => {
      await expect(service.findOne('Test ID')).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a grade', async () => {
      const grade = await service.create({
        activity_id: 'Test Activity ID',
        student_id: 'Test Student ID',
        value: 10,
      });

      const updatedGrade = await service.update(grade.id, {
        value: 8.5,
      });

      expect(updatedGrade).toHaveProperty('id', grade.id);
      expect(updatedGrade).toHaveProperty('activity_id', 'Test Activity ID');
      expect(updatedGrade).toHaveProperty('student_id', 'Test Student ID');
      expect(updatedGrade).toHaveProperty('value', 8.5);
    });

    it('should throw if grade is not found', async () => {
      await expect(service.update('Test ID', {})).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove a grade', async () => {
      const grade = await service.create({
        activity_id: 'Test Activity ID',
        student_id: 'Test Student ID',
        value: 10,
      });

      await service.remove(grade.id);

      await expect(service.findOne(grade.id)).rejects.toThrow();
    });

    it('should throw if grade is not found', async () => {
      await expect(service.remove('Test ID')).rejects.toThrow();
    });
  });
});
