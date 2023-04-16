import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { StudentRepository } from './repositories/student.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [StudentController],
  providers: [
    PrismaService,
    StudentService,
    {
      provide: 'StudentRepository',
      useClass: StudentRepository,
    },
  ],
  exports: [StudentService],
})
export class StudentModule {}
