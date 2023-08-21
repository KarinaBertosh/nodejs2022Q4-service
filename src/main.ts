import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MyLogger } from './logger/LoggerService';

const PORT = process.env['PORT'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(MyLogger);
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}
bootstrap();
