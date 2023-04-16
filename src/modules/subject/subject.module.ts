import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubjectRepository } from './repositories/subject.repository';

@Module({
  controllers: [SubjectController],
  providers: [
    PrismaService,
    SubjectService,
    {
      provide: 'SubjectRepository',
      useClass: SubjectRepository,
    },
  ],
})
export class SubjectModule {}
