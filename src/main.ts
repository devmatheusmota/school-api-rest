import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Desafio EMR')
    .setDescription('API para o desafio EMR')
    .setContact('', '', 'devmatheusmota@gmail.com')
    .addBearerAuth()
    // .addServer('', 'Production') // TODO: add production server
    .addServer('http://localhost:3000/v1', 'Development')
    .setVersion('1.0.0')
    .addTag('default', 'Endpoints padrão')
    .addTag('Auth', 'Endpoints para autenticação')
    .addTag('Student', 'Endpoints para gerenciar estudantes')
    .addTag('Student Card', 'Endpoints para gerenciar carteira de estudantes')
    .addTag('Teacher', 'Endpoints para gerenciar professores')
    .addTag('Course', 'Endpoints para gerenciar cursos')
    .addTag('Activity', 'Endpoints para gerenciar atividades')
    .addTag('Subject', 'Endpoints para gerenciar matérias')
    .addTag('Grade', 'Endpoints para gerenciar notas')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Desafio EMR - API',
  });

  app.setGlobalPrefix('v1');
  await app.listen(3000);
}
bootstrap();
