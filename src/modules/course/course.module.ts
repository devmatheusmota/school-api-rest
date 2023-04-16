import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CourseRepository } from './repositories/course.repository';

@Module({
  controllers: [CourseController],
  providers: [
    PrismaService,
    CourseService,
    {
      provide: 'CourseRepository',
      useClass: CourseRepository,
    },
  ],
})
export class CourseModule {}
