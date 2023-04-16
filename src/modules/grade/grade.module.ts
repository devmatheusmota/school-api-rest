import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { GradeRepository } from './repositories/grade.repository';

@Module({
  controllers: [GradeController],
  providers: [
    PrismaService,
    GradeService,
    {
      provide: 'GradeRepository',
      useClass: GradeRepository,
    },
  ],
})
export class GradeModule {}
