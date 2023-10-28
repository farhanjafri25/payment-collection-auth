import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: ['http://127.0.0.1', '*'] });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: ['http://localhost:3000', '*'] });
  app.use(bodyParser.json({ limit: '8mb' }));
  app.use(bodyParser.urlencoded({ limit: '8mb', extended: true }));
  await app.listen(3000);
}
bootstrap();
