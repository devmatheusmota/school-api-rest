import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TeacherRepository } from './repositories/teacher.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TeacherController],
  providers: [
    PrismaService,
    TeacherService,
    {
      provide: 'TeacherRepository',
      useClass: TeacherRepository,
    },
  ],
})
export class TeacherModule {}
