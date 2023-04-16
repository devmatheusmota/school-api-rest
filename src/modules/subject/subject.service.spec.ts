import { Test, TestingModule } from '@nestjs/testing';
import { SubjectService } from './subject.service';
import { InMemorySubjectRepository } from './repositories/in-memory.subject.repository';

describe('SubjectService', () => {
  let service: SubjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubjectService,
        {
          provide: 'SubjectRepository',
          useClass: InMemorySubjectRepository,
        },
      ],
    }).compile();

    service = module.get<SubjectService>(SubjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a subject', async () => {
      const subject = await service.create({
        name: 'Test Subject Name',
        teacher_id: 'Test Teacher ID',
      });
      expect(subject).toHaveProperty('id');
      expect(subject).toHaveProperty('name', 'Test Subject Name');
    });

    it('should throw if subject already exists', async () => {
      await service.create({
        name: 'Test Subject Name',
        teacher_id: 'Test Teacher ID',
      });
      await expect(
        service.create({
          name: 'Test Subject Name',
          teacher_id: 'Test Teacher ID',
        }),
      ).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return an array of subjects', async () => {
      await service.create({
        name: 'Test Subject Name',
        teacher_id: 'Test Teacher ID',
      });

      const subjects = await service.findAll();

      expect(subjects).toBeInstanceOf(Array);
    });

    it('should throw if no subjects are found', async () => {
      await expect(service.findAll()).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    it('should return a subject', async () => {
      const subject = await service.create({
        name: 'Test Subject Name',
        teacher_id: 'Test Teacher ID',
      });

      const foundSubject = await service.findOne(subject.id);

      expect(foundSubject).toHaveProperty('id', subject.id);
    });

    it('should throw if subject is not found', async () => {
      await expect(service.findOne('Test Subject ID')).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a subject', async () => {
      const subject = await service.create({
        name: 'Test Subject Name',
        teacher_id: 'Test Teacher ID',
      });

      const updatedSubject = await service.update(subject.id, {
        name: 'Updated Subject Name',
        teacher_id: 'Updated Teacher ID',
      });

      expect(updatedSubject).toHaveProperty('id', subject.id);
      expect(updatedSubject).toHaveProperty('name', 'Updated Subject Name');
    });

    it('should throw if subject is not found', async () => {
      await expect(
        service.update('Test Subject ID', {
          name: 'Updated Subject Name',
          teacher_id: 'Updated Teacher ID',
        }),
      ).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove a subject', async () => {
      const subject = await service.create({
        name: 'Test Subject Name',
        teacher_id: 'Test Teacher ID',
      });

      await service.remove(subject.id);

      await expect(service.findOne(subject.id)).rejects.toThrow();
    });

    it('should throw if subject is not found', async () => {
      await expect(service.remove('Test Subject ID')).rejects.toThrow();
    });
  });
});
