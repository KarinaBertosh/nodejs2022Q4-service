import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MyLogger } from './logger/LoggerService';

const PORT = process.env['PORT'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
    bufferLogs: true,
  });
  const logger = app.get(MyLogger);
  app.useLogger(logger);

  process.on('uncaughtException', (err, origin) => {
    logger.error(`Caught exception: ${err}\n` + `origin: ${origin}`);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.debug(`Unhandled rejection: ${promise}\n` + `reason: ${reason}`);
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}
bootstrap();
