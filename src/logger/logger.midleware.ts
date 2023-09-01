import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { MyLogger } from './LoggerService';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private myLogger: MyLogger;

  constructor() {
    this.myLogger = new MyLogger();
  }

  use(
    { method, originalUrl: url, body, query }: Request,
    response: Response,
    next: NextFunction,
  ): void {
    const userAgents = response.getHeader('user-agent') as string[];
    const userAgent = Array.isArray(userAgents)
      ? userAgents.join(' ')
      : userAgents || '';
    const startTime = Date.now();

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.getHeader('content-length');
      const contentLengthNum =
        typeof contentLength === 'number' ? contentLength : 0;

      const logMessage = this.getLogMessage(
        method,
        url,
        query,
        body,
        statusCode,
        contentLengthNum,
        userAgent,
        startTime,
      );

      this.myLogger.log(logMessage);
    });

    next();
  }

  private getLogMessage(
    method: string,
    url: string,
    query: Record<string, any>,
    body: Record<string, any>,
    statusCode: number,
    contentLength: number | undefined,
    userAgent: string,
    startTime: number,
  ): string {
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    const formattedStartTime = new Date(startTime).toISOString();
    const formattedEndTime = new Date(endTime).toISOString();

    return `${method} ${url} ${JSON.stringify(query)} ${JSON.stringify(
      body,
    )} ${statusCode} ${contentLength}B - ${userAgent} - ${formattedStartTime} - ${formattedEndTime} - ${elapsedTime}ms`;
  }
}
