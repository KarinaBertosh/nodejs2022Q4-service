import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MyLogger } from './logger/LoggerService';
import { HttpExceptionFilter } from './errors/HttpExceptionFilter';

const PORT = process.env['PORT'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
    bufferLogs: true,
  });
  const logger = app.get(MyLogger);

  process.on('uncaughtException', (err, origin) => {
    logger.error(`Caught exception: ${err}\n` + `origin: ${origin}`);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.debug(`Unhandled rejection: ${promise}\n` + `reason: ${reason}`);
  });
  app.useLogger(logger);
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}
bootstrap();
