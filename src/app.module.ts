import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BodyMiddleware } from './middlewares/body.middleware';
import { StudentModule } from './modules/student/student.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { SubjectModule } from './modules/subject/subject.module';
import { CourseModule } from './modules/course/course.module';
import { ActivityModule } from './modules/activity/activity.module';
import { GradeModule } from './modules/grade/grade.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { StudentCardModule } from './modules/student-card/student-card.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    StudentModule,
    TeacherModule,
    SubjectModule,
    CourseModule,
    ActivityModule,
    GradeModule,
    StudentCardModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BodyMiddleware).forRoutes('*');
  }
}
