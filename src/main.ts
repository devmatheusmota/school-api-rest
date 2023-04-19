import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('EMR Challenge - API Rest')
    .setDescription('API Rest for EMR Challenge')
    .setContact('', '', 'devmatheusmota@gmail.com')
    .addBearerAuth()
    .addServer('https://apidesafio.devmatheusmota.com.br/v1', 'Production')
    .addServer('http://localhost:3000/v1', 'Development')
    .setVersion('1.0.0')
    .addTag('default', 'Default Endpoints')
    .addTag('Auth', 'Authentication Endpoints')
    .addTag('Student', 'Students Management Endpoints')
    .addTag('Student Card', 'Student Cards Management Endpoints')
    .addTag('Teacher', 'Teachers Management Endpoints')
    .addTag('Course', 'Courses Management Endpoints')
    .addTag('Activity', 'Activities Management Endpoints')
    .addTag('Subject', 'Subjects Management Endpoints')
    .addTag('Grade', 'Grades Management Endpoints')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'EMR Challenge - API Rest',
  });

  app.setGlobalPrefix('v1');
  await app.listen(3000);
}
bootstrap();
