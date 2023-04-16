import { Module } from '@nestjs/common';
import { StudentCardService } from './student-card.service';
import { StudentCardController } from './student-card.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudentCardRepository } from './repositories/student-card.repository';

@Module({
  controllers: [StudentCardController],
  providers: [
    PrismaService,
    StudentCardService,
    {
      provide: 'StudentCardRepository',
      useClass: StudentCardRepository,
    },
  ],
})
export class StudentCardModule {}
