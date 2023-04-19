import { Test, TestingModule } from '@nestjs/testing';
import { ActivityService } from './activity.service';
import { InMemoryActivityRepository } from './repositories/in-memory.activity.repository';

describe('ActivityService', () => {
  let service: ActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityService,
        {
          provide: 'ActivityRepository',
          useClass: InMemoryActivityRepository,
        },
      ],
    }).compile();

    service = module.get<ActivityService>(ActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an activity', async () => {
      const activity = await service.create({
        subject_id: 'Test Subject ID',
        name: 'Test Activity',
        description: 'Test Description',
        course_id: 'Test Course ID',
        due_date: new Date(),
      });
      expect(activity).toHaveProperty('id');
      expect(activity).toHaveProperty('name', 'Test Activity');
      expect(activity).toHaveProperty('description', 'Test Description');
      expect(activity).toHaveProperty('course_id', 'Test Course ID');
      expect(activity).toHaveProperty('due_date');
    });
  });

  describe('findAll', () => {
    it('should return an array of activities', async () => {
      await service.create({
        subject_id: 'Test Subject ID',
        name: 'Test Activity',
        description: 'Test Description',
        course_id: 'Test Course ID',
        due_date: new Date(),
      });

      const activities = await service.findAll();

      expect(activities).toBeInstanceOf(Array);
    });

    it('should throw if no activities are found', async () => {
      await expect(service.findAll()).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    it('should return an activity', async () => {
      const activity = await service.create({
        subject_id: 'Test Subject ID',
        name: 'Test Activity',
        description: 'Test Description',
        course_id: 'Test Course ID',
        due_date: new Date(),
      });

      const foundActivity = await service.findOne(activity.id);
      expect(foundActivity).toHaveProperty('id', activity.id);
      expect(foundActivity).toHaveProperty('name', 'Test Activity');
      expect(foundActivity).toHaveProperty('description', 'Test Description');
      expect(foundActivity).toHaveProperty('course_id', 'Test Course ID');
      expect(foundActivity).toHaveProperty('due_date');
    });

    it('should throw if no activity is found', async () => {
      await expect(service.findOne('Test ID')).rejects.toThrow();
    });
  });

  describe('findByCourseId', () => {
    it('should return an array of activities', async () => {
      await service.create({
        subject_id: 'Test Subject ID',
        name: 'Test Activity',
        description: 'Test Description',
        course_id: 'Test Course ID',
        due_date: new Date(),
      });

      const activities = await service.findByCourseId('Test Course ID');
      expect(activities).toBeInstanceOf(Array);
    });

    it('should throw if no activities are found', async () => {
      await expect(service.findByCourseId('Test Course ID')).rejects.toThrow();
    });

    it('should throw if no course id is provided', async () => {
      await expect(service.findByCourseId('')).rejects.toThrow();
    });
  });

  describe('findByStudentId', () => {
    it('should return an array of activities', async () => {
      await service.create({
        subject_id: 'Test Subject ID',
        name: 'Test Activity',
        description: 'Test Description',
        course_id: 'Test Course ID',
        due_date: new Date(),
      });

      const activities = await service.findByStudentId('Test Student ID');
      expect(activities).toBeInstanceOf(Array);
    });

    it('should throw if no activities are found', async () => {
      await expect(
        service.findByStudentId('Test Student ID'),
      ).rejects.toThrow();
    });

    it('should throw if no student id is provided', async () => {
      await expect(service.findByStudentId('')).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update an activity', async () => {
      const activity = await service.create({
        subject_id: 'Test Subject ID',
        name: 'Test Activity',
        description: 'Test Description',
        course_id: 'Test Course ID',
        due_date: new Date(),
      });

      const updatedActivity = await service.update(activity.id, {
        name: 'Updated Activity',
        description: 'Updated Description',
        course_id: 'Updated Course ID',
        due_date: new Date(),
      });

      expect(updatedActivity).toHaveProperty('id', activity.id);
      expect(updatedActivity).toHaveProperty('name', 'Updated Activity');
      expect(updatedActivity).toHaveProperty(
        'description',
        'Updated Description',
      );
      expect(updatedActivity).toHaveProperty('course_id', 'Updated Course ID');
      expect(updatedActivity).toHaveProperty('due_date');
    });

    it('should throw if no activity is found', async () => {
      await expect(
        service.update('Test ID', {
          name: 'Updated Activity',
          description: 'Updated Description',
          course_id: 'Updated Course ID',
          due_date: new Date(),
        }),
      ).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove an activity', async () => {
      const activity = await service.create({
        subject_id: 'Test Subject ID',
        name: 'Test Activity',
        description: 'Test Description',
        course_id: 'Test Course ID',
        due_date: new Date(),
      });

      await service.remove(activity.id);
      await expect(service.findOne(activity.id)).rejects.toThrow();
    });

    it('should throw if no activity is found', async () => {
      await expect(service.remove('Test ID')).rejects.toThrow();
    });
  });
});
