import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BodyMiddleware } from './middlewares/body.middleware';
import { StudentModule } from './modules/student/student.module';
import { AddressModule } from './modules/address/address.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { SubjectModule } from './modules/subject/subject.module';
import { ClassModule } from './modules/class/class.module';
import { ActivityModule } from './modules/activity/activity.module';
import { GradeModule } from './modules/grade/grade.module';

@Module({
  imports: [
    StudentModule,
    AddressModule,
    TeacherModule,
    SubjectModule,
    ClassModule,
    ActivityModule,
    GradeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BodyMiddleware).forRoutes('*');
  }
}
