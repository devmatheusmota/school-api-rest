import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BodyMiddleware } from './middlewares/body.middleware';
import { StudentModule } from './modules/student/student.module';
import { AddressModule } from './modules/address/address.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { SubjectModule } from './modules/subject/subject.module';
import { CourseModule } from './modules/course/course.module';
import { ActivityModule } from './modules/activity/activity.module';
import { GradeModule } from './modules/grade/grade.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    StudentModule,
    AddressModule,
    TeacherModule,
    SubjectModule,
    CourseModule,
    ActivityModule,
    GradeModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BodyMiddleware).forRoutes('*');
  }
}
