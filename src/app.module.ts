import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BodyMiddleware } from './middlewares/body.middleware';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BodyMiddleware).forRoutes('*');
  }
}
