import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivityRepository } from './repositories/activity.repository';

@Module({
  controllers: [ActivityController],
  providers: [
    PrismaService,
    ActivityService,
    {
      provide: 'ActivityRepository',
      useClass: ActivityRepository,
    },
  ],
})
export class ActivityModule {}
