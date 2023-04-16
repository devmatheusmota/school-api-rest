import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { InMemoryCourseRepository } from './repositories/in-memory.course.repository';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: 'CourseRepository',
          useClass: InMemoryCourseRepository,
        },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a course', async () => {
      const course = await service.create({
        name: 'Test Course',
        year: 2020,
      });
      expect(course).toHaveProperty('id');
      expect(course).toHaveProperty('name', 'Test Course');
      expect(course).toHaveProperty('year', 2020);
    });

    it('should throw if course already exists', async () => {
      await service.create({
        name: 'Test Course',
        year: 2020,
      });
      await expect(
        service.create({
          name: 'Test Course',
          year: 2020,
        }),
      ).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      await service.create({
        name: 'Test Course',
        year: 2020,
      });

      const courses = await service.findAll();

      expect(courses).toBeInstanceOf(Array);
    });

    it('should throw if no courses are found', async () => {
      await expect(service.findAll()).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    it('should return a course', async () => {
      const course = await service.create({
        name: 'Test Course',
        year: 2020,
      });

      const foundCourse = await service.findOne(course.id);

      expect(foundCourse).toHaveProperty('id', course.id);
      expect(foundCourse).toHaveProperty('name', 'Test Course');
      expect(foundCourse).toHaveProperty('year', 2020);
    });

    it('should throw if course is not found', async () => {
      await expect(service.findOne('invalid-id')).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a course', async () => {
      const course = await service.create({
        name: 'Test Course',
        year: 2020,
      });

      const updatedCourse = await service.update(course.id, {
        name: 'Updated Course',
        year: 2021,
      });

      expect(updatedCourse).toHaveProperty('id', course.id);
      expect(updatedCourse).toHaveProperty('name', 'Updated Course');
      expect(updatedCourse).toHaveProperty('year', 2021);
    });

    it('should throw if course is not found', async () => {
      await expect(
        service.update('invalid-id', {
          name: 'Updated Course',
          year: 2021,
        }),
      ).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove a course', async () => {
      const course = await service.create({
        name: 'Test Course',
        year: 2020,
      });

      await service.remove(course.id);

      await expect(service.findOne(course.id)).rejects.toThrow();
    });

    it('should throw if course is not found', async () => {
      await expect(service.remove('invalid-id')).rejects.toThrow();
    });
  });
});
