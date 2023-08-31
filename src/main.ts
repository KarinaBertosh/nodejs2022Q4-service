import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MyLogger } from './logger/LoggerService';
import { SwaggerModule } from '@nestjs/swagger';
import { resolve } from 'path';
import { cwd } from 'process';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';

const PORT = process.env['PORT'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
    bufferLogs: true,
  });
  const logger = app.get(MyLogger);
  const document = await loadSwaggerDocument();
  SwaggerModule.setup('doc', app, document);

  process.on('uncaughtException', (err, origin) => {
    logger.error(`Caught exception: ${err}\n` + `origin: ${origin}`);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.debug(`Unhandled rejection: ${promise}\n` + `reason: ${reason}`);
  });
  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}

async function loadSwaggerDocument() {
  const docFile = await readFile(resolve(cwd(), 'doc', 'api.yaml'), {
    encoding: 'utf8',
  });
  return parse(docFile);
}

bootstrap();
